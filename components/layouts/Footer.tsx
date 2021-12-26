import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => (
  <footer className='mt-24 flex justify-center items-center border-t border-t-1 border-bgSecondary bg-footer-pattern bg-cover'>
    <div className='full-container'>
      <nav className='mt-8 mr-52 flex flex-col justify-around text-sm gap-3'>
        <p className='font-bold font-serif'>Sitemap</p>
        <Link href='/'>
          <a className='link  no-underline'>Home</a>
        </Link>
        <Link href='/theory'>
          <a className='link  no-underline'>Theory</a>
        </Link>
        <Link href='/video-lessons'>
          <a className='link  no-underline'>Video Lessons</a>
        </Link>
        <Link href='/about'>
          <a className='link  no-underline'>About</a>
        </Link>
        <Link href='/video-encoder-converter-online'>
          <a className='link  no-underline'>Tools</a>
        </Link>
        <small className='pt-32 pb-8'>
          Designed and developed by
          <a
            href='https://github.com/aymyo'
            rel='noreferrer'
            target='_blank'
            className='link font-bold ml-1'>
            @aymyo
          </a>
        </small>
      </nav>
    </div>
  </footer>
);
export default Footer;
