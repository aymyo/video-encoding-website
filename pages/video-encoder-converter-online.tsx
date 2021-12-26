import { NextPage } from 'next';

import FfmpegTool from '../components/ffmpegTool/FfmpegTool';
import Layout from '../components/layouts/Layout';

const WebTools: NextPage = () => {
  return (
    <Layout>
      <img
        alt=''
        src='/img/hero.svg'
        width='512px'
        className='opacity-50 absolute top-40 z-0 right-0 -mr-96 lg:-mr-64 xl:-mr-54'
      />
      <img
        alt=''
        src='/img/hero.svg'
        width='512px'
        className='opacity-50 absolute top-40 z-0 left-0  -ml-96 lg:-ml-64 xl:-ml-54'
      />
      <FfmpegTool />
    </Layout>
  );
};

export default WebTools;
