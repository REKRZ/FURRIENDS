/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import PostCard from './PostCard';

export default function Home() {
  const [friends, setFriends] = useState([]); // friend list of ids
  const [userPosts, setUserPosts] = useState([]);
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const { currentUser } = useAuth();
  const { uid } = currentUser;

  const userPostsRef = collection(db, 'profiles', uid, 'posts');
  const qUserPosts = query(userPostsRef);

  const friendsRef = collection(db, 'profiles', uid, 'friends');
  const qFriends = query(friendsRef);

  useEffect(() => {
    // get list of user posts and set userPosts state
    let allUserPosts = [];
    const getUserPosts = async () => {
      const userPostsSnapshot = await getDocs(qUserPosts);
      if (userPostsSnapshot) {
        userPostsSnapshot.forEach((doc) => {
          allUserPosts.push({ ...doc.data(), id: doc.id });
        });
        setUserPosts(allUserPosts);
      }
    };
    getUserPosts();

    // get list of friend IDs and set friends state
    let list = [];
    const getFriends = async () => {
      const friendsListSnapshot = await getDocs(qFriends);
      if (friendsListSnapshot) {
        friendsListSnapshot.forEach((doc) => {
          list.push({ id: doc.id });
        });
        setFriends(list);
      }
    };
    getFriends();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // get list of friend posts (after getting friend IDs) and set friendsPosts state
    const getAllFriendsPosts = () => {
      friends?.forEach(({ id }) => {
        const friendsPostsRef = collection(db, 'profiles', id, 'posts');
        const qFriendsPosts = query(friendsPostsRef);
        const getFriendsPosts = async () => {
          const friendsPostsSnapshot = await getDocs(qFriendsPosts);
          if (friendsPostsSnapshot) {
            friendsPostsSnapshot.forEach((doc) => {
              let info = doc.data();
              info.id = doc.id;
              setFriendsPosts((current) => [...current, info]);
            });
          }
        };
        getFriendsPosts();
      });
    };
    getAllFriendsPosts();
  }, [friends]);

  useEffect(() => {
    // combine all posts
    if (friendsPosts.length) {
      const combined = [...userPosts, ...friendsPosts];
      const timeOrderedCombined = combined.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      setAllPosts(timeOrderedCombined);
      setAllPosts(combined);
    } else {
      setAllPosts(userPosts);
    }

    // eslint-disable-next-line
  }, [friendsPosts]);

  return (
    <>
      {allPosts.length ? (
        <div className='container my-12 mx-auto px-4 md:px-12 h-full'>
          <div className='flex flex-wrap -mx-1 lg:-mx-4'>
            {allPosts.map((post, i) => (
              <PostCard key={i} post={post} i={i} uid={uid} />
            ))}
          </div>
        </div>
      ) : (
        <div className='hero min-h-screen bg-[url(https://placeimg.com/1000/800/animals)]'>
          <div className='hero-overlay bg-opacity-60'></div>
          <div className='hero-content text-center text-neutral-content'>
            <div className='max-w-md'>
              <h1 className='mb-5 text-4xl text-gray-300 font-bold'>Follow some Furriends to see posts! 🐾</h1>
              <p className='flex flex-col items-center justify-center mb-6'>
                <img src='https://emojipedia-us.s3.amazonaws.com/source/skype/289/dog_1f415.png' alt='https://emojipedia-us.s3.amazonaws.com/source/skype/289/dog_1f415.png' />
              </p>
              <label htmlFor='follow-furriend-modal' className='btn btn-primary normal modal-button'>
                Follow a Furriend
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
