import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import HeroSection from '../components/HeroSection';
import LastUpdates from '../components/LastUpdates';

import LateralSection from '../components/LateralSection';
import Layout from '../components/Layout';
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils';

export default function Index({ docs }): JSX.Element {
  return (
    <Layout>
      <HeroSection />
      <LateralSection
        title='Learn about video compression '
        subtitle='Qui sit earum in. Ullam ut deserunt magnam eum sint mollitia id commodi. Provident saepe neque sed eos.'
        cta='Read the theory'
        href='/theory'
        side='left'
      />
      <LateralSection
        title='Learn about video compression '
        subtitle='Qui sit earum in. Ullam ut deserunt magnam eum sint mollitia id commodi. Provident saepe neque sed eos.'
        cta='Read the theory'
        href='/theory'
        side='right'
      />
      <LastUpdates items={docs} />
    </Layout>
  );
}

export function getStaticProps() {
  const docs = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath
    };
  });

  return { props: { docs } };
}
