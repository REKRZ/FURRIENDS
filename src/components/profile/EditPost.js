import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditPost = ({ caption, id }) => {
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  // const navigate = useNavigate();
  const captionRef = useRef(caption);

  const handleSubmit = async (e) => {
    console.log('HANDLE SUBMIT REACHED');
    e.preventDefault();
    try {
      const postRef = doc(db, 'profiles', uid, 'posts', id);
      await updateDoc(postRef, {
        caption: captionRef.current.value,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* BUTTON TO OPEN MODAL*/}
      <label htmlFor='my-modal-2' className='btn btn-primary modal-button btn-md rounded'>
        Edit Profile
      </label>
      {/* BELOW IS THE MODAL CODE */}
      <input type='checkbox' id='my-modal-2' className='modal-toggle' />
      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <label htmlFor='my-modal-2' className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </label>
          <h3 className='font-bold text-lg pb-4'>Edit Profile</h3>
          <div className='form-control'>
            <label className='input-group flex flex-col items-center space-y-4'>
              <div className='flex flex-row'>
                <span>Caption</span>
                <input ref={captionRef} type='text' placeholder={caption} className='input input-bordered' />
              </div>
            </label>
          </div>
          <div className='modal-action'>
            <label onSubmit={handleSubmit} htmlFor='my-modal-2' className='btn'>
              Submit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
