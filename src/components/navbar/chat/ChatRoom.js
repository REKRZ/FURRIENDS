import { useState, useRef, useEffect } from 'react';
import { auth, db, timestamp } from '../../../firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuth } from '../../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import { FaPaw } from 'react-icons/fa';

export default function ChatRoom() {
  const dummy = useRef();
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [friendDisplayName, setFriendDisplayName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [formValue, setFormValue] = useState('');
  const location = useLocation();

  const userMessagesRef = collection(
    db,
    'profiles',
    currentUser.uid,
    'messages'
  );
  const friendMessagesRef = collection(
    db,
    'profiles',
    location.state.from,
    'messages'
  );
  const q = query(userMessagesRef, orderBy('createdAt'), limit(25));
  const [messages] = useCollectionData(q, { idField: 'id' });

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, 'profiles', userId);
      const getUserInfo = async function () {
        getDoc(userRef).then((doc) => {
          setDisplayName(doc.data().displayName);
          setProfilePic(doc.data().photoURL);
        });
      };
      getUserInfo();

      const friend = location.state.from;
      const friendRef = doc(db, 'profiles', friend);
      const getFriendInfo = async function () {
        getDoc(friendRef).then((doc) => {
          setFriendDisplayName(doc.data().displayName);
        });
      };
      getFriendInfo();
    }
  }, [location.state.from]);

  const sendMessage = async (e) => {
    e.preventDefault();

    // adds message with user id to user's message collection
    await addDoc(userMessagesRef, {
      text: formValue,
      createdAt: timestamp,
      uid: currentUser.uid,
      photoURL: profilePic,
      displayName: displayName,
      friendID: location.state.from,
    });

    // adds same message with friends id to friend's collection
    await addDoc(friendMessagesRef, {
      text: formValue,
      createdAt: timestamp,
      uid: location.state.from,
      photoURL: profilePic,
      displayName: displayName,
      friendID: currentUser.uid,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <div className='h-screen'>
      <div className='flex justify-center items-center h-screen'>
        <div className='w-80 h-96 bg-gray-100 rounded shadow-2xl'>
          <nav className='w-full h-10 bg-gray-500 rounded-tr rounded-tl flex justify-center items-center'>
            <span className='text-md font-medium text-white'>
              {`Bark with ${friendDisplayName}!`}
            </span>
          </nav>
          <div className='overflow-auto px-1 py-1 h-full'>
            {messages &&
              messages
                .filter((msg) => msg.friendID === location.state.from)
                .map((msg) => (
                  <ChatMessage key={msg.id} message={msg} name={displayName} />
                ))}

            <span ref={dummy}></span>
          </div>
          <div className='flex'>
            <input
              value={formValue}
              className='input input-bordered w-full bg-slate-100'
              onChange={(e) => setFormValue(e.target.value)}
              placeholder='say something nice'
            />
            <button
              className='px-3 btn btn-square btn-outline bg-slate-100'
              type='submit'
              disabled={!formValue}
              onClick={sendMessage}
            >
              <FaPaw />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
