import Link from 'next/link';
import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout>
      <h1>404 - Page not found</h1>
      <a href='/' className=''>
        Click here to go to the homepage
      </a>
    </Layout>
  );
}
