import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { NextPage } from 'next';
import { formatBytes } from '../utils/formatBytes';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { mdxDoc } from '../utils/mdxUtils';
import { useDropzone } from 'react-dropzone';
import VideoEncoderTool from '../components/VideoEncoderTool';

interface WebToolsProps {
  docs: mdxDoc[];
}

const WebTools: NextPage<WebToolsProps> = ({ docs }) => {
  return (
    <Layout>
      <img
        src='/img/hero.svg'
        width='512px'
        className='opacity-50 absolute top-40 z-0 right-0 -mr-96 lg:-mr-64 xl:-mr-54'
      />
      <img
        src='/img/hero.svg'
        width='512px'
        className='opacity-50 absolute top-40 z-0 left-0  -ml-96 lg:-ml-64 xl:-ml-54'
      />
      <VideoEncoderTool />
    </Layout>
  );
};

export default WebTools;
