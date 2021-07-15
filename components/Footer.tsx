import Image from 'next/image';
import { FC } from 'react';

import NavLink from './NavLink';

const Footer: FC = () => (
  <footer className=''>
    <div className=''>
      <small>
        Desarrollado por{' '}
        <a href='https://github.com/aymyo' rel='noreferrer' target='_blank'>
          @aymyo
        </a>
      </small>
    </div>
    <div>
      <h6 className='subtitle'>Menú</h6>
      <nav>
        <NavLink href='/'>Inicio</NavLink>
        <NavLink href='/acerca'>Acerca</NavLink>
        <NavLink href='/participa'>Participa</NavLink>
        <NavLink href='/contacto'>Contacto</NavLink>
      </nav>
    </div>
    <div>
      <h6 className='subtitle'>Sectores</h6>
      <nav>
        <NavLink href='/sector/alimentacion'>Alimentación</NavLink>
        <NavLink href='/sector/moda'>Moda</NavLink>
        <NavLink href='/sector/tecnologia'>Tecnología</NavLink>
      </nav>
    </div>
    <div>
      <h6 className='subtitle'>Recursos</h6>
      <nav>
        <NavLink href='/directorio'>Directorio</NavLink>
        <NavLink href='/preguntas-frecuentes'>Preguntas frecuentes</NavLink>
        <NavLink href='https://wikirate.org/'>Wikirate.org</NavLink>
      </nav>
    </div>
    <div>
      <h6 className='subtitle'>Legal</h6>
      <nav>
        <NavLink href='/cookies'>Cookies</NavLink>
        <NavLink href='/politica-de-privacidad'>Política de privacidad</NavLink>
      </nav>
    </div>
  </footer>
);
export default Footer;
