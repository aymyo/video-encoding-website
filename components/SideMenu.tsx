import { FC } from 'react';

import Link from 'next/link';

interface SideMenuProps {
  items: [];
}

const SideMenu: FC<SideMenuProps> = ({ items }) => {
  return (
    <nav className='flex flex-col md:flex-row w-96 top-0 text-gray-600'>
      <ol>
        {items.map((post) => (
          <li key={post.filePath} className='mb-2'>
            <Link as={`/theory/${post.filePath.replace(/\.mdx?$/, '')}`} href={`/theory/[slug]`}>
              <a className='font-medium text-lg'>{post.data.title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default SideMenu;
