/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/anchor-has-content */
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { formatBytes } from '../utils/formatBytes';

const VideoEncoderTool: FC = () => {
  const [transcodedFile, setTranscodedFile] = useState<File | null>(null);
  const [transcodedSrc, setTranscodedSrc] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const ffmpeg = createFFmpeg({
    log: true,
    progress: (p) => {
      setProgress(Math.max(0, Math.floor(p.ratio * 100)));
    }
  });

  try {
    const a = SharedArrayBuffer;
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
    if (!uploadedFile) setMessage('Error loading file');
    if (uploadedFile) ffmpeg.FS('writeFile', 'test.avi', await fetchFile(uploadedFile));

    try {
      setMessage('Transcoding...');
      await ffmpeg.run('-i', 'test.avi', 'test.mp4');
      setMessage('Transcoding completed');
      const data = ffmpeg.FS('readFile', 'test.mp4');
      const transcodedFile = new File(
        [data.buffer],
        `vce_${uploadedFile?.name.split('.')[0]}.mp4`,
        {
          type: 'video/mp4'
        }
      );
      setTranscodedFile(transcodedFile);
      setTranscodedSrc(URL.createObjectURL(transcodedFile));
    } catch (e) {
      setMessage('Error in transcoding ' + e);
    }
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(transcodedSrc);
    },
    [transcodedSrc]
  );

  return (
    <div className=' min-h-screen relative z-10'>
      <h1 className='text-5xl sm:text-6xl italic font-bold font-serif py-0 sm:py-8 text-center '>
        Video encoder
      </h1>
      <div className='flex items-center justify-center gap-16 mt-16 flex-wrap-reverse mb-16'>
        <VideoUploader
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          ffmpeg={ffmpeg}
        />
        <VideoSettings
          uploadedFile={uploadedFile}
          transcodedFile={transcodedFile}
          transcodedSrc={transcodedSrc}
          doTranscode={doTranscode}
          progress={progress}
          message={message}
        />
      </div>
    </div>
  );
};

export default VideoEncoderTool;

interface VideoUploaderProps {
  uploadedFile: File | null;
  setUploadedFile: Dispatch<SetStateAction<File | null>>;
  ffmpeg: FFmpeg;
}

