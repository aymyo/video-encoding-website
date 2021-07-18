import { videoFilePaths } from '../../utils/mdxUtils';

export default function VideoRedirectPage() {
  return null;
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: `/video-lessons/${videoFilePaths[0].slice(0, -4)}`
    }
  };
};
