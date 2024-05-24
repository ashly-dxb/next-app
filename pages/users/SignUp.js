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
    email: null,
    username: null,
    password: null,
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

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

            {errors.email && (
              <div className="invalid-feedback d-block">{errors.email}</div>
            )}
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

            {errors.username && (
              <div className="invalid-feedback d-block">{errors.username}</div>
            )}
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

            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
          </div>

          <div className="form-group mb-3 pt-3">
            <button
              onClick={onSignup}
              className="btn btn-primary w-100 rounded-0 "
            >
              Sign Up {loading ? "..." : ""}
            </button>
          </div>

          {error !== "" ? (
            <div className="alert alert-danger mb-3">{error}</div>
          ) : (
            ""
          )}

          <div className="form-group mb-3 pt-3">
            <Link href="/Login">Login</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
