import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl, fileUrl } from '../common/http';
import Header from '../common/Header';
import Footer from '../common/Footer';

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`${apiUrl}get-service/${id}`);
        const result = await res.json();
        setService(result.data);
      } catch (error) {
        console.error('Failed to fetch service details', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllServices = async () => {
      try {
        const res = await fetch(`${apiUrl}get-services`);
        const result = await res.json();
        setServices(result.data);
      } catch (error) {
        console.error('Failed to fetch services', error);
      }
    };

    fetchService();
    fetchAllServices();
  }, [id]);

  if (loading) return <p className="text-center mt-24 text-gray-500 text-lg animate-pulse">Loading...</p>;
  if (!service) return <p className="text-center mt-24 text-red-500 text-lg">Service not found.</p>;

  const imageUrl = `${fileUrl}uploads/services/large/${service.image}`;
  const relatedServices = services.filter(s => s.id !== service.id);

  return (
    <>
      <Header />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/services')}
            className="mb-8 inline-flex items-center text-pink-600 font-semibold hover:text-pink-700 transition-colors duration-300"
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
            Back to Services
          </button>

          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex justify-between items-center bg-white p-3 mt-6 rounded-lg shadow-sm border border-gray-200 transition hover:bg-gray-50"
            >
              <span className="text-md font-medium text-gray-800">Related Services</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${sidebarOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {sidebarOpen && (
              <ul className="mt-2 space-y-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-sm">
                {relatedServices.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        navigate(`/services/${s.id}`);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1 rounded transition-all duration-200 ${
                        s.id === service.id
                          ? 'bg-pink-100 text-pink-600 font-semibold shadow-sm'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-full lg:w-1/4">
              <div className="sticky top-36 mt-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Related Services</h3>
                <ul className="space-y-2">
                  {relatedServices.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => navigate(`/services/${s.id}`)}
                        className={`w-full text-left px-2 py-1 rounded transition-all duration-200 ${
                          s.id === service.id
                            ? 'bg-pink-100 text-pink-600 font-semibold shadow-sm'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Service Content */}
            <main className="w-full lg:w-3/4 space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">{service.title}</h1>

              {service.image && (
                <div className="overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 transform hover:scale-105">
                  <img
                    src={imageUrl}
                    alt={service.title}
                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                  />
                </div>
              )}

              <div
                className="prose prose-lg md:prose-xl text-gray-700 max-w-full"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ServiceDetails;
