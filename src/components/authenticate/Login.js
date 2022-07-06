import React, { useState, useRef, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SignOut from './SignOut';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    // emailRef.current.value = "";
    // passwordRef.current.value = "";
  }

  // const handleGoogleSignIn = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     setError('');
  //     setLoading(true);
  //     if (loading) {
  //       await signInWithGoogle()
  //         .then(() => setLoading(false))
  //         .catch(() => setError('Failed to sign in'));
  //     } else navigate('/home');
  //     setLoading(false);
  //   },
  //   [loading]
  // );

  // async function handleGoogleSignIn(e) {
  //   e.preventDefault();
  //   try {
  //     setError('');
  //     setLoading(true);
  //     await signInWithGoogle();
  //     navigate('/home');
  //   } catch {
  //     setError('Failed to sign in.');
  //   }
  //   setLoading(false);
  // }

  async function handleGoogleSignIn(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      // below line sends you to home page
      navigate('/home');
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
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
            <span>Warning: {error}</span>
          </div>
        </div>
      )}
      {/* THIS IS THE FORM ELEMENT */}
      <div className='form-control mt-5'>
        <h1 className='flex justify-center text-xl mb-3'>
          <strong>Login</strong>
        </h1>
        <label>Email</label>
        <input type='email' placeholder='email...' id='email' name='email' ref={emailRef} className='mb-3' required></input>
        <label>Password</label>
        <input type='password' placeholder='password...' id='password' name='password' ref={passwordRef} className='mb-3' required></input>

        <button disabled={loading} className='btn mb-5' onClick={handleSubmit}>
          Sign in
        </button>
        <button disabled={loading} className='btn mb-5 ' onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
        <div className='flex justify-center text-sm'>
          <div>Need an account?</div>
          <div className='underline mx-2'>
            <Link to='/signup'>Sign Up</Link>
          </div>
        </div>
        {/* LEAVING THIS IN FOR NOW FOR DEVELOPMENT */}
        <div>
          <SignOut />
        </div>
      </div>
    </div>
  );
}
