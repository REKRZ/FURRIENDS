import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsYoutube, BsGithub, BsEnvelopeFill } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className='footer items-center p-2 bg-neutral text-neutral-content'>
      <div className='items-center grid-flow-col'>
        <img src='/images/logo.svg' alt='logo' className='object-scale-down h-10' />
      </div>
      <div className='grid-flow-col gap-8 md:place-self-center md:justify-self-end items-center px-4'>
        <a className='btn btn-ghost btn-sm' href='/about'>
          About
        </a>
        <a target='_blank' href='https://github.com/REKRZ/FURRIENDS'>
          <BsGithub size='1.5rem' />
        </a>
        <a>
          <BsYoutube size='1.5rem' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
