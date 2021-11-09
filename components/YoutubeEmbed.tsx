import { FC } from 'react';

interface YoutubeEmbedProps {
  videoID: string;
}

const YoutubeEmbed: FC<YoutubeEmbedProps> = ({ videoID }) => {
  return (
    <>
      <div className='w-full overflow-hidden relative h-0 rounded-md'>
        <iframe
          className='left-0 top-0 h-full w-full absolute'
          width='853'
          height='480'
          src={`https://www.youtube.com/embed/${videoID}`}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Embedded youtube'
        ></iframe>
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
