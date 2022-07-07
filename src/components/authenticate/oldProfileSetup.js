/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { TbArrowBigRightLines } from 'react-icons/tb';

export default function ProfileSetup() {
  // get newly created user's id
  const { currentUser } = useAuth(); 
  const { uid } = currentUser;

  // refs for form data submission into db
  const ownerNameRef = useRef();
  const displayNameRef = useRef();
  const petNameRef = useRef();
  const petBreedRef = useRef();
  const bioRef = useRef();
  const petSizeRef = useRef();
  const photoURLRef = useRef();

  const navigate = useNavigate();

  // logic to create user profile (document) in profile collection
  useEffect(() => {
    async function createUserProf() {
      await setDoc(doc(db, 'profiles', uid), {
        bio: '',
        displayName: '',
        ownerName: '',
        petBreed: '',
        petName: '',
        petSize: 'S',
        photoURL:
          'https://www.akc.org/wp-content/uploads/2017/11/Beagle-laying-down-in-the-shade-outdoors.jpg',
      });
    }

    createUserProf();
    // eslint-disable-next-line
  }, []);

  // TEST UPLOAD PHOTO VVV

  

  // ^^ TEST UPLOAD PHOTO

  // logic to update user profile (document) in profile collection with user submitted form data
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newUserDocRef = doc(db, 'profiles', uid);
      await updateDoc(newUserDocRef, {
        bio: bioRef.current.value,
        displayName: displayNameRef.current.value,
        ownerName: ownerNameRef.current.value,
        petBreed: petBreedRef.current.value,
        petName: petNameRef.current.value,
        petSize: petSizeRef.current.value,
        photoURL: photoURLRef.current.value,
      });

      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='hero min-h-screen bg-[url(https://placeimg.com/1000/800/animals)]'>
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='h-screen flex flex-col items-center justify-center'>
          <h1 className='flex justify-center text-gray-300 text-xl mb-6'>
            <strong>Profile Setup</strong>
          </h1>
          <div className='w-full max-w-lg'>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'
                  htmlFor='grid-owner-name'
                >
                  Owner Name
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                  id='grid-owner-name'
                  type='text'
                  placeholder='Bruce'
                  ref={ownerNameRef}
                />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'
                  htmlFor='grid-display-name'
                >
                  Display Name
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-display-name'
                  type='text'
                  placeholder='DarkKnight1'
                  ref={displayNameRef}
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'
                  htmlFor='grid-pet-name'
                >
                  Pet Name
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-pet-name'
                  type='text'
                  placeholder='Ace'
                  ref={petNameRef}
                />
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'
                  htmlFor='grid-pet-breed'
                >
                  Pet Breed
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-pet-breed'
                  type='text'
                  placeholder='Doberman'
                  ref={petBreedRef}
                />
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'
                  htmlFor='grid-state'
                >
                  Pet Size
                </label>
                <div className='relative'>
                  <select
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-state'
                    ref={petSizeRef}
                  >
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                  </select>
                  {/* Below is the pointer pic for drop down */}
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300'>
                    <svg
                      className='fill-current h-4 w-4 text-gray-500'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                  {/* above is the pointer pic for drop down */}
                </div>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'
                  htmlFor='grid-bio'
                >
                  Bio
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-bio'
                  type='text'
                  placeholder='Write a short biography for your pet!'
                  ref={bioRef}
                />
                <p className='text-gray-400 text-xs italic'>
                  Make it as long and as crazy as you'd like
                </p>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'
                  htmlFor='grid-photo-url'
                >
                  Photo URL
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-photo-url'
                  type='text'
                  placeholder='Provide a link to a photo of your pet here!'
                  ref={photoURLRef}
                />
                <p className='text-gray-400 text-xs italic'>.jpg or .png</p>
              </div>
            </div>

            {/* TEST */}
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'
                  htmlFor='grid-photo-upload'
                >
                  Upload Photo
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-photo-upload'
                  type='file'
                  // onChange={onSelectFile}
                  // ref={}
                />
                <p className='text-gray-400 text-xs italic'>.jpg or .png</p>
              </div>
            </div>
            {/* TEST */}

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