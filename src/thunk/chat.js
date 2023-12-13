import { create } from "@mui/material/styles/createTransitions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByIdAPI } from "api/user";
import { getAllChatsForUserAPI, getChatByIdAPI } from "firebaseConfig/firebase";

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
      const chat = response.chat;

      console.log(chat);

      // Use Promise.all to wait for all getUserByIdAPI calls to complete
      const participants = await Promise.all(
        chat.participantIds.map(async (userId) => {
          try {
            const userResponse = await getUserByIdAPI(userId);
            return userResponse;
          } catch (userError) {
            console.error(`Error fetching user ${userId}:`, userError);
            return null;
          }
        })
      );

      console.log(participants);

      return { chat, participants };
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

export const getParticipants = createAsyncThunk(
  "chat/getParticipants",
  async ({ participantIds }, { rejectWithValue }) => {
    try {
      const participants = [];
      for (userId in participantIds) {
        const response = await getUserByIdAPI(userId);
        participants.push(response);
      }
      console.log(participants);
      return participants;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);
