import Link from 'next/link';
import { FC } from 'react';

import { mdxDoc } from '../utils/mdxUtils';

interface DocNavProps {
  slug: string;
  docs: mdxDoc[];
  currentSection: 'theory' | 'video-lessons';
}

const DocNav: FC<DocNavProps> = ({ slug, docs, currentSection }) => {
  const pathArray = docs?.map((doc) => {
    return doc.filePath.slice(0, -4);
  });

  const prevDoc = pathArray && docs[pathArray?.findIndex((path) => path === slug) - 1];
  const nextDoc = pathArray && docs[pathArray?.findIndex((path) => path === slug) + 1];

  const GithubButton = ({ slug }: { slug: string }) => {
    return (
      <Link
        href={`https://github.com/aymyo/video-encoding-website/blob/main/docs/theory/${slug}.mdx`}
      >
        <a className='btn flex items-center p-2 border-black order-last sm:order-none mx-auto'>
          <p className='mr-2'>
            Is there any error?
            <br />
            Fix it on Github
          </p>
          <svg height='32' viewBox='0 0 16 16' version='1.1' width='32' aria-hidden='true'>
            <path
              fillRule='evenodd'
              d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'
            ></path>
          </svg>
        </a>
      </Link>
    );
  };

  const NavButton = ({ dir, doc }: { dir: 'prev' | 'next'; doc: mdxDoc }) => {
    const isPrev = dir === 'prev';

    if (!doc) {
      return (
        <div className=''>
          <span role='img' aria-label='' className='mr-2'>
            {isPrev ? '🔎' : '🎉'}
          </span>
          {isPrev ? 'Good start!' : 'Well done!'}
        </div>
      );
    }

    return (
      <div className={`flex flex-col ${isPrev ? 'items-start' : 'items-end'}`}>
        <Link href={`/${currentSection}/${doc.filePath.slice(0, -4)}`}>
          <a className='btn p-2 border-black h-5 mb-2'>
            <span role='img' aria-label='' className='mr-2'>
              {isPrev ? '👈' : '👉'}
            </span>
            {isPrev ? 'Previous' : 'Next'}
          </a>
        </Link>
        <p className='text-lg font-medium'>{doc.data.title}</p>
      </div>
    );
  };

  return (
    <nav className='flex justify-between flex-wrap gap-4 items-start mt-64'>
      <NavButton dir='prev' doc={prevDoc} />
      <GithubButton slug={slug} />
      <NavButton dir='next' doc={nextDoc} />
    </nav>
  );
};

export default DocNav;
