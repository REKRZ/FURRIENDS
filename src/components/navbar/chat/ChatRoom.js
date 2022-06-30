import { useState, useRef } from 'react';
import { auth, db, timestamp } from '../../../firebase';
import { collection, addDoc, query, orderBy, limit } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';

export default function ChatRoom() {
  const dummy = useRef();
  const { uid, photoURL } = auth.currentUser;
  const messagesRef = collection(db, 'profiles', uid, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));

  const [messages] = useCollectionData(q, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    // const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: timestamp,
      uid,
      photoURL,
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
