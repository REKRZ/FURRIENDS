import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, getDocs, getDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const { currentUser } = useAuth();
  const { uid } = currentUser;

  const userInfoRef = doc(db, 'profiles', uid);
  const qUserInfo = query(userInfoRef);

  const getUserPosts = useCallback(async () => {
    let posts = [];
    const userPostsRef = collection(db, 'profiles', uid, 'posts');
    const qUserPosts = query(userPostsRef, orderBy('createdAt', 'desc'));
    const userPostsSnapshot = await getDocs(qUserPosts);

    userPostsSnapshot.forEach((doc) => {
      posts.push(doc.data());
      console.log(posts);
    });
    setUserPosts(posts);
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfoSnapshot = await getDoc(qUserInfo);
      userInfoSnapshot.exists() ? setUserInfo(userInfoSnapshot.data()) : console.log('no such document!');
    };

    getUserInfo();
    getUserPosts();
  }, []);

  return (
    <div className='flex w-full'>
      <div className='card w-48 h-96 bg-base-100 shadow-xl'>
        <figure className='px-10 pt-10'>
          <img src={userInfo.photoURL} alt='profileImage' className='rounded-xl' />
        </figure>
        <div className='card-body items-center text-center'>
          <h2 className='card-title'>{userInfo.displayName}</h2>
          <p>{userInfo.bio}</p>
          <div className='card-actions'>
            <button className=' btn-primary btn-sm rounded'>Edit Profile</button>
          </div>
        </div>
      </div>
      <div className='grid flex-grow card bg-base-300 rounded-box place-items-center'>
        {userPosts?.map(({ uploadedPhoto, caption, displayName }, i) => (
          <div key={i}>
            <div className='grid h-300 card bg-base-300 rounded-box place-items-center'>
              <div key={i} className='card lg:card-side bg-base-100 shadow-xl'>
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
        ))}
      </div>
    </div>
  );
};

export default Profile;
