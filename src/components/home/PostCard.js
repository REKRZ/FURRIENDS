/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import { VscHeart } from 'react-icons/vsc';
import { GiPawHeart } from 'react-icons/gi';

export default function PostCard(props) {
  const { post, i, uid } = props;
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  useEffect(() => {
    // get list of likes and set numberOfLikes state
    const postRef = doc(db, 'profiles', post.uid, 'posts', post.id);
    const getLikes = async () => {
      const likesSnapshot = await getDoc(postRef);
      if (likesSnapshot.exists()) {
        getDoc(postRef).then((doc) => {
          const num = doc.data().likes;
          setNumberOfLikes(num.length);
        });
      } else {
        setNumberOfLikes(0);
      }
    };
    getLikes();
  }, [liked]);

  const updateLikes = async (postuid, postid) => {
    // add current user id into "likes" array in database
    const postRef = doc(db, 'profiles', postuid, 'posts', postid);
    await updateDoc(postRef, {
      likes: arrayUnion(uid),
    });
    setLiked(true);
  };

  return (
    <div key={i} className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'>
      <article className='overflow-hidden rounded-lg shadow-2xl'>
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
        <label htmlFor={`post-modal-${i}`} className='modal cursor-pointer'>
          <label className='modal-box relative' htmlFor=''>
            <div key={i} className='flex place-content-center my-1 px-1 w-full'>
              <article className='overflow-hidden rounded-lg shadow-lg'>
                <a className='w-full h-full' href='#'>
                  <img
                    className='block object-scale-down h-200 w-full'
                    src={post.uploadedPhoto}
                    alt='pic'
                  />
                </a>
                <header className='flex justify-center leading-tight p-2 md:p-4'>
                  <h1 className='text-xl'>{post.caption}</h1>
                </header>
              </article>
            </div>
          </label>
        </label>
        {/* end of modal here */}
        <header className='flex items-center leading-none p-2 md:p-4 h-48'>
          <h1 className='w-3/4 text-lg justify-self-start ml-2'>
            {post.caption}
          </h1>
          <p className='w-1/4 text-grey-darker text-xs place-self-end pl-2'>
            {post.createdAt
              .toDate()
              .toDateString()
              .split(' ')
              .slice(1)
              .join(' ')}
          </p>
        </header>
        <footer className='flex items-center justify-between leading-none p-2 md:p-4'>
          <div className='flex items-center no-underline hover:underline'>
            <img
              alt=''
              className='block rounded-full h-7 w-7 mr-1'
              src={post.profilePic}
            />
            {post.uid !== uid ? (
              <Link
                to='/friendprofile'
                className='ml-2 text-sm'
                state={{ from: post.uid }}
              >
                {post.displayName}
              </Link>
            ) : (
              <p className='ml-2 text-sm'>{post.displayName}</p>
            )}
          </div>
          <a
            className='flex place-items-center no-underline text-grey-darker hover:text-red-dark'
            href='#'
          >
            <p className='pr-2'>{numberOfLikes === 0 ? '' : numberOfLikes}</p>
            <span className='hidden'>Like</span>
            {post.likes !== 0 && post.likes.includes(uid) ? (
              <GiPawHeart className='text-rose-500 text-2xl' />
            ) : (
              <button onClick={() => updateLikes(post.uid, post.id)}>
                <label className='swap swap-flip'>
                  <input type='checkbox' disabled={liked} />
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
  );
}
