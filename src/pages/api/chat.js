import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "firebaseConfig/firebase";
import { getUserByIdAPI } from "./user";
import chat from "redux/slices/chat";

export const getAllChatsForUserAPI = async (userId) => {
  try {
    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("participantIds", "array-contains", userId)
    );

    const querySnapshot = await getDocs(q);

    const userChats = [];
    querySnapshot.forEach((doc) => {
      userChats.push({ id: doc.id, ...doc.data() });
    });

    return userChats;
  } catch (error) {
    console.error("Error getting chats for user:", error);
    throw error;
  }
};

export const listenForChatUpdates = (userId, chatList, updateCallback) => {
  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("participantIds", "array-contains", userId));

  const listener = onSnapshot(q, (snapshot) => {
    const updatedUserChats = [...chatList];

    snapshot.docChanges().forEach((change) => {
      const doc = change.doc;
      console.log(doc.id, updatedUserChats);
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
          updatedUserChats.push(updatedData);
        }
      } else if (change.type === "removed" && updatedChatIndex !== -1) {
        // Nếu tài liệu bị xóa, loại bỏ khỏi danh sách
        updatedUserChats.splice(updatedChatIndex, 1);
      }
    });

    console.log("Updated User Chats:", updatedUserChats);
    updateCallback(updatedUserChats);
  });
  return listener;
};

export const sendMessageAPI = async (chatId, message) => {
  try {
    const chatDocRef = doc(db, "chats", chatId);

    // Update the 'messages' array in the document with the new message
    await updateDoc(chatDocRef, {
      messages: arrayUnion(message),
    });

    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const createNewChat = async (message, participantIds) => {};

export const getParticipantsAPI = async (participantIds) => {
  const participants = await Promise.all(
    participantIds.map(async (userId) => {
      try {
        const userResponse = await getUserByIdAPI(userId);
        return userResponse;
      } catch (userError) {
        console.error(`Error fetching user ${userId}:`, userError);
        return null;
      }
    })
  );
  return participants;
};
