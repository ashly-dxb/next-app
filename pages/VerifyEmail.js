import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../container.module.css";
import Layout from "./components/layout";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("../api/users/verifyemail", { token });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <Layout>
      <div
        className={`d-flex justify-content-center align-items-center bg-light ${styles.myContainer}`}
      >
        <div className="py-2 px-3 col-lg-6 col-md-8 col-12">
          <h3 className={`${styles.pageHeading}`}>Verify Email</h3>

          <h3 className="p-2 bg-orange-500 text-black">
            {token ? `${token}` : "No token"}
          </h3>

          {verified && (
            <div>
              <h2 className="text-2xl">Email Verified</h2>
              <Link href="/login">Login</Link>
            </div>
          )}

          {error && (
            <div>
              <h3 className="text-3xl font-bold underline bg-red-500">Error</h3>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
