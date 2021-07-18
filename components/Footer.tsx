import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => (
  <footer className='h-56 responsive-full bg-gray-800 text-white flex justify-between'>
    <nav className='flex flex-col justify-around text-sm md:text-base'>
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
    </nav>

    <div className='flex flex-col items-center justify-center'>
      <p className='text-2xl mb-4 hidden sm:block'>Do you have any questions?</p>
      <Link href='/contact'>
        <a className='btn btn-light'>Contact</a>
      </Link>
    </div>
    <div className='flex flex-col items-end text-right justify-around'>
      <small>
        Developed by <br />
        <a href='https://github.com/aymyo' rel='noreferrer' target='_blank' className='underline'>
          @aymyo
        </a>
      </small>
      <small>
        Deployed with <br />
        <a href='https://vercel.com/' rel='noreferrer' target='_blank' className='underline'>
          Vercel
        </a>
      </small>
    </div>
  </footer>
);
export default Footer;
