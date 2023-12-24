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
  }
};

export const listenForChatUpdates = (userId, updateCallback) => {
  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("participantIds", "array-contains", userId));

  const listener = onSnapshot(q, (snapshot) => {
    syncMessages();
    snapshot.docChanges().forEach(async (change) => {
      const doc = change.doc;
      let updatedData = { id: doc.id, ...doc.data() };

      if (change.type == "added") {
        const participants = await getParticipantsAPI(
          updatedData.participantIds
        );
        updatedData = {
          participants: participants,
          ...updatedData,
        };
      }
      updateCallback(updatedData, change.type);
    });
  });
  return listener;
};

export const sendMessageAPI = async (currentChat, message, callback) => {
  try {
    console.log(message);
    const chatDocRef = doc(db, "chats", currentChat.id);

    await updateDoc(chatDocRef, {
      messages: arrayUnion({ ...message, createdAt: new Date().getTime() }),
      unreadCount: 1,
      updatedAt: new Date().getTime(),
    });

    console.log("Message sent successfully!");
  } catch (error) {
    callback(message);
    const unsentMessage = {
      ...currentChat,
      messages: [message],
    };
    saveMessageLocally(unsentMessage);
    console.error("Error sending message:", error);
  }
};

export const createNewChatAPI = async (newChat, callback) => {
  try {
    const chatsCollectionRef = collection(db, "chats");
    await addDoc(chatsCollectionRef, {
      ...newChat,
      messages: [{ ...newChat.messages[0], createdAt: new Date().getTime() }],
      updatedAt: new Date().getTime(),
    });

    console.log("Chat created successfully!");
  } catch (error) {
    callback(newChat.messages[0]);
    saveMessageLocally(newChat);
    console.error("Error creating chat:", error);
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

function saveMessageLocally(unsentMessage) {
  let unsentMessages = JSON.parse(localStorage.getItem("unsentMessages")) || [];

  const existingChatIndex = unsentMessages.findIndex(
    (chat) => chat.id === unsentMessage.id
  );

  if (existingChatIndex !== -1) {
    unsentMessages[existingChatIndex].messages.push(unsentMessage.messages[0]);
  } else {
    unsentMessages.push(unsentMessage);
  }

  localStorage.setItem("unsentMessages", JSON.stringify(unsentMessages));
}

const syncMessages = async () => {
  console.log("sync messages");
  let unsentMessages = JSON.parse(localStorage.getItem("unsentMessages")) || [];
  if (unsentMessages == []) return;
  unsentMessages.forEach((chat) => {
    if (chat.id) {
      chat.messages.forEach((message) => {
        sendMessageAPI(chat, message, () => {});
      });
    } else {
      createNewChatAPI(chat, () => {});
    }
  });

  localStorage.setItem("unsentMessages", JSON.stringify([]));
};
