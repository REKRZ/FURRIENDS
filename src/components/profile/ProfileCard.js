import React from 'react';
import EditProfile from './EditProfile';

const ProfileCard = ({ userInfo, uid }) => {
  const { photoURL, displayName, bio, petBreed, petName, ownerName, petSize } = userInfo;
  // const petSizes = {
  //   S: 'small',
  //   M: 'medium',
  //   L: 'large',
  // };

  return (
    <div className='card w-60 h-auto bg-base-100 items-center'>
      <h2 className='card-title text-secondary py-5'>{displayName}</h2>
      <div className='avatar'>
        <div className='w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
          <img src={photoURL} alt='profileImage' className='btn-circle avatar ' />
        </div>
      </div>
      <div className='card-body items-center text-center'>
        <h3>
          <span className='font-bold'>Name:</span> {petName}
        </h3>
        {/* <h3>
          <span className='font-bold'>Paw-rent:</span> {ownerName}
        </h3>
        <h3>
          <span className='font-bold'>Breed:</span> {petBreed}
        </h3> */}
        <p>{bio}</p>
        <div className='card-actions'>
          <EditProfile userInfo={userInfo} uid={uid} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
