import Navbar from "./Navbar";
import Footer from "./Footer";

import styles from "../../container.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.outerBody}>
      <Navbar />
      <div className={styles.myContentArea} style={{ marginTop: "55px" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
