import { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../container.module.css";
import Layout from "../components/layout";

export default function ListPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((respData) => {
        setPosts(respData.data);
        setLoading(false);
      });
  }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (posts === undefined || posts.length < 1) return <p>No posts found</p>;

  return (
    <Layout>
      <div
        className={`d-flex justify-content-center align-items-center bg-light ${styles.myContainer}`}
      >
        <div className="py-2 px-3 w-100">
          <h3 className={`${styles.pageHeading}`}>Posts</h3>

          <div
            className={`${styles.rowStriped} d-flex flex-md-row my-1 align-items-center rounded py-3 fw-bold`}
          >
            <div className="flex-column col-md-3 col-sm-1 col-4">Title</div>
            <div className="flex-column col-md-4 col-sm-1 col-1 d-none d-lg-block">
              Description
            </div>
            <div className="flex-column col-md-3 col-sm-1 col-4">Date</div>
            <div className="flex-column col-md-2 col-sm-1 col-3">-</div>
          </div>

          {isLoading ? <p>Loading...</p> : ""}

          {posts.map((item, index) => {
            return (
              <div
                className={`${styles.rowStriped} d-flex flex-md-row my-1 align-items-center rounded`}
                key={index}
              >
                <div className="flex-column col-md-3 col-sm-1 col-4">
                  {item.title}
                </div>
                <div className="flex-column col-md-4 col-sm-1 col-1 d-none d-lg-block">
                  {item.description}
                </div>
                <div className="flex-column col-md-3 col-sm-1 col-4">
                  {moment(item.createdDate).format("YYYY-MM-DD HH:mm")}
                </div>
                <div className="flex-column col-md-2 col-sm-1 col-3">
                  <Link
                    href={{
                      pathname: "/posts/ViewPost",
                      query: { postID: item._id },
                    }}
                  >
                    View
                  </Link>

                  <button>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
