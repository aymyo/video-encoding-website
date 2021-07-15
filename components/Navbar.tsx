import { useRouter } from 'next/dist/client/router';
import { MenuIcon } from '@heroicons/react/solid';

import Link from 'next/link';
import { FC, useState } from 'react';

const Navbar: FC = () => {
  const currentPath = useRouter().pathname;
  const [display, setDisplay] = useState('hidden');

  const checkCurrent = (path: string) => (currentPath == path ? 'underline' : '');

  return (
    <header id='navbar' className='flex flex-wrap items-center bg-red-200 responsive-full'>
      <Link href='/'>
        <a className='text-xl font-bold '>Video Encoding</a>
      </Link>

      <nav
        className={`ml-auto ${display} flex justify-items-end p-5 sm:p-0 gap-4 
        flex-col bg-red-200 absolute sm:flex-row sm:relative sm:flex
        inset-0 mt-12 sm:mt-0`}>
        <Link href='/'>
          <a className={`${checkCurrent('/')} sm:hidden`}>Home</a>
        </Link>

        <Link href='/theory'>
          <a className={checkCurrent('/theory')}>Theory</a>
        </Link>

        <Link href='/video-lessons'>
          <a className={checkCurrent('/video-lessons')}>Video Lessons</a>
        </Link>

        <Link href='/about'>
          <a className={checkCurrent('/about')}>About</a>
        </Link>
      </nav>

      <button
        className='ml-auto sm:hidden'
        aria-label='Toggle Menu'
        onClick={() => setDisplay(display == 'hidden' ? 'flex' : 'hidden')}>
        <MenuIcon className='h-6 w-6 text-black-500' />
      </button>
    </header>
  );
};
export default Navbar;
