import React, { useEffect, useState } from "react";
import { apiUrl, fileUrl } from "./http";
import DefaultImg from "../../assets/images/construction1.jpg";


const LatestTestimonials = ({ limit = 4 }) => {
    const [testimonials, setTestimonials] = useState([]);

    const fetchLatestTestimonials = async () => {
        try {
            const res = await fetch(`${apiUrl}get-latest-testimonials?limit=${limit}`, {
                method: "GET",
            });
            const result = await res.json();
            setTestimonials(result.data);
        } catch (error) {
            console.error("Failed to fetch latest testimonials:", error);
        }
    };

    useEffect(() => {
        fetchLatestTestimonials();
    }, []);

    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-sm uppercase tracking-widest text-blue-600 font-semibold">
                        Our Clients
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                        Latest Testimonials
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Hear what our clients are saying about our services and expertise.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials && testimonials.length > 0 ? (
                        testimonials.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center group hover:shadow-xl transition"
                            >
                                <div className="w-24 h-24 mb-4">
                                    <img
                                        src={
                                            item.image
                                                ? `${fileUrl}uploads/testimonials/small/${item.image}`
                                                : DefaultImg
                                        }
                                        alt={item.citation}
                                        className="w-full h-full object-cover rounded-full border-2 border-blue-500"
                                    />
                                </div>

                                <p className="text-gray-600 text-sm mb-4 italic line-clamp-4">
                                    "{item.testimonial}"
                                </p>

                                <h3 className="text-lg font-bold text-gray-900">
                                    {item.citation}
                                </h3>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No testimonials found.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LatestTestimonials;
