import { MenuIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { FC, useState } from 'react';

import NavLink from './Navlink';

const Navbar: FC = () => {
  const [display, setDisplay] = useState('hidden');

  return (
    <header id='navbar' className='flex flex-wrap items-center bg-red-200 responsive-full'>
      <Link href='/'>
        <a className='text-xl font-bold '>Video Encoding</a>
      </Link>

      <nav
        className={`ml-auto ${display} flex justify-items-end p-5 sm:p-0 gap-4 
        flex-col bg-red-200 absolute sm:flex-row sm:relative sm:flex
        inset-0 mt-12 sm:mt-0`}
      >
        <NavLink href='/' anchorClassName='sm:hidden' text='Home' />

        <NavLink href='/theory' text='Theory' />

        <NavLink href='/video-lessons' text='Videos Lessons' />

        <NavLink href='/about' text='About' />

        <NavLink
          href='/playground'
          anchorClassName='btn bg-black text-white border-none hover:text-white hover:text-red-400'
          text='Playground'
        />
      </nav>

      <button
        className='ml-auto sm:hidden'
        aria-label='Toggle Menu'
        onClick={() => setDisplay(display == 'hidden' ? 'flex' : 'hidden')}
      >
        <MenuIcon className='h-6 w-6 text-black-500' />
      </button>
    </header>
  );
};
export default Navbar;
