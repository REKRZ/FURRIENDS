/* eslint-disable no-unused-vars */
import './App.css';

import { auth } from './firebase.js';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './components/navbar/chat/ChatRoom';
import Profile from './components/profile/Profile';
// import SignIn from './components/authenticate/SignIn';
import SignUp from './components/authenticate/SignUp';
import Login from './components/authenticate/Login';
import Maps from './components/Maps/Maps';
import Home from './components/home/Home';

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <AuthProvider>
        {/* <div className="App">
          <header>
            <h1>⚛️🔥💬</h1>
            <SignOut />
          </header>

          <section>{user ? <ChatRoom /> : <SignIn />}</section>
        </div> */}
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
