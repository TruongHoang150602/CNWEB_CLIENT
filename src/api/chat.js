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
    const q = query(
      collection(db, "chats"),
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
