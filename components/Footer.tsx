import Image from 'next/image';
import { FC } from 'react';

import Link from 'next/link';

const Footer: FC = () => (
  <footer className='h-auto py-4 sm:py-6 px-8 lg:px-16 xl:px-64 xl2:px-96 bg-gray-800 text-white'>
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
        <Link href='/'>Inicio</Link>
        <Link href='/acerca'>Acerca</Link>
        <Link href='/participa'>Participa</Link>
        <Link href='/contacto'>Contacto</Link>
      </nav>
    </div>
    <div>
      <h6 className='subtitle'>Sectores</h6>
      <nav>
        <Link href='/sector/alimentacion'>Alimentación</Link>
        <Link href='/sector/moda'>Moda</Link>
        <Link href='/sector/tecnologia'>Tecnología</Link>
      </nav>
    </div>
    <div>
      <h6 className='subtitle'>Recursos</h6>
      <nav>
        <Link href='/directorio'>Directorio</Link>
        <Link href='/preguntas-frecuentes'>Preguntas frecuentes</Link>
        <Link href='https://wikirate.org/'>Wikirate.org</Link>
      </nav>
    </div>
    <div>
      <h6 className='subtitle'>Legal</h6>
      <nav>
        <Link href='/cookies'>Cookies</Link>
        <Link href='/politica-de-privacidad'>Política de privacidad</Link>
      </nav>
    </div>
  </footer>
);
export default Footer;
