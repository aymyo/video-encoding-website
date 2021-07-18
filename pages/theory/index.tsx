import { theoryFilePaths } from '../../utils/mdxUtils';

export default function TheoryRedirectPage() {
  return null;
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: `/theory/${theoryFilePaths[0].slice(0, -4)}`
    }
  };
};
