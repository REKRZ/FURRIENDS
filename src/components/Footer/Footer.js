import React from 'react';
import { BsLinkedin, BsGithub, BsEnvelopeFill } from 'react-icons/bs';

const Footer = () => {
  return (
    <div>
      <footer className='footer p-10 bg-base-200 text-base-content'>
        <div>
          <img src='/images/logo.svg' alt='logo' className='object-scale-down h-12' />
          <p>
            ACME Industries Ltd. <br /> Providing reliable tech since 1992
          </p>
        </div>
        <div>
          <span className='footer-title'>Developers</span>
          <a className='link link-hover'>Kenji Zhang</a>
          <a className='link link-hover'>Roy Neville</a>
          <a className='link link-hover'>Ed Geng</a>
          <a className='link link-hover'>Ryan Tang</a>
        </div>

        <div>
          <span className='footer-title '>Social</span>
          <div className='flex'>
            <a className='link link-hover' target='_blank' href='https://www.linkedin.com/in/kenji-zhang/'>
              <BsLinkedin />
            </a>
            <a className='link link-hover mx-3' target='_blank' href='https://github.com/kenjizhang/kenjizhang'>
              <BsGithub />
            </a>
            <a className='link link-hover' target='_blank' href='mailto:kenjizhang.1@gmail.com'>
              <BsEnvelopeFill />
            </a>
          </div>
          <div className='flex'>
            <a className='link link-hover' target='_blank' href='https://www.linkedin.com/in/kenji-zhang/'>
              <BsLinkedin />
            </a>
            <a className='link link-hover mx-3' target='_blank' href='https://github.com/kenjizhang/kenjizhang'>
              <BsGithub />
            </a>
            <a className='link link-hover' target='_blank' href='mailto:kenjizhang.1@gmail.com'>
              <BsEnvelopeFill />
            </a>
          </div>
          <div className='flex'>
            <a className='link link-hover' target='_blank' href='https://www.linkedin.com/in/kenji-zhang/'>
              <BsLinkedin />
            </a>
            <a className='link link-hover mx-3' target='_blank' href='https://github.com/kenjizhang/kenjizhang'>
              <BsGithub />
            </a>
            <a className='link link-hover' target='_blank' href='mailto:kenjizhang.1@gmail.com'>
              <BsEnvelopeFill />
            </a>
          </div>
          <div className='flex'>
            <a className='link link-hover' target='_blank' href='https://www.linkedin.com/in/kenji-zhang/'>
              <BsLinkedin />
            </a>
            <a className='link link-hover mx-3' target='_blank' href='https://github.com/kenjizhang/kenjizhang'>
              <BsGithub />
            </a>
            <a className='link link-hover' target='_blank' href='mailto:kenjizhang.1@gmail.com'>
              <BsEnvelopeFill />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
