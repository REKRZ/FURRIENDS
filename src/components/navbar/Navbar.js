import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const Navbar = () => {
  const { logout, currentUser } = useAuth();
  const [displayName, setDisplayName] = useState('Guest');

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, 'profiles', userId);
      const getProfile = async function () {
        getDoc(userRef).then((doc) => {
          console.log(doc.data(), doc.id);
          setDisplayName(doc.data().displayName);
        });
      };
      getProfile();
    }
  }, [currentUser]);

  return (
    <div className='navbar bg-base-300'>
      <div className='flex-1'>
        <Link className='btn btn-ghost normal-case text-xl' to='/' href='#'>
          Furriends
        </Link>
        <div>{`Welcome ${displayName}!`}</div>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal p-0'>
          <li>
            <Link to='/' href='#'>
              Home
            </Link>
          </li>
          <li tabIndex='0' className='mx-2'>
            <Link to='/' href='#'>
              Chat
              <svg className='fill-current' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
                <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
              </svg>
            </Link>
            <ul className='p-2 bg-base-100'>
              <li>
                <Link to='/chatroom' href='#'>
                  Group Chat
                </Link>
              </li>
              <li>
                <Link to='/' href='#'>
                  Future individual chat
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to='/map' href='#'>
              Map
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex-none gap-2 mx-2'>
        <div className='form-control'>
          <input type='text' placeholder='Search' className='input input-bordered' />
        </div>
        <div className='dropdown dropdown-end'>
          <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img src='https://placeimg.com/80/80/people' alt='https://placeimg.com/80/80/people' />
            </div>
          </label>
          <ul tabIndex='0' className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52'>
            <li>
              <Link className='justify-between' to='/' href='#'>
                Profile
                <span className='badge'>New</span>
              </Link>
            </li>
            <li>
              <Link to='/' href='#'>
                Settings
              </Link>
            </li>
            <li>
              <button className='badge' onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
