import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ashly's Code World</title>
        <meta name="description" content="Ashly Thomas Abraham's website" />
        <meta
          name="keywords"
          content="Ashly Thomas Abraham, Software Dubai, Web developer, Professional Web Developer"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
