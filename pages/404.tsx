import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '../components/Layout';

interface ErrorPageProps {
  name?: string;
}

const ErrorPage: NextPage<ErrorPageProps> = () => {
  return (
    <Layout>
      <h1>404 - Page not found</h1>
      <Link href='/'>
        <a className=''>Click here to go to the homepage</a>
      </Link>
    </Layout>
  );
};

export default ErrorPage;
