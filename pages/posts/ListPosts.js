import { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../container.module.css";
import Layout from "../components/layout";

import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPencilAlt,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

export default function ListPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((respData) => {
        setPosts(respData.data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (postID, event) => {
    event.preventDefault();

    console.log("DELETE postID:: ", postID);

    setLoading(true);

    fetch(`../api/posts/${postID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((respData) => {
        setLoading(false);

        router.replace("/posts/ListPosts"); // redirect to the listing page
        return null; // Render nothing on this page
      });
  };

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
            className={`d-flex flex-md-row px-1 my-1 py-2 align-items-center rounded fw-bold`}
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
                className={`${styles.rowStriped} d-flex flex-md-row px-1 my-1 align-items-center rounded`}
                key={index}
              >
                <div
                  className={`flex-column col-md-3 col-sm-1 col-4 ${styles.textEllipsis}`}
                >
                  {item.title}
                </div>
                <div className="flex-column col-md-4 col-sm-1 col-1 d-none d-lg-block">
                  {item.description}
                </div>
                <div className="flex-column col-md-3 col-sm-1 col-4">
                  {moment(item.createdDate).format("YYYY-MM-DD HH:mm")}
                </div>
                <div className="flex-column col-md-2 col-sm-1 col-4">
                  <Link
                    href={{
                      pathname: "/posts/ViewPost",
                      query: { postID: item._id },
                    }}
                    className="p-2 outline-none rounded hover-shadow text-success border-0 bg-transparent"
                    aria-label="Details"
                    title="View Details"
                  >
                    <FontAwesomeIcon icon={faBook} />
                  </Link>
                  &nbsp;
                  <Link
                    href={{
                      pathname: "/posts/EditPost",
                      query: { postID: item._id },
                    }}
                    className="p-2 outline-none rounded hover-shadow text-primary border-0 bg-transparent"
                    aria-label="Edit"
                    title="Edit"
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Link>
                  &nbsp;
                  <button
                    className="p-2 outline-none rounded hover-shadow text-danger border-0 bg-transparent"
                    aria-label="Delete"
                    title="Delete"
                    onClick={(event) => handleDelete(item._id, event)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
