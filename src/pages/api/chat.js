import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "firebaseConfig/firebase";
import { getUserByIdAPI } from "./user";

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

export const listenForChatUpdates = (userId, updateCallback) => {
  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("participantIds", "array-contains", userId));

  // Set up real-time listener for changes
  onSnapshot(q, (snapshot) => {
    const updatedUserChats = [];
    snapshot.forEach((doc) => {
      updatedUserChats.push({ id: doc.id, ...doc.data() });
    });

    console.log(updatedUserChats);

    // Call the update callback with the updated data
    updateCallback(updatedUserChats);
  });
};

export const sendMessageAPI = async (chatId, message, callback) => {
  try {
    console.log(chatId, message);
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
