import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { Box, Divider, Stack } from "@mui/material";
import { Scrollbar } from "components/scrollbar";
import { ChatMessageAdd } from "./chat-message-add";
import { ChatMessages } from "./chat-messages";
import { ChatThreadToolbar } from "./chat-thread-toolbar";
import { useAuth } from "hook/useAuth";
import { useDispatch } from "react-redux";
import { receiveMessages } from "redux/slices/chat";
import { sendMessageAPI } from "pages/api/chat";

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
  const { chatId, messages, participants, ...other } = props;

  const { user } = useAuth();
  const { messagesRef } = useMessagesScroll(messages);
  const dispatch = useDispatch();

  const callback = (messages) => {
    // Assuming you want to dispatch the received messages
    dispatch(receiveMessages(messages));
  };

  const handleSend = useCallback(
    async (body) => {
      const message = {
        body: body,
        attachments: [],
        contentType: "text",
        createdAt: new Date().getTime(),
        authorId: user.id,
      };
      if (chatId) sendMessageAPI(chatId, message, callback);
    },
    [dispatch, chatId, user.id]
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
      <ChatThreadToolbar participants={participants} />
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Scrollbar ref={messagesRef} sx={{ maxHeight: "100%" }}>
          <ChatMessages
            messages={messages || []}
            participants={participants || []}
          />
        </Scrollbar>
      </Box>
      <Divider />
      <ChatMessageAdd onSend={handleSend} />
    </Stack>
  );
};

ChatThread.propTypes = {
  chatId: PropTypes.string.isRequired,
};
