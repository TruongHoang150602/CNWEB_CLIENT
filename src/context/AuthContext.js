import { createContext, useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "firebaseConfig/firebase";
import { getFullUserInfoIdAPI, getUserByIdAPI } from "pages/api/user";

var ActionType;
(function (ActionType) {
  ActionType["AUTH_STATE_CHANGED"] = "AUTH_STATE_CHANGED";
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "AUTH_STATE_CHANGED") {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

export const AuthContext = createContext({
  ...initialState,
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAuthStateChanged = useCallback(
    async (user) => {
      if (user) {
        console.log(user);
        const detailUser = await getFullUserInfoIdAPI(user.uid);

        dispatch({
          type: ActionType.AUTH_STATE_CHANGED,
          payload: {
            isAuthenticated: true,
            user: {
              ...user,
              ...detailUser,
            },
          },
        });
      } else {
        dispatch({
          type: ActionType.AUTH_STATE_CHANGED,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    },
    [dispatch]
  );

  useEffect(() => onAuthStateChanged(auth, handleAuthStateChanged), []);

  const _signInWithEmailAndPassword = useCallback(async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
  }, []);

  const _createUserWithEmailAndPassword = useCallback(
    async (email, password) => {
      await createUserWithEmailAndPassword(auth, email, password);
    },
    []
  );

  const _signOut = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        createUserWithEmailAndPassword: _createUserWithEmailAndPassword,
        signInWithEmailAndPassword: _signInWithEmailAndPassword,
        signInWithGoogle,
        signOut: _signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
