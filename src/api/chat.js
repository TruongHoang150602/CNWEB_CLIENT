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

export const getChatByIdAPI = (chatId, callback) => {
  try {
    console.log(chatId);
    const chatDocRef = doc(db, "chats", chatId);

    const unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const chatData = docSnapshot.data();
        callback(chatData);
      } else {
        console.log(`Chat with ID ${chatId} does not exist.`);
        callback(null);
      }
    });

    // Return the unsubscribe function to stop listening for updates when needed
    return unsubscribe;
  } catch (error) {
    console.error("Error getting chat by ID:", error);
    throw error;
  }
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
