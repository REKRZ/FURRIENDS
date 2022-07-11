/* eslint-disable */

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, storage, db } from '../firebase';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
} from 'firebase/auth';

const AuthContext = React.createContext();
// custom hook
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle = (props) => {
    let userId;
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      userId = result.user.uid;
      const arrOfIds = props.map((user) => user.id);
      if (arrOfIds.includes(userId)) {
        // navigate here
        navigate('/home');
        window.location.reload(false);
      } else {
        navigate('/profilesetup');
        // mavigate here
      }
    });
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmailFn(email) {
    return updateEmail(currentUser, email);
  }

  function updatePasswordFn(password) {
    return updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  // ask Zach re: unsubscribing?

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmailFn,
    updatePasswordFn,
    signInWithGoogle,
    signUpWithGoogle,
  };

  // only want to render children if loading is set to false
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
