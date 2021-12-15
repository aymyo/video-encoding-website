import { GetServerSideProps, NextPage } from 'next';

import { theoryFilePaths } from '../../utils/mdxUtils';

const TheoryRedirectPage: NextPage = () => {
  return <>{theoryFilePaths}</>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  console.log(theoryFilePaths);

  return {
    redirect: {
      destination: `/theory/${theoryFilePaths[0].slice(0, -4)}`,
      permanent: true
    },
    props: {}
  };
};

export default TheoryRedirectPage;
