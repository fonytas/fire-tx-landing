import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <meta property='og:title' content='BKCDM #4 | Bitkub Chain' />
          <meta property='og:description' content='Bitkub Chain Dev Meetup' />
          <meta property='og:image' content='https://static.bitkubnext.com/bitkub-next/banners/bkcdm.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
