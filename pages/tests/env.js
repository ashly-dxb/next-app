// try accessing the URL: http://localhost:3000/posts/env
// it will use the configurations from the file: .env.local under the root directory

import Head from "next/head";
// import Container from "../../components/container";

export default function FirstPost(props) {
  return (
    <>
      {/* <Container> */}
      <Head>
        <title>Environment Variables</title>
      </Head>

      <h3 className={`${styles.pageHeading}`}>Database Credentials</h3>
      <p>Host: {props.host}</p>
      <p>Username: {props.username}</p>
      <p>Password: {props.password}</p>
      {/* </Container> */}
    </>
  );
}

export async function getStaticProps() {
  // Connect to Database using DB properties
  return {
    props: {
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  };
}
