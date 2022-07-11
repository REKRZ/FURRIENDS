/* eslint-disable no-unused-vars */
// import './App.css';

import { auth } from './firebase.js';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './components/navbar/chat/ChatRoom';
import Profile from './components/profile/Profile';
import FriendProfile from './components/profile/FriendProfile';
import SignUp from './components/authenticate/SignUp';
import ProfileSetup from './components/authenticate/ProfileSetup.js';
import Login from './components/authenticate/Login';
import NotFound from './components/home/NotFound.js';
import Maps from './components/Maps/Maps';
import Home from './components/home/Home';
import { Navbar } from './components/navbar/Navbar.js';
import { LandingPage } from './components/home/LandingPage.js';

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            {user ? (
              <>
                <Route path='/home' element={<Home />} />
                <Route path='/profilesetup' element={<ProfileSetup />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/friendprofile' element={<FriendProfile />} />
                <Route path='/map' element={<Maps />} />
                <Route path='/chatroom' element={<ChatRoom />} />
              </>
            ) : (
              <>
                <Route path='/home' element={<Login />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
              </>
            )}
            <Route path='/' element={<LandingPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
