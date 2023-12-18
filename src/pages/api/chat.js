import {
  addDoc,
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

export const listenForChatUpdates = (userId, updateCallback) => {
  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("participantIds", "array-contains", userId));

  const listener = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const doc = change.doc;

      let updatedData = { id: doc.id, ...doc.data() };
      console.log(change.type);
      updateCallback(updatedData, change.type);
    });
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

export const createNewChatAPI = async (newChat) => {
  try {
    console.log(newChat);
    const chatsCollectionRef = collection(db, "chats");

    // Thêm một chat mới vào collection 'chats'
    await addDoc(chatsCollectionRef, newChat);

    console.log("Chat created successfully!");
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

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
