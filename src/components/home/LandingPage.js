import React from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <>
      <div className='hero min-h-screen bg-[url(https://placeimg.com/1000/800/animals)]'>
        <div className='hero-overlay bg-opacity-60'></div>
        <div className='hero-content text-center text-neutral-content'>
          <div className='max-w-md'>
            <h1 className='mb-5 text-5xl font-bold'>Welcome to Furriends!</h1>
            <p className='mb-5'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button
              className='btn btn-primary'
              onClick={() => (user ? navigate('/home') : navigate('/login'))}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      {/* <!-- Features --> */}
      <section class='bg-bookmark-white py-5 mt-5 lg:mt-5'>
        {/* <!-- Heading --> */}
        <div class='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
          <h1 class='text-3xl text-center text-bookmark-blue'>Features</h1>
          <p class='text-center text-bookmark-grey mt-4'>
            Our aim is to make it quick and easy for you to access your
            favourite websites. Your bookmarks sync between your devices so you
            can access them on the go.
          </p>
        </div>

        {/* <!-- Feature #1 --> */}
        <div class='relative mt-20 lg:mt-24 '>
          <div class='container flex flex-col lg:flex-row gap-x-24'>
            {/* <!-- Image --> */}
            <div class='flex flex-1 justify-center z-10 mb-10 lg:mb-0'>
              <img
                class='w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full'
                src='https://i.pinimg.com/originals/48/64/42/486442361fa7d6ca0a5213e40c001122.jpg'
                alt='https://i.pinimg.com/originals/48/64/42/486442361fa7d6ca0a5213e40c001122.jpg'
              />
            </div>
            {/* <!-- Content --> */}
            <div class='flex flex-1 flex-col items-center lg:items-start'>
              <h1 class='text-3xl text-bookmark-blue'>Bookmark in one click</h1>
              <p class='text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full'>
                Organize your bookmarks however you like. Our simple
                drag-and-drop interface gives you complete control over how you
                manage your favourite sites.
              </p>
              <button
                type='button'
                class='btn btn-purple hover:bg-bookmark-white hover:text-black'
              >
                More Info
              </button>
            </div>
          </div>
          {/* <!-- Rounded Rectangle --> */}
          <div
            class='
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
        <div class='relative mt-20 lg:mt-52'>
          <div class='container flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24'>
            {/* <!-- Image --> */}
            <div class='flex flex-1 justify-center z-10 mb-10 lg:mb-0'>
              <img
                class='w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full'
                src='https://i.pinimg.com/originals/48/64/42/486442361fa7d6ca0a5213e40c001122.jpg'
                alt='https://i.pinimg.com/originals/48/64/42/486442361fa7d6ca0a5213e40c001122.jpg'
              />
            </div>
            {/* <!-- Content --> */}
            <div class='flex flex-1 flex-col items-center lg:items-start'>
              <h1 class='text-3xl text-bookmark-blue'>Intelligent search</h1>
              <p class='text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full'>
                Our powerful search feature will help you find saved sites in no
                time at all. No need to crawl through all of your bookmarks.
              </p>
              <button
                type='button'
                class='btn btn-purple hover:bg-bookmark-white hover:text-black'
              >
                More Info
              </button>
            </div>
          </div>
          {/* <!-- Rounded Rectangle --> */}
          <div
            class='
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
        <div class='relative mt-20 lg:mt-52'>
          <div class='container flex flex-col lg:flex-row items-center justify-center gap-x-24'>
            {/* <!-- Image --> */}
            <div class='flex flex-1 justify-center z-10 mb-10 lg:mb-0'>
              <img
                class='w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full'
                src='https://i.pinimg.com/originals/48/64/42/486442361fa7d6ca0a5213e40c001122.jpg'
                alt='https://i.pinimg.com/originals/48/64/42/486442361fa7d6ca0a5213e40c001122.jpg'
              />
            </div>
            {/* <!-- Content --> */}
            <div class='flex flex-1 flex-col items-center lg:items-start'>
              <h1 class='text-3xl text-bookmark-blue'>Share your bookmarks</h1>
              <p class='text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full'>
                Easily share your bookmarks and collections with others. Create
                a shareable link that you can send at the click of a button.
              </p>
              <button
                type='button'
                class='btn btn-purple hover:bg-bookmark-white hover:text-black'
              >
                More Info
              </button>
            </div>
          </div>
          {/* <!-- Rounded Rectangle --> */}
          <div
            class='
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
      <section class='bg-bookmark-white py-20 items-center justify-center'>
        <div class='container'>
          {/* <!-- Heading --> */}
          <div class='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
            <h1 class='text-3xl text-center text-bookmark-blue'>
              Frequently Asked Questions
            </h1>
            <p class='text-center text-bookmark-grey mt-4'>
              Here are some of our FAQs. If you have any other questions you’d
              like answered please feel free to email us.
            </p>
          </div>
          {/* <!-- FAQ Items --> */}
          <div class='flex flex-col sm:w-3/4 lg:w-5/12 mt-12 mx-auto'>
            <div class='flex items-center border-b py-4'>
              <span class='flex-1'>What is a Bookmark?</span>
              <i class='text-bookmark-purple fas fa-chevron-down'></i>
            </div>
            <div class='flex items-center border-b py-4'>
              <span class='flex-1'>How can I request a new browser?</span>
              <i class='text-bookmark-purple fas fa-chevron-down'></i>
            </div>
            <div class='flex items-center border-b py-4'>
              <span class='flex-1'>Is there a mobile app?</span>
              <i class='text-bookmark-purple fas fa-chevron-down'></i>
            </div>
            <div class='flex items-center border-b py-4'>
              <span class='flex-1'>What about other Chromium browsers?</span>
              <i class='text-bookmark-purple fas fa-chevron-down'></i>
            </div>
            <button
              type='button'
              class='mt-12 flex self-center btn btn-purple hover:bg-bookmark-white hover:text-black'
            >
              More Info
            </button>
          </div>
        </div>
      </section>

      {/* <!-- Contact Us --> */}
      <section class='bg-bookmark-purple text-white py-20'>
        <div class='container items-center justify-center'>
          <div class='sm:w-3/4 lg:w-2/4 mx-auto'>
            <p class='font-light uppercase text-center mb-8'>
              35,000+ ALREADY JOINED
            </p>
            <h1 class='text-3xl text-center'>
              Stay up-to-date with what we’re doing
            </h1>
            <div class='flex flex-col sm:flex-row gap-6 mt-8'>
              <input
                type='text'
                placeholder='Enter your email address'
                class='focus:outline-none flex-1 px-2 py-3 rounded-md text-black'
              />
              <button
                type='button'
                class='btn bg-bookmark-red hover:bg-bookmark-white hover:text-black'
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
