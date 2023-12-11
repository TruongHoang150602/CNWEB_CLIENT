import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { Box, Divider, Stack } from "@mui/material";
import { Scrollbar } from "components/scrollbar";
import { ChatMessageAdd } from "./chat-message-add";
import { ChatMessages } from "./chat-messages";
import { ChatThreadToolbar } from "./chat-thread-toolbar";
import useAuth from "hook/useAuth";
import { subDays, subHours, subMinutes } from "date-fns";

const now = new Date();

const participantsTest = [
  {
    id: "5e8891ab188cd2855e6029b7",
    avatar: "/assets/avatars/avatar-alcides-antonio.png",
    isActive: true,
    lastActivity: now.getTime(),
    name: "Alcides Antonio",
  },
  {
    id: "5e887a62195cc5aef7e8ca5d",
    avatar: "/assets/avatars/avatar-marcus-finn.png",
    isActive: false,
    lastActivity: subHours(now, 2).getTime(),
    name: "Marcus Finn",
  },
];

const threadTest = {
  id: "5e867eb9de721aecaccf4f7b",
  messages: [
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
  ],
  participantIds: ["5e86809283e28b96d2d38537", "5e86805e2bafd54f66cc95c3"],
  type: "ONE_TO_ONE",
  unreadCount: 2,
};

const useMessagesScroll = (thread) => {
  const messagesRef = useRef(null);

  const handleUpdate = useCallback(() => {
    // Thread does not exist
    if (!thread) {
      return;
    }

    // Ref is not used
    if (!messagesRef.current) {
      return;
    }

    const container = messagesRef.current;
    const scrollElement = container.getScrollElement();
    scrollElement.scrollTop = container.el.scrollHeight;
  }, [thread]);

  useEffect(
    () => {
      handleUpdate();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [thread]
  );

  return {
    messagesRef,
  };
};

export const ChatThread = (props) => {
  const { threadKey, ...other } = props;

  const user = useAuth();
  const thread = threadTest;
  const participants = participantsTest;
  const { messagesRef } = useMessagesScroll(thread);

  const handleSend = useCallback();

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
            messages={thread?.messages || []}
            participants={thread?.participants || []}
          />
        </Scrollbar>
      </Box>
      <Divider />
      <ChatMessageAdd onSend={handleSend} />
    </Stack>
  );
};

ChatThread.propTypes = {
  threadKey: PropTypes.string.isRequired,
};
