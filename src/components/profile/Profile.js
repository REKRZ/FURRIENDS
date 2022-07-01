import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const testUser = 'FkelnLabBQcfVCrQsv4H6fXJj0t2';

  const userPostsRef = collection(db, 'profiles', testUser, 'posts');
  const qUserPosts = query(userPostsRef);

  const userInfoRef = doc(db, 'profiles', testUser);
  const qUserInfo = query(userInfoRef);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfoSnapshot = await getDoc(qUserInfo);
      userInfoSnapshot.exists() ? setUserInfo(userInfoSnapshot.data()) : console.log('no such document!');
    };
    console.log(userInfo);

    const getUserPosts = async () => {
      const userPostsSnapshot = await getDocs(qUserPosts);
      if (userPostsSnapshot) {
        userPostsSnapshot.forEach((doc) => {
          setUserPosts([...userPosts, doc.data()]);
        });
      }
    };
    getUserInfo();
    getUserPosts();
  }, []);

  return (
    <div className='flex w-full'>
      <div className='grid w-1/3 flex-col card bg-base-300 rounded-box place-items-center'>
        <div className='pt-5'>{userInfo.displayName}</div>
        <div className='avatar p-40'>
          <div className='w-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src={userInfo.photoURL} alt='tibetan mastiff' />
          </div>
        </div>
        <div>
          <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'>Responsive</button>
        </div>
        <div className='pt-20'>{userInfo.bio}</div>
      </div>
      <div className='grid flex-grow card bg-base-300 rounded-box place-items-center'>
        {userPosts.map((post, i) => (
          <div key={i}>
            {/* <div className='grid h-300 card bg-base-300 rounded-box place-items-center'> */}
            <div className='card lg:card-side bg-base-100 shadow-xl'>
              <figure>
                <img src={`${post.uploadedPhoto}`} alt='pic' />
              </figure>
              <div className='card-body'>
                <h6 className='card-title'>{post.caption}</h6>
                <p>If a dog chews shoes whose shoes does he choose??</p>
                <div className='card-actions justify-end'>
                  <div className='badge badge-outline'>{post.displayName}</div>
                </div>
              </div>
            </div>
            {/* </div> */}
            <div className='divider'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
