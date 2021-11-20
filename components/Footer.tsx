import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => (
  <footer className='mt-24 responsive-full flex justify-center items-center border-t border-t-1 border-bgSecondary bg-footer-pattern bg-cover'>
    <nav className='mt-8 mr-64 flex flex-col justify-around text-sm md:text-base gap-3'>
      <p className='font-bold font-serif'>Sitemap</p>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/theory'>
        <a>Theory</a>
      </Link>
      <Link href='/video-lessons'>
        <a>Video Lessons</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
      <Link href='/playground'>
        <a>Playground</a>
      </Link>
      <p className='pt-32 pb-8'>
        Developed by
        <a
          href='https://github.com/aymyo'
          rel='noreferrer'
          target='_blank'
          className='underline ml-1'>
          @aymyo
        </a>
      </p>
    </nav>
  </footer>
);
export default Footer;
