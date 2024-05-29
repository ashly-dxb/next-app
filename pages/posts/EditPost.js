import { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
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
        className={`max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer}`}
      >
        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto mb-8">
          <h3 className={`${styles.pageHeading} text-2xl`}>Modify Post</h3>
        </div>

        <form id="myForm" method="post" onSubmit={handleSubmit}>
          <input type="hidden" name="postID" value={postID} />

          <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
            <div className="col-span-2">
              <label htmlFor="title">Title</label>

              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                autoComplete="off"
                className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              {errors.title && (
                <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.title}
                </span>
              )}
            </div>

            <div className="col-span-2">
              <label htmlFor="description">Description</label>

              <textarea
                name="description"
                id="description"
                placeholder="Enter description"
                autoComplete="off"
                className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
                rows="8"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>

              {errors.description && (
                <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.description}
                </span>
              )}
            </div>

            <div className="col-span-2 text-right">
              <button
                type="submit"
                className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 "
              >
                <FontAwesomeIcon
                  icon={isLoading ? faSpinner : faRefresh}
                  className="fa spinner"
                  alt="Refresh"
                  title="Refresh"
                />
                Update
              </button>

              <button
                type="button"
                className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 "
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdatePost;
