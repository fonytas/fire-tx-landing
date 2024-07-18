import "@radix-ui/themes/styles.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
          <title>BKCDM #4 | Bitkub Chain</title>
      </Head>
      <Theme accentColor="mint" radius="large" appearance="dark">
        <Component {...pageProps} />
      </Theme>
    </>
   
  );
}
