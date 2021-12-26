import { FC } from 'react';

interface EncodingProgressProps {
  message: string;
  progress: number;
}

export const EncodingProgress: FC<EncodingProgressProps> = ({ progress, message }) => {
  return (
    <div className='relative min-w-256 w-96 flex flex-col justify-center'>
      <h2 className='font-serif text-xl text-center'>Transcoding in process</h2>
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
};
