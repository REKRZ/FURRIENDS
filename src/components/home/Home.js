/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import AddPost from '../navbar/post/AddPost';

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
    if (friendsPosts.length) {
      const combined = [...userPosts, ...friendsPosts];
      const timeOrderedCombined = combined.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      );
      setAllPosts(timeOrderedCombined);
    }
    // eslint-disable-next-line
  }, [friendsPosts]);

  return (
    <div className='container my-12 mx-auto px-4 md:px-12'>
      <div className='flex flex-wrap -mx-1 lg:-mx-4'>
        {allPosts.map((post, i) => (
          <div
            key={i}
            className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'
          >
            <article className='overflow-hidden rounded-lg shadow-lg'>
              <a href='#'>
                <img src={`${post.uploadedPhoto}`} alt='pic' />
              </a>

              <header className='flex items-center justify-between leading-tight p-2 md:p-4'>
                <h1 className='text-lg'>
                  <a
                    className='no-underline hover:underline text-black'
                    href='#'
                  >
                    {post.caption}
                  </a>
                </h1>
                <p className='text-grey-darker text-sm'>
                  {post.createdAt.toDate().toDateString()}
                </p>
                <div className='justify-end'>
                  <div className='badge badge-outline'>{post.displayName}</div>
                </div>
              </header>
            </article>
            <div className='divider'></div>
          </div>
        ))}
      </div>
      {/* <div className='flex flex-col w-full'>
      {allPosts.map((post, i) => (
        <div key={i} className='flex p-10'>
          <div className='card lg:card-side bg-base-600 shadow-xl'>
            <div className='w-3/4'>
              <figure className='max-w-max max-h-max'>
                <img src={`${post.uploadedPhoto}`} alt='pic' />
              </figure>
            </div>

            <div className='card-body w-1/4'>
              <h6 className='card-title'>{post.caption}</h6>
              <p>If a dog chews shoes whose shoes does he choose??</p>
              <div className='card-actions justify-end'>
                <div className='badge badge-outline'>{post.displayName}</div>
              </div>
            </div>
          </div>
          <div className='divider'></div>
        </div>
      ))}
    </div> */}
    </div>
  );
}
