import React from "react";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import HomeCircles from "../components/HomeCircles";
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
const HomePage = () => {
    return (
        <div>
            <NavBar />
            <Hero />
            <AboutUs/>
            <HomeCircles/>
            <Footer />
        </div>
    );
};

export default HomePage;
