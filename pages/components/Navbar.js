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
      class={`${styles.navbar} ${styles.mainHeader} bg-white border-gray-200 dark:bg-gray-900 `}
    >
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="http://localhost:3000"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Company
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                onClick={handleLinkClick}
                className={`block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 ${
                  pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/Login"
                onClick={handleLinkClick}
                className={`nav-link ${pathname === "/Login" ? "active" : ""}`}
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                href="/users/SignUp"
                onClick={handleLinkClick}
                className={`nav-link ${
                  pathname === "/users/SignUp" ? "active" : ""
                }`}
              >
                Sign Up
              </Link>
            </li>
            <li>
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
            <li>
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
            <li>
              <Link
                href="/Logout"
                onClick={handleLinkClick}
                className={`nav-link ${pathname === "/Logout" ? "active" : ""}`}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
