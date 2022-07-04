import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import AddPost from './post/AddPost';
import Maps from '../Maps/Maps';

export const Navbar = () => {
  const { logout, currentUser } = useAuth();
  const [displayName, setDisplayName] = useState('Guest');
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, 'profiles', userId);
      const getProfile = async function () {
        getDoc(userRef).then((doc) => {
          setDisplayName(doc.data().displayName);
          setProfilePic(doc.data().photoURL);
        });
      };
      getProfile();
    }
  }, [currentUser]);

  const handleLogout = useCallback(() => {
    logout();
    setDisplayName('Guest');
    navigate('/');
  }, []);

  return (
    <div className='navbar bg-base-300 '>
      <div className='flex-1 '>
        <Link className='btn btn-ghost mr-10 normal-case text-xl' to='/home' href='#'>
          <img src='/images/logo.svg' alt='logo' className='object-scale-down h-12' />
        </Link>
        <div className='text-lg'>{`Welcome ${displayName}!`}</div>
      </div>
      <div className='flex-none '>
        <ul className='menu menu-horizontal p-0 '>
          <li>
            <AddPost />
          </li>
          <li tabIndex='0' className='mx-2'>
            <Link to='/home' href='#' className='btn btn-ghost'>
              Chat
              {/* <svg className='fill-current' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
                <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
              </svg> */}
            </Link>
            <ul className='p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-45 z-40'>
              <li>
                <Link to='/chatroom' href='#' className=''>
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
            <Link to='/map' href='#' className='btn btn-ghost'>
              Maps
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex-none gap-2 mx-2'>
        <div className='form-control'>{/* <input type='text' placeholder='Search' className='input input-bordered' /> */}</div>
        <div className='dropdown dropdown-end'>
          <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img src={profilePic} alt='Profile Picture' />
            </div>
          </label>
          <ul tabIndex='0' className='p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52'>
            <li>
              <Link className='justify-between' to='/profile' href='#'>
                Profile
                <span className='badge'>New</span>
              </Link>
            </li>
            <li>
              <Link to='/home' href='#'>
                Settings
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
