import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import path from 'path';

import Layout from '../components/Layout';
import { mdxDoc, THEORY_PATH, theoryFilePaths } from '../utils/mdxUtils';

interface ErrorPageProps {
  docs: mdxDoc[];
}

const ErrorPage: NextPage<ErrorPageProps> = ({ docs }) => {
  const path = useRouter().asPath;
  return (
    <Layout>
      <img
        alt=''
        src='/img/hero.svg'
        width='512px'
        className='opacity-50 absolute top-40 z-0 right-0 -mr-96 lg:-mr-64 xl:-mr-54'
      />
      <img
        alt=''
        src='/img/hero.svg'
        width='512px'
        className='opacity-50 absolute top-40 z-0 left-0  -ml-96 lg:-ml-64 xl:-ml-54'
      />
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl sm:text-5xl italic font-bold font-serif pt-32 pb-8'>Error 404</h1>
        <p className='text-xl sm:text-2xl leading-loose sm:leading-loose font-mono pb-8 max-w-xl'>
          It seems like the page{' '}
          <code className='bg-bgSecondary rounded py-0.5 px-1.5'>{path}</code> is not here...
        </p>
        <Link href='/'>
          <a className='btn'>Click here to go to the homepage</a>
        </Link>
      </div>
    </Layout>
  );
};

export default ErrorPage;

export const getStaticProps: GetStaticProps = async () => {
  const docs = theoryFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(THEORY_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath
    };
  });

  return { props: { docs } };
};
