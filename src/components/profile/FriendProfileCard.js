import React from 'react';

const ProfileCard = ({ userInfo }) => {
  const { photoURL, displayName, bio, petBreed, petName, ownerName, petSize } = userInfo;

  const petSizes = {
    S: 'small',
    M: 'medium',
    L: 'large',
  };
  return (
    <div className='card w-60 h-auto bg-base-100 shadow-xl items-center'>
      <h2 className='card-title text-secondary py-3'>{displayName}</h2>
      <div className='avatar'>
        <div className='w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
          <img src={photoURL} alt='profileImage' className='btn-circle avatar ' />
        </div>
      </div>
      <div className='card-body items-center text-center'>
        <h3>
          <span className='font-bold'>Name:</span> {petName}
        </h3>
        <h3>
          <span className='font-bold'>My Parent is:</span> {ownerName}
        </h3>
        <h3>
          <span className='font-bold'>Breed:</span> {petBreed}
        </h3>
        <h3>
          <span className='font-bold'>Size:</span> {petSizes[petSize]}
        </h3>
        <p>
          <span className='font-bold'>Bio:</span> {bio}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
