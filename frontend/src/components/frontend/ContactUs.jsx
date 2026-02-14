import React, { useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'
import { apiUrl } from '../common/http'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setSuccess('')
        setError('')

        try {
            const res = await fetch(apiUrl + 'contact-now', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await res.json()

            if (result.status) {
                setSuccess('Your message has been sent successfully.')
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                })
            } else {
                setError(result.message || 'Something went wrong.')
            }
        } catch (err) {
            setError('Failed to send message. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header />

            <main>
                <Hero
                    preHeading="Get In Touch"
                    heading="Contact Us"
                    text="Have questions or need assistance? Reach out to us anytime."
                />

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
                                <form onSubmit={handleSubmit} className="grid gap-6">

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter Your Name"
                                            required
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter Your Email"
                                            required
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />

                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone No."
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />

                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Subject"
                                            required
                                            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>

                                    <textarea
                                        rows="5"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Your Message"
                                        required
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    ></textarea>

                                    {/* Success Message */}
                                    {success && (
                                        <div className="text-green-600 font-medium">
                                            {success}
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {error && (
                                        <div className="text-red-600 font-medium">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-block bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-60"
                                    >
                                        {loading ? 'Sending...' : 'Send Now'}
                                    </button>
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
