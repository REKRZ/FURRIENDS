/* eslint-disable no-unused-vars */
import './App.css';

import { auth } from './firebase.js';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './components/authenticate/SignIn';
import ChatRoom from './components/navbar/chat/ChatRoom';
import SignOut from './components/authenticate/SignOut';

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <AuthProvider>
        <div className='App'>
          <header>
            <h1>⚛️🔥💬</h1>
            <SignOut />
          </header>

          <section>{user ? <ChatRoom /> : <SignIn />}</section>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
