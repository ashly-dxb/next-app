import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../../container.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      id: 1,
      link: "/",
      text: "Home",
    },
    {
      id: 2,
      link: "/posts/ListPosts",
      text: "Posts",
    },
    {
      id: 3,
      link: "/posts/CreatePost",
      text: "Create Post",
    },
    {
      id: 4,
      link: "/users/SignUp",
      text: "Sign Up",
    },
    {
      id: 5,
      link: "/Login",
      text: "Login",
    },
  ];

  //   const handleLinkClick = () => {
  //     setIsOpen(!isOpen);
  //   };

  const pathname = usePathname();

  return (
    <div className=" flex justify-between items-center w-full px-4 text-white bg-black">
      <div className="text-2xl font-signature ml-2">
        <a href="#" className="no-underline link-underline-black">
          My App
        </a>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link, text }) => (
          <li
            key={id}
            className="mt-2 px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
          >
            <Link
              href={link}
              className={`no-underline text-blue-500 hover:text-white-700 ${
                pathname === link
                  ? "bg-yellow-400 px-3 py-2 rounded text-blue-900 font-semibold"
                  : ""
              }`}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer z-10 text-gray-500 md:hidden"
      >
        <svg className="h-7 w-7 fill-current" viewBox="0 0 28 28">
          {isOpen ? (
            <path
              fillRule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          )}
        </svg>
      </div>

      {isOpen && (
        <ul className="flex flex-col justify-top items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link, text }) => (
            <li key={id} className="py-6 sm:mt-0 sm:ml-2">
              <Link
                href={link}
                onClick={() => setIsOpen(!isOpen)}
                className="text-4xl no-underline  text-blue-600 hover:text-blue-100"
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
