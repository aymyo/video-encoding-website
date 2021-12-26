/* eslint-disable jsx-a11y/media-has-caption */
import { fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { formatBytes } from '../../utils/formatBytes';
import { VideoOrImageDisplay } from './VideoOrImageDisplay';

interface VideoUploaderProps {
  uploadedFile: File | null;
  setUploadedFile: Dispatch<SetStateAction<File | null>>;
  ffmpeg: FFmpeg;
}

export const VideoUploader: FC<VideoUploaderProps> = ({
  uploadedFile,
  setUploadedFile,
  ffmpeg
}) => {
  const [uploadedSrc, setUploadedSrc] = useState('');
  const { getRootProps, getInputProps } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setUploadedSrc(URL.createObjectURL(acceptedFiles[0]));
      setUploadedFile(acceptedFiles[0]);
    }
  });

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
      <div className='flex items-center justify-center gap-4 text-sm mt-12'>
        <button className='btn font-normal' onClick={doSample}>
          &gt; Use sample
        </button>
        <p className='font-serif text-accentPrimary italic'>or</p>
        <label htmlFor='uploader' className='btn cursor-pointer font-normal'>
          &gt; Upload video
        </label>
        <input type='file' id='uploader' className=' hidden' {...getInputProps()} />
      </div>
      <div
        className='h-32 flex justify-center items-center text-center font-serif text-accentPrimary italic'
        {...getRootProps()}>
        or drop them here!
      </div>
    </Box>
  ) : (
    <Box>
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
    </Box>
  );
};
