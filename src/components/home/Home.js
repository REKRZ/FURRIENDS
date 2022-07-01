/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Home() {
  const [friends, setFriends] = useState([]); // friend list of ids
  const [userPosts, setUserPosts] = useState([]);
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const { user } = useAuth();
  const testUser = 'einAZyfrMPSjySXmwUyGOUGSk5n1';

  const userPostsRef = collection(db, 'profiles', testUser, 'posts');
  const qUserPosts = query(userPostsRef);

  const friendsRef = collection(db, 'profiles', testUser, 'friends');
  const qFriends = query(friendsRef);

  useEffect(() => {
    // get list of user posts and set userPosts state
    const getUserPosts = async () => {
      const userPostsSnapshot = await getDocs(qUserPosts);
      if (userPostsSnapshot) {
        let allUserPosts = [];
        userPostsSnapshot.forEach((doc) => {
          allUserPosts.push({ ...doc.data(), id: doc.id });
        });
        setUserPosts(allUserPosts);
      }
    };
    getUserPosts();

    // get list of friend IDs and set friends state
    const getFriends = async () => {
      const friendsListSnapshot = await getDocs(qFriends);
      if (friendsListSnapshot) {
        let list = [];
        friendsListSnapshot.forEach((doc) => {
          list.push({ friendId: doc.id });
        });
        setFriends(list);
      }
    };
    getFriends();
  }, []);

  useEffect(() => {
    // get list of friend posts (after getting friend IDs) and set friendsPosts state
    // let allFriendsPosts = [];
    const getAllFriendsPosts = () => {
      friends?.forEach(({ friendId }) => {
        const friendsPostsRef = collection(db, 'profiles', friendId, 'posts');
        const qFriendsPosts = query(friendsPostsRef);
        const getFriendsPosts = async () => {
          const friendsPostsSnapshot = await getDocs(qFriendsPosts);
          if (friendsPostsSnapshot) {
            // friendsPostsSnapshot.forEach((doc) => {
            // allFriendsPosts.push({ ...doc.data(), id: doc.id });
            setFriendsPosts((current) => [
              ...current,
              friendsPostsSnapshot,
              // { ...doc.data(), id: doc.id },
            ]);
            // });
            // here
          }
        };
        getFriendsPosts();
      });
    };
    getAllFriendsPosts();
  }, [friends]);

  useEffect(() => {
    if (friendsPosts.length) {
      console.log('4', friendsPosts);
      setAllPosts([...userPosts, ...friendsPosts]);
    }
  }, [friendsPosts]);

  // console.log('friends', friends);
  // console.log('userPosts', userPosts);
  // console.log('friendsPosts', friendsPosts);
  // console.log('allPosts', allPosts);
  return (
    <div className='flex flex-col w-full'>
      {allPosts.map((post, i) => (
        <>
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
        </>
      ))}
    </div>
  );
}
