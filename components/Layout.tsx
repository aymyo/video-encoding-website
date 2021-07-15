import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <div className='wrapper'>
        <Navbar />
        <div className='h-auto min-h-screen py-4 sm:py-6 px-8 lg:px-16 xl:px-64 xl2:px-96'>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
