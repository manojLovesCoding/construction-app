import { useEffect, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { apiUrl, fileUrl } from '../common/http';

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch(apiUrl + 'get-testimonials', {
                method: 'GET',
            });
            const result = await res.json();
            setTestimonials(result.data);
        } catch (error) {
            console.error('Failed to fetch testimonials', error);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    return (
        <>
            <Header />

            <Hero
                preHeading="Hear from our clients"
                heading="Testimonials"
                text="See what our satisfied clients have to say about our services and expertise."
            />

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">

                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                            Our Clients
                        </span>
                        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
                            Client Testimonials
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Feedback from clients who have experienced our top-notch services.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.length > 0 ? (
                            testimonials.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center group"
                                >
                                    <div className="w-24 h-24 mb-4">
                                        <img
                                            src={
                                                item.image
                                                    ? `${fileUrl}uploads/testimonials/small/${item.image}`
                                                    : '/default-testimonial.jpg'
                                            }
                                            alt={item.citation}
                                            className="w-full h-full object-cover rounded-full border-2 border-blue-500"
                                        />
                                    </div>

                                    <p className="text-gray-600 mb-4 italic line-clamp-4">
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

            <Footer />
        </>
    );
}

export default Testimonials;
