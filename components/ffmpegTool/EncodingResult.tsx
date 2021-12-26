import { FC } from 'react';

import { comparePercentageSizeChange, formatBytes } from '../../utils/formatBytes';
import { VideoOrImageDisplay } from './VideoOrImageDisplay';

interface EncodingResultProps {
  uploadedFile: File | null;
  transcodedFile: File | null;
  transcodedSrc: string;
}

export const EncodingResult: FC<EncodingResultProps> = ({
  uploadedFile,
  transcodedFile,
  transcodedSrc
}) => {
  const isTranscodedSmaller = (transcodedFile?.size ?? 0) < (uploadedFile?.size ?? 0);

  return (
    <div className='relative min-w-256 w-96 flex flex-col justify-center'>
      <h2 className='font-serif text-xl text-center mb-4'>
        Completed! <br /> Your video is
        <i
          className={`${isTranscodedSmaller ? 'text-accentSecondary' : 'text-accentPrimary'} ml-1`}>
          {comparePercentageSizeChange(uploadedFile?.size ?? 0, transcodedFile?.size ?? 0)}
        </i>
      </h2>
      <div className='flex items-center justify-center gap-8'>
        <VideoOrImageDisplay fulltype={transcodedFile?.type} src={transcodedSrc} />

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
};
