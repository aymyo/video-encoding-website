import { FC, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { mdxDoc } from '../utils/mdxUtils';

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
    <div className='flex flex-col text-gray-600 bg-gray-200 md:bg-transparent responsive-full md:max-w-sm md:pr-4 '>
      <div className='flex flex-row md:hidden'>
        <p>{title}</p>
        <button
          className='ml-auto '
          aria-label='Toggle Menu'
          onClick={() => setDisplay(display == 'hidden' ? 'flex' : 'hidden')}>
          {display === `hidden` ? (
            <ChevronDownIcon className='h-6 w-6 text-black-500' />
          ) : (
            <ChevronRightIcon className='h-6 w-6 text-black-500' />
          )}
        </button>
      </div>

      <nav
        className={`${display} sm:p-0 md:flex 
        inset-0 mt-4 md:mt-0 `}>
        <ol className='w-full flex flex-col gap-2 '>
          {items.map((post) => (
            <li key={post.filePath} className=' last:mb-0 '>
              <Link
                as={`${currentSection}/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`${currentSection}/[slug]`}>
                <a
                  className={`font-medium text-lg ${checkCurrent(
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

// const SideMenu: FC<SideMenuProps> = ({ items }) => {
//   return (
//     <nav className='flex flex-col md:flex-row w-96 top-0 text-gray-600'>
//       <ol>
//         {items.map((post) => (
//           <li key={post.filePath} className='mb-2'>
//             <Link as={`/theory/${post.filePath.replace(/\.mdx?$/, '')}`} href={`/theory/[slug]`}>
//               <a className='font-medium text-lg'>{post.data.title}</a>
//             </Link>
//           </li>
//         ))}
//       </ol>
//     </nav>
//   );
// };

export default SideMenu;
