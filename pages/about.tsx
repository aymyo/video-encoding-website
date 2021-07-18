import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '../components/Layout';

interface AboutPageProps {
  name?: string;
}

const AboutPage: NextPage<AboutPageProps> = () => {
  return (
    <Layout>
      <h1>About</h1>
      <Link href='/'>
        <a className=''>Click here to go to the homepage</a>
      </Link>
    </Layout>
  );
};

export default AboutPage;
