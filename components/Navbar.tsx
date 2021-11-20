import { MenuIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { FC, useState } from 'react';

import NavLink from './Navlink';

const Navbar: FC = () => {
  const [display, setDisplay] = useState('hidden');

  return (
    <header id='navbar' className='flex flex-wrap items-center responsive-full font-serif sm:py-4'>
      <Link href='/'>
        <a className='text-3xl font-bold italic'>
          {/*V E <br></br> C*/}
          <img src='/img/logo.svg' width='56px'></img>
        </a>
      </Link>

      <nav
        className={`ml-auto w-3/4 max-w-4xl ${display} justify-between sm:p-0
        flex-col absolute sm:flex-row sm:relative sm:flex
        inset-0 mt-24 sm:mt-0`}>
        <NavLink href='/' anchorClassName='sm:hidden' text='Home' />

        <NavLink href='/theory' text='Theory' />

        <NavLink href='/video-lessons' text='Video Lessons' />

        <NavLink href='/about' text='About' />

        <NavLink href='/playground' text='Playground' />
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
