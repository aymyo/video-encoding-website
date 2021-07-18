/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link';
import { FC } from 'react';

interface CustomLinkProps {
  as: string;
  href: string;
  otherProps: {
    [key: string]: string;
  };
}

const CustomLink: FC<CustomLinkProps> = ({ as, href, ...otherProps }) => {
  return (
    <>
      <Link as={as} href={href}>
        <a {...otherProps} />
      </Link>
      <style jsx>{`
        a {
          color: tomato;
        }
      `}</style>
    </>
  );
};

export default CustomLink;
