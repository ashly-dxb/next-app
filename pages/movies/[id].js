import { useRouter } from "next/router";
import Link from "next/link";
import movies from "../../data";
import styles from "../../container.module.css";

import Layout from "../components/layout";

const Movie = () => {
  const linkStyle = {
    color: "blue",
    padding: "3px",
    fontFamily: "Verdana",
    fontSize: "14px",
    listStyle: "none",
    marginTop: "5px",
    marginLeft: "15px",
    border: "1px solid red",
  };

  const router = useRouter();
  const { id } = router.query;
  const currentMovieDet = movies.find((item) => item.slug === id);

  if (!currentMovieDet) {
    return (
      <Layout>
        <div
          className={`d-flex justify-content-center align-items-center bg-secondary ${styles.myContainer}`}
        >
          <div>Movie does not exist</div>
          <div style={linkStyle}>
            <Link href={`/`}>Back</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className={`d-flex justify-content-center align-items-center bg-secondary ${styles.myContainer}`}
      >
        <h3 className={`${styles.pageHeading}`}>{currentMovieDet.title}</h3>
        <p>{currentMovieDet.description}</p>

        <br />
        <br />

        <div style={linkStyle}>
          <Link href={`/`}>&lt; Back</Link>
        </div>
      </div>
    </Layout>
  );
};

export default Movie;
