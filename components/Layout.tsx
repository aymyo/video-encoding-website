import Navbar from './Navbar';
import Footer from './Footer';
import { FC } from 'react';

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
