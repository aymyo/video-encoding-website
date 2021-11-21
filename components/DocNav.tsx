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

  return (
    <nav className='flex justify-between flex-wrap gap-4 items-start mt-24 py-8 border-t border-t-1 border-bgSecondary'>
      <NavButton dir='prev' doc={prevDoc} currentSection={currentSection} />
      <GithubButton slug={slug} currentSection={currentSection} />
      <NavButton dir='next' doc={nextDoc} currentSection={currentSection} />
    </nav>
  );
};

export default DocNav;

const GithubButton = ({ slug, currentSection }: { slug: string; currentSection: string }) => {
  return (
    <Link
      href={`https://github.com/aymyo/video-encoding-website/blob/main/docs/${currentSection}/${slug}.mdx`}>
      <a className='btn flex items-center px-3 py-0.5 order-last sm:order-none mx-auto'>
        <p className='mr-2 mb-0.5 italic font-bold font-serif text-xs text-center'>
          Is there any error?
          <br />
          Edit on Github
        </p>
        <svg
          width='30'
          height='29'
          viewBox='0 0 30 29'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            className='stroke-current hover:text-bgPrimary'
            d='M6.32412 17.267L6.42584 17.491C6.74276 18.1889 7.2084 18.809 7.79015 19.3081L8.89424 20.2552C9.13506 20.4617 9.44186 20.5753 9.75914 20.5753L9.99448 20.5753C10.6787 20.5754 11.2042 21.1814 11.1075 21.8587C11.0217 22.46 10.4738 22.8844 9.87011 22.8173L8.80935 22.6993C8.23782 22.6358 7.71309 22.3535 7.34514 21.9115L6.54663 20.9525C6.34401 20.7091 6.06075 20.5466 5.74841 20.4945L4.68265 20.3167C4.43488 20.2754 4.2093 20.4665 4.2093 20.7177C4.2093 20.8411 4.26539 20.9579 4.36174 21.035L5.45396 21.9094C5.74612 22.1433 5.9966 22.4249 6.19483 22.7424L6.7637 23.6533C7.27235 24.4679 8.16486 24.9628 9.12517 24.9628H10.2092C10.2539 24.9628 10.2968 24.945 10.3285 24.9134C10.4346 24.8071 10.6163 24.8823 10.6163 25.0325V27.3253C10.6163 27.6506 10.2899 27.8746 9.98634 27.7578L6.84668 26.5492C6.44287 26.3937 6.08104 26.146 5.79011 25.8257L4.04804 23.9077C3.26005 23.0402 2.59486 22.0686 2.0711 21.0202C1.47694 19.8308 1.07158 18.5562 0.869584 17.2422L0.834014 17.0108C0.612638 15.5706 0.612638 14.105 0.834014 12.6648L0.990108 11.6494C1.11269 10.8519 1.31317 10.0684 1.58868 9.31011L1.62039 9.22285C2.21508 7.58605 3.16113 6.09941 4.39201 4.86747C5.38639 3.87224 6.56374 3.05409 7.84092 2.46411C9.43506 1.72772 11.1885 1.33784 12.9445 1.33784H15.3694C17.1254 1.33784 18.8605 1.71923 20.4546 2.45562C21.7537 3.05569 22.9363 3.88096 23.9477 4.89323L24.1531 5.09886C25.236 6.18267 26.1152 7.45236 26.7487 8.84733C27.2318 9.91097 27.5667 11.0358 27.7442 12.1904L27.8171 12.6648C28.0385 14.105 28.0385 15.5706 27.8171 17.0108L27.7583 17.3935C27.5717 18.6073 27.1973 19.7847 26.6485 20.8833C26.0803 22.0205 25.3326 23.0588 24.4341 23.9581L22.6232 25.7705C22.2654 26.1286 21.841 26.413 21.3739 26.6078L18.6051 27.7625C18.2841 27.8964 17.9142 27.7588 17.7588 27.4476C17.7185 27.3669 17.6951 27.2788 17.6901 27.1887L17.3605 21.2503C17.3605 21.0435 17.4772 20.8545 17.6621 20.762L20.0994 19.5423C21.3606 18.9112 22.2933 17.7728 22.664 16.4122L22.6951 16.2982C22.955 15.3442 22.9388 14.3361 22.6482 13.391L21.8564 10.8153C21.7818 10.5726 21.7326 10.3229 21.7096 10.0701L21.4812 7.55523C21.4392 7.0923 21.051 6.73783 20.5862 6.73783C20.4604 6.73783 20.3359 6.76426 20.221 6.8154L19.0619 7.33097C17.9477 7.8266 16.7217 8.01679 15.5097 7.882L15.1768 7.84499C14.6109 7.78206 14.0399 7.77892 13.4734 7.83562L12.7885 7.90416C11.5859 8.02453 10.3727 7.82949 9.26848 7.33829L8.08052 6.80985C7.97377 6.76237 7.85823 6.73783 7.74139 6.73783C7.28056 6.73783 6.90698 7.11141 6.90698 7.57224V9.86933C6.90698 10.2534 6.83633 10.6341 6.69857 10.9926L6.17796 12.3474C5.5657 13.9406 5.61835 15.7129 6.32412 17.267Z'
            stroke='#EA5959'
          />
          <path
            className='stroke-current hover:text-bgPrimary'
            d='M7.67299 16.9294L7.77471 17.1534C8.09164 17.8513 8.55728 18.4714 9.13903 18.9705L10.2431 19.9176C10.4839 20.1241 10.7907 20.2377 11.108 20.2377L11.3434 20.2377C12.0275 20.2378 12.5531 20.8438 12.4564 21.5211C12.3706 22.1224 11.8227 22.5468 11.219 22.4797L10.1582 22.3617C9.5867 22.2982 9.06197 22.0159 8.69401 21.5739L7.8955 20.6149C7.69288 20.3715 7.40963 20.209 7.09729 20.1569L6.03153 19.9791C5.78376 19.9378 5.55818 20.1289 5.55818 20.3801C5.55818 20.5035 5.61426 20.6203 5.71062 20.6974L6.80284 21.5718C7.09499 21.8057 7.34548 22.0873 7.54371 22.4048L8.11258 23.3157C8.62123 24.1303 9.51374 24.6252 10.474 24.6252H11.5581C11.6028 24.6252 11.6457 24.6074 11.6773 24.5758C11.7835 24.4695 11.9652 24.5447 11.9652 24.6949V26.9877C11.9652 27.313 11.6388 27.537 11.3352 27.4202L8.19556 26.2116C7.79175 26.0561 7.42991 25.8084 7.13899 25.4881L5.39692 23.5701C4.60893 22.7026 3.94374 21.731 3.41998 20.6826C2.82581 19.4932 2.42045 18.2186 2.21846 16.9046L2.18289 16.6732C1.96152 15.233 1.96152 13.7674 2.18289 12.3272L2.33899 11.3118C2.46156 10.5143 2.66205 9.73082 2.93756 8.97251L2.96926 8.88525C3.56395 7.24845 4.51 5.76181 5.74089 4.52987C6.73526 3.53464 7.91262 2.71649 9.1898 2.12651C10.7839 1.39012 12.5374 1.00024 14.2934 1.00024H16.7183C18.4743 1.00024 20.2094 1.38162 21.8035 2.11802C23.1026 2.71809 24.2852 3.54336 25.2966 4.55563L25.502 4.76126C26.5849 5.84507 27.4641 7.11476 28.0976 8.50972C28.5807 9.57337 28.9156 10.6982 29.0931 11.8528L29.166 12.3272C29.3874 13.7674 29.3874 15.233 29.166 16.6732L29.1072 17.0559C28.9206 18.2697 28.5462 19.4471 27.9973 20.5457C27.4292 21.6829 26.6815 22.7212 25.783 23.6205L23.972 25.4329C23.6143 25.791 23.1899 26.0754 22.7228 26.2702L19.9539 27.4249C19.6329 27.5588 19.2631 27.4212 19.1077 27.11C19.0674 27.0293 19.044 26.9412 19.039 26.8511L18.7093 20.9127C18.7093 20.7059 18.8261 20.5169 19.011 20.4244L21.4483 19.2047C22.7095 18.5736 23.6422 17.4352 24.0129 16.0746L24.044 15.9606C24.3039 15.0066 24.2877 13.9985 23.9971 13.0534L23.2053 10.4777C23.1307 10.235 23.0815 9.98529 23.0585 9.73248L22.8301 7.21763C22.788 6.7547 22.3999 6.40023 21.9351 6.40023C21.8092 6.40023 21.6848 6.42666 21.5698 6.4778L20.4108 6.99337C19.2966 7.489 18.0705 7.67919 16.8585 7.5444L16.5257 7.50739C15.9598 7.44446 15.3888 7.44132 14.8222 7.49802L14.1374 7.56656C12.9348 7.68693 11.7216 7.49189 10.6174 7.00069L9.4294 6.47225C9.32264 6.42477 9.20711 6.40023 9.09027 6.40023C8.62943 6.40023 8.25585 6.77381 8.25585 7.23464V9.53173C8.25585 9.91578 8.18521 10.2965 8.04745 10.655L7.52683 12.0098C6.91458 13.603 6.96723 15.3753 7.67299 16.9294Z'
            stroke='#EA5959'
          />
        </svg>
      </a>
    </Link>
  );
};

