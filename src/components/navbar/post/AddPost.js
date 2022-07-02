/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { timestamp, db, storage } from '../../../firebase';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';

export default function AddPost() {
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState('');
  // grab displayName using uid

  const testId = '';

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
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const postsRef = collection(db, 'profiles', testId, 'posts')
  //     await addDoc(postsRef, {
  //       caption: caption,
  //       createdAt: timestamp,
  //       displayName: '',
  //       likes: 0,
  //       uid: testId,
  //       uploadedPhoto:
  //     })
  //   } catch {
  //     console.log('Error!');
  //   }
  // };

  return (
    <div>
      <form onSubmit={formHandler}>
        <input type='file' className='input' />
        <button type='submit'>Upload</button>
      </form>
      <hr />

      <h3>Uploaded {progress}%</h3>
    </div>
  );
}
