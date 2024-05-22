import React, { useState } from "react";
import Link from "next/link";
import movieData from "../data";
import styles from "../container.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./components/layout";

export async function getServerSideProps() {
  return {
    props: {
      allMovies: movieData,
    },
  };
}

const heading = {
  color: "blue",
  padding: "3px",
  fontFamily: "Verdana",
  fontSize: "17px",
  marginTop: "5px",
  marginLeft: "15px",
  border: "2px solid purple",
  backgroundColor: "grey",
};

const Home = ({ allMovies }) => {
  return (
    <Layout>
      <div
        className={`d-flex justify-content-center align-items-center bg-light ${styles.myContainer}`}
      >
        <h3 className={`${styles.pageHeading}`}>Movies</h3>

        <ul>
          {allMovies.map((item) => (
            <li key={item.slug} className={styles.menuLink}>
              <Link href={`/movies/${item.slug}`}>{item.title}</Link>
            </li>
          ))}

          <li key={"12345"} className={styles.menuLink}>
            <Link href={`/movies/test123`}>Test (NonExisting)</Link>
          </li>

          <li key={"xxxx"} className={styles.menuLink}>
            <Link href={`/about`}> About </Link>
          </li>

          <li key={"iiiii"} className={styles.menuLink}>
            <Link href={`/image/test`}> Image Display </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
