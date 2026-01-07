import Footer from "../common/Footer";
import Header from "../common/Header";

const About = () => {
  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-gray-700">
        This is the About page content. You can customize it as needed.
      </p>
    </div>
      <Footer />
    </>
  );
};

export default About;
