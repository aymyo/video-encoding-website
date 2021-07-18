import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, NextPage } from 'next';
import path from 'path';

import HeroSection from '../components/HeroSection';
import LastUpdates from '../components/LastUpdates';
import LateralSection from '../components/LateralSection';
import Layout from '../components/Layout';
import { mdxDoc, THEORY_PATH, theoryFilePaths } from '../utils/mdxUtils';

interface HomepageProps {
  docs: mdxDoc[];
}

const Homepage: NextPage<HomepageProps> = ({ docs }) => {
  return (
    <Layout>
      <HeroSection />
      <LateralSection
        title='Learn about video compression '
        subtitle='Qui sit larum in. Ullà ut desjuntá mangar eum sink molestia id commove. Provident asede seque sed eos.'
        cta='Read the theory'
        href='/theory'
        side='left'
      />
      <LateralSection
        title='Learn about video compression '
        subtitle='Qui sit eared in. Ululas ut desjunte mangad eum sink molleta id commons. Provident skep seque sed eos.'
        cta='Read the theory'
        href='/theory'
        side='right'
      />
      <LastUpdates items={docs} />
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
