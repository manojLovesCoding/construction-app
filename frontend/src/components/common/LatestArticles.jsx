import React, { useEffect, useState } from "react";
import ArticleImg from "../../assets/images/construction1.jpg";
import { apiUrl, fileUrl } from "./http";

const LatestArticles = () => {
    const [articles, setArticles] = useState([]);

    const fetchLatestArticles = async () => {
        try {
            const res = await fetch(apiUrl + 'get-latest-articles?limit=4', {
                method: 'GET',
            });
            const result = await res.json();
            setArticles(result.data);
        } catch (error) {
            console.error("Failed to fetch latest articles:", error);
        }
    };

    useEffect(() => {
        fetchLatestArticles();
    }, []);

    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-sm uppercase tracking-widest text-blue-600 font-semibold">
                        Our Articles
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                        Latest Articles
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Read our latest insights, updates, and stories from the construction world.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {articles && articles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={
                                        article.image
                                            ? `${fileUrl}uploads/articles/small/${article.image}`
                                            : ArticleImg
                                    }
                                    alt={article.title}
                                    className="w-full h-48 object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    {article.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                                    {article.content
                                        ? article.content.replace(/(<([^>]+)>)/gi, '').substring(0, 100) + '...'
                                        : 'No content available.'}
                                </p>

                                <a
                                    href={`/articles/${article.slug}`}
                                    className="inline-block text-blue-600 font-semibold text-sm hover:text-blue-800 transition"
                                >
                                    Read More →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestArticles;
