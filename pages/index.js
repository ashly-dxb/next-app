import React, { useState } from "react";
import Link from "next/link";
import movieData from "../data";
import styles from "../container.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./components/layout";

export async function getServerSideProps() {
  return {
    props: {
      allMovies: movieData,
    },
  };
}

const heading = {
  color: "blue",
  padding: "3px",
  fontFamily: "Verdana",
  fontSize: "17px",
  marginTop: "5px",
  marginLeft: "15px",
  border: "2px solid purple",
  backgroundColor: "grey",
};

const Home = ({ allMovies }) => {
  return (
    <Layout>
      <div
        className={`d-flex justify-content-center align-items-center bg-light ${styles.myContainer}`}
      >
        <div className="row">
          <div className="agy-heading-wrapper full-width">
            <div className="col-md-12 text-center">
              <h2>Fulfill Expectations!</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className={`${styles.serviceSection}`} data-wow-delay="0.1s">
              <div className="agy-service-text">
                <h4>
                  <span className="xxxx" href="/react-js-developer-in-mumbai/">
                    Web Designing
                  </span>
                </h4>
                <p>
                  Use our website design services right now to have an amazing
                  online presence for your company, goods, or services. Our
                  experts collaborate with you to exceed your exacting
                  expectations. Let potential customers engage with your brand
                  in a favorable way, hold onto your current clientele, and
                  maintain raising your market worth. Our bespoke design and
                  development services might be a real asset for your
                  business&apos;s enhanced online visibility.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`${styles.serviceSection}`} data-wow-delay="0.1s">
              <div className="agy-service-text">
                <h4>
                  <span className="xxxx" href="/react-js-developer-in-mumbai/">
                    Web Development
                  </span>
                </h4>
                <p>
                  A gateway with easy accessibility, an intuitive layout, easy
                  use, and creative UI/UX will eventually be necessary if you
                  want to draw in prospective target audience members. With the
                  assistance of skilled and competent staff, Vyapar Infotech
                  strives to realize your dream company website. To beat the
                  competition and gain market share, we assist your company in
                  using the newest technology and maximizing intelligent
                  applications.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`${styles.serviceSection}`} data-wow-delay="0.1s">
              <div className="agy-service-text">
                <h4>
                  <span className="xxxx" href="/react-js-developer-in-mumbai/">
                    Digital Marketing
                  </span>
                </h4>
                <p>
                  We have extensive knowledge in every pertinent sector and are
                  experts in the field of digital marketing. We multitask to
                  guarantee your business has a portion of digital excellence
                  through social media management, mobile advertising, SEO, and
                  content management. Our solutions yield revolutionary
                  development and a well-organized management structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
