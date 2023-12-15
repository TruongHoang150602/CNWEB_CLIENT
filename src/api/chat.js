const {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} = require("firebase/firestore");
const { db } = require("firebaseConfig/firebase");

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
      userChats.push(doc.data());
    });

    return userChats;
  } catch (error) {
    console.error("Error getting chats for user:", error);
    throw error;
  }
};

export const getChatByIdAPI = async (chatId) => {
  try {
    console.log(chatId);
    const chatDocRef = doc(db, "chats", chatId);

    const chatDocSnapshot = await getDoc(chatDocRef);

    if (chatDocSnapshot.exists()) {
      return chatDocSnapshot.data();
    } else {
      console.log(`Chat with ID ${chatId} does not exist.`);
      return null;
    }
  } catch (error) {
    console.error("Error getting chat by ID:", error);
    throw error;
  }
};

export const chatListeners = {};

export const sendMessageAPI = async (chatId, message, callback) => {
  try {
    const chatDocRef = doc(db, "chats", chatId);

    await updateDoc(chatDocRef, {
      messages: arrayUnion(message),
    });

    console.log("Message sent successfully!");

    const chatListener = onSnapshot(chatDocRef, (docSnapshot) => {
      const updatedChat = docSnapshot.data();
      callback(updatedChat.messages);
    });

    chatListeners[chatId] = chatListener;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
