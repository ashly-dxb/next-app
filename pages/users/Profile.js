import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../container.module.css";
import Layout from "../components/layout";

export default function ProfilePage() {
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const response = await axios.get("../api/users/profile");

    if (response.data) {
      setData(response.data.data._id);
    } else {
      setData({ error: "SOme error" });
    }
  };

  return (
    <Layout>
      <div
        className={`d-flex justify-content-center align-items-center bg-light ${styles.myContainer}`}
      >
        <div className="py-2 px-3 col-lg-6 col-md-8 col-12">
          <h3 className={`${styles.pageHeading}`}>Profile</h3>

          <div className="form-group mb-3 pt-3">
            <p>{data === "nothing" ? "No Data " : { data }}</p>
          </div>

          <div className="form-group mb-3 pt-3">
            <button onClick={getUserDetails}>Details</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
