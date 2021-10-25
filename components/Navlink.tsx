import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FC } from 'react';

interface NavLinkProps {
  href: string;
  anchorClassName?: string;
  text: string;
}

const NavLink: FC<NavLinkProps> = ({ anchorClassName = '', href, text }) => {
  const currentPath = useRouter().pathname;
  const checkCurrent = (path: string) => (currentPath == path ? 'underline' : '');

  return (
    <Link href={href}>
      <li className='list-none cursor-default flex flex-col justify-center'>
        <a className={`${checkCurrent(href)} cursor-pointer ${anchorClassName}`}>{text}</a>
      </li>
    </Link>
  );
};
export default NavLink;
