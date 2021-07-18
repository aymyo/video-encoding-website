import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '../components/Layout';

interface AboutPageProps {
  name?: string;
}

const AboutPage: NextPage<AboutPageProps> = () => {
  return (
    <Layout>
      <section className='h-full block bg-red-50 responsive-contained md:py-32'>
        <h1 className='font-normal text-lg sm:text-xl md:text-xl lg:text-xl mt-16 mb-8'>
          Error 404: Page not found
        </h1>
        <div className='text-xl md:text-2xl mb-16'>
          <p className='mb-8'>It seems like the page is not here...</p>
          <Link href='/'>
            <a className='btn'>Click here to go to the Homepage</a>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
