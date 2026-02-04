import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'

const Dashboard = () => {
    return (
        <>
            <Header />

            <main className="min-h-[80vh] bg-gray-100 px-6 py-6">
                <div className="flex gap-6">
                    
                    {/* Sidebar */}
                    <aside className="w-64 bg-white shadow rounded p-4">
                        <h3 className="font-semibold text-lg mb-4">Sidebar</h3>

                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-pink-500 cursor-pointer">
                                Dashboard
                            </li>
                            <li className="hover:text-pink-500 cursor-pointer">
                                Projects
                            </li>
                            <li className="hover:text-pink-500 cursor-pointer">
                                Users
                            </li>
                            <li className="hover:text-pink-500 cursor-pointer">
                                Settings
                            </li>
                        </ul>
                    </aside>

                    {/* Dashboard Content */}
                    <section className="flex-1 bg-white shadow rounded flex items-center justify-center">
                        <h2 className="text-xl font-semibold text-gray-600">
                            Welcome to admin console
                        </h2>
                    </section>

                </div>
            </main>

            <Footer />
        </>
    )
}

export default Dashboard
