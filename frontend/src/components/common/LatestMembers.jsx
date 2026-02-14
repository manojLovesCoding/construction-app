import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, fileUrl } from "./http";
import { FaLinkedinIn } from "react-icons/fa";

const LatestMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLatestMembers = async () => {
        try {
            const res = await axios.get(`${apiUrl}get-latest-members?limit=4`);
            if (res.data.status) {
                setMembers(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch latest members:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLatestMembers();
    }, []);

    const bgColors = [
        "bg-purple-100",
        "bg-blue-100",
        "bg-green-100",
        "bg-yellow-100",
    ];

    if (loading) {
        return (
            <div className="text-center py-16 text-gray-500">
                Loading team members...
            </div>
        );
    }

    return (
        <section className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Heading */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Welcome our talented team
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Distinguished by a blend of diverse talents, our exceptional team thrives on unity,
                        innovation, and shared values, forging a collective journey towards unparalleled success.
                    </p>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {members.length > 0 ? (
                        members.map((member, index) => (
                            <div
                                key={member.id}
                                className={`${bgColors[index % bgColors.length]} rounded-2xl pt-20 pb-6 px-6 text-center relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between`}
                                style={{ minHeight: "300px" }} // ensures consistent card height
                            >
                                {/* Profile Image */}
                                {member.image && (
                                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                                        <img
                                            src={`${fileUrl}uploads/members/${member.image}`}
                                            alt={member.name}
                                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div>
                                    {/* Name */}
                                    <h3 className="text-sm font-medium text-gray-900">
                                        {member.name}
                                    </h3>

                                    {/* Job Title */}
                                    <p className="text-gray-600 text-sm mt-1">
                                        {member.job_title}
                                    </p>
                                </div>

                                {/* LinkedIn Icon */}
                                {member.linkedin_url && (
                                    <a
                                        href={member.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center mt-4 w-9 h-9 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 self-center"
                                    >
                                        <FaLinkedinIn size={16} />
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-4 text-center text-gray-500">
                            No members found.
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default LatestMembers;
