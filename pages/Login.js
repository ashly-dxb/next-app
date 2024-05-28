import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../container.module.css";
import Layout from "./components/layout";

export default function Login() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "ashlythomas@gmail.com",
    password: null,
  });

  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  axios.defaults.withCredentials = true;

  const validateForm = () => {
    let errors = {};

    if (!credentials.email) {
      errors.email = "Email is required";
    }

    if (!credentials.password) {
      errors.password = "Password is required";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const onLogin = async () => {
    validateForm();
    if (!isFormValid) {
      return false;
    }

    setLoading(true);

    try {
      const response = await axios.post("../api/users/login", credentials);

      if (response.data.success) {
        router.push("/");
      } else {
        console.log("Login failed 1", response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.log("Login failed 2", error.message);
      setError(error.message);
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
          <h3 className={`${styles.pageHeading} text-2xl`}>
            {loading ? "Please wait..." : "Login"}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
          <div className="col-span-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              placeholder="Enter Email"
              className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
              autoComplete="off"
            />

            {true ? (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : (
              ""
            )}

            {errors.email && (
              <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {errors.email}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Enter Password"
              className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
              autoComplete="off"
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
              onClick={onLogin}
              className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32"
            >
              Login
            </button>
          </div>

          <div className="col-span-2">
            <Link href="/users/SignUp">Sign Up</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
