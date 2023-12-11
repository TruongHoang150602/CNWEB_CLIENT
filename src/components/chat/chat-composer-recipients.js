import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Paper,
  Popper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Scrollbar } from "components/scrollbar";
import { useCallback, useRef, useState } from "react";
import { subDays, subHours, subMinutes } from "date-fns";

const now = new Date();
const messages = [
  {
    id: "5e867f0a5bc0ff2bfa07bfa6",
    attachments: [],
    body: "Hey, nice projects! I really liked the one in react. What's your quote on kinda similar project?",
    contentType: "text",
    createdAt: subDays(subHours(now, 10), 4).getTime(),
    authorId: "5e86805e2bafd54f66cc95c3",
  },
  {
    id: "5e867f167d5f78109ae9f2a4",
    attachments: [],
    body: "I would need to know more details, but my hourly rate stats at $35/hour. Thanks!",
    contentType: "text",
    createdAt: subDays(subHours(now, 2), 4).getTime(),
    authorId: "5e86809283e28b96d2d38537",
  },
  {
    id: "5e867f1c9ca72084693528f4",
    attachments: [],
    body: "Well it's a really easy one, I'm sure we can make it half of the price.",
    contentType: "text",
    createdAt: subHours(now, 5).getTime(),
    authorId: "5e86805e2bafd54f66cc95c3",
  },
  {
    id: "5e867f22fd2e27a09849b4db",
    attachments: [],
    body: "Then why don't you make it if it's that easy? Sorry I'm not interetes, have fantastic day Adam!",
    contentType: "text",
    createdAt: subHours(now, 3).getTime(),
    authorId: "5e86809283e28b96d2d38537",
  },
  {
    id: "5e867f28a34d45ac6eb5c41f",
    attachments: [],
    body: "Last offer, $25 per hour",
    contentType: "text",
    createdAt: subHours(now, 2).getTime(),
    authorId: "5e86805e2bafd54f66cc95c3",
  },
  {
    id: "5e867f2dba984a3f78b33526",
    attachments: [],
    body: "/assets/covers/minimal-1-4x3-small.png",
    contentType: "image",
    createdAt: subHours(now, 1).getTime(),
    authorId: "5e86805e2bafd54f66cc95c3",
  },
];

export const ChatComposerRecipients = (props) => {
  const {
    onRecipientAdd,
    onRecipientRemove,
    recipients = messages,
    ...other
  } = props;
  const searchRef = useRef(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const showSearchResults = !!(searchFocused && searchQuery);
  const hasSearchResults = searchResults.length > 0;

  const handleSearchChange = useCallback(
    async (event) => {
      const query = event.target.value;

      setSearchQuery(query);

      if (!query) {
        setSearchResults([]);
        return;
      }

      try {
        const contacts = await chatApi.getContacts({ query });

        // Filter already picked recipients

        const recipientIds = recipients.map((recipient) => recipient.id);
        const filtered = contacts.filter(
          (contact) => !recipientIds.includes(contact.id)
        );

        setSearchResults(filtered);
      } catch (err) {
        console.error(err);
      }
    },
    [recipients]
  );

  const handleSearchClickAway = useCallback(() => {
    if (showSearchResults) {
      setSearchFocused(false);
    }
  }, [showSearchResults]);

  const handleSearchFocus = useCallback(() => {
    setSearchFocused(true);
  }, []);

  const handleSearchSelect = useCallback(
    (contact) => {
      setSearchQuery("");
      onRecipientAdd?.(contact);
    },
    [onRecipientAdd]
  );

  return (
    <>
      <Box {...other}>
        <Scrollbar>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              p: 2,
            }}
          >
            <ClickAwayListener onClickAway={handleSearchClickAway}>
              <Box sx={{ mr: 1 }}>
                <OutlinedInput
                  fullWidth
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  placeholder="Search contacts"
                  ref={searchRef}
                  startAdornment={
                    <InputAdornment position="start">
                      <SvgIcon>
                        <SearchMdIcon />
                      </SvgIcon>
                    </InputAdornment>
                  }
                  sx={{
                    "&.MuiInputBase-root": {
                      height: 40,
                      minWidth: 260,
                    },
                  }}
                  value={searchQuery}
                />
                {showSearchResults && (
                  <Popper
                    anchorEl={searchRef.current}
                    open={searchFocused}
                    placement="bottom-start"
                  >
                    <Paper
                      elevation={16}
                      sx={{
                        borderColor: "divider",
                        borderStyle: "solid",
                        borderWidth: 1,
                        maxWidth: "100%",
                        mt: 1,
                        width: 320,
                      }}
                    >
                      {hasSearchResults ? (
                        <>
                          <Box
                            sx={{
                              px: 2,
                              pt: 2,
                            }}
                          >
                            <Typography
                              color="text.secondary"
                              variant="subtitle2"
                            >
                              Contacts
                            </Typography>
                          </Box>
                          <List>
                            {searchResults.map((contact) => (
                              <ListItemButton
                                key={contact.id}
                                onClick={() => handleSearchSelect(contact)}
                              >
                                <ListItemAvatar>
                                  <Avatar src={contact.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={contact.name}
                                  primaryTypographyProps={{
                                    noWrap: true,
                                    variant: "subtitle2",
                                  }}
                                />
                              </ListItemButton>
                            ))}
                          </List>
                        </>
                      ) : (
                        <Box
                          sx={{
                            p: 2,
                            textAlign: "center",
                          }}
                        >
                          <Typography gutterBottom variant="h6">
                            Nothing Found
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            We couldn&apos;t find any matches for &quot;
                            {searchQuery}&quot;. Try checking for typos or using
                            complete words.
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Popper>
                )}
              </Box>
            </ClickAwayListener>
            <Typography color="text.secondary" sx={{ mr: 2 }} variant="body2">
              To:
            </Typography>
            <Stack alignItems="center" direction="row" spacing={2}>
              {recipients.map((recipient) => (
                <Chip
                  avatar={
                    <Avatar src="https://lh3.googleusercontent.com/a/ACg8ocKvBtPswksA84XNlOmIIf_Ic_80DpgiwaWZjvMtZlX0=s96-c" />
                  }
                  key={recipient.id}
                  label={recipient.name}
                  onDelete={() => onRecipientRemove?.(recipient.id)}
                />
              ))}
            </Stack>
          </Box>
        </Scrollbar>
      </Box>
    </>
  );
};

ChatComposerRecipients.propTypes = {
  onRecipientAdd: PropTypes.func,
  onRecipientRemove: PropTypes.func,
  recipients: PropTypes.array,
};
