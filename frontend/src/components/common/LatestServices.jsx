import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceImg from "../../assets/images/construction1.jpg"; // fallback image
import { apiUrl, fileUrl } from "./http";

const LatestServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const fetchLatestServices = async () => {
    try {
      const res = await fetch(apiUrl + "get-latest-services?limit=4", {
        method: "GET",
      });
      const result = await res.json();
      setServices(result.data);
    } catch (error) {
      console.error("Failed to fetch latest services:", error);
    }
  };

  useEffect(() => {
    fetchLatestServices();
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm uppercase tracking-widest text-blue-600 font-semibold">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Our construction services
          </h2>
          <p className="text-gray-600 mt-4">
            We offer a diverse array of construction services, spanning
            residential, commercial, and industrial projects.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.length > 0 ? (
            services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition cursor-pointer"
                onClick={() => navigate(`/services/${service.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/services/${service.id}`);
                  }
                }}
              >
                <div className="overflow-hidden">
                  <img
                    src={
                      service.image
                        ? `${fileUrl}uploads/services/small/${service.image}`
                        : ServiceImg
                    }
                    alt={service.title || "Service Image"}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-5">
                    {service.short_desc || "No description available."}
                  </p>
                  <span className="inline-block text-blue-600 font-semibold text-sm hover:text-blue-800 transition">
                    Read More →
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No services found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestServices;
