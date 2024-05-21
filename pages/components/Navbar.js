import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../../container.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleLinkClick = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  return (
    <nav
      className={`navbar fixed-top navbar-expand-sm ${styles.navbar} ${styles.mainHeader}`}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            onClick={handleLinkClick}
          ></span>
        </button>

        <div
          id="navbarNavAltMarkup"
          className={
            isOpen
              ? "collapse navbar-collapse"
              : "collapse navbar-collapse show"
          }
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${styles.mynavitem}`}>
              <Link
                href="/"
                onClick={handleLinkClick}
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className={`nav-item ${styles.mynavitem}`}>
              <Link
                href="/posts/ListPosts"
                onClick={handleLinkClick}
                className={`nav-link ${
                  pathname === "/posts/ListPosts" ? "active" : ""
                }`}
              >
                Posts
              </Link>
            </li>
            <li className={`nav-item ${styles.mynavitem}`}>
              <Link
                href="/posts/CreatePost"
                onClick={handleLinkClick}
                className={`nav-link ${
                  pathname === "/posts/CreatePost" ? "active" : ""
                }`}
              >
                Create Post
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
