import { useState } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../container.module.css";
import Layout from "../components/layout";

export default function Profile() {
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const response = await axios.get("../api/users/profile");

    if (response.data) {
      setData(response.data.data._id);
    } else {
      setData({ error: "Some error" });
    }
  };

  return (
    <Layout>
      <div
        className={`max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer}`}
      >
        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto mb-8">
          <h3 className={`${styles.pageHeading} text-2xl`}>Profile</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
          <div className="col-span-2">
            <p>{data === "nothing" ? "No Data " : { data }}</p>
          </div>

          <div className="col-span-2">
            <button
              onClick={getUserDetails}
              className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
