import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../container.module.css";

export default function Footer({ children }) {
  return (
    <div
      className={`${styles.footerArea} flex-fill d-flex align-items-center bg-dark text-white`}
    >
      <div className="container-fluid text-center">
        <ul className="list-unstyled col-md-12">
          <li>
            &copy;{new Date().getFullYear()}
            &nbsp;ASHLY THOMAS ABRAHAM | All rights reserved.
          </li>
          <li>Terms of service | Privacy Policy</li>
        </ul>
      </div>
    </div>
  );
}
