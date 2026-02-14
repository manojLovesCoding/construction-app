import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { apiUrl, fileUrl } from '../common/http';

function Services() {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    const fetchAllServices = async () => {
        try {
            const res = await fetch(apiUrl + 'get-services', {
                method: 'GET',
            });
            const result = await res.json();
            setServices(result.data);
        } catch (error) {
            console.error('Failed to fetch services', error);
        }
    };

    useEffect(() => {
        fetchAllServices();
    }, []);

    return (
        <>
            <Header />

            <Hero
                preHeading="Quality. Integrity. Value."
                heading="Services"
                text="We excel at transforming visions into reality through outstanding craftsmanship and precision."
            />

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
                        {services.length > 0 ? (
                            services.map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden group"
                                >
                                    <div className="relative">
                                        <img
                                            src={`${fileUrl}uploads/services/small/${service.image}`}
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
                                            {service.short_desc}
                                        </p>
                                        <button
                                            onClick={() => navigate(`/services/${service.id}`)}
                                            className="text-pink-600 font-semibold hover:text-pink-700 transition"
                                        >
                                            Learn More →
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">
                                No services found.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Services;
