/* eslint-disable jsx-a11y/media-has-caption */
import { FC } from 'react';

interface VideoOrImageDisplayProps {
  fulltype: string | undefined;
  src: string;
  className?: string;
}

export const VideoOrImageDisplay: FC<VideoOrImageDisplayProps> = ({
  fulltype,
  src,
  className = 'w-40 rounded bg-bgSecondary'
}) => {
  const simpletype = fulltype?.split('/')[0];
  if (
    fulltype === 'video/x-msvideo' ||
    fulltype === 'video/x-ms-wmv' ||
    fulltype === 'video/x-flv' ||
    fulltype === 'video/mpeg' ||
    fulltype === 'video/quicktime'
  ) {
    return (
      <div
        className={`${className} bg-textPrimary py-7 px-2 italic text-xs text-center text-neutral-500`}>
        This format cannot be played in the browser
      </div>
    );
  } else if (simpletype === 'video') {
    return (
      <video src={src} controls className={className}>
        Sorry, your browser does not support embedded videos.
      </video>
    );
  } else if (simpletype === 'image') {
    return <img src={src} className={className} alt='encoded output'></img>;
  } else {
    return (
      <div
        className={`${className} bg-textPrimary py-7 px-2 italic text-xs text-center text-neutral-500`}>
        This format may not be supported
      </div>
    );
  }
};
