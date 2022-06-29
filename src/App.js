import './App.css';

import { auth } from './firebase.js';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './components/navbar/chat/ChatRoom';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className='App'>
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <button className='sign-in' onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className='sign-out' onClick={() => signOut(auth)}>
        Sign Out
      </button>
    )
  );
}

export default App;
