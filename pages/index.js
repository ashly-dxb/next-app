import React, { useState } from "react";
// import Link from "next/link";
import movieData from "../data";
import styles from "../container.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./components/layout";

export async function getServerSideProps() {
  return {
    props: {
      allMovies: movieData,
    },
  };
}

const Home = ({ allMovies }) => {
  return (
    <Layout>
      <div
        className={`bg-white py-10 px-5 m-auto w-full mt-10 ${styles.myContainer}`}
      >
        <div className="flex flex-wrap border m-auto mb-3">
          <h3 className={`${styles.pageHeading} text-2xl`}>
            Fulfill Your Expectations
          </h3>
        </div>

        <div className="flex flex-wrap border m-auto mr-3">
          <div className="w-full xxx md:w-1/2 lg:w-1/3 mr-1 ">
            <div className={`${styles.serviceSection}`} data-wow-delay="0.1s">
              <div className="xxx-text">
                <h4>
                  <span className="xxxx" href="/reactjs-developer-dubai/">
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

          <div className="w-full xxx md:w-1/2 lg:w-1/3 mr-1 ">
            <div className={`${styles.serviceSection}`} data-wow-delay="0.1s">
              <div className="xxx-text">
                <h4>
                  <span className="xxxx" href="/php-developer-dubai/">
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

          <div className="w-full xxx md:w-1/2 lg:w-1/3 mr-1 ">
            <div className={`${styles.serviceSection}`} data-wow-delay="0.1s">
              <div className="xxx-text">
                <h4>
                  <span className="xxxx" href="/nodejs-developer-dubai/">
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

          <div className="w-full xxx md:w-1/2 lg:w-1/3 mr-1 ">
            <div className={`${styles.serviceSection}`} data-wow-delay="0.1s">
              <div className="xxx-text">
                <h4>
                  <span className="xxxx" href="/nodejs-developer-dubai/">
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
