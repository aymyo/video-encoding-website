import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { NextPage } from 'next';
import { useState } from 'react';
import Layout from '../components/Layout';
import Script from 'next/script';
import { mdxDoc } from '../utils/mdxUtils';

interface PlaygroundProps {
  docs: mdxDoc[];
}

const Playground: NextPage<PlaygroundProps> = ({ docs }) => {
  const [videoSrc, setVideoSrc] = useState('/test.avi');
  const [message, setMessage] = useState('Click Start to transcode');
  const ffmpeg = createFFmpeg({
    log: true
  });
  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');
    ffmpeg.FS('writeFile', 'test.avi', await fetchFile('/test.avi'));
    await ffmpeg.run('-i', 'test.avi', 'test.mp4');
    setMessage('Complete transcoding');
    const data = ffmpeg.FS('readFile', 'test.mp4');
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  };
  return (
    <>
      <Layout>
        <main className='responsive-full'>
          <video src={videoSrc} controls></video>
          <button onClick={doTranscode}>Start</button>
          <p>{message}</p>
        </main>
      </Layout>
    </>
  );
};

export default Playground;
