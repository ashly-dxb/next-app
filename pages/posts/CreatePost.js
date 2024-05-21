// import Head from "next/head";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../container.module.css";
import Layout from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

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
      method: "POST",
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

    // redirect("/posts/ListPosts"); //wont work here
  };

  return (
    <Layout>
      <div
        className={`d-flex justify-content-center align-items-center bg-light ${styles.myContainer}`}
      >
        <div className="py-2 px-3 col-lg-6 col-md-8 col-12">
          <h3 className={`${styles.pageHeading}`}>Add Post</h3>

          <form id="myForm" method="post" onSubmit={handleSubmit}>
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
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
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
                Add Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
