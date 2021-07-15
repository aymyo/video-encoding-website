import Link from 'next/link';
import { FC } from 'react';

type PropsNavLink = {
  href: string;
  path?: string;
  className?: string;
};

const NavLink: FC<PropsNavLink> = ({ className, path, href, children }) => {
  const isCurrent = path === href ? true : false;

  return (
    <Link href={href}>
      <a className={className} data-current={isCurrent}>
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
