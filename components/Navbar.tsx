import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import NavLink from './NavLink';

const Navbar: FC = () => {
  const currentPath = useRouter().pathname;
  const [isVisible, setVisibility] = useState(false);
  const [isSubNavVisible, setSubNavVisibility] = useState(false);

  useEffect(() => {
    document.body.style.position = isVisible ? 'fixed' : 'relative';
  }, [isVisible, isSubNavVisible]);

  return (
    <header id='navbar' className='flex flex-wrap items-center justify-between p-5 bg-blue-200'>
      <Link href='/'>
        <a className=''>Video Encoding UPF</a>
      </Link>

      <nav className='' data-visible={isVisible}>
        <NavLink href='/' path={currentPath} className=''>
          Inicio
        </NavLink>

        <NavLink href='/acerca' path={currentPath}>
          Acerca
        </NavLink>

        <NavLink href='/participa' path={currentPath}>
          Participa
        </NavLink>

        <NavLink href='/contacto' path={currentPath}>
          Contacto
        </NavLink>
      </nav>

      <button className='' aria-label='Toggle Menu' onClick={() => setVisibility(!isVisible)}>
        {/*<FontAwesomeIcon icon={isVisible ? faTimes : faBars} />*/}
      </button>
    </header>
  );
};
export default Navbar;
