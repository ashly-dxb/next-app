import Navbar from "./Navbar2";
import Footer from "./Footer";
import styles from "../../container.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.outerBody}>
      <Navbar />
      <div className={styles.myContentArea} style={{ marginTop: "2px" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
