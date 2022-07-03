/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { timestamp, db, storage } from '../../../firebase';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';

export default function AddPost() {
  const [progress, setProgress] = useState(0);
  const [picURL, setPicURL] = useState('');
  const [caption, setCaption] = useState('');
  // grab displayName using uid

  const testId = 'einAZyfrMPSjySXmwUyGOUGSk5n1';

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'stage_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setPicURL(url));
        console.log(picURL);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postsRef = collection(db, 'profiles', testId, 'posts');
      await addDoc(postsRef, {
        caption: caption,
        createdAt: timestamp,
        displayName: '',
        likes: 0,
        uid: testId,
        uploadedPhoto: picURL,
      });
    } catch {
      console.log('Error!');
    }
  };

  return (
    <>
      {/* <!-- The button to open modal --> */}
      <label for='my-modal-3' class='btn modal-button'>
        Create Post
      </label>
      {/*
<!-- Put this part before </body> tag --> */}
      <input type='checkbox' id='my-modal-3' class='modal-toggle' />
      <div class='modal'>
        <div class='modal-box relative'>
          <label
            for='my-modal-3'
            class='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <h3 class='text-lg font-bold'>Create a post!</h3>
          <div>
            <form onSubmit={formHandler}>
              <input type='file' className='input' />
              <button type='submit'>Upload</button>
            </form>
            <hr />

            <h3>Uploaded {progress}%</h3>
          </div>
          <p class='py-4'>insert text here</p>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='caption'
              class='input input-bordered input-info w-full max-w-xs'
            />
            <button
              type='submit'
              className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'
            >
              Share
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
