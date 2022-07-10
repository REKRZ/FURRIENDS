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
        // console.log(friendDoc.id, '=>', friendDoc.data());
        friendsList.push({ ...friendDoc.data(), id: friendDoc.id });
      });
    };
    getFriendsData();
    setFriends(friendsList);
  }, []);

  console.log(friends);
  return (
    <div className='w-auto'>
      <div className='text-center content-center'>Friends List</div>
      <div className='bg-base-400 shadow-xl ml-2'>
        {friends.map((friend, i) => {
          return (
            <Link key={i} to='/friendprofile' className='ml-2 text-sm' state={{ from: friend.id }}>
              <div className='flex items-center space-x-3 border-2'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src={friend.photoURL} alt='Avatar Tailwind CSS Component' />
                  </div>
                </div>
                <div>{friend.displayName}</div>
              </div>

              {/* <div className='divider'></div> */}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsList;
