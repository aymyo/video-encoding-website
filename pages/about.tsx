import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '../components/layouts/Layout';

interface AboutPageProps {
  name?: string;
}

const AboutPage: NextPage<AboutPageProps> = () => {
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
        <h1 className='text-4xl sm:text-5xl italic font-bold font-serif pt-16 pb-16'>
          About this website
        </h1>
        <div className='text-lg sm:text-xl text-justify pb-8 max-w-xl '>
          <p>
            This website hosts all the information related to the course{' '}
            <i>Video Encoding Systems</i> taught at the University Pompeu Fabra in Barcelona, as
            part of its Engineering Audiovisual Systems degree. <br /> <br />
          </p>
          <p>
            It aims to make it more comfortable for both students and teachers to manage, modify and
            share the course information. <br /> <br />
          </p>
          <p>
            If you see any mistake, typo, or you found information that could complement what is
            showcased on this site, feel free to make a <i>pull request</i> with your proposal using
            the button at the bottom of the lessons. <br /> <br />
          </p>
          <p>
            Additionally, it opens the knowledge to anyone interested in it. If you are not enrolled
            in the course, be free to roam around the site and learn as much as you want! But of
            course, you will not get any certificate or evaluation.
          </p>
        </div>

        <Link href='/theory/0-Introduction'>
          <a className='btn'>Start learning!</a>
        </Link>
      </div>
    </Layout>
  );
};

export default AboutPage;
