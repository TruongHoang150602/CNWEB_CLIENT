import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ChatSidebarSearch } from "./chat-sidebar-search";
import { ChatThreadItem } from "./chat-thread-item";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAPI } from "pages/api/user";
import { Scrollbar } from "components/scrollbar";
import { searchChat, selectChat, selectChatList } from "redux/slices/chat";
import { useAuth } from "hook/useAuth";
import {
  blockFirestoreConnection,
  disconnectFirebase,
  reconnectFirebase,
  unblockFirestoreConnection,
} from "firebaseConfig/firebase";

export const ChatSidebar = (props) => {
  const { chatId, container, onClose, open, ...other } = props;
  const chatlist = useSelector(selectChatList);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const handleSearchChange = useCallback(async (event) => {
    const { value } = event.target;

    setSearchQuery(value);

    if (!value) {
      setSearchResults([]);
      return;
    }

    try {
      const contacts = await getAllUsersAPI(value);

      setSearchResults(contacts);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSearchClickAway = useCallback(() => {
    if (searchFocused) {
      setSearchFocused(false);
      setSearchQuery("");
    }
  }, [searchFocused]);

  const handleSearchFocus = useCallback(() => {
    setSearchFocused(true);
  }, []);

  const handleSearchSelect = useCallback(
    (contact) => {
      // We use the contact ID as a thread key
      dispatch(searchChat({ contact, user }));

      setSearchFocused(false);
      setSearchQuery("");
    },
    [router]
  );

  const handleChatSelect = useCallback((chat) => {
    dispatch(selectChat(chat));
  });

  const content = (
    <div>
      <Stack alignItems="center" direction="row" spacing={2} sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Chats
        </Typography>
        {/* <Button
          onClick={() => {}}
          startIcon={
            <SvgIcon>
              <PlusIcon />
            </SvgIcon>
          }
          variant="contained"
        >
          Group
        </Button> */}
        <Button
          onClick={() => {
            blockFirestoreConnection();
          }}
        >
          Disconnect
        </Button>
        {!mdUp && (
          <IconButton onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        )}
      </Stack>
      <ChatSidebarSearch
        isFocused={searchFocused}
        onChange={handleSearchChange}
        onClickAway={handleSearchClickAway}
        onFocus={handleSearchFocus}
        onSelect={handleSearchSelect}
        query={searchQuery}
        results={searchResults}
      />
      <Box sx={{ display: searchFocused ? "none" : "block" }}>
        <Scrollbar>
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              m: 0,
              p: 2,
            }}
          >
            {chatlist.map((chat) => (
              <ChatThreadItem
                active={chat.id === chatId}
                key={chat.id}
                onSelect={() => handleChatSelect(chat)}
                messages={chat.messages}
                participants={chat.participants}
                unreadCount={chat.unreadCount}
              />
            ))}
          </Stack>
        </Scrollbar>
      </Box>
    </div>
  );

  if (mdUp) {
    return (
      <Drawer
        anchor="left"
        open={open}
        PaperProps={{
          sx: {
            position: "relative",
            width: 380,
          },
        }}
        SlideProps={{ container }}
        variant="persistent"
        {...other}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: "none",
          position: "absolute",
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: "100%",
          width: 380,
          pointerEvents: "auto",
          position: "absolute",
        },
      }}
      SlideProps={{ container }}
      variant="temporary"
      {...other}
    >
      {content}
    </Drawer>
  );
};

ChatSidebar.propTypes = {
  chatlist: PropTypes.array,
  container: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
