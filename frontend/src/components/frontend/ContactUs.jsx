import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'

const ContactUs = () => {
    return (
        <>
            <Header />

            <main>
                <Hero
                    preHeading="Get In Touch"
                    heading="Contact Us"
                    text="Have questions or need assistance? Reach out to us anytime."
                />

                {/* Contact Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid gap-10 lg:grid-cols-3">
                            
                            {/* Left Info Card */}
                            <div className="bg-white rounded-2xl shadow-md p-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Call Us
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    (888-000-0000)<br />
                                    (222-123-12345)
                                </p>

                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    You can write us:
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    example@example.com<br />
                                    info@example.com
                                </p>

                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Address:
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    B-18X, Rajaji Puram<br />
                                    Lucknow, Uttar Pradesh, 226017<br />
                                    0522400XXXX
                                </p>
                            </div>

                            {/* Right Form Card */}
                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8">
                                <form className="grid gap-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Your Name"
                                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Enter Your Email"
                                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Phone No."
                                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Subject"
                                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">
                                            Message
                                        </label>
                                        <textarea
                                            rows="5"
                                            placeholder="Your Message"
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-block bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-pink-700 transition"
                                        >
                                            Send Now
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default ContactUs
