import { useEffect, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { apiUrl, fileUrl } from '../common/http';

function Blog() {
    const [articles, setArticles] = useState([]);

    const fetchAllArticles = async () => {
        try {
            const res = await fetch(apiUrl + 'get-articles', {
                method: 'GET',
            });
            const result = await res.json();
            setArticles(result.data);
        } catch (error) {
            console.error('Failed to fetch articles', error);
        }
    };

    useEffect(() => {
        fetchAllArticles();
    }, []);

    return (
        <>
            <Header />

            <Hero
                preHeading="Insights. Updates. Stories."
                heading="Articles"
                text="Read our latest articles covering construction trends, company updates, and industry insights."
            />

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">

                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                            Our Articles
                        </span>
                        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
                            Latest Articles & News
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Stay informed with our latest thoughts, project updates, and construction insights.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.length > 0 ? (
                            articles.map((article) => (
                                <div
                                    key={article.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden group"
                                >
                                    <div className="relative">
                                        <img
                                            src={
                                                article.image
                                                    ? `${fileUrl}uploads/articles/small/${article.image}`
                                                    : '/default-article.jpg'
                                            }
                                            alt={article.title}
                                            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"></div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {article.title}
                                        </h3>

                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {article.content
                                                ? article.content.replace(/(<([^>]+)>)/gi, '').substring(0, 120) + '...'
                                                : 'No content available.'}
                                        </p>

                                        <a
                                            href={`/articles/${article.slug}`}
                                            className="text-blue-600 font-semibold hover:text-blue-700 transition"
                                        >
                                            Read More →
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">
                                No articles found.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Blog;
