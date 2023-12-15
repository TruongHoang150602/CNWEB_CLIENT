// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

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
