import { FC } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  mainClass?: string;
}

const Layout: FC<LayoutProps> = ({ children, mainClass = 'full-container' }) => {
  return (
    <div className='bg-bgPrimary'>
      <Navbar />
      <main className={`h-auto min-h-screen py-4 ${mainClass}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
