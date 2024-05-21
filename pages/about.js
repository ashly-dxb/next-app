import Link from "next/link";
import styles from "../container.module.css";
import Layout from "./components/layout";

const About = () => {
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

  return (
    <Layout>
      <div
        className={`d-flex justify-content-center align-items-center bg-secondary ${styles.myContainer}`}
      >
        This is an About page.
        <br />
        <br />
        <div style={linkStyle}>
          <Link href={`/`}>Back</Link>
        </div>
      </div>
    </Layout>
  );
};

export default About;
