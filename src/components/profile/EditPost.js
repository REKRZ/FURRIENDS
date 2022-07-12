/* eslint-disable*/

import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { BsFillPencilFill } from 'react-icons/bs';

const EditPost = ({ caption, id }) => {
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const captionRef = useRef('');

  const handleSubmit = async (e) => {
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
    <>
      <label
        htmlFor={`edit-post-modal-${id}}`}
        className='btn m-1 btn-sm btn-circle modal-button'
      >
        <BsFillPencilFill />
      </label>
      <input
        type='checkbox'
        id={`edit-post-modal-${id}}`}
        className='modal-toggle'
      />
      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <label
            htmlFor={`edit-post-modal-${id}}`}
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <h3 className='font-bold text-lg pb-4 text-center'>Edit Caption</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <label className='input-group flex flex-col items-center space-y-4'>
                <div className='flex flex-row'>
                  <span>Caption</span>
                  <input
                    ref={captionRef}
                    type='text'
                    defaultValue={caption}
                    className='input input-bordered'
                    size={40}
                  />
                </div>
              </label>
            </div>
            <div className='modal-action'>
              <button
                type='submit'
                htmlFor='edit-post-modal'
                className='btn btn-m1'
              >
                <label htmlFor='edit-post-modal'>Submit</label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPost;
