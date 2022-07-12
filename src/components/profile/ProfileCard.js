import React from 'react';
import EditProfile from './EditProfile';

const ProfileCard = ({ userInfo, uid }) => {
  const { photoURL, displayName, bio } = userInfo;

  return (
    <div className='card w-60 h-96 bg-base-100 items-center'>
      <div className='avatar pt-10'>
        <div className='w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
          <img src={photoURL} alt='profileImage' className='btn-circle avatar ' />
        </div>
      </div>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{displayName}</h2>
        <p>{bio}</p>
        <div className='card-actions'>
          <EditProfile userInfo={userInfo} uid={uid} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
