import aboutImg from "../../assets/images/about-us.jpg";

function About() {
    return (
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
    )
}

export default About