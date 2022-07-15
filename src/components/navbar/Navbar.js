/* eslint-disable */

import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import AddPost from './post/AddPost';
import FollowFurriend from './follow/FollowFurriend';
import { themeChange } from 'theme-change';

export const Navbar = () => {
  const { logout, currentUser } = useAuth();
  const [displayName, setDisplayName] = useState('Guest');
  const [userInfo, setUserInfo] = useState({});
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  themeChange(false);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(db, 'profiles', userId);
      if (userRef) {
        const getProfile = async function () {
          getDoc(userRef).then((doc) => {
            setUserInfo({ ...doc.data(), id: userId });
          });
        };
        getProfile();

        const list = [];
        const friendsRef = collection(db, 'profiles', userId, 'friends');
        const qFriends = query(friendsRef);
        // get list of friend IDs and set friends state
        const getFriends = async () => {
          const friendsListSnapshot = await getDocs(qFriends);
          if (friendsListSnapshot) {
            friendsListSnapshot.forEach((doc) => {
              list.push({ ...doc.data(), id: doc.id });
            });
            setFriends(list);
          }
        };
        getFriends();
      }
    }
  }, []);

  // switch themes
  const themeValues = ['Default', 'Cupcake', 'Retro', 'Aqua', 'Cyberpunk', 'Valentine'];

  const handleLogout = useCallback(() => {
    logout();
    setDisplayName('Guest');
    navigate('/');
  }, []);

  console.dir(currentUser);

  return (
    <div className='navbar bg-base-300'>
      <div className='flex-1 '>
        <Link className='btn btn-ghost mr-10 normal-case text-xl' to={currentUser ? '/home' : '/'} href='#'>
          <img src='/images/logo.svg' alt='logo' className='object-scale-down h-12' />
        </Link>
        <div className='text-lg'>{`Welcome ${currentUser ? (userInfo.displayName ? userInfo.displayName : displayName) : displayName}!`}</div>
      </div>
      <div className='flex-none '>
        {currentUser ? (
          <ul className='menu menu-horizontal p-0 '>
            <li>
              <AddPost />
            </li>
            <li className='ml-2'>
              <FollowFurriend />
            </li>
            <li tabIndex='0' className='mx-2'>
              <label className='btn btn-ghost'>
                Chat
                <svg className='fill-current' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
                  <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
                </svg>
              </label>
              <ul className='p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-45 z-40'>
                {friends.length ? (
                  friends.map((friend) => (
                    <li key={friend.id}>
                      <Link to='/chatroom' state={{ from: friend.id }}>
                        {friend.friendDisplayName}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>Find Friends!</li>
                )}
              </ul>
            </li>
            <li>
              <Link
                to='/map'
                state={{
                  user: userInfo,
                  friends: friends,
                }}
                href='#'
                className='btn btn-ghost'
              >
                Map
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
      <div className='flex-none gap-2 mx-2'>
        <div className='dropdown dropdown-end'>
          <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img src={currentUser ? (userInfo.photoURL ? userInfo.photoURL : '/images/dogLogo.svg') : '/images/dogLogo.svg'} alt='Profile-Pic' />
            </div>
          </label>
          <ul tabIndex='0' className='p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52'>
            {currentUser ? (
              <div>
                <li className='pl-1'>
                  <Link className='justify-between' to='/profile' href='#'>
                    Profile
                  </Link>
                </li>
                <li className='pl-1'>
                  <button onClick={handleLogout}>Logout</button>
                </li>
                <li tabIndex='0' className=''>
                  <select className='text-primary' data-choose-theme>
                    <option className='text-secondary' value='' hidden>
                      Theme
                    </option>
                    {themeValues.map((value) => (
                      <option className='text-secondary' key={value.toLowerCase()} value={value.toLowerCase()}>
                        {value}
                      </option>
                    ))}
                  </select>
                </li>
              </div>
            ) : (
              <li>
                <Link className='' to='/login'>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
