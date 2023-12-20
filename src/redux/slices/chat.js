import { createSlice } from "@reduxjs/toolkit";
import { getAllChatsForUser, getChatById, getParticipants } from "thunk/chat";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: [],
    currentChat: null,
    isLoading: false,
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
      const { updatedData, type } = action.payload;

      switch (type) {
        case "modified":
          state.chatList = state.chatList.map((chat) =>
            chat.id === updatedData.id ? { ...chat, ...updatedData } : chat
          );

          if (state.currentChat?.id === updatedData.id) {
            state.currentChat = {
              ...state.currentChat,
              ...updatedData,
            };
          }
          break;

        case "added":
          const findChat = state.chatList.findIndex(
            (chat) => chat.id === updatedData.id
          );
          if (findChat == -1) state.chatList.push(updatedData);

          if (state.currentChat?.id === null) {
            console.log(updatedData);
            state.currentChat = updatedData;
          }
          break;

        default:
          break;
      }
    },

    searchChat(state, action) {
      const { contact, user } = action.payload;

      const findChat = state.chatList.find((chat) =>
        chat.participantIds.includes(contact.id)
      );

      state.currentChat = findChat || {
        id: null,
        messages: [],
        participantIds: [contact.id, user.id],
        participants: [contact, user],
        type: "ONE_TO_ONE",
        unreadCount: 0,
      };
      state.view = "chat";
    },

    selectChat(state, action) {
      state.currentChat = action.payload;
      state.chatList = state.chatList.map((chat) =>
        chat.id === state.currentChat.id ? { ...chat, unreadCount: 0 } : chat
      );
      state.view = "chat";
    },

    openSidebar(state) {
      state.isOpenSidebar = true;
    },
    openOrCloseSidebar(state) {
      state.isOpenSidebar = !state.isOpenSidebar;
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

export const {
  openSidebar,
  openOrCloseSidebar,
  receiveMessages,
  selectChat,
  searchChat,
} = chatSlice.actions;

export const selectChatList = (state) => state.chat.chatList;
export const selectCurrentChat = (state) => state.chat.currentChat;
export const selectIsLoading = (state) => state.chat.isLoading;
export const selectError = (state) => state.chat.error;
export const selectIsOpenSideBar = (state) => state.chat.isOpenSidebar;
export const selectView = (state) => state.chat.view;

export default chatSlice.reducer;
