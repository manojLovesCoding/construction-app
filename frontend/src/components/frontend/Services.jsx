import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'

function Services() {
    return (
        <>
            <Header />
            <Hero preHeading="Quality. Integrity. Value."
                heading="Services"
                text="We excel at transforming visions into reality through outstanding craftsmanship and precision." />

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-sm font-semibold text-pink-600 uppercase tracking-wide">
                            What We Do
                        </span>
                        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
                            Our Construction Services
                        </h2>
                        <p className="mt-4 text-gray-600">
                            We provide end-to-end construction solutions tailored to
                            residential, commercial, and industrial needs.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Residential Construction",
                                description:
                                    "Building high-quality homes with attention to detail, safety, and durability.",
                                image:
                                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
                            },
                            {
                                title: "Commercial Projects",
                                description:
                                    "Delivering functional and modern commercial spaces tailored to your business.",
                                image:
                                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
                            },
                            {
                                title: "Industrial Construction",
                                description:
                                    "Specialized solutions for factories, warehouses, and large-scale facilities.",
                                image:
                                    "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=900&q=80",
                            },
                            {
                                title: "Renovation & Remodeling",
                                description:
                                    "Transforming existing spaces with modern designs and improved functionality.",
                                image:
                                    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
                            },
                            {
                                title: "Interior Design",
                                description:
                                    "Creative interior solutions that combine style, comfort, and efficiency.",
                                image:
                                    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80",
                            },
                            {
                                title: "Project Management",
                                description:
                                    "Ensuring timely delivery, cost efficiency, and quality control throughout projects.",
                                image:
                                    "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=900&q=80",
                            },
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md overflow-hidden group"
                            >
                                <div className="relative">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"></div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {service.description}
                                    </p>
                                    <button className="text-pink-600 font-semibold hover:text-pink-700 transition">
                                        Learn More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <Footer />
        </>
    )
}

export default Services