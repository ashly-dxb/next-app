import { useState, useEffect } from "react";
import moment from "moment";
// import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../container.module.css";
import Layout from "../components/layout";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function ViewPost() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

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
        className={`bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer}`}
      >
        <div className="flex flex-wrap m-auto mb-8">
          <h3 className={`${styles.pageHeading} text-2xl`}>Post Details</h3>
        </div>

        <div className="flex flex-wrap  m-auto mr-3 mb-4">
          <div className="w-full xxx md:w-1/2 lg:w-1/3 mr-1 font-bold">
            Title
          </div>
          <div className="w-full xxx md:w-1/2 lg:w-1/3 mr-1 ">{data.title}</div>
        </div>

        <div className="flex flex-wrap  m-auto mr-3 mb-4">
          <div className="w-full xxx md:w-1/2 lg:w-1/3 mr-1 font-bold">
            Description
          </div>
          <div
            className={`w-full xxx md:w-1/2 lg:w-1/3 mr-1 ${styles.lineBreaks} `}
          >
            {data.description}
          </div>
        </div>

        <div className="flex flex-wrap  m-auto mr-3 mb-4">
          <div className="w-full xxx md:w-1/2 lg:w-1/3 mr-1 font-bold">
            Posted on
          </div>
          <div className="w-full xxx md:w-1/2 lg:w-1/3 mr-1 ">
            {moment(data.createdDate).format("YYYY-MM-DD HH:mm")}
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="py-2 px-4 bg-gray-700 text-white font-bold sm:w-32 border"
        >
          Back
        </button>
      </div>
    </Layout>
  );
}
