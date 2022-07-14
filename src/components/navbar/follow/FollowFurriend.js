/* eslint-disable*/

import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { useAuth } from '../../../contexts/AuthContext';
import FriendRow from './FriendRow';

export default function FollowFurriend() {
  // current logged-in user's id
  const { currentUser } = useAuth();
  const { uid } = currentUser;
  const [usersProfiles, setUsersProfiles] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [friendsIDsList, setFriendsIDsList] = useState([]);
  const [addOrDelete, setAddOrDelete] = useState(true);

  useEffect(() => {
    // Logic to extract all friends (all users from profiles collection from firestore)
    let allUsersProfiles = [];

    async function getAllUsers() {
      const querySnapshot = await getDocs(collection(db, 'profiles'));
      querySnapshot.forEach((userDoc) => {
        allUsersProfiles.push({ ...userDoc.data(), uid: userDoc.id });
      });
    }

    getAllUsers();
    setUsersProfiles(allUsersProfiles);

    // Logic to extract list of all friends of curr logged in user
    let allFriendsProfiles = [];
    let allFriendsIDsProfiles = [];

    async function getAllFriends() {
      const querySnapshot = await getDocs(
        collection(db, 'profiles', uid, 'friends')
      );
      querySnapshot.forEach((friendDoc) => {
        allFriendsProfiles.push({
          ...friendDoc.data(),
          friendUid: friendDoc.id,
        });
        allFriendsIDsProfiles.push(friendDoc.id);
      });
    }

    getAllFriends();
    setFriendsList(allFriendsProfiles);
    setFriendsIDsList(allFriendsIDsProfiles);
    // eslint-disable-next-line
  }, []);

  // logic to remove logged in user's profile from displaying in follow furriend table... this variable will be mapped over
  let filtUsersProfiles = usersProfiles.filter(
    (profile) => profile.uid !== uid
  );

  function refreshHomeOnExit() {
    window.location.reload(false);
  }

  return (
    <>
      {/* <!-- The button to open modal --> */}
      <label
        htmlFor='follow-furriend-modal'
        className='btn btn-ghost normal modal-button'
      >
        Follow a Furriend
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
            onClick={() => refreshHomeOnExit()}
          >
            ✕
          </label>
          <h3 className='font-bold text-lg'>Furriends</h3>
          <p className='py-4'>Meet new Furriends and set up a playdate!</p>

          {/* THIS IS THE TABLE OF FURRIENDS VVV */}
          <div className='w-full'>
            <table className='table w-full'>
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th>Display Name</th>
                  <th>Pet Name + Breed</th>
                  <th>About Me</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* LOGIC TO MAP OVER ALL USERS IN 'profiles' coll and make rows */}
                {filtUsersProfiles.length >= 1 ? (
                  filtUsersProfiles.map((profile, i) => (
                    <tr key={i}>
                      <FriendRow
                        profile={profile}
                        uid={uid}
                        friendsIDsList={friendsIDsList}
                      />
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
                      <span className='badge badge-ghost badge-sm'>
                        petBreed
                      </span>
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
                </tr>
              </tfoot>
            </table>
          </div>
          {/* THIS IS THE TABLE OF FURRIENDS ^^^ */}

          <div className='modal-action'>
            <label
              htmlFor='follow-furriend-modal'
              className='btn'
              onClick={() => refreshHomeOnExit()}
            >
              Done
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
