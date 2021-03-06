/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage, auth } from '../../firebase';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { TbArrowBigRightLines } from 'react-icons/tb';

export default function ProfileSetup() {
  // get newly created user's id
  const [user] = useAuthState(auth);
  const { uid } = user;

  // refs for form data submission into db
  const ownerNameRef = useRef();
  const displayNameRef = useRef();
  const petNameRef = useRef();
  const petBreedRef = useRef();
  const bioRef = useRef();
  const petSizeRef = useRef();

  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [picURL, setPicURL] = useState();
  const [latLng, setLatLng] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [error, setError] = useState('');
  const [uploadMsg, setUploadMsg] = useState('');
  const [bigFile, setBigFile] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setLatLng({ lat: latitude, lng: longitude });
    });
  }, []);

  //generates random number between .01 and .001 with 4 to 5 trailing numbers
  const precision = 10000000;
  const randomNum = Math.floor(Math.random() * (0.01 * precision - 0.001 * precision) + 0.001 * precision) / (1 * precision);

  // LOGIC UPLOAD PHOTO VVV
  // handles photo upload form
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    if (file.size > 5000000) {
      setBigFile(true);
      setUploadMsg('File is too large! 5MB maximum, paw-lease!');
    } else {
      setUploadMsg('Pupload Complete!');
      uploadFiles(file);
    }
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
    setSelectedFile(e.target.files[0]);
  };
  // ^^ LOGIC UPLOAD PHOTO

  // logic to update user profile (document) in profile collection with user submitted form data
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (ownerNameRef.current.value === '' || bioRef.current.value === '' || displayNameRef.current.value === '' || petNameRef.current.value === '' || petBreedRef.current.value === '') {
        setError('MUST CONTRUCT ADDITIONAL PYLONS. Jk... some fields on your forms require input.');
        throw new Error('MUST CONTRUCT ADDITIONAL PYLONS. Jk... some fields on your forms require input.');
      }

      const newUserDocRef = doc(db, 'profiles', uid);
      await setDoc(newUserDocRef, {
        bio: bioRef.current.value,
        displayName: displayNameRef.current.value,
        lat: latLng.lat || 40.7050758 + randomNum,
        lng: latLng.lng || -74.0113544 + randomNum,
        ownerName: ownerNameRef.current.value,
        petBreed: petBreedRef.current.value,
        petName: petNameRef.current.value,
        petSize: petSizeRef.current.value,
        photoURL: picURL || 'https://www.akc.org/wp-content/uploads/2017/11/Beagle-laying-down-in-the-shade-outdoors.jpg',
      });

      navigate('/home');
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='hero min-h-screen bg-[url(https://placeimg.com/1000/800/animals)]'>
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='h-screen flex flex-col items-center justify-center'>
          {/* Error display VVV */}
          {error && (
            <div className='alert alert-warning shadow-lg max-w-fit'>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current flex-shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                </svg>
                <span>Warning: {error}</span>
              </div>
            </div>
          )}
          {/* Error display ^^^ */}
          <h1 className='flex justify-center text-gray-300 text-xl mb-6'>
            <strong>Profile Setup</strong>
          </h1>
          <div className='w-full max-w-lg'>
            <form className='form-control'>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <label className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2' htmlFor='grid-owner-name'>
                    Owner Name
                  </label>
                  <input className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' id='grid-owner-name' type='text' placeholder='Bruce' ref={ownerNameRef} required />
                </div>
                <div className='w-full md:w-1/2 px-3'>
                  <label className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2' htmlFor='grid-display-name'>
                    Display Name
                  </label>
                  <input className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-display-name' type='text' placeholder='DarkKnight1' ref={displayNameRef} required />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <label className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2' htmlFor='grid-pet-name'>
                    Pet Name
                  </label>
                  <input className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-pet-name' type='text' placeholder='Ace' ref={petNameRef} required />
                </div>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <label className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2' htmlFor='grid-pet-breed'>
                    Pet Breed
                  </label>
                  <input className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-pet-breed' type='text' placeholder='Doberman' ref={petBreedRef} required />
                </div>
                <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                  <label className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2' htmlFor='grid-state'>
                    Pet Size
                  </label>
                  <div className='relative'>
                    <select className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-state' ref={petSizeRef}>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                    </select>
                    {/* Below is the pointer pic for drop down */}
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300'>
                      <svg className='fill-current h-4 w-4 text-gray-500' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                      </svg>
                    </div>
                    {/* above is the pointer pic for drop down */}
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full px-3'>
                  <label className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2' htmlFor='grid-bio'>
                    Bio
                  </label>
                  <input className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-bio' type='text' placeholder='Write a short biography for your pet!' ref={bioRef} required />
                  <p className='text-gray-400 text-xs italic'>Make it as long and as crazy as you'd like!</p>
                </div>
              </div>
            </form>
            {/* Form for pic upload */}
            <>
              <label className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-6' htmlFor='grid-bio'>
                Upload A Profile Picture
              </label>

              <form onSubmit={formHandler} className='mb-6'>
                {selectedFile && <img className='block object-scale-down h-60 w-full my-4' src={preview} alt='' />}
                <div className='flex justify-center'>
                  <div className='place-self-center'>
                    <label htmlFor='file-upload-profile-setup' className='btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-md'>
                      choose a photo
                    </label>
                    <input type='file' name='file-upload-profile-setup' id='file-upload-profile-setup' className='input opacity-0 w-1 h-1' onChange={onSelectFile} />
                  </div>
                  <div className='place-self-center pr-7'>
                    <TbArrowBigRightLines className='sm:text-xl md:text-2xl lg:text-3xl' />
                  </div>
                  <div className='place-self-center'>
                    <button className='btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-md' type='submit'>
                      Pupload
                    </button>
                  </div>
                </div>
              </form>
            </>
            <div className='divider'></div>
            {bigFile && <h3 className='flex justify-center my-3'>{uploadMsg}</h3>}
            {progress < 100 ? <h3 className='flex justify-center my-3'>{progress}%</h3> : <h3 className='flex justify-center my-3'>{uploadMsg}</h3>}
            {/* Form for pic upload */}
            <div className='flex items-center justify-center mb-6'>
              <button className='btn' onClick={handleSubmit}>
                Create Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
