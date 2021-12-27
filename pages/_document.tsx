import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render(): JSX.Element {
    return (
      <Html lang='en' dir='ltr'>
        <Head>
          <title>Video Encoding Course</title>
          <link rel='apple-touch-icon' sizes='180x180' href='/meta/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/meta/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/meta/favicon-16x16.png' />
          <link rel='manifest' href='/meta/site.webmanifest' />
          <link rel='mask-icon' href='/meta/safari-pinned-tab.svg' color='#ea5959' />
          <link rel='shortcut icon' href='/meta/favicon.ico' />
          <meta name='apple-mobile-web-app-title' content='Video Encoding Course' />
          <meta name='application-name' content='Video Encoding Course' />
          <meta name='msapplication-TileColor' content='#f9f2e7' />
          <meta name='msapplication-config' content='/meta/browserconfig.xml' />
          <meta name='theme-color' content='#f9f2e7' />

          <meta
            name='description'
            content='Learn everything about video encoding and modify video format with the web tool.'
          />

          <meta property='og:title' content='Video Encoding Course' />
          <meta property='og:image' content={`${process.env.HOST}/meta/mstile-150x150.png`} />
          <meta
            property='og:description'
            content='Learn everything about video encoding and modify video format with the web tool.'
          />
          <meta property='og:url' content={process.env.HOST} />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='627' />
          <meta property='og:type' content='website' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
