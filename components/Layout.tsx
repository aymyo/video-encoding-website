import { FC } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout: FC = ({ children }) => {
  return (
    <div className='bg-bgPrimary'>
      <Navbar />
      <main className='h-auto min-h-screen'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
