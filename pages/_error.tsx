import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

import Layout from '../components/layouts/Layout';

const ErrorPage: NextPage = () => {
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
