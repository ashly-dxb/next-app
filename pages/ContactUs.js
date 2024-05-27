import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
    } else if (contactRequest.full_name.length > 50) {
      errors.full_name = "Full name is too long";
    }

    if (!contactRequest.email) {
      errors.email = "Email is required";
    } else if (contactRequest.email.length > 50) {
      errors.email = "Email is too long";
    }

    if (!contactRequest.phone) {
      errors.phone = "Phone is required";
    } else if (contactRequest.phone.length > 20) {
      errors.phone = "Phone is too long";
    }

    if (!contactRequest.subject) {
      errors.subject = "Subject is required";
    } else if (contactRequest.subject.length > 100) {
      errors.subject = "Subject is too long";
    }

    if (!contactRequest.message) {
      errors.message = "Message is required";
    } else if (contactRequest.message.length > 2000) {
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
        setError(response.data.message);
      }
    } catch (error) {
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={`container ${styles.myContainer}`}>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
            <h3>Contact Us</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
            <input
              type="text"
              className="form-control form-control-lg rounded"
              placeholder="Enter Your Full Name"
              name="full_name"
              value={contactRequest.full_name}
              onChange={(e) =>
                setContactReq({ ...contactRequest, full_name: e.target.value })
              }
              spellCheck="false"
              data-ms-editor="true"
            />

            {errors.full_name && (
              <div className="invalid-feedback d-block">{errors.full_name}</div>
            )}
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
            <input
              type="text"
              className="form-control form-control-lg rounded"
              placeholder="Enter Your Email"
              name="email"
              value={contactRequest.email}
              onChange={(e) =>
                setContactReq({ ...contactRequest, email: e.target.value })
              }
              data-valid="email"
              data-error="Email should be valid."
            />

            {errors.email && (
              <div className="invalid-feedback d-block">{errors.email}</div>
            )}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
            <input
              type="text"
              className="form-control form-control-lg rounded"
              placeholder="Enter Your Subject"
              name="subject"
              value={contactRequest.subject}
              onChange={(e) =>
                setContactReq({ ...contactRequest, subject: e.target.value })
              }
              spellCheck="false"
              data-ms-editor="true"
            />

            {errors.subject && (
              <div className="invalid-feedback d-block">{errors.subject}</div>
            )}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
            <input
              type="text"
              className="form-control form-control-lg rounded"
              placeholder="Enter Your Phone"
              name="phone"
              value={contactRequest.phone}
              onChange={(e) =>
                setContactReq({ ...contactRequest, phone: e.target.value })
              }
              spellCheck="false"
              data-ms-editor="true"
            />

            {errors.phone && (
              <div className="invalid-feedback d-block">{errors.phone}</div>
            )}
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
            <textarea
              className="form-control form-control-lg rounded"
              placeholder="Enter Your Message"
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
              <div className="invalid-feedback d-block">{errors.message}</div>
            )}
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
            <button onClick={onSubmitForm} className="btn btn-primary  w-100 ">
              Send {loading ? "..." : ""}
            </button>

            <div className="response"></div>
          </div>

          {error !== "" ? (
            <div className="alert alert-danger mb-3">{error}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
