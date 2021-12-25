import { FC } from 'react';

interface YoutubeEmbedProps {
  videoID: string;
}

const YoutubeEmbed: FC<YoutubeEmbedProps> = ({ videoID }) => {
  return (
    <>
      <div className='w-full mb-4 overflow-hidden relative h-0 rounded-md z-0'>
        <iframe
          src={`https://www.youtube.com/embed/${videoID}?wmode=opaque`}
          className='left-0 top-0 h-full w-full absolute z-0'
          width='853'
          height='480'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Embedded youtube video'></iframe>
      </div>
      <style jsx>{`
        div {
          padding-bottom: 56.25%;
        }
      `}</style>
    </>
  );
};

export default YoutubeEmbed;
