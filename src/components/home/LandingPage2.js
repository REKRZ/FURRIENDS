import React from 'react';

export default function LandingPage2() {
  return (
    <div className=''>
      <div class='font-Poppins '>
        {/* <!-- Hero --> */}
        <section class='relative '>
          <div class='container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28'>
            {/* <!-- Content --> */}
            <div class='flex flex-1 flex-col items-center lg:items-start'>
              <h2 class='text-bookmark-blue text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6'>
                A Simple Bookmark Manager
              </h2>
              <p class='text-bookmark-grey text-lg text-center lg:text-left mb-6'>
                A clean and simple interface to organize your favourite
                websites. Open a new browser tab and see your sites load
                instantly. Try it for free.
              </p>
              <div class='flex justify-center flex-wrap gap-6'>
                <button
                  type='button'
                  class='btn btn-purple hover:bg-bookmark-white hover:text-black'
                >
                  Get it on Chrome
                </button>
                <button
                  type='button'
                  class='btn btn-white hover:bg-bookmark-purple hover:text-white'
                >
                  Get it on Firefox
                </button>
              </div>
            </div>
            {/* <!-- Image --> */}
            <div class='flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10'>
              <img
                class='w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full'
                src='./imgs/hero-bg.png'
                alt=''
              />
            </div>
          </div>
          {/* <!-- Rounded Rectangle --> */}
          <div
            class='
          hidden
          md:block
          overflow-hidden
          bg-bookmark-purple
          rounded-l-full
          absolute
          h-80
          w-2/4
          top-32
          right-0
          lg:
          -bottom-28
          lg:-right-36
        '
          ></div>
        </section>

        {/* <!-- Features --> */}
        <section class='bg-bookmark-white py-20 mt-20 lg:mt-60'>
          {/* <!-- Heading --> */}
          <div class='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
            <h1 class='text-3xl text-center text-bookmark-blue'>Features</h1>
            <p class='text-center text-bookmark-grey mt-4'>
              Our aim is to make it quick and easy for you to access your
              favourite websites. Your bookmarks sync between your devices so
              you can access them on the go.
            </p>
          </div>
          {/* <!-- Feature #1 --> */}
          <div class='relative mt-20 lg:mt-24'>
            <div class='container flex flex-col lg:flex-row items-center justify-center gap-x-24'>
              {/* <!-- Image --> */}
              <div class='flex flex-1 justify-center z-10 mb-10 lg:mb-0'>
                <img
                  class='w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full'
                  src='./imgs/illustration-features-tab-1.png'
                  alt=''
                />
              </div>
              {/* <!-- Content --> */}
              <div class='flex flex-1 flex-col items-center lg:items-start'>
                <h1 class='text-3xl text-bookmark-blue'>
                  Bookmark in one click
                </h1>
                <p class='text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full'>
                  Organize your bookmarks however you like. Our simple
                  drag-and-drop interface gives you complete control over how
                  you manage your favourite sites.
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
                  src='./imgs/illustration-features-tab-2.png'
                  alt=''
                />
              </div>
              {/* <!-- Content --> */}
              <div class='flex flex-1 flex-col items-center lg:items-start'>
                <h1 class='text-3xl text-bookmark-blue'>Intelligent search</h1>
                <p class='text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full'>
                  Our powerful search feature will help you find saved sites in
                  no time at all. No need to crawl through all of your
                  bookmarks.
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
                  src='./imgs/illustration-features-tab-3.png'
                  alt=''
                />
              </div>
              {/* <!-- Content --> */}
              <div class='flex flex-1 flex-col items-center lg:items-start'>
                <h1 class='text-3xl text-bookmark-blue'>
                  Share your bookmarks
                </h1>
                <p class='text-bookmark-grey my-4 text-center lg:text-left sm:w-3/4 lg:w-full'>
                  Easily share your bookmarks and collections with others.
                  Create a shareable link that you can send at the click of a
                  button.
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

        {/* <!-- Download --> */}
        <section class='py-20 mt-20'>
          {/* <!-- Heading --> */}
          <div class='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
            <h1 class='text-3xl text-center text-bookmark-blue'>
              Download the extension
            </h1>
            <p class='text-center text-bookmark-grey mt-4'>
              We’ve got more browsers in the pipeline. Please do let us know if
              you’ve got a favourite you’d like us to prioritize.
            </p>
          </div>
          {/* <!-- Cards --> */}
          <div class='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-screen-lg mt-16'>
            {/* <!-- Card 1 --> */}
            <div class='flex flex-col rounded-md shadow-md lg:mb-16'>
              <div class='p-6 flex flex-col items-center'>
                <img src='./imgs/logo-chrome.svg' alt='' />
                <h3 class='mt-5 mb-2 text-bookmark-blue text-lg'>
                  Add to Chrome
                </h3>
                <p class='mb-2 text-bookmark-grey font-light'>
                  Minimum version 62
                </p>
              </div>
              <hr class='border-b border-bookmark-white' />
              <div class='flex p-6'>
                <button
                  type='button'
                  class='flex-1 btn btn-purple hover:bg-bookmark-white hover:text-black'
                >
                  Add & Install Extension
                </button>
              </div>
            </div>
            {/* <!-- Card 2 --> */}
            <div class='flex flex-col rounded-md shadow-md lg:my-8'>
              <div class='p-6 flex flex-col items-center'>
                <img src='./imgs/logo-firefox.svg' alt='' />
                <h3 class='mt-5 mb-2 text-bookmark-blue text-lg'>
                  Add to Firefox
                </h3>
                <p class='mb-2 text-bookmark-grey font-light'>
                  Minimum version 62
                </p>
              </div>
              <hr class='border-b border-bookmark-white' />
              <div class='flex p-6'>
                <button
                  type='button'
                  class='flex-1 btn btn-purple hover:bg-bookmark-white hover:text-black'
                >
                  Add & Install Extension
                </button>
              </div>
            </div>
            {/* <!-- Card 3 --> */}
            <div class='flex flex-col rounded-md shadow-md lg:mt-16'>
              <div class='p-6 flex flex-col items-center'>
                <img src='./imgs/logo-opera.svg' alt='' />
                <h3 class='mt-5 mb-2 text-bookmark-blue text-lg'>
                  Add to Opera
                </h3>
                <p class='mb-2 text-bookmark-grey font-light'>
                  Minimum version 62
                </p>
              </div>
              <hr class='border-b border-bookmark-white' />
              <div class='flex p-6'>
                <button
                  type='button'
                  class='flex-1 btn btn-purple hover:bg-bookmark-white hover:text-black'
                >
                  Add & Install Extension
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- FAQ --> */}
        <section class='bg-bookmark-white py-20'>
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
          <div class='container'>
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
      </div>
    </div>
  );
}
