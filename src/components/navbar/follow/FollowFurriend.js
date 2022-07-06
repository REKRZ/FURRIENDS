/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { useAuth } from '../../../contexts/AuthContext';

export default function FollowFurriend() {
  // current logged-in user's id
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const [usersProfiles, setUsersProfiles] = useState([]);

  // Logic to extract all friends (all users from profiles collection from firestore)
  useEffect(() => {
    let allUsersProfiles = [];

    async function getAllUsers() {
      const querySnapshot = await getDocs(collection(db, 'profiles'));
      querySnapshot.forEach((userDoc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(userDoc.id, ' => ', userDoc.data());

        // make userDoc + uid objects, and push to array... then setState
        allUsersProfiles.push({ ...userDoc.data(), uid: userDoc.id });
      });
    }

    getAllUsers();
    setUsersProfiles(allUsersProfiles);
    // eslint-disable-next-line
  }, []);

  // console.log('THIS IS usersProfiles STATE:', usersProfiles);

  // Logic attached to Add button in modal furriends table to add a specific user
  async function handleAddFurriend(userId) {
    try {
      const furriendToAddRef = doc(db, 'profiles', userId);
      const furriendSnap = await getDoc(furriendToAddRef);

      // console.log('@@@@', userId)
      // console.log("Document data:", furriendSnap.data());
      // console.log('@@@@*****', uid)

      await setDoc(doc(db, 'profiles', uid, 'friends', userId), {
        ...furriendSnap.data(), friendDisplayName: furriendSnap.data().displayName
      });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* <!-- The button to open modal --> */}
      <label
        htmlFor='follow-furriend-modal'
        className='btn btn-ghost normal modal-button'
      >
        Follow a furriend
      </label>
      {/* <!-- The modal --> */}
      <input
        type='checkbox'
        id='follow-furriend-modal'
        className='modal-toggle'
      />
      <div className='modal'>
        <div className='modal-box relative w-11/12 max-w-5xl'>
          <label
            htmlFor='follow-furriend-modal'
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <h3 className='font-bold text-lg'>Furriends</h3>
          <p className='py-4'>Meet new Furriends and set up a playdate!</p>

          {/* THIS IS THE TABLE OF FURRIENDS VVV */}
          {/*  */}
          <div className='overflow-x-auto w-full'>
            <table className='table w-full'>
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type='checkbox' className='checkbox' />
                    </label>
                  </th>
                  <th>Display Name</th>
                  <th>Pet Name + Breed</th>
                  <th>About Me</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* LOGIC TO MAP OVER ALL USERS IN 'profiles' coll and make rows */}
                {usersProfiles.length >= 1 ? (
                  usersProfiles.map((profile) => (
                    <tr key={profile.uid}>
                      <th>
                        <label>
                          <input type='checkbox' className='checkbox' />
                        </label>
                      </th>
                      <td>
                        <div className='flex items-center space-x-3'>
                          <div className='avatar'>
                            <div className='mask mask-squircle w-12 h-12'>
                              <img
                                src={profile.photoURL}
                                alt='https://www.akc.org/wp-content/uploads/2017/11/Beagle-laying-down-in-the-shade-outdoors.jpg'
                              />
                            </div>
                          </div>
                          <div>
                            <div className='font-bold text-rose-100'>{profile.displayName}</div>
                            <div className='text-sm opacity-50'>{profile.ownerName}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {profile.petName}
                        <br />
                        <span className='badge badge-ghost badge-sm'>
                          {profile.petBreed}
                        </span>
                      </td>
                      <td>{profile.bio}</td>
                      <th>
                        <button className='btn btn-ghost' onClick={() => handleAddFurriend(profile.uid)}>
                          Follow
                        </button>
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr>
                  <th>
                    <label>
                      <input type='checkbox' className='checkbox' />
                    </label>
                  </th>
                  <td>
                    <div className='flex items-center space-x-3'>
                      <div className='avatar'>
                        <div className='mask mask-squircle w-12 h-12'>
                          <img
                            src='https://www.akc.org/wp-content/uploads/2017/11/Beagle-laying-down-in-the-shade-outdoors.jpg'
                            alt='https://www.akc.org/wp-content/uploads/2017/11/Beagle-laying-down-in-the-shade-outdoors.jpg'
                          />
                        </div>
                      </div>
                      <div>
                        <div className='font-bold'>displayName</div>
                        <div className='text-sm opacity-50'>ownerName</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    petName
                    <br />
                    <span className='badge badge-ghost badge-sm'>petBreed</span>
                  </td>
                  <td>Bio</td>
                  <th>
                    <button className='btn btn-ghost'>Add</button>
                  </th>
                </tr>
                )}
                {/* CLOSING */}
              </tbody>
              {/* <!-- foot --> */}
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>

          {/*  */}
          {/* THIS IS THE TABLE OF FURRIENDS ^^^ */}

          <div className='modal-action'>
            <label htmlFor='follow-furriend-modal' className='btn'>
              Done
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

