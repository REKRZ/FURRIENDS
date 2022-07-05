/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Home() {
  const [friends, setFriends] = useState([]); // friend list of ids
  const [userPosts, setUserPosts] = useState([]);
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);

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
          list.push({ friendId: doc.id });
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
      friends?.forEach(({ friendId }) => {
        const friendsPostsRef = collection(db, 'profiles', friendId, 'posts');
        const qFriendsPosts = query(friendsPostsRef);
        const getFriendsPosts = async () => {
          const friendsPostsSnapshot = await getDocs(qFriendsPosts);
          if (friendsPostsSnapshot) {
            friendsPostsSnapshot.forEach((doc) => {
              setFriendsPosts((current) => [...current, doc.data()]);
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
    }

    // eslint-disable-next-line
  }, [friendsPosts]);

  const updateLikes = (id) => {
    console.log(id);
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
                <img
                  className='block object-scale-down h-80 w-full'
                  src={post.uploadedPhoto}
                  alt='pic'
                />
              </a>

              <header className='flex items-center justify-between leading-tight p-2 md:p-4'>
                <h1 className='text-lg'>
                  <a className='no-underline hover:underline' href='#'>
                    {post.caption}
                  </a>
                </h1>
                <p className='text-grey-darker text-sm'>
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
                  className='flex items-center no-underline text-grey-darker hover:text-red-dark'
                  href='#'
                >
                  <p className='pr-2'>{post.likes}</p>
                  <span className='hidden'>Like</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                    onClick={() => updateLikes(post.uid)}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
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

// {
//   usersInfo.filter(
//     (user) => post.displayName === user.displayName
//   )[0].photoURL
// }
