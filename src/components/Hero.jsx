import React from "react";
import image from "../assets/images/heroimg.jpg";
import "../assets/styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Your Health, <br />
          Our Responsibility
        </h1>
        <p>
          Meet our dedicated team of skilled doctors, committed to providing
          exceptional healthcare. Whether you're seeking preventive care,
          diagnosis, or treatment, our doctors are here for you.
        </p>
      </div>
      <div className="hero-img">
        <img src={image} alt="hero" />
      </div>
    </section>
  );
};

export default Hero;
