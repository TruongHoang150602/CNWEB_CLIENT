import { useEffect, useRef } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import Menu01Icon from "@untitled-ui/icons-react/build/esm/Menu01";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  SvgIcon,
} from "@mui/material";
import { ChatBlank } from "components/chat/chat-blank";
import { ChatContainer } from "components/chat/chat-container";
import { ChatComposer } from "components/chat/chat-composer";
import { ChatThread } from "components/chat/chat-thread";
import { getAllChatsForUser, getChatById } from "thunk/chat";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveMessages,
  selectChatList,
  selectCurrentChat,
  selectError,
  selectIsLoading,
  selectIsOpenSideBar,
  selectView,
} from "redux/slices/chat";
import { Container } from "@untitled-ui/icons-react";
import { ChatSidebar } from "components/chat/chat-sidebar";
import { useAuth } from "hook/useAuth";
import { listenForChatUpdates } from "pages/api/chat";

const Page = () => {
  const rootRef = useRef(null);
  const { user } = useAuth();
  const dispatch = useDispatch();

  const chatList = useSelector(selectChatList);
  const currentChat = useSelector(selectCurrentChat);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isOpenSidebar = useSelector(selectIsOpenSideBar);
  const view = useSelector(selectView);

  useEffect(() => {
    dispatch(getAllChatsForUser({ userId: user.id }));
    const listener = listenForChatUpdates(
      user.id,
      chatList,
      (updatedUserChats) => {
        dispatch(receiveMessages(updatedUserChats));
      }
    );
  }, []);

  if (isLoading) {
    return (
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        align="center"
        sx={{ pt: 8, pb: 6 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Chat | QuizzifyME</title>
      </Head>
      <Divider />
      <Box
        component="main"
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          overflow: "hidden",
          position: "relative",
          height: "600px",
          margin: "40px",
          borderRadius: "20px",
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: "flex",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <ChatSidebar
            container={rootRef.current}
            onClose={() => {}}
            open={isOpenSidebar}
            chatList={chatList}
          />
          <ChatContainer open={true}>
            <Box sx={{ p: 2 }}>
              <IconButton>
                <SvgIcon>
                  <Menu01Icon />
                </SvgIcon>
              </IconButton>
            </Box>
            <Divider />
            {view == "blank" && <ChatBlank />}
            {view == "chat" && (
              <ChatThread
                chatId={currentChat.id}
                messages={currentChat.messages}
                participants={currentChat.participants}
              />
            )}
          </ChatContainer>
        </Box>
      </Box>
    </>
  );
};

export default Page;
