import React from 'react';

const PlacesCard = ({ dogParks, num }) => {
  const { poi, address, id } = dogParks;
  return (
    <div className='card card-compact w-auto bg-base-100 shadow-xl bg-white'>
      <figure>
        <img src={`https://loremflickr.com/440/225/dogs%20cats?random${num}`} alt='parks' />
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
