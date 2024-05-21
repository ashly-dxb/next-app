import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../container.module.css";
import Layout from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faRefresh } from "@fortawesome/free-solid-svg-icons";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const UpdatePost = () => {
  const [postID, setPostID] = useState("");
  //   const [description, setDescription] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [isLoading, setLoading] = useState(false);
  //   const [data, setData] = useState({});

  const router = useRouter();

  const searchParams = useSearchParams();

  const validateForm = () => {
    let errors = {};

    if (!title) {
      errors.title = "Title is required";
    } else if (title.length > 50) {
      errors.title = "Title is too long";
    }

    if (!description) {
      errors.description = "Description is required";
    } else if (description.length > 200) {
      errors.description = "Description is too long";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validateForm();
    if (!isFormValid) {
      return false;
    }

    const formData = {};
    new FormData(document.getElementById("myForm")).forEach(
      (value, key) => (formData[key] = value)
    );

    setLoading(true);

    fetch(`../api/posts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((respData) => {
        setLoading(false);

        router.replace("/posts/ListPosts"); // redirect to the listing page
        return null; // Render nothing on this page
      });
  };

  useEffect(() => {
    const postID = searchParams.get("postID");

    setPostID(postID);

    console.log("searchParams::::", searchParams);
    console.log("postID::::", postID);

    fetch(`/api/posts/${postID}`)
      .then((res) => res.json())
      .then((respData) => {
        if (respData.data !== undefined) {
          //   setData(respData.data[0]);

          setFormData({
            ...formData,
            title: respData.data[0].title,
            description: respData.data[0].description,
          });

          setLoading(false);

          console.log("Data fetching done...", respData.data[0]);
        }
      });
  }, [searchParams]);

  return (
    <Layout>
      <div
        className={`d-flex justify-content-center align-items-center bg-light ${styles.myContainer}`}
      >
        <div className="py-2 px-3 col-lg-6 col-md-8 col-12">
          <h3 className={`${styles.pageHeading}`}>Modify Post</h3>

          <form id="myForm" method="post" onSubmit={handleSubmit}>
            <input type="hidden" name="postID" value={postID} />

            <div className="form-group mb-3 pt-3">
              <label htmlFor="title">Title</label>

              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                autoComplete="off"
                className="form-control rounded-0"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              {errors.title && (
                <div className="invalid-feedback d-block">{errors.title}</div>
              )}
            </div>

            <div className="form-group mb-3 pt-3">
              <label htmlFor="description">Description</label>

              <textarea
                name="description"
                id="description"
                placeholder="Enter description"
                autoComplete="off"
                className="form-control rounded-0"
                rows="5"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>

              {errors.description && (
                <div className="invalid-feedback d-block">
                  {errors.description}
                </div>
              )}
            </div>

            <div className="form-group mb-3 pt-3">
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-0 "
              >
                <FontAwesomeIcon
                  icon={isLoading ? faSpinner : faRefresh}
                  className="fa spinner"
                  alt="Refresh"
                  title="Refresh"
                />
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePost;
