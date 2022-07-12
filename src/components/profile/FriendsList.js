import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const FriendsList = ({ uid }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let friendsList = [];
    const getFriendsData = async () => {
      const querySnapshot = await getDocs(collection(db, 'profiles', uid, 'friends'));
      querySnapshot.forEach((friendDoc) => {
        friendsList.push({ ...friendDoc.data(), id: friendDoc.id });
      });
    };
    getFriendsData();
    setFriends(friendsList);
  }, []);

  return (
    <div className='w-auto'>
      <div className='card w-60 h-full bg-base-600 shadow-xl items-center pb-10'>
        <div className='text-center content-center font-semibold'>Friends List</div>
        <div className='divider'></div>
        <div className='bg-base-400 ml-2'>
          {friends.map((friend, i) => {
            return (
              <Link key={i} to='/friendprofile' className='ml-2 text-sm' state={{ from: friend.id }}>
                <div className='flex items-center space-x-3'>
                  <div className='avatar'>
                    <div className='mask mask-squircle w-12 h-12'>
                      <img src={friend.photoURL} alt='Avatar Tailwind CSS Component' />
                    </div>
                  </div>
                  <div>{friend.displayName}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
