import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faRefresh } from "@fortawesome/free-solid-svg-icons";
import styles from "../../container.module.css";
import Layout from "../components/layout";

export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: null,
    username: null,
    password: null,
  });

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    let errors = {};

    if (!user.username) {
      errors.username = "Username is required";
    } else if (username.length > 30) {
      errors.username = "Username is too long";
    }

    if (!user.email) {
      errors.email = "Email is required";
    } else if (user.email.length > 30) {
      errors.email = "Email is too long";
    }

    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length > 20) {
      errors.password = "Password is too long";
    }

    setErrors(errors);

    console.log("Signup val", Object.keys(errors).length === 0);
    console.log("Signup errors", errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const onSignup = async () => {
    validateForm();

    if (!isFormValid) {
      return false;
    }

    setLoading(true);

    try {
      const response = await axios.post("../api/users/signup", user);
      if (response.data.success) {
        setLoading(false);
        router.push("/Login");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className={`max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer}`}
      >
        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto mb-8">
          <h3 className={`${styles.pageHeading} text-2xl`}>Sign Up</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
          <div className="col-span-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter Email"
              autoComplete="off"
              className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
              required
            />

            {errors.email && (
              <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {errors.email}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter Username"
              autoComplete="off"
              className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
              required
            />

            {errors.username && (
              <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {errors.username}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter Password"
              autoComplete="off"
              className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
              required
            />

            {errors.password && (
              <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {errors.password}
              </span>
            )}
          </div>

          <div className="col-span-2 text-right">
            {error !== "" ? (
              <span className="text-left bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-2 mb-3 rounded relative">
                {error}
              </span>
            ) : (
              ""
            )}
            <button
              onClick={onSignup}
              className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32"
            >
              Sign Up &nbsp;
              <FontAwesomeIcon
                icon={isLoading ? faSpinner : faRefresh}
                className="fa spinner"
                alt="Refresh"
                title="Refresh"
                width="20"
              />
            </button>
          </div>

          <div className="col-span-2">
            <Link href="/Login">Login</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
