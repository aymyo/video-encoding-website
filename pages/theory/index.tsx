import { GetServerSideProps, NextPage } from 'next';

import { theoryFilePaths } from '../../utils/mdxUtils';

const TheoryRedirectPage: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/theory/${theoryFilePaths[0].slice(0, -4)}`,
      permanent: true
    },
    props: {}
  };
};

export default TheoryRedirectPage;
