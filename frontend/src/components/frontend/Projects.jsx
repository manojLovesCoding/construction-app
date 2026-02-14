import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { apiUrl, fileUrl } from '../common/http';

function Projects() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const fetchAllProjects = async () => {
        try {
            const res = await fetch(apiUrl + 'get-projects', {
                method: 'GET',
            });
            const result = await res.json();
            setProjects(result.data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        }
    };

    useEffect(() => {
        fetchAllProjects();
    }, []);

    return (
        <>
            <Header />

            <Hero
                preHeading="Excellence. Quality. Innovation."
                heading="Projects"
                text="Take a look at our diverse portfolio of construction projects across residential, commercial, and industrial sectors."
            />

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                            Our Work
                        </span>
                        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
                            Recent Construction Projects
                        </h2>
                        <p className="mt-4 text-gray-600">
                            We showcase our expertise through a wide range of projects, demonstrating our commitment to quality and innovation.
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer"
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                >
                                    <div className="relative">
                                        <img
                                            src={
                                                project.image
                                                    ? `${fileUrl}uploads/projects/small/${project.image}`
                                                    : '/default-project.jpg'
                                            }
                                            alt={project.title}
                                            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {project.short_desc || 'No description available.'}
                                        </p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // prevent triggering parent click
                                                navigate(`/projects/${project.id}`);
                                            }}
                                            className="text-blue-600 font-semibold hover:text-blue-700 transition"
                                        >
                                            Learn More →
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">
                                No projects found.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Projects;
