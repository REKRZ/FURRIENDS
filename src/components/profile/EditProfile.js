import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, doc, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { timestamp, db, storage } from '../../firebase';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';

const EditProfile = ({ userInfo, uid }) => {
  const { displayName, bio, photoURL } = userInfo;
  const navigate = useNavigate();
  const bioRef = useRef();
  const displayNameRef = useRef();

  const handleSubmit = async (e) => {
    console.log('HANDLE SUBMIT REACHED');
    e.preventDefault();
    try {
      const profileRef = doc(db, 'profiles', uid);
      await updateDoc(profileRef, {
        bio: bioRef.current.value,
        displayName: displayNameRef.current.value,
      });

      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <label htmlFor='my-modal-6' className=' btn btn-primary modal-button btn-md rounded'>
        Edit Profile
      </label>
      <input type='checkbox' id='my-modal-6' className='modal-toggle' />
      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <label htmlFor='my-modal-6' className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </label>
          <h3 className='font-bold text-lg pb-4'>Edit Profile</h3>
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
              <div className='flex flex-row'>
                <span>Profile Picture</span>
                <input type='file' className='input' />
              </div>
            </label>
          </div>
          <div className='modal-action'>
            <label onClick={handleSubmit} htmlFor='my-modal-6' className='btn'>
              Submit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
