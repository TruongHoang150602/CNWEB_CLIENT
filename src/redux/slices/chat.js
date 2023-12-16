import { createSlice } from "@reduxjs/toolkit";
import { getAllChatsForUser, getChatById, getParticipants } from "thunk/chat";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: [],
    currentChat: null,
    isLoading: true,
    view: "blank",
    error: null,
    isOpenSidebar: true,
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
      state.chatList = action.payload;
    },

    selectChat(state, action) {
      const { chat } = action.payload;
      state.currentChat = chat;
      state.view = "chat";
    },

    openModal(state) {
      state.isOpenSidebar = true;
    },
    closeModal(state) {
      state.isOpenSidebar = false;
      state.currentChat = null;
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
      })
      .addCase(getAllChatsForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { openModal, closeModal, receiveMessages, selectChat } =
  chatSlice.actions;

export const selectChatList = (state) => state.chat.chatList;
export const selectCurrentChat = (state) => state.chat.currentChat;
export const selectIsLoading = (state) => state.chat.isLoading;
export const selectError = (state) => state.chat.error;
export const selectIsOpenSideBar = (state) => state.chat.isOpenSidebar;
export const selectView = (state) => state.chat.view;

export default chatSlice.reducer;
