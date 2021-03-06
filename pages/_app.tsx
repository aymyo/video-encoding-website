import 'highlight.js/styles/stackoverflow-dark.css';
import '../styles/globals.css';
import '@fontsource/source-sans-pro'; // Defaults to weight 400 with normal variant.
import '@fontsource/playfair-display'; // Defaults to weight 400 with normal variant.
import '@fontsource/playfair-display/700-italic.css'; // Defaults to weight 400 with normal variant.
import '@fontsource/playfair-display/400-italic.css'; // Defaults to weight 400 with normal variant.
import '@fontsource/source-code-pro';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
