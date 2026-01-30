import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'

const Blog = () => {
    const blogs = [
        {
            id: 1,
            title: 'Modern Construction Trends in 2025',
            excerpt:
                'Explore the latest innovations shaping the construction industry this year.',
            image: 'src/assets/images/construction3.jpg',
            date: 'Jan 12, 2025',
        },
        {
            id: 2,
            title: 'Why Quality Materials Matter',
            excerpt:
                'Understanding how high-quality materials impact durability and safety.',
            image: '/images/blog-2.jpg',
            date: 'Feb 03, 2025',
        },
        {
            id: 3,
            title: 'Sustainable Building Practices',
            excerpt:
                'How eco-friendly construction is transforming the future.',
            image: '/images/blog-3.jpg',
            date: 'Mar 18, 2025',
        },
    ]

    return (
        <>
            <Header />

            <main>
                <Hero
                    preHeading="Latest News"
                    heading="Our Blog"
                    text="Stay updated with our latest news, insights, and industry trends."
                />

                {/* Blog Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((blog) => (
                                <article
                                    key={blog.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                                >
                                    <div className="h-56 overflow-hidden">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <span className="text-sm text-gray-500">
                                            {blog.date}
                                        </span>

                                        <h3 className="mt-2 text-xl font-semibold text-gray-800">
                                            {blog.title}
                                        </h3>

                                        <p className="mt-3 text-gray-600 text-sm">
                                            {blog.excerpt}
                                        </p>

                                        <button className="mt-5 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                                            Read More →
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Blog
