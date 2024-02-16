import React from "react";
import image from "../assets/images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
              Welcome to our medical center! Our mission is to provide
              high-quality healthcare services with a focus on patient
              well-being. Our team of experienced doctors is dedicated to
              ensuring the health and happiness of our community.
            </p>
            <p>
              Our doctors specialize in various fields, including internal
              medicine, pediatrics, cardiology, and more. We are committed to
              delivering personalized care and creating a positive impact on
              the lives of our patients.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
