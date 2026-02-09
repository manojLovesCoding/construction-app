import React, { useEffect, useState } from "react";
import ProjectImg from "../../assets/images/construction1.jpg"; // default fallback image
import { apiUrl, fileUrl } from "./http";

const LatestProjects = () => {
    const [projects, setProjects] = useState([]);

    const fetchLatestProjects = async () => {
        try {
            const res = await fetch(apiUrl + 'get-latest-projects?limit=4', {
                method: 'GET',
            });
            const result = await res.json();
            console.log(result);
            setProjects(result.data);
        } catch (error) {
            console.error("Failed to fetch latest projects:", error);
        }
    };

    useEffect(() => {
        fetchLatestProjects();
    }, []);

    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-sm uppercase tracking-widest text-blue-600 font-semibold">
                        Our Projects
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                        Latest Construction Projects
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Explore some of our recent projects showcasing our expertise across residential, commercial, and industrial sectors.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {projects && projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition">
                            <div className="overflow-hidden">
                                <img
                                    src={project.image ? `${fileUrl}uploads/projects/small/${project.image}` : ProjectImg}
                                    alt={project.title}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-5">
                                    {project.short_desc || "No description available."}
                                </p>
                                <a
                                    href="#"
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

export default LatestProjects;
