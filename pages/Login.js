import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../container.module.css";
import Layout from "./components/layout";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  axios.defaults.withCredentials = true;

  const [user, setUser] = useState({
    email: "ashlythomas@gmail.com",
    password: "abcd1234",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("../api/users/login", user);

      if (response.data.success) {
        router.push("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className={`d-flex justify-content-center align-items-center bg-light ${styles.myContainer}`}
      >
        <div className="py-2 px-3 col-lg-6 col-md-8 col-12">
          <h3 className={`${styles.pageHeading}`}>
            {loading ? "Please wait..." : "Login"}
          </h3>

          <div className="form-group mb-3 pt-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter Email"
              className="form-control rounded-0"
              autoComplete="off"
            />
          </div>

          <div className="form-group mb-3 pt-3">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter Password"
              className="form-control rounded-0"
              autoComplete="off"
            />
          </div>

          <div className="form-group mb-3 pt-3">
            <button
              onClick={onLogin}
              className="btn btn-primary w-100 rounded-0 "
            >
              Login
            </button>
          </div>

          {error !== "" ? (
            <div className="alert alert-danger mb-3">{error}</div>
          ) : (
            ""
          )}

          <div className="form-group mb-3 pt-3">
            <Link href="/users/SignUp">Sign Up</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
