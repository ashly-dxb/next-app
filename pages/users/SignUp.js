import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../container.module.css";
import Layout from "../components/layout";

export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSignup = async () => {
    try {
      const response = await axios.post("../api/users/signup", user);
      if (response.data.success) {
        router.push("/Login");
      } else {
        setError(response.data.error);
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
        className={`d-flex justify-content-center align-items-center bg-light ${styles.myContainer}`}
      >
        <div className="py-2 px-3 col-lg-6 col-md-8 col-12">
          <h3 className={`${styles.pageHeading}`}>Sign Up</h3>

          <div className="form-group mb-3 pt-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter Email"
              autoComplete="off"
              className="form-control rounded-0"
              required
            />
          </div>

          <div className="form-group mb-3 pt-3">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter Username"
              autoComplete="off"
              className="form-control rounded-0"
              required
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
              autoComplete="off"
              className="form-control rounded-0"
              required
            />
          </div>

          <div className="form-group mb-3 pt-3">
            <button
              onClick={onSignup}
              className="btn btn-primary w-100 rounded-0 "
            >
              Sign Up {loading ? "..." : ""}
            </button>
          </div>

          <div className="form-group mb-3 pt-3">
            <Link href="/Login">Login</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
