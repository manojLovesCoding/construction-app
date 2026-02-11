import Footer from "../common/Footer";
import Header from "../common/Header";
import { default as AboutNew } from "../common/About";
import Hero from "../common/Hero";
import LatestTestimonials from "../common/LatestTestimonials";

const About = () => {
  return (
    <>
      <Header />
      <main>
        <Hero preHeading="Quality. Integrity. Value."
          heading="About Us"
          text="We offer a diverse array of construction services, spanning residential, commercial, and industrial projects." />

        <AboutNew />

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-sm font-semibold text-pink-600 uppercase tracking-wide">
                Our Experts
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
                Meet Our Professional Team
              </h2>
              <p className="mt-4 text-gray-600">
                Our experienced team is committed to delivering quality,
                safety, and excellence across every project.
              </p>
            </div>

            {/* Team Grid */}
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  name: "John Anderson",
                  role: "Project Manager",
                  image: "/src/assets/images/team1.jpg",
                },
                {
                  name: "Sarah Williams",
                  role: "Architect",
                  image: "/src/assets/images/team2.jpg",
                },
                {
                  name: "Michael Brown",
                  role: "Site Engineer",
                  image: "/src/assets/images/team3.jpg",
                },
                {
                  name: "Emily Davis",
                  role: "Interior Designer",
                  image: "/src/assets/images/team4.jpg",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <LatestTestimonials limit={4} />
      </main>
      <Footer />
    </>
  );
};

export default About;
