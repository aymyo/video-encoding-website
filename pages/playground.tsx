import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { NextPage } from 'next';
import { formatBytes } from '../utils/formatBytes';
import { useState } from 'react';
import Layout from '../components/Layout';
import Script from 'next/script';
import { mdxDoc } from '../utils/mdxUtils';

interface PlaygroundProps {
  docs: mdxDoc[];
}

const Playground: NextPage<PlaygroundProps> = ({ docs }) => {
  const [videoSrc, setVideoSrc] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('Click Start to transcode');
  const [progress, setProgress] = useState(0);

  let ffmpeg = createFFmpeg({
    log: true,
    progress: (p) => {
      setProgress(Math.max(0, Math.floor(p.ratio * 100)));
    }
  });

  try {
    var a = SharedArrayBuffer;
  } catch (e) {
    console.log(e instanceof ReferenceError); // true
  }

  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    try {
      await ffmpeg.load();
    } catch (e) {
      setMessage('Error loading ffmpeg-core.js');
      throw e;
    }

    setMessage('Loading file');
    if (!uploadedFile) ffmpeg.FS('writeFile', 'test.avi', await fetchFile('/test.avi'));
    if (uploadedFile) ffmpeg.FS('writeFile', 'test.avi', await fetchFile(uploadedFile));

    try {
      setMessage('Transcoding...');
      await ffmpeg.run('-i', 'test.avi', 'test.mp4');
      setMessage('Transcoding completed');
      const data = ffmpeg.FS('readFile', 'test.mp4');
      setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
    } catch (e) {
      setMessage('Error in transcoding ' + e);
    }
  };

  return (
    <Layout>
      <main className='responsive-full'>
        <div className='w-100 flex justify-center'>
          <label htmlFor='uploader' className='btn'>
            Upload your video
          </label>
          <input
            type='file'
            id='uploader'
            className=' hidden'
            onChange={(e) => setUploadedFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        {uploadedFile ? (
          <p className='my-3 flex justify-center'>
            {uploadedFile.name}, {formatBytes(uploadedFile.size)}, {uploadedFile.type}.
          </p>
        ) : (
          ''
        )}
        <video src={videoSrc} controls className='mx-auto my-8'></video>
        <div className='mb-8 flex justify-center'>
          <div className='w-64'>
            <p className='text-center'>{progress} %</p>
            <div className='my-2 h-2 w-100 bg-gray-100 rounded-lg'>
              <div
                className='h-2 w-0 bg-red-900 rounded-lg'
                style={{ minWidth: `${progress}%` }}></div>
            </div>
            <p className='text-center'>{message}</p>
          </div>
        </div>
        <div className='flex align-middle justify-center'>
          {progress === 0 ? (
            <button onClick={doTranscode} className='mr-4 btn'>
              Start
            </button>
          ) : (
            <button
              onClick={() => {
                //Dirty workaround to empty memory
                window.location.reload();
                // PROBAR LO DEL WEB WORKER
              }}
              className='mr-4 btn'>
              Reload
            </button>
          )}

          <a href={videoSrc} download className='btn'>
            Download Me!
          </a>
        </div>
      </main>
    </Layout>
  );
};

export default Playground;
