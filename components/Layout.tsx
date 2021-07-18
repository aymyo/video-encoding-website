import { FC } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout: FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='h-auto min-h-screen'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
