import { MenuIcon, XCircleIcon, XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { FC, useState } from 'react';

import NavLink from './Navlink';

const Navbar: FC = () => {
  const [display, setDisplay] = useState('hidden');

  return (
    <header id='navbar' className='flex flex-wrap items-center full-container font-serif py-4'>
      <Link href='/'>
        <a className='text-3xl font-bold italic'>
          {/*V E <br></br> C*/}
          <img src='/img/logo.svg' width='56px'></img>
        </a>
      </Link>

      <nav
        className={`ml-auto inset-0 max-w-4xl flex-col fixed p-16 text-2xl gap-4 z-50 ${display} bg-bgPrimary sm:justify-between sm:w-3/4
         sm:flex sm:flex-row sm:relative sm:p-0 sm:text-base`}>
        <NavLink href='/' anchorClassName='sm:hidden' text='Home' />

        <NavLink href='/theory' text='Theory' />

        <NavLink href='/video-lessons' text='Video Lessons' />

        <NavLink href='/about' text='About' />

        <NavLink href='/playground' text='Playground' />
      </nav>

      <button
        className={`ml-auto sm:hidden z-50  ${display == 'hidden' ? '' : 'fixed right-4'}`}
        aria-label='Toggle Menu'
        onClick={() => setDisplay(display == 'hidden' ? 'flex' : 'hidden')}>
        {display == 'hidden' ? (
          <MenuIcon className='h-6 w-6 text-black-500' />
        ) : (
          <XIcon className='h-6 w-6 text-black-500' />
        )}
      </button>
    </header>
  );
};
export default Navbar;
