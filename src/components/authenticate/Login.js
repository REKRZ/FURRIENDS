/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const users = [];
  const getUsers = async () => {
    const usersRef = collection(db, 'profiles');
    const qUsers = query(usersRef);
    const usersSnapshot = await getDocs(qUsers);
    usersSnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
  };
  getUsers();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      // below line sends you to home page
      navigate('/home');
    } catch {
      setError('Failed to sign in.');
    }
    setLoading(false);
  }

  async function handleGoogleSignIn(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle(users);
    } catch {
      setError('Failed to sign in.');
    }
    setLoading(false);
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      {/* THIS IS ERROR MESSAGE THAT WILL DISPLAY IF BAD LOGIN */}
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
      {/* THIS IS THE FORM ELEMENT */}
      <div className='hero min-h-screen bg-[url(https://placeimg.com/1000/800/animals)]'>
        <div className='hero-overlay bg-opacity-60'></div>
        <div className='hero-content text-center text-neutral-content'>
          <div className='form-control mt-5'>
            <h1 className='flex justify-center text-gray-300 text-xl mb-6'>
              <strong>Login</strong>
            </h1>
            <label className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'>Email</label>
            <input type='email' placeholder='email...' id='email' name='email' ref={emailRef} className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white' required></input>
            <label className='block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2'>Password</label>
            <input type='password' placeholder='password...' id='password' name='password' ref={passwordRef} className='appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white' required></input>

            <button disabled={loading} className='btn mb-5' onClick={handleSubmit}>
              Sign in
            </button>
            <button disabled={loading} className='btn mb-5 ' onClick={handleGoogleSignIn}>
              Sign in with Google
            </button>
            <div className='flex justify-center text-sm'>
              <div className='block tracking-wide text-gray-300 text-xs font-bold mb-2'>Need an account?</div>
              <div className='block tracking-wide text-gray-300 text-xs font-bold mb-2 underline mx-2'>
                <Link to='/signup'>Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
