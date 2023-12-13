// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const now = new Date();
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNKrQ3a9xlUGySjPiGk7PG0ddDJb73qjo",
  authDomain: "intern-42a13.firebaseapp.com",
  projectId: "intern-42a13",
  storageBucket: "intern-42a13.appspot.com",
  messagingSenderId: "784900005287",
  appId: "1:784900005287:web:7b8a9294d121a49884ea82",
  measurementId: "G-3SDYNFJ2W3",
};

// Initialize Firebase
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

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
