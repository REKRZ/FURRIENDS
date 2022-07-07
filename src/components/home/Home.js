/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { VscHeart } from 'react-icons/vsc';
import { GiPawHeart } from 'react-icons/gi';

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
      const timeOrderedCombined = combined.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      );
      setAllPosts(timeOrderedCombined);
      setAllPosts(combined);
    }

    // eslint-disable-next-line
  }, [friendsPosts]);

  const updateLikes = async (postuid, postid) => {
    // add current user id into "likes" array in database
    const postRef = doc(db, 'profiles', postuid, 'posts', postid);
    await updateDoc(postRef, {
      likes: arrayUnion(uid),
    });
  };

  return (
    <div className='container my-12 mx-auto px-4 md:px-12'>
      <div className='flex flex-wrap -mx-1 lg:-mx-4'>
        {allPosts.map((post, i) => (
          <div
            key={i}
            className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'
          >
            <article className='overflow-hidden rounded-lg shadow-lg'>
              <a className='w-full h-full' href='#'>
                <label htmlFor={`post-modal-${i}`} className='modal-button'>
                  <img
                    className='block object-scale-down h-80 w-full'
                    src={post.uploadedPhoto}
                    alt='pic'
                  />
                </label>
              </a>
              {/* start of modal here */}
              <input
                type='checkbox'
                id={`post-modal-${i}`}
                className='modal-toggle'
              />
              <label
                htmlFor={`post-modal-${i}`}
                className='modal cursor-pointer'
              >
                <label className='modal-box relative' htmlFor=''>
                  <div
                    key={i}
                    className='flex place-content-center my-1 px-1 w-full'
                  >
                    <article className='overflow-hidden rounded-lg shadow-lg'>
                      <a className='w-full h-full' href='#'>
                        <img
                          className='block object-scale-down h-200 w-full'
                          src={post.uploadedPhoto}
                          alt='pic'
                        />
                      </a>
                      <header className='flex justify-center leading-tight p-2 md:p-4'>
                        <h1 className='text-lg'>{post.caption}</h1>
                      </header>
                    </article>
                  </div>
                </label>
              </label>
              {/* end of modal here */}
              <header className='flex items-center justify-between leading-tight p-2 md:p-4'>
                <h1 className='text-lg'>{post.caption}</h1>
                <p className='text-grey-darker text-sm pl-2'>
                  {post.createdAt.toDate().toDateString()}
                </p>
              </header>
              <footer className='flex items-center justify-between leading-none p-2 md:p-4'>
                <a
                  className='flex items-center no-underline hover:underline '
                  href='#'
                >
                  <img
                    alt=''
                    className='block rounded-full h-7 w-7 mr-1'
                    src={post.profilePic}
                  />
                  <p className='ml-2 text-sm'>{post.displayName}</p>
                </a>
                <a
                  className='flex place-items-center no-underline text-grey-darker hover:text-red-dark'
                  href='#'
                >
                  {/* <p className='pr-2'>
                    {!post.likes.length ? '' : post.likes.length}
                  </p> */}
                  <span className='hidden'>Like</span>
                  {post.likes && post.likes.includes(uid) ? (
                    <GiPawHeart className='text-rose-500 text-2xl' />
                  ) : (
                    <button onClick={() => updateLikes(post.uid, post.id)}>
                      <label className='swap swap-flip'>
                        <input type='checkbox' />
                        <div className='swap-on'>
                          <GiPawHeart className='text-rose-500 text-2xl' />
                        </div>
                        <div className='swap-off'>
                          <VscHeart className='text-rose-500 text-2xl' />
                        </div>
                      </label>
                    </button>
                  )}
                </a>
              </footer>
            </article>
            <div className='divider'></div>
          </div>
        ))}
      </div>
    </div>
  );
}
