import React from "react";
import styles from "./About.module.css"; // Import the CSS module
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const AboutPage = () => {
  return (
    <div>
        <Helmet>
            <title>
                About
            </title>
        </Helmet>
      <div className={`${styles.header_profile} py-5 mb-5 text-center `}>
        <h1>About US</h1>

        <Link to="/" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>HomePage</span>
        </Link>

        <span className={`${styles.span_profile}`}>&gt;About US</span>
      </div>
      <div className="my-5">
        <>
        
        <section className={styles["first-section"] }>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={styles["about-image"]}></div>
            </div>
            <div className="col-md-6 mt-4">
              <div className={styles["about-text"]}>
                <p>
                  Handcrafted Marketplace is the global marketplace for unique
                  and creative goods. It’s home to a universe of special,
                  extraordinary items, from unique handcrafted pieces to vintage
                  treasures.
                </p>
                <p>
                  In a time of increasing automation, it’s our mission to keep
                  human connection at the heart of commerce. That’s why we built
                  a place where creativity lives and thrives because it’s
                  powered by people. We help our community of sellers turn their
                  ideas into successful businesses. Our platform connects them
                  with millions of buyers looking for an alternative—something
                  special with a human touch, for those moments in life that
                  deserve imagination.
                </p>
                <p>
                  As a company, we strive to lead with our guiding principles
                  and to help spread ideas of sustainability and responsibility
                  whose impact can reach far beyond our own business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["second-section"]}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className={styles["about-text"]}>
                <p>
                  HandCraft Marketplace is the global marketplace for unique and creative goods.
                  It’s home to a universe of special, extraordinary items, from
                  unique handcrafted pieces to vintage treasures.
                </p>
                <p>
                  In a time of increasing automation, it’s our mission to keep
                  human connection at the heart of commerce. That’s why we built
                  a place where creativity lives and thrives because it’s
                  powered by people. We help our community of sellers turn their
                  ideas into successful businesses. Our platform connects them
                  with millions of buyers looking for an alternative—something
                  special with a human touch, for those moments in life that
                  deserve imagination.
                </p>
                <p>
                  As a company, we strive to lead with our guiding principles
                  and to help spread ideas of sustainability and responsibility
                  whose impact can reach far beyond our own business.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles["about-image"]}></div>
            </div>
          </div>
        </div>
      </section>
        </>
      </div>
 
    </div>
  );
};

export default AboutPage;
