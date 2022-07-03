import React from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  return (
    <div className='hero min-h-screen'>
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>Welcome to Furriends!</h1>
          <p className='mb-5'>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button
            className='btn btn-primary'
            onClick={() => (user ? navigate('/home') : navigate('/login'))}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
