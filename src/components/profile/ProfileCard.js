import React from 'react';

const ProfileCard = ({ userInfo }) => {
  const { photoURL, displayName, bio } = userInfo;
  return (
    <div className='card w-60 h-96 bg-base-100 shadow-xl'>
      <figure className='px-10 pt-10'>
        <img src={photoURL} alt='profileImage' className='rounded-xl' />
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{displayName}</h2>
        <p>{bio}</p>
        <div className='card-actions'>
          <button className=' btn-primary btn-sm rounded'>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
