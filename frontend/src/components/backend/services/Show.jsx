import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'
import { apiUrl, token } from '../../common/http'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Show = () => {
    const [services, setServices] = useState([])

    const fetchServices = async () => {
        try {
            const res = await axios.get(`${apiUrl}services`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token()}`
                }
            })

            setServices(res.data.data)
            console.log(res.data.data)

        } catch (error) {
            console.error('Error fetching services:', error)
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])

    return (
        <>
            <Header />

            <main className="min-h-[80vh] bg-gray-100 px-6 py-6">
                <div className="flex gap-6">

                    <Sidebar />

                    <section className="flex-1 bg-white shadow rounded p-6">

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-700">
                                Services
                            </h2>

                            <Link
                                to="/admin/services/create"
                                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded text-sm"
                            >
                                CREATE
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-left text-sm text-gray-600">
                                        <th className="p-3 border">ID</th>
                                        <th className="p-3 border">Name</th>
                                        <th className="p-3 border">Slug</th>
                                        <th className="p-3 border">Status</th>
                                        <th className="p-3 border text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {services.length > 0 ? (
                                        services.map(service => (
                                            <tr key={service.id} className="text-sm">
                                                <td className="p-3 border">{service.id}</td>
                                                <td className="p-3 border font-medium text-gray-700">
                                                    {service.title}
                                                </td>
                                                <td className="p-3 border text-gray-600">
                                                    {service.slug}
                                                </td>
                                                <td className="p-3 border">
                                                    {service.status === "1" ? (
                                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                                                            Inactive
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3 border">
                                                    <div className="flex justify-center gap-3">
                                                        <button className="text-blue-600 hover:underline">
                                                            Edit
                                                        </button>
                                                        <button className="text-red-600 hover:underline">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-4 text-center text-gray-500">
                                                No services found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </section>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default Show
