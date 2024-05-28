import { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
// import "bootstrap/dist/css/bootstrap.min.css";
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
  const [rowCount, setRowCount] = useState(0);

  const router = useRouter();

  var counter = 0;

  const loadList = () => {
    setLoading(true);

    fetch("/api/posts")
      .then((res) => res.json())
      .then((respData) => {
        setPosts(respData.data);
        setRowCount(respData.rowCount);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleDelete = (postID, event) => {
    event.preventDefault();
    if (!confirm("Are you sure to delete?")) return false;

    setLoading(true);

    fetch(`../api/posts/${postID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((respData) => {
        loadList();
        setLoading(false);

        router.replace("/posts/ListPosts"); // redirect to the listing page
        return null; // Render nothing on this page
      });
  };

  // if (isLoading) return <p>Loading...</p>;
  // if (posts === undefined || posts.length < 1) return <p>No posts found</p>;

  return (
    <Layout>
      <div className={`xxxxxxxxxxxxxxxx ${styles.myContainer}`}>
        <div className="py-2 px-3 w-100">
          <h3 className={`${styles.pageHeading}`}>Posts &nbsp; ({rowCount})</h3>
        </div>

        <div className="grid  grid-cols-4 sm:grid-cols-2 gap-0 justify-evenly">
          <div className="bg-grey-700 w-26 h-10">Title</div>
          <div className="bg-grey-700 w-26 h-10 sm:hidden">Description</div>
          <div className="bg-grey-700 w-26 h-10 sm:hidden">Date</div>
          <div className="bg-grey-700 w-26 h-10">&nbsp;</div>
        </div>

        {isLoading ? <p>Loading...</p> : ""}

        {posts.map((item, index) => {
          counter++;
          return (
            <div
              key={counter}
              className={`${styles.rowStriped} grid grid-cols-4 sm:grid-cols-2 gap-0 justify-evenly border`}
            >
              <div className={`bg-green-500 w-26 h-10 ${styles.textEllipsis} `}>
                {item.title}
              </div>

              <div
                className={`bg-green-500 w-26 h-10 ${styles.textEllipsis} sm:hidden`}
              >
                {item.description}
              </div>

              <div className="bg-green-500 w-26 h-10 sm:hidden">
                {moment(item.createdDate).format("YYYY-MM-DD HH:mm")}
              </div>

              <div className="bg-green-500 w-26 h-10">
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
    </Layout>
  );
}
