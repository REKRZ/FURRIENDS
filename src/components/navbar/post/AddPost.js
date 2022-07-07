/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { timestamp, db, storage } from '../../../firebase';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { TbArrowBigRightLines } from 'react-icons/tb';

export default function AddPost() {
  const navigate = useNavigate();
  const captionRef = useRef();
  const [displayName, setDisplayName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [progress, setProgress] = useState(0);
  const [picURL, setPicURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, 'profiles', userId);
      const getName = async function () {
        getDoc(userRef).then((doc) => {
          setDisplayName(doc.data().displayName);
          setProfilePic(doc.data().photoURL);
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
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setPicURL(url));
      }
    );
  };

  // preview handler
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  // creates post using uploaded photo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const postsRef = collection(db, 'profiles', currentUser.uid, 'posts');
      await addDoc(postsRef, {
        caption: captionRef.current.value,
        createdAt: timestamp,
        displayName: displayName,
        likes: [],
        uid: currentUser.uid,
        profilePic: profilePic,
        uploadedPhoto: picURL,
      });
      setLoading(false);
      // navigate('/home');
      window.location.reload(false);
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
        <div className='modal-box relative grid grid-rows-1 place-items-center'>
          <label
            htmlFor='my-modal-3'
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <h3 className='text-3xl font-bold mb-7'>CREATE A POST</h3>
          <div className=''>
            <form onSubmit={formHandler}>
              {selectedFile && (
                <img
                  className='block object-scale-down h-60 w-full my-4 border-4'
                  src={preview}
                  alt=''
                />
              )}
              <div className='flex justify-center'>
                <div className='place-self-center'>
                  <label
                    htmlFor='file'
                    className='btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-md'
                  >
                    choose a photo
                  </label>
                  <input
                    type='file'
                    name='file'
                    id='file'
                    className='input opacity-0 w-1 h-1'
                    onChange={onSelectFile}
                  />
                </div>
                <div className='place-self-center pr-7'>
                  <TbArrowBigRightLines className='sm:text-xl md:text-2xl lg:text-3xl' />
                </div>
                <div className='place-self-center'>
                  <button
                    className='btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-md'
                    type='submit'
                  >
                    Pupload
                  </button>
                </div>
              </div>
            </form>
            <div className='divider'></div>
            {progress < 100 ? (
              <h3 className='flex justify-center my-3'>{progress}%</h3>
            ) : (
              <h3 className='flex justify-center my-3'>Pupload Complete!</h3>
            )}
          </div>
          <form className='' onSubmit={handleSubmit}>
            <div className='flex place-items-center'>
              <textarea
                type='text'
                placeholder='add a caption'
                className='textarea textarea-bordered w-full max-w-xs'
                ref={captionRef}
              />
              <button
                disabled={loading}
                type='submit'
                className='ml-4 btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-md'
              >
                <label htmlFor='my-modal-3'>Share</label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
