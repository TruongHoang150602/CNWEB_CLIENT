import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import PropTypes from "prop-types";
// Specify the correct path to your chat-related functions
import {
  createNewChatAPI,
  getAllChatsForUserAPI,
  getParticipantsAPI,
  sendMessageAPI,
} from "pages/api/chat";

// Define action types for the reducer
const ActionType = {
  NEW_MESSAGE: "NEW_MESSAGE",
  UPDATE_CHATS: "UPDATE_CHATS",
};

// Initial state for the chat context
const initialState = {
  userChats: [],
};

// Reducer function to update the state based on actions
const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.NEW_MESSAGE:
      return {
        ...state,
        userChats: action.payload.updatedChats,
      };
    case ActionType.UPDATE_CHATS:
      return {
        ...state,
        userChats: action.payload.userChats,
      };
    default:
      return state;
  }
};

// Create the chat context
export const ChatContext = createContext({
  ...initialState,
  sendMessage: () => {},
  getAllChatsForUser: () => {},
  createNewChat: () => {},
  listenForChatUpdates: () => {},
});

// Chat provider component
export const ChatProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  // Example: Function to send a new message
  const sendMessage = useCallback(async (chatId, message) => {
    try {
      await sendMessageAPI(chatId, message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, []);

  // Example: Function to fetch chat history
  const getAllChatsForUser = useCallback(async (userId) => {
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

      dispatch({
        type: ActionType.UPDATE_CHATS,
        payload: { chatListWithParticipants },
      });
    } catch (error) {
      console.error("Error fetching user chats:", error);
    }
  }, []);

  // Example: Function to create a new chat
  const createNewChat = useCallback(async (message, participantIds) => {
    try {
      await createNewChatAPI(message, participantIds);
      // Optionally, you can update the local state with the new chat
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  }, []);

  // Example: Function to listen for chat updates
  const listenForChatUpdates = useCallback(
    (userId) => {
      const chatsRef = collection(db, "chats");
      const q = query(
        chatsRef,
        where("participantIds", "array-contains", userId)
      );

      const listener = onSnapshot(q, (snapshot) => {
        const updatedUserChats = [...state.userChats];

        snapshot.docChanges().forEach(async (change) => {
          const doc = change.doc;
          const updatedChatIndex = updatedUserChats.findIndex(
            (chat) => chat.id === doc.id
          );

          if (change.type === "added" || change.type === "modified") {
            const updatedData = { id: doc.id, ...doc.data() };

            if (updatedChatIndex !== -1) {
              // Nếu tài liệu đã tồn tại, cập nhật nó
              updatedUserChats[updatedChatIndex] = {
                ...updatedUserChats[updatedChatIndex],
                ...updatedData,
              };
            } else {
              // Nếu tài liệu mới, thêm vào danh sách
              const participants = await getParticipantsAPI(
                chat.participantIds
              );
              updatedUserChats.push({ ...updatedData, participants });
            }
          } else if (change.type === "removed" && updatedChatIndex !== -1) {
            // Nếu tài liệu bị xóa, loại bỏ khỏi danh sách
            updatedUserChats.splice(updatedChatIndex, 1);
          }
        });

        console.log("Updated User Chats:", updatedUserChats);
        dispatch({
          type: ActionType.UPDATE_CHATS,
          payload: { updatedUserChats },
        });
      });
      return listener;
    },
    [state.userChats]
  );

  // Return the context provider with the value
  return (
    <ChatContext.Provider
      value={{
        ...state,
        sendMessage,
        getAllChatsForUser,
        createNewChat,
        listenForChatUpdates,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Prop types for the ChatProvider component
ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Chat consumer component
export const ChatConsumer = ChatContext.Consumer;
