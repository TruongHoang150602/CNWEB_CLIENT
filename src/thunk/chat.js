import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllChatsForUserAPI, getParticipantsAPI } from "pages/api/chat";

export const getAllChatsForUser = createAsyncThunk(
  "chats/getAllChat",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const chatlist = await getAllChatsForUserAPI(userId);
      const chatListWithParticipants = await Promise.all(
        chatlist.map(async (chat) => {
          const participants = await getParticipantsAPI(chat.participantIds);
          return {
            ...chat,
            participants,
          };
        })
      );

      return chatListWithParticipants;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);