interface NavProps {
  dir: 'prev' | 'next';
  doc: mdxDoc;
  currentSection: string;
}

const NavButton = ({ dir, doc, currentSection }: NavProps) => {
  const isPrev = dir === 'prev';

  if (!doc) {
    return (
      <div className='my-auto text-lg font-serif italic'>
        {isPrev ? 'First Lesson' : 'That was all, well done!'}
      </div>
    );
  }

  return (
    <Link href={`/${currentSection}/${doc.filePath.slice(0, -4)}`}>
      <a className=' my-auto flex items-center gap-3 text-lg font-serif underline hover:text-accentPrimary'>
        {isPrev ? (
          <>
            <SvgIconNext rotateDegrees='0' />
            {doc.data.title}
          </>
        ) : (
          <>
            {doc.data.title}
            <SvgIconNext rotateDegrees='180' />
          </>
        )}
      </a>
    </Link>
  );
};

const SvgIconNext = ({ rotateDegrees }: { rotateDegrees: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      width='32'
      height='32'
      transform={`rotate(${rotateDegrees})`}
      viewBox='13.36 10.38 36.16 18.65'>
      <path
        d='M28.734 21.5429C26.6577 20.9403 27.1 19.113 29.4861 18.436L44.9835 14.0385C47.1351 13.4279 49.2984 14.2281 48.9859 15.5189L46.9738 23.8305C46.6613 25.1212 44.0915 26.0004 42.2193 25.457L28.734 21.5429Z'
        stroke='#EA5959'
      />
      <path
        d='M27.7108 20.3568C25.6208 19.7565 26.0656 17.9194 28.4643 17.2442L43.8887 12.9025C46.0382 12.2974 48.1923 13.0979 47.8805 14.3859L45.8949 22.5878C45.5831 23.8758 43.0225 24.755 41.1497 24.217L27.7108 20.3568Z'
        stroke='#EA5959'
      />
      <rect
        x='-0.48455'
        y='-0.384845'
        width='6.76415'
        height='17.5601'
        rx='1.5'
        transform='matrix(-1.06152 0.104461 0.0924198 -0.874151 22.3029 27.5345)'
        stroke='#EA5959'
      />
      <rect
        x='-0.484555'
        y='-0.384907'
        width='6.76372'
        height='17.5582'
        rx='1.5'
        transform='matrix(-1.06157 0.104429 0.0924644 -0.874244 20.5597 25.9402)'
        stroke='#EA5959'
      />
    </svg>
  );
};
