// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'furriends-32ebf.firebaseapp.com',
  projectId: 'furriends-32ebf',
  storageBucket: 'furriends-32ebf.appspot.com',
  messagingSenderId: '1046704494940',
  appId: '1:1046704494940:web:39b2312f8b2a61d5620999',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
export const timestamp = serverTimestamp();

export default app;
