import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Link from 'next/link';
import path from 'path';

import SideMenu from '../../components/SideMenu';
import CustomLink from '../../components/CustomLink';
import Layout from '../../components/Layout';
import { mdxDoc, theoryFilePaths, THEORY_PATH } from '../../utils/mdxUtils';

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
    [key: string]: any;
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

          <nav className='flex justify-between mt-64'>
            <Link href='/'>
              <a>👈 Previous</a>
            </Link>
            <Link
              href={`https://github.com/aymyo/video-encoding-website/blob/main/docs/${slug}.mdx`}>
              <a className='flex items-center'>
                <p className='mr-2'>
                  Is there any error?
                  <br />
                  Fix it on Github
                </p>
                <svg height='32' viewBox='0 0 16 16' version='1.1' width='32' aria-hidden='true'>
                  <path
                    fillRule='evenodd'
                    d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'></path>
                </svg>
              </a>
            </Link>
            <Link href='/'>
              <a>Next 👉</a>
            </Link>
          </nav>
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
