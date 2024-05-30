import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ashly&#39;s Code World</title>
        <meta name="description" content="Ashly Thomas Abraham&#39;s website" />
        <meta
          name="keywords"
          content="Ashly Thomas Abraham, Software Developer Dubai, Web Developer, Professional Web Developer, Trinity Church Dubai"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
