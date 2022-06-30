/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const { user } = useAuth();
  const testUser = 'einAZyfrMPSjySXmwUyGOUGSk5n1';
  const testFriend1 = 'MfzT9NKOxbXgQ5lXfUP0dw5JBCC2';
  const testFriend2 = 'FkelnLabBQcfVCrQsv4H6fXJj0t2';

  const userPostsRef = collection(db, 'profiles', testUser, 'posts');
  const qUserPosts = query(userPostsRef);

  const friendsRef = collection(db, 'profiles', testUser, 'friends');
  const qFriends = query(friendsRef);

  // useCallback(() => {
  // get list of friend IDs and set friends state
  const getFriends = useCallback(async () => {
    const friendsListSnapshot = await getDocs(qFriends);
    if (friendsListSnapshot) {
      let list = [];
      friendsListSnapshot.forEach((doc) => {
        list.push({ friendId: doc.id });
      });
      setFriends(list);
    }
  }, [qFriends]);
  // getFriends();

  // get list of user posts and set userPosts state
  const getUserPosts = useCallback(async () => {
    const userPostsSnapshot = await getDocs(qUserPosts);
    if (userPostsSnapshot) {
      let allUserPosts = [];
      userPostsSnapshot.forEach((doc) => {
        allUserPosts.push({ ...doc.data(), id: doc.id });
      });
      setUserPosts(allUserPosts);
    }
  }, [qUserPosts]);
  // getUserPosts();
  // }, [qUserPosts, qFriends]);
  console.log(userPosts);

  useCallback(() => {
    // get list of friend posts (after getting friend IDs) and set friendsPosts state
    const getAllFriendsPosts = async () => {
      if (friends.length !== 0) {
        let allFriendsPosts = [];
        friends.forEach(({ friendId }) => {
          const friendsPostsRef = collection(db, 'profiles', friendId, 'posts');
          const qFriendsPosts = query(friendsPostsRef);

          const getFriendsPosts = async () => {
            const friendsPostsSnapshot = await getDocs(qFriendsPosts);
            if (friendsPostsSnapshot) {
              friendsPostsSnapshot.forEach((doc) => {
                allFriendsPosts.push({ ...doc.data(), id: doc.id });
              });
            }
          };
          getFriendsPosts();
        });
        setFriendsPosts(allFriendsPosts);
      }
    };
    getAllFriendsPosts();
    console.log('ran');
  }, [friends]);

  useEffect(() => {
    let all = [...userPosts, ...friendsPosts];
    console.log(all);
    setAllPosts(all);
  }, [userPosts, friendsPosts]);

  return (
    <div className='flex flex-col w-full'>
      <div className='grid h-50 card bg-base-300 rounded-box place-items-center'>
        {allPosts.map((post) => (
          <div key={post.id}>{post.caption}</div>
        ))}
      </div>
      <div className='divider'></div>
      <div className='grid h-20 card bg-base-300 rounded-box place-items-center'>
        content
      </div>
    </div>
  );
}
