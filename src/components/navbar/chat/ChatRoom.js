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
import ChatMessage from './ChatMessage';

export default function ChatRoom(props) {
  const dummy = useRef();
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [formValue, setFormValue] = useState('');

  const messagesRef = collection(db, 'profiles', currentUser.uid, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messages] = useCollectionData(q, { idField: 'id' });

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, 'profiles', userId);
      const getInfo = async function () {
        getDoc(userRef).then((doc) => {
          setDisplayName(doc.data().displayName);
          setProfilePic(doc.data().photoURL);
        });
      };
      getInfo();
    }
  }, [currentUser]);

  const sendMessage = async (e) => {
    e.preventDefault();

    // const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: timestamp,
      uid: currentUser.uid,
      photoURL: profilePic,
      displayName: displayName,
      // friendId,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder='say something nice'
        />

        <button type='submit' disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}
