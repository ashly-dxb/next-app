import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../container.module.css";
import Layout from "./components/layout";

const ContactUs = () => {
  const router = useRouter();

  const [contactRequest, setContactReq] = useState({
    full_name: null,
    email: null,
    phone: null,
    subject: null,
    message: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    let errors = {};

    if (!contactRequest.full_name) {
      errors.full_name = "Full name is required";
    } else if (contactRequest.full_name.trim().length > 50) {
      errors.full_name = "Full name is too long";
    }

    if (!contactRequest.email) {
      errors.email = "Email is required";
    } else if (contactRequest.email.trim().length > 50) {
      errors.email = "Email is too long";
    }

    if (!contactRequest.phone) {
      errors.phone = "Phone is required";
    } else if (contactRequest.phone.length > 20) {
      errors.phone = "Phone is too long";
    }

    if (!contactRequest.subject) {
      errors.subject = "Subject is required";
    } else if (contactRequest.subject.trim().length > 100) {
      errors.subject = "Subject is too long";
    }

    if (!contactRequest.message) {
      errors.message = "Message is required";
    } else if (contactRequest.message.trim().length > 2000) {
      errors.message = "Message is too long";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const onSubmitForm = async () => {
    validateForm();
    if (!isFormValid) {
      return false;
    }

    setLoading(true);

    try {
      const response = await axios.post("../api/contacts", contactRequest);

      if (response.data.success) {
        setLoading(false);
        router.push("/Login");
      } else {
        console.log("Signup failed.", response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.log("Signup failed", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className={`max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer}`}
      >
        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto mb-8">
          <h3 className={`${styles.pageHeading} text-2xl`}>Contact Us</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
              placeholder="Enter your Full Name"
              name="full_name"
              value={contactRequest.full_name}
              onChange={(e) =>
                setContactReq({ ...contactRequest, full_name: e.target.value })
              }
              spellCheck="false"
              data-ms-editor="true"
            />

            {errors.full_name && (
              <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {errors.full_name}
              </span>
            )}
          </div>

          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
              placeholder="Enter your Email"
              name="email"
              value={contactRequest.email}
              onChange={(e) =>
                setContactReq({ ...contactRequest, email: e.target.value })
              }
              data-valid="email"
              data-error="Email should be valid."
            />

            {errors.email && (
              <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {errors.email}
              </span>
            )}
          </div>

          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
              placeholder="Enter your phone"
              name="phone"
              value={contactRequest.phone}
              onChange={(e) =>
                setContactReq({ ...contactRequest, phone: e.target.value })
              }
              spellCheck="false"
              data-ms-editor="true"
            />

            {errors.phone && (
              <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {errors.phone}
              </span>
            )}
          </div>

          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
              placeholder="Enter your subject"
              name="subject"
              value={contactRequest.subject}
              onChange={(e) =>
                setContactReq({ ...contactRequest, subject: e.target.value })
              }
              spellCheck="false"
              data-ms-editor="true"
            />

            {errors.subject && (
              <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {errors.subject}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <textarea
              className="border-2 border-solid border-gray-400 p-3 md:text-xl w-full hover:border-green-500 focus:outline-blue-500"
              placeholder="Enter your message"
              name="message"
              value={contactRequest.message}
              onChange={(e) =>
                setContactReq({ ...contactRequest, message: e.target.value })
              }
              rows="7"
              spellCheck="false"
              data-ms-editor="true"
            ></textarea>

            {errors.message && (
              <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {errors.message}
              </span>
            )}
          </div>

          <div className="col-span-2 text-right">
            <button
              onClick={onSubmitForm}
              className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32"
            >
              Send {loading ? "..." : ""}
            </button>
          </div>

          {error !== "" ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 mb-3 rounded relative">
              {error}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
