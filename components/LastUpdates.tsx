import { FC } from 'react';

import Link from 'next/link';

interface LastUpdatesProps {
  items: [];
}

const LastUpdates: FC<LastUpdatesProps> = ({ items }) => {
  return (
    <section className='mt-0 sm:mt-16 py-6 mb-4 responsive-contained flex flex-col md:flex-row'>
      <h3 className='font-bold text-3xl mb-4 mr-32'>Last Updates</h3>
      <ul>
        {items.map((item) => (
          <li key={item.filePath} className='mb-6'>
            <Link as={`/theory/${item.filePath.replace(/\.mdx?$/, '')}`} href={`/theory/[slug]`}>
              <a>
                <small>{item.data.update}</small>
                <h4 className='font-bold text-xl mb-4'>{item.data.title}</h4>
                <p>{item.data.summary}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LastUpdates;
