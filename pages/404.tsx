import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import path from 'path';

import LastUpdates from '../components/LastUpdates';
import Layout from '../components/Layout';
import { mdxDoc, THEORY_PATH, theoryFilePaths } from '../utils/mdxUtils';

interface ErrorPageProps {
  docs: mdxDoc[];
}

const ErrorPage: NextPage<ErrorPageProps> = ({ docs }) => {
  const path = useRouter().asPath;
  return (
    <Layout>
      <section className='h-full block bg-red-50 responsive-contained md:py-32'>
        <h1 className='font-normal text-lg sm:text-xl md:text-xl lg:text-xl mt-16 mb-8'>
          Error 404: Page not found
        </h1>
        <div className='text-xl md:text-2xl mb-16'>
          <p className='mb-8'>
            It seems like the page <b>{path}</b> is not here...
          </p>
          <Link href='/'>
            <a className='btn'>Click here to go to the Homepage</a>
          </Link>
        </div>
      </section>
      <LastUpdates items={docs} />
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
