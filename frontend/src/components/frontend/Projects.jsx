import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: 'Residential Villas',
            description:
                'Luxury residential villas designed with precision, comfort, and modern architecture.',
            image: 'https://picsum.photos/600/400?random=1',
        },
        {
            id: 2,
            title: 'Commercial Complex',
            description:
                'High-quality commercial spaces built to support growing businesses.',
            image: 'https://picsum.photos/600/400?random=2',
        },
        {
            id: 3,
            title: 'Industrial Facility',
            description:
                'Robust and efficient industrial constructions meeting global standards.',
            image: 'https://picsum.photos/600/400?random=3',
        },
        {
            id: 4,
            title: 'Modern Apartments',
            description:
                'Contemporary apartment buildings with smart space planning.',
            image: 'https://picsum.photos/600/400?random=4',
        },
        {
            id: 5,
            title: 'Office Tower',
            description:
                'State-of-the-art office tower built for productivity and efficiency.',
            image: 'https://picsum.photos/600/400?random=5',
        },
        {
            id: 6,
            title: 'Warehouse Project',
            description:
                'Large-scale warehouse facility with optimized logistics flow.',
            image: 'https://picsum.photos/600/400?random=6',
        },
    ]

    return (
        <>
            <Header />

            <main>
                <Hero
                    preHeading="Quality. Integrity. Value."
                    heading="Our Projects"
                    text="We offer a diverse array of construction services, spanning residential, commercial, and industrial projects."
                />

                {/* Projects Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                                >
                                    <div className="h-56 overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Projects
