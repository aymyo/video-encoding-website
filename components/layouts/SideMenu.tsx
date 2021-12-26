import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FC, useState } from 'react';

import { mdxDoc } from '../../utils/mdxUtils';

interface SideMenuProps {
  items: mdxDoc[];
  title: string;
  currentSlug: string;
}

const SideMenu: FC<SideMenuProps> = ({ items, title, currentSlug }) => {
  const currentPath = useRouter().pathname;
  const currentSection = currentPath.slice(0, -7);
  const [display, setDisplay] = useState('hidden');

  const checkCurrent = (path: string) => (currentSlug == path ? 'underline' : '');

  return (
    <div
      className='z-40 order-first md:order-3 col-span-4 md:col-span-1 sticky top-0
    flex flex-col p-4 md:p-0 md:pr-4 bg-bgSecondary md:bg-transparent -mt-4 -mx-4 md:m-0'>
      <button
        className='flex flex-row md:hidden z-50 items-center justify-between'
        aria-label='Toggle Menu'
        onClick={() => setDisplay(display == 'hidden' ? 'flex' : 'hidden')}>
        <span className='text-lg font-bold font-serif'>{title}</span>
        {display === 'hidden' ? (
          <ChevronDownIcon className='h-6 w-6 text-black-500' />
        ) : (
          <ChevronRightIcon className='h-6 w-6 text-black-500' />
        )}
      </button>

      <nav
        className={`${display} sm:p-0 md:flex 
        inset-0 mt-4 md:mt-0 sticky top-8`}>
        <ol className='w-full flex flex-col gap-2 list-circle'>
          <li className='hidden md:block text-xl font-bold font-serif'>{title}</li>
          {items.map((post) => (
            <li key={post.filePath} className='ml-4 last:mb-0 text-accentPrimary'>
              <Link
                as={`${currentSection}/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`${currentSection}/[slug]`}>
                <a
                  className={`hover:text-accentPrimary font-medium text-base text-textPrimary ${checkCurrent(
                    post.filePath.replace(/\.mdx?$/, '')
                  )}`}>
                  {post.data.title}
                </a>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default SideMenu;
