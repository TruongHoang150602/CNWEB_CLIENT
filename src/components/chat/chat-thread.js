import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Divider, Stack } from "@mui/material";
import { Scrollbar } from "components/scrollbar";
import { ChatMessageAdd } from "./chat-message-add";
import { ChatMessages } from "./chat-messages";
import { ChatThreadToolbar } from "./chat-thread-toolbar";
import { useAuth } from "hook/useAuth";
import { useDispatch } from "react-redux";
import { createNewChatAPI, sendMessageAPI } from "pages/api/chat";

const useMessagesScroll = (messages) => {
  const messagesRef = useRef(null);

  const handleUpdate = useCallback(() => {
    // Thread does not exist
    if (!messages) {
      return;
    }

    // Ref is not used
    if (!messagesRef.current) {
      return;
    }

    const container = messagesRef.current;
    const scrollElement = container.getScrollElement();
    scrollElement.scrollTop = container.el.scrollHeight;
  }, [messages]);

  useEffect(
    () => {
      handleUpdate();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages]
  );

  return {
    messagesRef,
  };
};

export const ChatThread = (props) => {
  const { currentChat, ...other } = props;

  const { user } = useAuth();
  const { messagesRef } = useMessagesScroll(currentChat.messages);
  const dispatch = useDispatch();

  const handleSend = useCallback(
    async (body) => {
      const message = {
        body: body,
        attachments: [],
        contentType: "text",
        createdAt: new Date().getTime(),
        authorId: user.id,
      };
      console.log(currentChat);
      if (currentChat.id) sendMessageAPI(currentChat.id, message);
      else {
        const newChat = {
          type: currentChat.type,
          participantIds: currentChat.participantIds,
          messages: [message],
          unreadCount: 1,
        };
        createNewChatAPI(newChat);
      }
    },
    [dispatch, user.id]
  );

  // Maybe implement a loading state

  return (
    <Stack
      sx={{
        flexGrow: 1,
        overflow: "hidden",
      }}
      {...other}
    >
      <ChatThreadToolbar participants={currentChat.participants} />
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Scrollbar ref={messagesRef} sx={{ maxHeight: "100%" }}>
          <ChatMessages
            messages={currentChat.messages || []}
            participants={currentChat.participants || []}
          />
        </Scrollbar>
      </Box>
      <Divider />
      <ChatMessageAdd onSend={handleSend} />
    </Stack>
  );
};

ChatThread.propTypes = {
  currentChat: PropTypes.object.isRequired,
};
