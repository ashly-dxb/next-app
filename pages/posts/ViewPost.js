import { useState, useEffect } from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../container.module.css";
import Layout from "../components/layout";

import { useSearchParams } from "next/navigation";

export default function ViewPost() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const postID = searchParams.get("postID");

    console.log("searchParams::::", searchParams);
    console.log("postID::::", postID);

    fetch(`/api/posts/${postID}`)
      .then((res) => res.json())
      .then((respData) => {
        if (respData.data !== undefined) {
          setData(respData.data[0]);
          setLoading(false);

          console.log("Data fetching completed", respData.data[0]);
        }
      });
  }, [searchParams]);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No data found</p>;

  return (
    <Layout>
      <div
        className={`d-flex justify-content-center align-items-center bg-light ${styles.myContainer}`}
      >
        <div className="py-2 px-3 w-100">
          <h3 className={`${styles.pageHeading}`}>Post Details</h3>

          <div className="row mb-2 py-2">
            <div className="col-md-4 fw-bold">Title</div>
            <div className="col-md-8">{data.title}</div>
          </div>

          <div className="row mb-2 py-2">
            <div className="col-md-4 fw-bold">Description</div>
            <div className={`col-md-8 ${styles.lineBreaks}`}>
              {data.description}
            </div>
          </div>

          <div className="row mb-2 py-2">
            <div className="col-md-4 fw-bold">Created date</div>
            <div className="col-md-8">
              {moment(data.createdDate).format("YYYY-MM-DD HH:mm")}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
