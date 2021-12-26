/* eslint-disable jsx-a11y/anchor-has-content */
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { FC, useEffect, useState } from 'react';

import { EncodingProgress } from './EncodingProgress';
import { EncodingResult } from './EncodingResult';
import { InputBox } from './InputBox';
import { SettingsForm } from './SettingsForm';
import { ToolDescription } from './ToolDescription';

export const mimeTypes = {
  ['']: 'error',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  mpeg: 'video/mpeg',
  mp4: 'video/mp4',
  avi: 'video/x-msvideo',
  flv: 'video/x-flv',
  mov: 'video/quicktime',
  wmv: 'video/x-ms-wmv',
  webm: 'video/webm'
};

export interface FfmpegOutputArgs {
  resolution: string;
  format: keyof typeof mimeTypes;
}

const FfmpegTool: FC = () => {
  const [transcodedFile, setTranscodedFile] = useState<File | null>(null);
  const [transcodedSrc, setTranscodedSrc] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [ffmpegOutputArgs, setFfmpegOutputArgs] = useState<FfmpegOutputArgs>({
    resolution: '',
    format: 'mp4'
  });
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

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
    if (!errorMsg)
      setErrorMsg('There is an issue with the SharedArrayBuffer, reload and try again');
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
    if (uploadedFile) ffmpeg.FS('writeFile', uploadedFile.name, await fetchFile(uploadedFile));

    try {
      setMessage('Transcoding...');
      const ffmpegCommand = ['-i', uploadedFile?.name ?? 'input', '-c:a', 'copy'];

      if (ffmpegOutputArgs.resolution) ffmpegCommand.push(...['-vf', ffmpegOutputArgs.resolution]);

      ffmpegCommand.push(`test.${ffmpegOutputArgs.format}`);

      await ffmpeg.run(...ffmpegCommand);

      const data = ffmpeg.FS('readFile', `test.${ffmpegOutputArgs.format}`);
      const transcodedFile = new File(
        [data.buffer],
        `vce_${uploadedFile?.name.split('.')[0]}.${ffmpegOutputArgs.format}`,
        {
          type: mimeTypes[ffmpegOutputArgs.format]
        }
      );
      setMessage('Transcoding completed');
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

  const CurrentStep = () =>
    !uploadedFile ? (
      <ToolDescription />
    ) : uploadedFile && progress === 0 ? (
      <SettingsForm
        uploadedFile={uploadedFile}
        message={message}
        doTranscode={doTranscode}
        ffmpegOutputArgs={ffmpegOutputArgs}
        setFfmpegOutputArgs={setFfmpegOutputArgs}
      />
    ) : uploadedFile && progress !== 0 && progress !== 100 ? (
      <EncodingProgress message={message} progress={progress} />
    ) : (
      <EncodingResult
        uploadedFile={uploadedFile}
        transcodedFile={transcodedFile}
        transcodedSrc={transcodedSrc}
      />
    );

  return (
    <div className='min-h-screen relative z-10'>
      <h1 className='text-5xl sm:text-6xl italic font-bold font-serif py-0 sm:py-8 text-center '>
        Video encoder
      </h1>
      <div className='flex items-center justify-center gap-16 mt-16 flex-wrap-reverse mb-16'>
        <InputBox uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} ffmpeg={ffmpeg} />
        <CurrentStep />
      </div>
      {errorMsg && (
        <div className='flex justify-center italic items-center'>
          <p className='text-accentPrimary text-lg font-bold mr-2'>Warning:</p>
          <p>{errorMsg}</p>
          <button
            onClick={() => {
              //Dirty workaround to empty memory
              window.location.reload();
            }}
            className='btn text-sm ml-2'>
            &#8634; Reload
          </button>
        </div>
      )}
    </div>
  );
};

export default FfmpegTool;
