import React from 'react';

const PlacesCard = ({ dogParks }) => {
  const { poi, address } = dogParks;
  return (
    <div className='card card-compact w-96 bg-base-100 shadow-xl bg-white'>
      <figure>
        <img src='https://placeimg.com/440/225/nature' alt='Shoes' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{poi.name}</h2>
        <p>{address.freeformAddress}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Website</button>
        </div>
      </div>
    </div>
  );
};

export default PlacesCard;
