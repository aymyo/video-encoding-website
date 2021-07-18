import fs from 'fs';
import path from 'path';

// POSTS_PATH is useful when you want to get the path to a specific file
export const THEORY_PATH = path.join(process.cwd(), 'docs/theory');
export const VIDEO_PATH = path.join(process.cwd(), 'docs/video-lessons');

// theoryFilePaths is the list of all mdx files inside the THEORY_PATH directory
export const theoryFilePaths = fs
  .readdirSync(THEORY_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

// videoFilePaths is the list of all mdx files inside the VIDEO_PATH directory
export const videoFilePaths = fs
  .readdirSync(VIDEO_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export interface mdxDoc {
  content: string;
  data: {
    [key: string]: any;
  };
  filePath: string;
}
