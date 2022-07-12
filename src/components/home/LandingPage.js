import React from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className='items-center'>
      <div className='hero min-h-screen bg-[url(https://placeimg.com/1000/800/animals)]'>
        <div className='hero-overlay bg-opacity-60'></div>
        <div className='hero-content text-center text-neutral-content'>
          <div className='max-w-md'>
            <h1 className='mb-5 text-5xl font-bold'>Welcome to Furriends!</h1>
            <button className='btn btn-primary mt-10' onClick={() => (user ? navigate('/home') : navigate('/login'))}>
              Get Started
            </button>
          </div>
        </div>
      </div>
      {/* <!-- Features --> */}
      <section className='bg-bookmark-white pt-10 mt-10 lg:mt-10 justify-items-center'>
        {/* <!-- Heading --> */}

        <div className='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
          <h1 className='text-4xl text-center'>About Furriends</h1>
          <p className='text-center mt-4'>
            Furriends is a social web application that captures and shares moments between dog owners and their dogs. Users can create profiles for their dogs and upload photo posts for all their
            furry friends to see! This app features a chat function to connect with friends and a map feature for users to use their location to find nearby dog parks and friends.
          </p>
        </div>

        {/* <!-- Feature #1 --> */}
        <div className='relative mt-20 lg:mt-24 lg:p-10 lg:m-10 bg-base-200 rounded-2xl'>
          <div className='flex flex-col lg:flex-row gap-x-24 items-center justify-center'>
            {/* <!-- Image --> */}
            <div className='h-64 flex flex-1 justify-center z-10 mb-10 lg:mb-0'>
              <img
                className='bg-contain rounded-xl '
                src='https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                alt='https://i.pinimg.com/originals/48/64/42/486442361fa7d6ca0a5213e40c001122.jpg'
              />
            </div>
            {/* <!-- Content --> */}
            <div className='flex flex-1 flex-col items-center lg:items-start'>
              <h1 className='text-3xl text-bookmark-blue'>Share your favorite memories!</h1>
              <ul className='list-outside my-4'>
                <li>🦴 Create a unique bio to show off your pets profile</li>
                <br />
                <li>🦴 Document your beloved companion's journey by puploading all your favorite photos</li>
              </ul>
            </div>
          </div>
          {/* <!-- Rounded Rectangle --> */}
          <div
            className='
            hidden
            lg:block
            overflow-hidden
            bg-bookmark-purple
            rounded-r-full
            absolute
            h-80
            w-2/4
            -bottom-24
            -left-36
          '
          ></div>
        </div>
        {/* <!-- Feature #2 --> */}
        <div className='relative mt-20 lg:mt-10 lg:p-10 lg:m-10 bg-base-200 rounded-2xl'>
          <div className='flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24'>
            {/* <!-- Image --> */}
            <div className=' h-64 flex flex-1 justify-center z-10 mb-10 lg:mb-0'>
              <img
                className='bg-contain rounded-xl'
                src='https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                alt='https://i.pinimg.com/originals/48/64/42/486442361fa7d6ca0a5213e40c001122.jpg'
              />
            </div>
            {/* <!-- Content --> */}
            <div className='flex flex-1 flex-col items-center lg:items-start'>
              <h1 className='text-3xl text-bookmark-blue'>Set up play dates!</h1>
              <ul className='text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full'>
                <li>🦴 Use the map to find Furriends near you</li>
                <br />
                <li>🦴 Explore the map and discover parks in different areas</li>
                <br />
                <li>🦴 Connect using our real time chat functionality</li>
              </ul>
            </div>
          </div>
          {/* <!-- Rounded Rectangle --> */}
          <div
            className='
            hidden
            lg:block
            overflow-hidden
            bg-bookmark-purple
            rounded-l-full
            absolute
            h-80
            w-2/4
            -bottom-24
            -right-36
          '
          ></div>
        </div>
        {/* <!-- Feature #3 --> */}
        <div className='relative mt-20 lg:mt-10 lg:p-10 lg:m-10 bg-base-200 rounded-2xl'>
          <div className='flex flex-col lg:flex-row items-center justify-center gap-x-24'>
            {/* <!-- Image --> */}
            <div className='flex flex-1 justify-center z-10 mb-10 lg:mb-0'>
              <img
                className='w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full rounded-xl'
                src='https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
                alt='https://i.pinimg.com/originals/48/64/42/486442361fa7d6ca0a5213e40c001122.jpg'
              />
            </div>
            {/* <!-- Content --> */}
            <div className='flex flex-1 flex-col items-center lg:items-start'>
              <h1 className='text-3xl text-bookmark-blue'>Send love to Furriends!</h1>
              <ul className=' list-outside text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full'>
                <li>🦴 Follow your Furriends and see their posts on your home feed</li>
                <br />
                <li> 🦴 Click on posts of your favorite photos and send them a like</li>
              </ul>
            </div>
          </div>
          {/* <!-- Rounded Rectangle --> */}
          <div
            className='
            hidden
            lg:block
            overflow-hidden
            bg-bookmark-purple
            rounded-r-full
            absolute
            h-80
            w-2/4
            -bottom-24
            -left-36
          '
          ></div>
        </div>
      </section>

      {/* <!-- FAQ --> */}
      <section className='bg-bookmark-white pt-10 pb-20  items-center justify-center'>
        <div>
          {/* <!-- Heading --> */}
          <div className='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
            <h1 className='text-3xl text-center text-bookmark-blue'>Frequently Asked Questions</h1>
            <p className='text-center text-bookmark-grey mt-4'>Here are some of our FAQs. If you have any other questions you’d like answered, please feel free to email us.</p>
          </div>
          {/* <!-- FAQ Items --> */}
          <div className='flex flex-col sm:w-3/4 lg:w-5/12 mt-12 mx-auto'>
            <div className='flex items-center border-b py-4'>
              <span className='flex-1'>What is Roy's favorite food? </span>
              <i className='text-bookmark-purple fas fa-chevron-down'></i>
            </div>
            <div className='flex items-center border-b py-4'>
              <span className='flex-1'>Why is Kenji's favorite Christmas song Jingle Bells?</span>
              <i className='text-bookmark-purple fas fa-chevron-down'></i>
            </div>
            <div className='flex items-center border-b py-4'>
              <span className='flex-1'>Whats Ryans favorite pickup line?</span>
              <i className='text-bookmark-purple fas fa-chevron-down'></i>
            </div>
            <div className='flex items-center border-b py-4'>
              <span className='flex-1'>What's Ed's favorite phrase? </span>
              <i className='text-bookmark-purple fas fa-chevron-down'></i>
            </div>
            <a href='/about' type='button' className='mt-12 flex self-center btn btn-purple hover:bg-bookmark-white hover:text-black'>
              Click here for answers!
            </a>
          </div>
        </div>
      </section>

      {/* <!-- Contact Us --> */}
      <section className='hero bg-bookmark-purple text-white bg-[url(https://betterpet.com/wp-content/uploads/2021/03/dog-stuffy-nose-scaled.jpeg)]'>
        <div className='hero-overlay bg-opacity-60'></div>
        <div className='hero-content text-center text-neutral-content py-10'>
          <div className=' items-center justify-center'>
            <div className='sm:w-3/4 lg:w-2/4 mx-auto'>
              <p className='font-light uppercase text-center mb-8'>ZACH & RUSTY HAVE ALREADY JOINED</p>
              <h1 className='text-3xl text-center'>Stay up-to-date with what we’re doing</h1>
              <div className='sm:flex-row gap-6 mt-8'>
                <a href='/about ' type='button' className='btn bg-bookmark-red hover:bg-bookmark-white hover:text-black'>
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
