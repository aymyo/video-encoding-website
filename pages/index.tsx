import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import path from 'path';

import Layout from '../components/layouts/Layout';
import { mdxDoc, THEORY_PATH, theoryFilePaths } from '../utils/mdxUtils';

interface HomepageProps {
  docs: mdxDoc[];
}

const Homepage: NextPage<HomepageProps> = ({ docs }) => {
  return (
    <Layout>
      <section className='bg-hero-pattern bg-opacity-50 bg-no-repeat bg-contain bg-center sm:bg-right-top sm:bg-local'>
        <h2 className='text-xl pt-4 pl-4 sm:pt-24 sm:pl-48'>
          <span className='text-accentPrimary font-serif'>{'>>>'}</span>
          <br />
          Learn everything about <br /> video encoding
        </h2>
        <h1 className='text-5xl sm:text-8xl italic font-bold font-serif pt-32 sm:pb-56'>
          Video Encoding <br /> Course
        </h1>
      </section>
      <section className=' py-16 sm:py-32 flex flex-col items-center '>
        <hr className=' border-t-1 border-bgSecondary w-1/3' />
        <h3 className='text-center  text-xl sm:text-3xl italic my-12 sm:my-16'>
          Learning material <br />
          from the Pompeu Fabra University <br />
          course taught by Javi Brines
        </h3>
        <hr className=' border-t-1 border-bgSecondary w-1/3' />
      </section>
      <section className='mt-0 flex flex-col items-center '>
        <h3 className='font-bold text-4xl mb-8 italic font-serif'>Last updates</h3>
        <ul>
          {docs?.slice(0, 3).map((item) => (
            <li key={item.filePath} className='mb-6'>
              <small className='text-lg text-textSecondary italic font-serif font-bold'>
                {item.data.update}
              </small>
              <Link as={`/theory/${item.filePath.replace(/\.mdx?$/, '')}`} href={'/theory/[slug]'}>
                <a>
                  <h4 className='font-bold text-xl mb-2 link'>{item.data.title}</h4>
                </a>
              </Link>
              <p className='text-lg'>{item.data.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Homepage;

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
