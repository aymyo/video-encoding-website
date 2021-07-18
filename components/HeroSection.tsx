import { FC } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <section className='mb-4 bg-red-300 responsive-contained md:py-24 flex flex-col items-center text-center'>
      <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-16 mb-8'>{title}</h1>
      <p className='text-xl md:text-2xl mb-16'>{subtitle}</p>
    </section>
  );
};

export default HeroSection;
