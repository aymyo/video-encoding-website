import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

import CustomLink from '../../components/CustomLink';
import DocNav from '../../components/DocNav';
import Layout from '../../components/Layout';
import SideMenu from '../../components/SideMenu';
import { mdxDoc, THEORY_PATH, theoryFilePaths } from '../../utils/mdxUtils';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head
};

interface TheoryPageProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  frontMatter: {
    [key: string]: string;
  };
  docs: mdxDoc[];
  slug: string;
}

const TheoryPage: NextPage<TheoryPageProps> = ({ source, frontMatter, docs, slug }) => {
  return (
    <Layout>
      <div className='flex flex-col md:flex-row'>
        <SideMenu items={docs} title='Theory Lessons' currentSlug={slug} />
        <div className='readable responsive-full'>
          <div>
            <small className='opacity-60 mb-8'>Last update on: {frontMatter.update}</small>
            <h1 className='font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl mb-4'>
              {frontMatter.title}
            </h1>
            <p className='opacity-60 mb-8'>{frontMatter.summary}</p>
          </div>
          <main>
            <MDXRemote {...source} components={components} />
          </main>

          <DocNav slug={slug} docs={docs} currentSection='theory' />
        </div>
      </div>
    </Layout>
  );
};

export default TheoryPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(THEORY_PATH, `${params?.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: []
    },
    scope: data
  });

  const docs: mdxDoc[] = theoryFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(THEORY_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath
    };
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      docs,
      slug: params?.slug
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = theoryFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false
  };
};
