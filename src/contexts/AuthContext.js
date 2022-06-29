/* eslint-disable */

import React, { useContext, useState, useEffect } from 'react';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase';
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
  // updateProfile,
} from 'firebase/auth';

const AuthContext = React.createContext();

// custom hook
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle = () => {
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

  // Storage
  // async function upload(file, currentUser, setLoading) {
  //   const fileRef = ref(storage, currentUser.uid + ".png");
  //   setLoading(true);
  //   const snapshot = await uploadBytes(fileRef, file);
  //   const photoURL = await getDownloadURL(fileRef);
  //   updateProfile(currentUser, { photoURL });
  //   setLoading(false);
  //   alert("Uploaded file!");
  // }

  // function updateUsername({ username }) {
  //   return updateProfile(currentUser, { username });
  // }

  // only want this is run when we mount our component. sets current user. unsubscribes us from "onAuthStateChanged" listener after we load the user (loading back to false) and unmount this component
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmailFn,
    updatePasswordFn,
    // upload,
    signInWithGoogle,
  };

  // only want to render children if loading is set to false
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
