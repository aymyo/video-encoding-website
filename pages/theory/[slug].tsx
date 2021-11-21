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
    <Layout mainClass='full-container grid md:grid-cols-4 gap-x-4 relative'>
      <div className='order-1 md:col-start-2 mb-16 mt-8 col-span-3'>
        <h1 className='font-bold font-serif text-3xl md:text-5xl '>{frontMatter.title}</h1>
        {/*<p className='font-lg'>{frontMatter.summary}</p>*/}
        <small className='text-textSecondary font-serif font-normal text-lg italic mb-8'>
          Last update on: <b>{frontMatter.update}</b>
        </small>
      </div>
      <SideMenu items={docs} title='Content' currentSlug={slug} />
      <main className='order-3 col-span-3'>
        <MDXRemote {...source} components={components} />
        <DocNav slug={slug} docs={docs} currentSection='theory' />
      </main>
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
