/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import FriendProfileCard from './FriendProfileCard';
import { useLocation } from 'react-router-dom';

const FriendProfile = () => {
  const location = useLocation();
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [postsChange, setPostsChange] = useState(true);

  const uid = location.state.from;

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
    getUserPosts();
  }, [postsChange]);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfoSnapshot = await getDoc(qUserInfo);
      userInfoSnapshot.exists()
        ? setUserInfo(userInfoSnapshot.data())
        : console.log('no such document!');
    };
    getUserInfo();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'profiles', uid, 'posts', id));
    setPostsChange(false);
  };

  return (
    <div className='flex w-full'>
      <div className=''>
        <FriendProfileCard userInfo={userInfo} uid={uid} />
      </div>
      <div className='grid flex-grow bg-base-300 place-items-center rounded-bl-lg'>
        {userPosts.length ? (
          userPosts.map(({ uploadedPhoto, caption, displayName, id }, i) => (
            <div key={i}>
              <div className='grid h-300 card bg-base-300 rounded-box place-items-center'>
                <div className='card lg:card-side bg-base-100 shadow-xl w-[800px]'>
                  <figure>
                    <img
                      className='object-contain h-60 w-60'
                      src={`${uploadedPhoto}`}
                      alt='pic'
                    />
                  </figure>
                  <div className='card-body flex justify-center'>
                    <h6 className='card-title'>{caption}</h6>
                    <div className='card-actions justify-end absolute bottom-2 right-2'>
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

export default FriendProfile;
