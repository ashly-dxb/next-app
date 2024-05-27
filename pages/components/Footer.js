import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../container.module.css";
import Link from "next/link";

export default function Footer({ children }) {
  return (
    <div
      className={`${styles.footerArea} flex-fill d-flex align-items-center bg-dark text-white row`}
    >
      <div className={`container-fluid text-center ${styles.footerBackground}`}>
        <div className="row mb-5 pt-5">
          <div className="text-left col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
            <h4>Ashly Thomas Abraham</h4>
            <p className="indent-8">
              Something about me. Something about me. Some thing about me. Some
              thing about me. Something about me. Some thing about me. Some
              thing about me. Something about me. Some thing about me. Some
              thing about me.
            </p>
          </div>
          <div className="text-left col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
            <h4 className="uppercase">Links</h4>
            <ul className="list-none hover:list-disc">
              <li className="mt-3 ">
                <Link
                  href="/"
                  className={`no-underline text-white hover:text-white-700 `}
                >
                  Home
                </Link>
              </li>
              <li className="mt-3 ">
                <Link
                  href="/Login"
                  className={`no-underline text-white hover:text-white-700 `}
                >
                  Login
                </Link>
              </li>
              <li className="mt-3 ">
                <Link
                  href="/users/SignUp"
                  className={`no-underline text-white hover:text-white-700 `}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-left col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
            <h4 className="uppercase">Working hours</h4>
            <ul>
              <li className="mt-3 tracking-wider hover:uppercase">
                Monday - Friday: 09:00 AM to 05:00 PM
              </li>
              <li className="mt-3 tracking-wider hover:uppercase">
                Saturday: 02:00 PM to 07:00 PM
              </li>
              <li className="mt-3 hover:uppercase">
                Call 📞:{" "}
                <a className="telephone" href="tel:+971-508570803">
                  (+971)-508570803
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`container-fluid text-center ${styles.copyrightBackground} border`}
      >
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
