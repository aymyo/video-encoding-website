import { GetServerSideProps, NextPage } from 'next';

import { videoFilePaths } from '../../utils/mdxUtils';

const VideoRedirectPage: NextPage = () => {
  return null;
};

export default VideoRedirectPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/video-lessons/${videoFilePaths[0].slice(0, -4)}`
    },
    props: {}
  };
};
