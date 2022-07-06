import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, getDocs, getDoc, doc, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ProfileCard from './ProfileCard';

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [postsChange, setPostsChange] = useState(true);

  const { currentUser } = useAuth();
  const { uid } = currentUser;

  const userInfoRef = doc(db, 'profiles', uid);
  const qUserInfo = query(userInfoRef);

  useEffect(() => {
    const getUserPosts = async () => {
      let posts = [];
      const userPostsRef = collection(db, 'profiles', uid, 'posts');
      const qUserPosts = query(userPostsRef, orderBy('createdAt', 'desc'));
      const userPostsSnapshot = await getDocs(qUserPosts);

      userPostsSnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setUserPosts(posts);
    };
    setPostsChange(true);
    // console.log('rerendering');
    getUserPosts();
  }, [postsChange]);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfoSnapshot = await getDoc(qUserInfo);
      userInfoSnapshot.exists() ? setUserInfo(userInfoSnapshot.data()) : console.log('no such document!');
    };

    getUserInfo();
    // getUserPosts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'profiles', uid, 'posts', id));
    setPostsChange(false);
  };

  return (
    <div className='flex w-full'>
      <ProfileCard userInfo={userInfo} uid={uid} />
      <div className='grid flex-grow card bg-base-300 rounded-box place-items-center'>
        {userPosts.length ? (
          userPosts.map(({ uploadedPhoto, caption, displayName, id }, i) => (
            <div key={i}>
              <div className='grid h-300 card bg-base-300 rounded-box place-items-center'>
                <div key={i} className='card lg:card-side bg-base-100 shadow-xl'>
                  <div className='dropdown dropdown-left absolute top-0 right-0'>
                    <label tabIndex='0' className='btn m-1 btn-sm btn-circle pb-2'>
                      ...
                    </label>

                    <ul tabIndex='0' className='dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52'>
                      <li>
                        <label onClick={() => handleDelete(id)} className='text-red-500'>
                          Delete Post
                        </label>
                      </li>
                      <li>
                        <a>Edit Post</a>
                      </li>
                    </ul>
                  </div>
                  <figure>
                    <img className='object-contain h-60 w-60' src={`${uploadedPhoto}`} alt='pic' />
                  </figure>
                  <div className='card-body'>
                    <h6 className='card-title'>{caption}</h6>
                    <p>If a dog chews shoes whose shoes does he choose??</p>
                    <div className='card-actions justify-end'>
                      <div className='badge badge-outline'>{displayName}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='divider'></div>
            </div>
          ))
        ) : (
          <h1>No Posts at this time</h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
