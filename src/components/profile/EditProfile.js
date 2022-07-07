import { useRef, useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { TbArrowBigRightLines } from 'react-icons/tb';

const EditProfile = ({ userInfo, uid }) => {
  const { displayName, bio } = userInfo;
  const bioRef = useRef();
  const displayNameRef = useRef();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [newPhotoURL, setNewPhotoURL] = useState('');

  // handles photo upload form
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  // uploads photo into storage
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'stage_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setNewPhotoURL(url));
      }
    );
  };

  // preview handler
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    console.log('USE EFFECT RENDERED');
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const profileRef = doc(db, 'profiles', uid);
      await updateDoc(profileRef, {
        bio: bioRef.current.value,
        displayName: displayNameRef.current.value,
        photoURL: newPhotoURL,
      });
      setLoading(false);
      window.location.reload(false);
    } catch (err) {
      console.log('Error!');
    }
  };

  return (
    <>
      {/* BUTTON TO OPEN MODAL*/}
      <label htmlFor='test-modal' className='btn btn-primary modal-button btn-sm rounded'>
        Edit Profile
      </label>
      {/* BELOW IS THE MODAL CODE */}
      <input type='checkbox' id='test-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative grid grid-rows-1 place-items-center'>
          <label htmlFor='test-modal' className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </label>
          <h3 className='font-bold text-3xl pt-7 mb-5'>EDIT PROFILE</h3>
          <div className=''>
            <form onSubmit={formHandler}>
              {selectedFile && <img className='block object-scale-down h-60 w-full my-4 border-4' src={preview} alt='' />}
              <div className='flex justify-center'>
                <div className='place-self-center'>
                  <label htmlFor='edit-profile-file' className='btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-md'>
                    choose a photo
                  </label>
                  <input type='file' name='edit-profile-file' id='edit-profile-file' className='input opacity-0 w-1 h-1' onChange={onSelectFile} />
                </div>
                <div className='place-self-center pr-7'>
                  <TbArrowBigRightLines className='sm:text-xl md:text-2xl lg:text-3xl' />
                </div>
                <div className='place-self-center'>
                  <button className='btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-md' type='submit'>
                    Pupload
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className='divider'>{progress < 100 ? <h3 className='flex justify-center my-3'>{progress}%</h3> : <h3 className='flex justify-center my-3'>Pupload Complete!</h3>}</div>
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <label className='input-group flex flex-col items-left space-y-4 '>
                <div className='flex flex-row '>
                  <span>Display Name</span>
                  <input ref={displayNameRef} type='text' placeholder={displayName} className='input input-bordered mr-2' />
                </div>
                <div className='flex flex-row'>
                  <span>Bio</span>
                  <textarea ref={bioRef} type='text' placeholder={bio} className='textarea textarea-bordered w-4/5' />
                </div>
              </label>
            </div>
            <div className='modal-action'>
              <button disabled={loading} type='submit' htmlFor='test-modal' className='btn absolute bottom-3 right-3'>
                <label htmlFor='test-modal'>Submit</label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
