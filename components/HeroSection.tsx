import { FC } from 'react';

const HeroSection: FC = () => {
  return (
    <section className='py-6 mb-4 bg-red-300 responsive-contained flex flex-col items-center text-center'>
      <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-16 mb-8'>
        Video Encoding Course
      </h1>
      <p className='text-xl md:text-2xl mb-16'>
        All information related to the video part of the Image and Video Encoding Systems subject at
        Pompeu Fabra University in Barcelona
      </p>
    </section>
  );
};

export default HeroSection;
