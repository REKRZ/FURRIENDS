import React from 'react';
import { BsLinkedin, BsGithub, BsEnvelopeFill } from 'react-icons/bs';

const About = () => {
  return (
    <div className='max-w-screen-xl px-4 mx-auto md:px-8 pb-4 pt-8 flex-grow h-screen'>
      <div className='mb-10 md:mb-8 flex justify-center items-center'>
        <h2 className='mb-2 text-2xl font-bold text-center lg:text-3xl'>
          The Team at
        </h2>
        <img
          src='/images/logo.svg'
          alt='logo'
          className='object-scale-down h-16'
        />
      </div>
      <p className='max-w-screen-md mx-auto text-center  md:text-lg pb-5'>
        Furriends was created in 15 days by our amazing team of developers{' '}
      </p>
      <div className='grid gap-4 md:grid-cols-4'>
        <div className='p-4 shadow-2xl rounded-lg'>
          <div className='h-48 mb-2 overflow-hidden shadow-lg md:h-60'>
            <img src='/images/khenji-zhang.jpeg' alt='Kenji' className='object-contain object-center w-full h-full p-2 rounded-2xl' />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='font-bold text-indigo-500 md:text-lg mb-3'>
              Kenji Zhang
            </div>
            <div className='flex'>
              <div className='flex gap-4'>
                <a href='https://www.linkedin.com/in/kenji-zhang/' target='blank'>
                  <BsLinkedin />
                </a>
                <a target='blank' href='https://github.com/kenjizhang'>
                  <BsGithub />
                </a>
                <a href='mailto:kenjizhang.1@gmail.com'>
                  <BsEnvelopeFill />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='p-4 shadow-2xl rounded-lg'>
          <div className='h-48 mb-2 overflow-hidden shadow-lg md:h-60'>
            <img src='/images/edward-geng.jpeg' alt='Ed' className='object-contain object-center w-full h-full p-2 rounded-2xl' />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='font-bold text-indigo-500 md:text-lg mb-3'>
              Ed Geng
            </div>
            <div className='flex'>
              <div className='flex gap-4'>
                <a target='blank' href='https://www.linkedin.com/in/edward-geng/'>
                  <BsLinkedin />
                </a>
                <a target='blank' href='https://github.com/Eddie2shoes'>
                  <BsGithub />
                </a>
                <a href='mailto:egeng01@gmail.com'>
                  <BsEnvelopeFill />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='p-4 shadow-2xl rounded-lg'>
          <div className='h-48 mb-2 overflow-hidden shadow-lg md:h-60'>
            <img src='/images/ryan-tang.jpeg' alt='Ryan' className='object-contain object-center w-full h-full p-2 rounded-2xl' />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='font-bold text-indigo-500 md:text-lg mb-3'>
              Ryan Tang
            </div>
            <div className='flex'>
              <div className='flex gap-4'>
                <a target='blank' href='https://www.linkedin.com/in/ryan-tang-clu/'>
                  <BsLinkedin />
                </a>
                <a target='blank' href='https://github.com/ryan-clu'>
                  <BsGithub />
                </a>
                <a href='mailto:ryan.tang.clu@gmail.com'>
                  <BsEnvelopeFill />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='p-4 shadow-2xl rounded-lg'>
          <div className='h-48 mb-2 overflow-hidden shadow-lg md:h-60'>
            <img src='/images/roy-neville.jpeg' alt='Roy' className='object-contain object-center w-full h-full p-2 rounded-2xl' />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='font-bold text-indigo-500 md:text-lg mb-3'>
              Roy Neville
            </div>
            <div className='flex'>
              <div className='flex gap-4'>
                <a target='blank' href='https://www.linkedin.com/in/royneville/'>
                  <BsLinkedin />
                </a>
                <a target='blank' href='https://github.com/RNEV'>
                  <BsGithub />
                </a>
                <a href='mailto:RoyNeville20@gmail.com'>
                  <BsEnvelopeFill />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
