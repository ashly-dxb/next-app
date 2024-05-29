import Link from "next/link";
import styles from "../../container.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer({ children }) {
  return (
    <div className="bg-zinc-50 text-center text-surface/75 dark:bg-neutral-700 dark:text-white/75 lg:text-left">
      <div className={`${styles.footerArea} text-white md:text-left`}>
        <div
          className={`grid-1 grid gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-4 ${styles.footerBackground}`}
        >
          <div className="sm:mt-8 md:mt-8">
            <h4 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Ashly Thomas Abraham
            </h4>
            <p>Something about something.</p>
          </div>

          <div className="sm:mt-8 md:mt-8">
            <h4 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Links
            </h4>

            <ul className="list-none hover:list-disc">
              <li className="mt-3 ">
                <Link
                  href="/ContactUs"
                  className={`no-underline text-white hover:text-white-700 `}
                >
                  Contact
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

          <div className="sm:mt-8 md:mt-8">
            <h4 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Working hours
            </h4>
            <ul>
              <li className="mt-3 tracking-wider hover:uppercase">
                Monday - Friday: 09:00 AM to 05:00 PM
              </li>
              <li className="mt-3 tracking-wider hover:uppercase">
                Saturday: 02:00 PM to 07:00 PM
              </li>
            </ul>
          </div>

          <div className="sm:mt-8 md:mt-8">
            <h4 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h4>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </span>
              Muhaisnah-4, Dubai, UAE
            </p>

            <p className="mb-4 flex items-center justify-center md:justify-start">
              <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </span>
              <a href="mailto:myuser@gmail.com">myuser@gmail.com</a>
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className={`${styles.telephone}`}>
                <a href="tel:+91-123456789">(+91)-123456789</a>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className={`${styles.footerArea} text-white md:text-center`}>
        <div
          className={`grid-1 grid gap-8 px-4 py-10 ${styles.copyrightBackground}`}
        >
          <ul className="list-unstyled">
            <li>
              &copy;{new Date().getFullYear()}
              &nbsp;ASHLY THOMAS ABRAHAM | All rights reserved.
            </li>
            <li>Terms of service | Privacy Policy</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
