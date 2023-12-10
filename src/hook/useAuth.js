import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "firebaseConfig/firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
export default function useAuth() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, `users/${user.uid}`);
      getDoc(userRef).then((snapshot) => {
        if (!snapshot.exists()) {
          setDoc(snapshot.ref, {
            name: user.displayName,
            avatar: user.photoURL,
            timestamp: serverTimestamp(),
          });
        }
      });
    }
  }, [user]);
}
