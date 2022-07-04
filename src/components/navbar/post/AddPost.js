/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { timestamp, db, storage } from '../../../firebase';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';

export default function AddPost() {
  const navigate = useNavigate();
  const captionRef = useRef();
  const [displayName, setDisplayName] = useState(0);
  const [progress, setProgress] = useState(0);
  const [picURL, setPicURL] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, 'profiles', userId);
      const getName = async function () {
        getDoc(userRef).then((doc) => {
          setDisplayName(doc.data().displayName);
        });
      };
      getName();
    }
  }, [currentUser]);

  // handles photo upload form
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  // uploads photo into storage
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'stage_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setPicURL(url));
      }
    );
  };

  // creates post using uploaded photo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postsRef = collection(db, 'profiles', currentUser.uid, 'posts');
      await addDoc(postsRef, {
        caption: captionRef.current.value,
        createdAt: timestamp,
        displayName: displayName,
        likes: 0,
        uid: currentUser.uid,
        uploadedPhoto: picURL,
      });
      navigate('/home');
    } catch {
      console.log('Error!');
    }
  };

  return (
    <>
      {/* <!-- The button to open modal --> */}
      <label htmlFor='my-modal-3' className='btn btn-ghost normal'>
        Create Post
      </label>
      {/*
<!-- Put this part before </body> tag --> */}
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          <label htmlFor='my-modal-3' className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </label>
          <h3 className='text-lg font-bold'>Create a post!</h3>
          <div>
            <form onSubmit={formHandler}>
              <input type='file' className='input' />
              <button type='submit'>Upload</button>
            </form>
            <hr />
            {progress < 100 ? <h3>Uploaded {progress}%</h3> : <h3>Upload Complete!</h3>}
          </div>
          <form onSubmit={handleSubmit}>
            <p className='py-4'>insert caption here</p>
            <input type='text' placeholder='pupdate your friends!' className='input input-bordered input-info w-full max-w-xs' ref={captionRef} />
            <button type='submit' className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
              <label htmlFor='my-modal-3'>Share</label>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
