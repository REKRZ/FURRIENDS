import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

export default function FriendRow(props) {
  const { profile, friendsIDsList, uid } = props;
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (friendsIDsList.includes(profile.uid)) {
      setFollowed(true);
    }
  }, [followed]);

  // Logic attached to Add button in modal furriends table to add a specific user
  async function handleAddFurriend(userId, e) {
    e.preventDefault();
    try {
      const furriendToAddRef = doc(db, 'profiles', userId);
      const furriendSnap = await getDoc(furriendToAddRef);

      await setDoc(doc(db, 'profiles', uid, 'friends', userId), {
        ...furriendSnap.data(),
        friendDisplayName: furriendSnap.data().displayName,
      });

      e.target.className = 'btn btn-success';
      setFollowed(true);
    } catch (error) {
      console.log(error);
    }
  }

  // Logic attached to Add button in modal furriends table to add a specific user
  async function handleDeleteFurriend(userId, e) {
    try {
      const furriendToDeleteRef = await deleteDoc(
        doc(db, 'profiles', uid, 'friends', userId)
      );

      e.target.className = 'btn btn-warning';
      setFollowed(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <td key={profile.uid}>
        <div className='flex items-center space-x-3'>
          <div className='avatar'>
            <div className='mask mask-squircle w-12 h-12'>
              <img
                src={profile.photoURL}
                alt='https://www.akc.org/wp-content/uploads/2017/11/Beagle-laying-down-in-the-shade-outdoors.jpg'
              />
            </div>
          </div>
          <div>
            <div className='font-bold'>{profile.displayName}</div>
            <div className='text-sm opacity-50'>{profile.ownerName}</div>
          </div>
        </div>
      </td>
      <td>
        {profile.petName}
        <br />
        <span className='badge badge-ghost badge-sm'>{profile.petBreed}</span>
      </td>
      <td className='max-w-sm'>
        <div className='max-w-sm truncate'>{profile.bio}</div>
      </td>
      <th>
        <button
          className={
            followed
              ? 'btn btn-warning btn-outline'
              : 'btn btn-success btn-outline'
          }
          onClick={
            followed
              ? (e) => handleDeleteFurriend(profile.uid, e)
              : (e) => handleAddFurriend(profile.uid, e)
          }
        >
          {followed ? 'Unfollow 💩💩💩' : 'Follow'}
        </button>
      </th>
    </>
  );
}
