import React from 'react';

const PlacesCard = ({ dogParks, num }) => {
  const { poi, address } = dogParks;
  return (
    <div className='card card-compact h-72 w-auto shadow-xl bg-white'>
      <figure>
        <img className='object-cover' src={`https://loremflickr.com/440/225/dogs%20cats?random${num}`} alt='parks' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{poi.name}</h2>
        <p>{address.freeformAddress}</p>
      </div>
    </div>
  );
};

export default PlacesCard;
