import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl, fileUrl } from '../common/http';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [insightsOpen, setInsightsOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${apiUrl}get-project/${id}`);
        const result = await res.json();
        setProject(result.data);
      } catch (error) {
        console.error('Failed to fetch project details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-24 text-gray-500 text-lg animate-pulse">
        Loading...
      </p>
    );

  if (!project)
    return (
      <p className="text-center mt-24 text-red-500 text-lg">
        Project not found.
      </p>
    );

  const imageUrl = `${fileUrl}uploads/projects/large/${project.image}`;

  return (
    <>
      <Header />

      <Hero preHeading="Our Projects" heading={project.title} text="" />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/projects')}
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
            Back to Projects
          </button>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Insights Card */}

            {/* Mobile toggle button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setInsightsOpen(!insightsOpen)}
                className="w-full flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 text-gray-800 font-semibold"
              >
                <span>Insights</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    insightsOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {insightsOpen && (
                <div className="mt-2 bg-white p-6 rounded-xl shadow-md border border-gray-200 text-gray-800">
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="font-semibold text-gray-700">Location</dt>
                      <dd>{project.location || 'N/A'}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700">Construction Type</dt>
                      <dd>{project.construction_type || 'N/A'}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700">Sector</dt>
                      <dd>{project.sector || 'N/A'}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>

            {/* Desktop Insights sidebar */}
            <aside className="hidden lg:block w-full lg:w-1/4">
              <div className="sticky top-36 mt-6 bg-white p-6 rounded-xl shadow-md border border-gray-200 text-gray-800">
                <h3 className="text-xl font-semibold mb-4">Insights</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-gray-700">Location</dt>
                    <dd>{project.location || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-700">Construction Type</dt>
                    <dd>{project.construction_type || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-700">Sector</dt>
                    <dd>{project.sector || 'N/A'}</dd>
                  </div>
                </dl>
              </div>
            </aside>

            {/* Main Project Content */}
            <main className="w-full lg:w-3/4 space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
                {project.title}
              </h1>

              {project.image && (
                <div className="overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 transform hover:scale-105">
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                  />
                </div>
              )}

              <div
                className="prose prose-lg md:prose-xl text-gray-700 max-w-full"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProjectDetail;
