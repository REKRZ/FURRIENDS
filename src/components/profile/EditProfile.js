/* eslint-disable*/

import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';

const EditProfile = ({ userInfo, uid }) => {
  const { displayName, bio, photoURL } = userInfo;
  const bioRef = useRef();
  const displayNameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileRef = doc(db, 'profiles', uid);
      await updateDoc(profileRef, {
        bio: bioRef.current.value,
        displayName: displayNameRef.current.value,
      });
    } catch (err) {
      console.log(err);
    }
    window.location.reload(false);
  };

  return (
    <div>
      {/* BUTTON TO OPEN MODAL*/}
      <label htmlFor='edit-profile-modal' className='btn btn-primary modal-button btn-md rounded'>
        Edit Profile
      </label>
      {/* BELOW IS THE MODAL CODE */}
      <input type='checkbox' id='edit-profile-modal' className='modal-toggle' />
      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <label htmlFor='edit-profile-modal' className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </label>
          <h3 className='font-bold text-lg pb-4'>Edit Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <label className='input-group flex flex-col items-center space-y-4'>
                <div className='flex flex-row'>
                  <span>Display Name</span>
                  <input ref={displayNameRef} type='text' placeholder={displayName} className='input input-bordered' />
                </div>
                <div className='flex flex-row'>
                  <span>Bio</span>
                  <input ref={bioRef} type='text' placeholder={bio} className='input input-bordered' />
                </div>
                {/* <div className='flex flex-row'>
                  <span>Profile Picture</span>
                  <input type='file' className='input' />
                </div> */}
              </label>
            </div>
            <div className='modal-action'>
              <button type='submit' htmlFor='edit-profile-modal' className='btn'>
                <label htmlFor='edit-profile-modal'>Submit</label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