const VideoUploader: FC<VideoUploaderProps> = ({ uploadedFile, setUploadedFile, ffmpeg }) => {
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
      ffmpeg.FS('writeFile', 'test.avi', await fetchFile('/test.avi'));
      const data = ffmpeg.FS('readFile', 'test.avi');
      const sampleFile = new File([new Blob([data.buffer], { type: 'video/avi' })], 'test.avi');
      setUploadedFile(sampleFile);
      console.log(sampleFile);
    } catch (e) {
      console.log('Error in transcoding ' + e);
    }
  };

  const Box: FC = ({ children }) => {
    return (
      <div className='relative min-w-min'>
        <span
          className={`pointer-events-none w-full absolute h-52 bottom-1 right-1 border border-${
            uploadedFile ? 'solid' : 'dashed'
          } rounded border-accentPrimary`}></span>
        <span
          className={`pointer-events-none w-full absolute h-52 bottom-2 right-2 border border-${
            uploadedFile ? 'solid' : 'dashed'
          } rounded border-accentPrimary`}></span>
        <div
          className={`w-96 h-52 bg-bgPrimary border border-${
            uploadedFile ? 'solid' : 'dashed'
          } rounded border-accentPrimary flex flex-col justify-center`}>
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
      <div className='flex items-center justify-center gap-8 px-4'>
        <video src={uploadedSrc} controls className='w-40 rounded bg-bgSecondary'></video>
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
                {uploadedFile.type !== '' ? uploadedFile.type : 'video/avi'}
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

interface VideoSettingsProps {
  uploadedFile: File | null;
  transcodedFile: File | null;
  transcodedSrc: string;
  doTranscode: () => Promise<void>;
  progress: number;
  message: string;
}

const VideoSettings: FC<VideoSettingsProps> = ({
  uploadedFile,
  transcodedFile,
  transcodedSrc,
  doTranscode,
  progress,
  message
}) => {
  const isTranscodedSmaller = (transcodedFile?.size ?? 0) < (uploadedFile?.size ?? 0);

  if (!uploadedFile) {
    return (
      <div className='relative min-w-256 w-80 flex flex-col justify-start'>
        <h2 className='font-serif text-xl text-left mb-4'>
          This web tool uses the{' '}
          <a className='link' href='https://ffmpegwasm.netlify.app/'>
            ffmpeg.wasm
          </a>{' '}
          library to transcode video
        </h2>
        <ul>
          <li>
            <span className='text-accentPrimary font-serif mr-2'>{'>>>'}</span>
            Change the format
          </li>
          <li>
            <span className='text-accentPrimary font-serif mr-2'>{'>>>'}</span>
            Change the size
          </li>
          <li>
            <span className='text-accentPrimary font-serif mr-2'>{'>>>'}</span>
            Change the quality
          </li>
          <li className='text-accentPrimary mt-6 text-sm font-serif italic'>
            The library used is still in early stages of development, so errors may occur.
          </li>
        </ul>
      </div>
    );
  } else if (uploadedFile && progress === 0) {
    return (
      <div className='relative min-w-256 w-80 flex flex-col justify-center'>
        <h2 className='font-serif text-xl text-center mb-4'>Choose the parameters</h2>
        <form className='flex justify-center italic gap-4'>
          <div className='flex flex-col'>
            <label htmlFor='format' className='text-xs'>
              Format
            </label>
            <select name='Format' id='format' className='input'>
              <option value='MP4'>MP4</option>
              <option value='MP4'>MP4</option>
              <option value='MP4'>MP4</option>
              <option value='MP4'>MP4</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='resolution' className='text-xs'>
              Resolution
            </label>
            <select name='Resolution' id='resolution' className='input'>
              <option value='720'>720</option>
              <option value='MP4'>MP4</option>
              <option value='MP4'>MP4</option>
              <option value='MP4'>MP4</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='codec' className='text-xs'>
              Codec
            </label>
            <select name='Codec' id='codec' className='input'>
              <option value='H.264'>H.264</option>
              <option value='MP4'>MP4</option>
              <option value='MP4'>MP4</option>
              <option value='MP4'>MP4</option>
            </select>
          </div>
        </form>
        <small className='text-center text-xs text-textSecondary mt-4'>{message}</small>
        <button onClick={doTranscode} className='btn bg-bgPrimary self-center mt-20'>
          &gt; Start
        </button>
      </div>
    );
  } else if (uploadedFile && progress !== 0 && progress !== 100) {
    return (
      <div className='relative min-w-256 w-80 flex flex-col justify-center'>
        <h2 className='font-serif text-xl text-center mb-4'>Transcoding in process</h2>
        <div className='w-64 self-center mt-8 flex flex-col '>
          <p className='text-center font-serif italic text-xl font-bold'>{progress} %</p>
          <div className='my-1 h-2 w-100 border border-accentPrimary rounded-lg'>
            <div
              className='h-2 w-0 bg-accentPrimary rounded-lg'
              style={{ minWidth: `${progress}%` }}></div>
          </div>
          <small className='text-center text-xs text-textSecondary'>{message}</small>
        </div>
      </div>
    );
  } else {
    return (
      <div className='relative min-w-256 w-80 flex flex-col justify-center'>
        <h2 className='font-serif text-xl text-center mb-4'>
          Completed! <br /> Your video is
          <i
            className={`${
              isTranscodedSmaller ? 'text-accentSecondary' : 'text-accentPrimary'
            } ml-1`}>
            {comparePercentageSizeChange(uploadedFile.size, transcodedFile?.size ?? 0)}
          </i>
        </h2>
        <div className='flex items-center justify-center gap-8'>
          <video src={transcodedSrc} controls className='w-40 rounded bg-bgSecondary'></video>
          <ol className='list-circle text-accentPrimary text-xs'>
            <li className='ml-4'>
              Name: <i className='text-textPrimary'>{transcodedFile?.name}</i>
            </li>
            <li className='ml-4'>
              Size: <i className='text-textPrimary'>{formatBytes(transcodedFile?.size ?? 0)}</i>
            </li>
            <li className='ml-4'>
              Format: <i className='text-textPrimary'>{transcodedFile?.type}</i>
            </li>
          </ol>
        </div>
        <a
          href={transcodedSrc}
          download={transcodedFile?.name}
          className='btn self-center text-sm mt-5'>
          Download Me!
        </a>
      </div>
    );
  }
};

const comparePercentageSizeChange = (before: number, after: number): string => {
  if (before > after) return `now ${(100 - (after / before) * 100).toFixed(2)}% smaller`;
  else if (before < after) return `now ${((after / before) * 100 - 100).toFixed(2)}% larger`;
  else return 'the same size';
};
