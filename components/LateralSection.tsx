import { FC } from 'react';
import Link from 'next/link';

interface LateralSectionProps {
  side: 'right' | 'left';
  title: string;
  subtitle: string;
  href: string;
  cta: string;
}

const LateralSection: FC<LateralSectionProps> = ({ title, subtitle, href, cta, side }) => {
  const isRight = 'right' === side;

  return (
    <section
      className={`mt-0 sm:mt-16 responsive-contained flex flex-col ${
        isRight ? 'sm:flex-row-reverse' : 'sm:flex-row'
      } items-center text-left justify-between`}>
      <div
        className={`w-full items-center mb-8 sm:mb-0 px-0 ${isRight && 'sm:pl-16'} ${
          !isRight && 'sm:pr-16'
        }`}>
        <h2 className='font-bold text-3xl mb-4'>{title}</h2>
        <p className='mb-4'>{subtitle}</p>
        <Link href={href}>
          <a className='btn'>{cta}</a>
        </Link>
      </div>
      <div className='w-full h-64 flex items-center text-center bg-gray-300'>
        <img></img>
      </div>
    </section>
  );
};

export default LateralSection;
