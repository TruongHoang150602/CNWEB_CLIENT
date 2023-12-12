import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllChatsForUserAPI, getChatByIdAPI } from "api/chat";
import chat from "redux/slices/chat";

export const getAllChatsForUser = createAsyncThunk(
  "chats/getAllChat",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await getAllChatsForUserAPI(userId);
      return response;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

export const getChatById = createAsyncThunk(
  "chat/getChat",
  async ({ chatId }, { rejectWithValue }) => {
    try {
      const response = await getChatByIdAPI(chatId);
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);
