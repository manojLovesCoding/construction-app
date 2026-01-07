

import aboutImg from "../../assets/images/about-us.jpg";
import Footer from "../common/Footer";
import Header from "../common/Header";

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
        <section className="bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src={aboutImg}
                  alt="About UrbanEdge Construction"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 rounded-xl bg-pink-500/10"></div>
              </div>

              <div>
                <span className="text-sm font-semibold text-pink-600 uppercase">
                  About Us
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-6">
                  Building with integrity, innovation, and experience
                </h2>
                <p className="text-gray-600 mb-6">
                  UrbanEdge Construction delivers high-quality residential,
                  commercial, and industrial projects with precision and care.
                </p>
                <button className="px-8 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
