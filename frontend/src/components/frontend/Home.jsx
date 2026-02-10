

import { useEffect, useState } from "react";
import aboutImg from "../../assets/images/about-us.jpg";
import About from "../common/About";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { apiUrl } from "../common/http";
import LatestServices from "../common/LatestServices";
import LatestProjects from "../common/LatestProjects";
import LatestArticles from "../common/LatestArticles.JSX";

const Home = () => {
  

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/src/assets/images/hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative container mx-auto px-4 py-32">
            <div className="flex flex-col items-center justify-center text-center text-white max-w-3xl mx-auto">
              <span className="mb-4 text-sm font-semibold tracking-wide text-pink-400 uppercase">
                Welcome Amazing Constructions
              </span>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                Crafting dreams with <br />
                <span className="text-pink-500">precision and excellence</span>
              </h1>

              <p className="text-lg text-gray-200 mb-8">
                We excel at transforming visions into reality through outstanding
                craftsmanship and precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-pink-600 rounded-md hover:bg-pink-700 transition">
                  Our Services
                </button>
                <button className="px-8 py-3 border border-white rounded-md hover:bg-white hover:text-gray-900 transition">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <About />

        {/* Services Section */}
        <LatestServices/>

        {/* Projects Section */}
        <LatestProjects />

        {/* Articles Section */}
        <LatestArticles />

      </main>

      <Footer />
    </>
  );
};

export default Home;
