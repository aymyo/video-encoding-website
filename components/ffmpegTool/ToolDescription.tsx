import { FC } from 'react';

export const ToolDescription: FC = () => {
  return (
    <div className='relative min-w-256 w-96 flex flex-col justify-start'>
      <h2 className='font-serif text-xl text-left mb-4'>
        This web tool uses the <br />
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
        <li className='text-accentPrimary mt-6 font-serif font-bold'>
          Disclaimer: The library used is still in early stages of development, so errors may occur.
        </li>
      </ul>
    </div>
  );
};
