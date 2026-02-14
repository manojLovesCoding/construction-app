import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { apiUrl, fileUrl } from '../common/http';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog by ID
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}get-article/${id}`);
        const result = await res.json();
        setBlog(result.status ? result.data : null);
      } catch (error) {
        console.error('Failed to fetch blog:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Fetch latest blogs once
  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const res = await fetch(`${apiUrl}get-latest-articles?limit=6`);
        const result = await res.json();
        if (result.status) setLatestBlogs(result.data);
      } catch (error) {
        console.error('Failed to fetch latest blogs:', error);
      }
    };

    fetchLatestBlogs();
  }, []);

  const imageUrl = blog?.image ? `${fileUrl}uploads/articles/large/${blog.image}` : null;

  // ---------- Loading Skeleton ----------
  if (loading) {
    return (
      <>
        <Header />
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-7xl animate-pulse">
            {/* Back button skeleton */}
            <div className="mb-8 w-40 h-6 bg-gray-200 rounded"></div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main content skeleton */}
              <main className="w-full lg:w-3/4 space-y-6">
                <div className="h-8 md:h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-80 md:h-96 lg:h-[500px] bg-gray-200 rounded"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </main>

              {/* Sidebar skeleton */}
              <aside className="hidden lg:block w-full lg:w-1/4 space-y-4">
                <div className="sticky top-36 mt-6 bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <ul className="space-y-4">
                    {[...Array(6)].map((_, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <div className="w-16 h-10 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // ---------- Blog Not Found ----------
  if (!blog) {
    return (
      <p className="text-center mt-24 text-red-500 text-lg">
        Blog not found.
      </p>
    );
  }

  // ---------- Main Blog Content ----------
  return (
    <>
      <Header />
      <Hero preHeading="Blog" heading={blog.title} text="" />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => {
              navigate('/blogs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mb-8 inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Blogs
          </button>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Blog Content */}
            <main className="w-full lg:w-3/4 space-y-8">
              <article className="bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                  {blog.title}
                </h1>
                <p className="text-gray-600 mb-6">
                  by <strong>{blog.author || 'Unknown'}</strong> on{' '}
                  {new Date(blog.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>

                {imageUrl && (
                  <div className="overflow-hidden rounded-3xl shadow-2xl mb-6">
                    <img
                      src={imageUrl}
                      alt={blog.title}
                      className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                    />
                  </div>
                )}

                <div
                  className="prose prose-lg md:prose-xl text-gray-700 max-w-full"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </article>

              {/* Mobile sidebar */}
              <div className="lg:hidden mt-12">
                <h3 className="text-xl font-semibold mb-4">Latest Blogs</h3>
                <ul className="space-y-4">
                  {latestBlogs.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center cursor-pointer hover:text-blue-600"
                      onClick={() => {
                        navigate(`/blogs/${item.id}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <img
                        src={
                          item.image
                            ? `${fileUrl}uploads/articles/small/${item.image}`
                            : 'https://via.placeholder.com/60x40?text=No+Image'
                        }
                        alt={item.title}
                        className="w-16 h-10 object-cover rounded mr-3 flex-shrink-0"
                      />
                      <span className="text-sm">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </main>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-full lg:w-1/4">
              <div className="sticky top-36 mt-6 bg-white p-6 rounded-xl shadow-md border border-gray-200 text-gray-800">
                <h3 className="text-xl font-semibold mb-4">Latest Blogs</h3>
                <ul className="space-y-4">
                  {latestBlogs.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center cursor-pointer hover:text-blue-600"
                      onClick={() => {
                        navigate(`/blogs/${item.id}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top for desktop as well
                      }}
                    >
                      <img
                        src={
                          item.image
                            ? `${fileUrl}uploads/articles/small/${item.image}`
                            : 'https://via.placeholder.com/60x40?text=No+Image'
                        }
                        alt={item.title}
                        className="w-16 h-10 object-cover rounded mr-3 flex-shrink-0"
                      />
                      <span className="text-sm">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogDetail;
