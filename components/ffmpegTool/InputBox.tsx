/* eslint-disable jsx-a11y/media-has-caption */
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { formatBytes } from '../../utils/formatBytes';
import { VideoOrImageDisplay } from './VideoOrImageDisplay';

interface InputBoxProps {
  uploadedFile: File | null;
  setUploadedFile: Dispatch<SetStateAction<File | null>>;
  ffmpeg: FFmpeg;
}

export const InputBox: FC<InputBoxProps> = ({ uploadedFile, setUploadedFile, ffmpeg }) => {
  const [uploadedSrc, setUploadedSrc] = useState('');

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(uploadedSrc);
    },
    [uploadedSrc]
  );

  const doSample = async () => {
    await ffmpeg.load();

    try {
      ffmpeg.FS('writeFile', 'test.webm', await fetchFile('/test.webm'));
      const data = ffmpeg.FS('readFile', 'test.webm');
      const sampleFile = new File([new Blob([data.buffer], { type: 'video/webm' })], 'test.webm');
      setUploadedFile(sampleFile);
      setUploadedSrc('/test.webm');
      console.log(sampleFile);
    } catch (e) {
      console.log('Error in transcoding ' + e);
    }
  };

  const Box: FC = ({ children }) => {
    return (
      <div className='relative min-w-min'>
        <span
          className={`pointer-events-none w-full absolute h-60 bottom-1 right-1 border border-${
            uploadedFile ? 'solid' : 'dashed'
          } rounded border-accentPrimary`}></span>
        <span
          className={`pointer-events-none w-full absolute h-60 bottom-2 right-2 border border-${
            uploadedFile ? 'solid' : 'dashed'
          } rounded border-accentPrimary`}></span>
        <div
          className={`w-96 h-60 bg-bgPrimary border border-${
            uploadedFile ? 'solid' : 'dashed'
          } rounded border-accentPrimary flex flex-col justify-around`}>
          {children}
        </div>
      </div>
    );
  };

  return !uploadedFile ? (
    <Box>
      <VideoUploader
        doSample={doSample}
        setUploadedSrc={setUploadedSrc}
        setUploadedFile={setUploadedFile}
      />
    </Box>
  ) : (
    <Box>
      <VideoDetails uploadedFile={uploadedFile} uploadedSrc={uploadedSrc} />
    </Box>
  );
};

interface VideoUploaderProps {
  doSample: () => Promise<void>;
  setUploadedSrc: Dispatch<SetStateAction<string>>;
  setUploadedFile: Dispatch<SetStateAction<File | null>>;
}

const VideoUploader: FC<VideoUploaderProps> = ({ doSample, setUploadedSrc, setUploadedFile }) => {
  const { getRootProps, getInputProps } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    multiple: false,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setUploadedSrc(URL.createObjectURL(acceptedFiles[0]));
      setUploadedFile(acceptedFiles[0]);
    }
  });
  return (
    <>
      <div className='flex items-center justify-center gap-4 text-sm mt-12'>
        <button className='btn font-normal' onClick={doSample}>
          &gt; Use sample
        </button>
        <p className='font-serif text-accentPrimary italic'>or</p>
        <label htmlFor='uploader' className='btn cursor-pointer font-normal'>
          &gt; Upload video
        </label>
        <input id='uploader' className=' hidden' {...getInputProps()} />
      </div>
      <div
        {...getRootProps()}
        className='h-32 flex justify-center items-center text-center font-serif text-accentPrimary italic'>
        or drop them here!
      </div>
    </>
  );
};

interface VideoDetailsProps {
  uploadedFile: File;
  uploadedSrc: string;
}

const VideoDetails: FC<VideoDetailsProps> = ({ uploadedFile, uploadedSrc }) => {
  return (
    <>
      <h2 className='font-serif text-xl text-center italic text-accentPrimary'>Input file</h2>
      <div className='flex items-center justify-center gap-8 px-4 mb-6'>
        <VideoOrImageDisplay
          fulltype={uploadedFile.type !== '' ? uploadedFile.type : 'video/webm'}
          src={uploadedSrc}
        />
        <div className='flex flex-col items-start gap-2'>
          <ol className='list-circle text-accentPrimary text-xs'>
            <li className='ml-4'>
              Name: <i className='text-textPrimary'>{uploadedFile.name} </i>
            </li>
            <li className='ml-4'>
              Size: <i className='text-textPrimary'>{formatBytes(uploadedFile.size)}</i>
            </li>
            <li className='ml-4'>
              Format:{' '}
              <i className='text-textPrimary'>
                {uploadedFile.type !== '' ? uploadedFile.type : 'video/webm'}
              </i>
            </li>
          </ol>
          <button
            onClick={() => {
              //Dirty workaround to empty memory
              window.location.reload();
              // test LO DEL WEB WORKER
            }}
            className='btn text-sm'>
            &gt; Restart
          </button>
        </div>
      </div>
    </>
  );
};
