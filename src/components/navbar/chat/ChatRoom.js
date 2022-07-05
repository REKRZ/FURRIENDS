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

export default function ChatRoom() {
  const dummy = useRef();
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState('');
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
    <div className='h-screen bg-gray-300'>
      <div className='flex justify-center items-center h-screen'>
        <div className='w-80 h-96 bg-white rounded shadow-2xl'>
          <div className='overflow-auto px-1 py-1 h-full'>
            {/* <img src="https://i.imgur.com/IAgGUYF.jpg" className="rounded-full shadow-xl" width="15" height="15" style="box-shadow: "> */}
            {messages &&
              messages
                .filter((msg) => msg.friendID === location.state.from)
                .map((msg) => (
                  <ChatMessage key={msg.id} message={msg} name={displayName} />
                ))}

            <span ref={dummy}></span>

            {/*
            <div className='flex items-center pr-10'>
              <span className='flex ml-1  h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end'>
                Hi Dr.Hendrikson, I haven't been feeling well for past few days.{' '}
                <span className='text-gray-400 pl-1 text-xs'>01:25am</span>
              </span>
            </div>

            <div className='flex justify-end pt-2 pl-10'>
              <span className='bg-green-900 h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end '>
                Lets jump on a video call.{' '}
                <span className='text-gray-400 pl-1 text-xs'>02.30am</span>
              </span>
            </div>

            <div className='flex items-center pr-10 mt-1'>
              <span className='flex ml-1  h-auto bg-gray-900 text-gray-200 text-xs p-1 font-normal rounded-sm px-1 items-end'>
                How often should i take the medicine?{' '}
                <span className='text-gray-400 pl-1 text-xs'>01:25am</span>
              </span>
            </div>

            <div className='flex justify-end pt-2 pl-10'>
              <span className='bg-green-900 h-auto text-gray-200 text-xs font-normal p-1 rounded-sm px-1 items-end flex justify-end '>
                Twice a day, at breakfast and before bed{' '}
                <span className='text-gray-400 pl-1 text-xs'>02.30am</span>
              </span>
            </div>

            <div className='flex items-center pr-10 pt-2'>
              <span className='flex ml-1  h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end'>
                Thanks a lot doc
                <span className='text-gray-400 pl-1 text-xs'>01:25am</span>
              </span>
            </div>

            <div className='flex justify-end pt-2 pl-10'>
              <span className='bg-green-900 h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end '>
                Thats my duty, mention not{' '}
                <span className='text-gray-400 pl-1 text-xs'>02.30am</span>
              </span>
            </div>

            <div className='flex items-center pr-10 pt-2'>
              <span className='flex ml-1  h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end'>
                sorry to bother again but can i ask you one more favour?
                <span className='text-gray-400 pl-1 text-xs'>01:25am</span>
              </span>
            </div>

            <div className='flex justify-end pt-2 pl-10'>
              <span className='bg-green-900 h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end '>
                yeah sure, go ahead?
                <span className='text-gray-400 pl-1 text-xs'>02.30am</span>
              </span>
            </div>

            <div className='flex items-center pr-10 pt-2'>
              <span className='flex ml-1  h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end'>
                I really had a scary feeling about this, can please advice some
                tricks to overcome my anxiety?
                <span className='text-gray-400 pl-1 text-xs'>01:25am</span>
              </span>
            </div> */}

            {/* <main className='flex-col'>
          {messages &&
            messages
              .filter((msg) => msg.friendID === location.state.from)
              .map((msg) => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>
        </main>
        <div className='flex border-2'>
          <input
            className='input input-bordered w-full'
            onChange={(e) => setFormValue(e.target.value)}
            placeholder='say something nice'
          />

          <button
            className='px-3'
            type='submit'
            // disabled={!formValue}
            onClick={sendMessage}
          >
            🕊️
          </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// (
//   <div className='bg-base-200 flex flex-col items-center'>
//     <div className='w-1/3 border-2 h-full flex-col'>
//       <main className='flex-col'>
//         {messages &&
//           messages
//             .filter((msg) => msg.friendID === location.state.from)
//             .map((msg) => <ChatMessage key={msg.id} message={msg} />)}

//         <span ref={dummy}></span>
//       </main>
//       <div className='flex border-2'>
//         <input
//           className='input input-bordered w-full'
//           onChange={(e) => setFormValue(e.target.value)}
//           placeholder='say something nice'
//         />

//         <button
//           className='px-3'
//           type='submit'
//           // disabled={!formValue}
//           onClick={sendMessage}
//         >
//           🕊️
//         </button>
//       </div>
//     </div>
//   </div>
// );
