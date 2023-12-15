import { createSlice } from "@reduxjs/toolkit";
import { getAllChatsForUser, getChatById, getParticipants } from "thunk/chat";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: null,
    chatId: null,
    participants: null,
    messages: null,
    type: null,
    isLoading: false,
    error: null,
    isOpenModal: false,
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    receiveMessages(state, action) {
      // Update state with the new messages
      state.messages = action.payload;
    },

    openModal(state) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChatsForUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllChatsForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatList = action.payload;
        console.log(chatList);
      })
      .addCase(getAllChatsForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getChatById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getChatById.fulfilled, (state, action) => {
        state.isLoading = false;
        const { chat, participants } = action.payload;
        state.chatId = chat.id;
        state.messages = chat.messages;
        state.type = chat.type;
        state.participants = participants;
      })
      .addCase(getChatById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { openModal, closeModal, receiveMessages } = chatSlice.actions;

export const selectChatList = (state) => state.chat.chatList;
export const selectMessages = (state) => state.chat.messages;
export const selectChatId = (state) => state.chat.chatId;
export const selectType = (state) => state.chat.type;
export const selectParticipants = (state) => state.chat.participants;
export const selectIsLoading = (state) => state.chat.isLoading;
export const selectError = (state) => state.chat.error;
export const selectIsOpenModal = (state) => state.chat.isOpenModal;

export default chatSlice.reducer;
