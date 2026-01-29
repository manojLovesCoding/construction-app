import React from 'react'

const Hero = ({ preHeading, heading, text }) => {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat min-h-[50vh]"
            style={{ backgroundImage: "url('/src/assets/images/hero.jpg')" }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative container mx-auto px-6 py-20">
                <div className="max-w-xl text-white">
                    <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wide">
                        {preHeading}
                    </span>

                    <h1 className="mt-2 text-4xl md:text-5xl font-extrabold">
                        {heading}
                    </h1>

                    <p className="mt-4 text-gray-200 leading-relaxed">
                        {text}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero