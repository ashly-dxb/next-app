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
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("../api/users/verifyemail", { token });
      if (response.data.success) {
        setVerified(true);
      } else {
        setVerified(false);
        setError(true);
        setErrorMsg(response.data.message);
      }
    } catch (error) {
      setError(true);
      setErrorMsg(error.response.data);
      console.log(error.response.data);
    }
  };

  return (
    <Layout>
      <div
        className={`max-w-xl bg-white py-10 px-5 m-auto w-full mt-10 border-2 ${styles.myContainer}`}
      >
        <div className="m-auto mb-8">
          <h3 className={`${styles.pageHeading} text-2xl`}>Verify Email</h3>
        </div>

        <div className="border-2 bg-orange-500 mb-3 w-full">
          <p className="text-2xl p-2">
            {token ? `Token: ${token}` : "Token not found"}
          </p>
        </div>

        {verified && (
          <div className="border-2 bg-green-500 mb-3 w-full">
            <p className="text-2xl p-2">Email verified successfully</p>
            <Link href="/Login" className="p-2">
              Login
            </Link>
          </div>
        )}

        {error && (
          <div className="border-2 bg-red-500 mb-3 w-full">
            <p className="text-2xl p-2">Error occured {": " + errorMsg}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
