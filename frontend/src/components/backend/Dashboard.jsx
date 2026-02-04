import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Sidebar from '../common/Sidebar'


const Dashboard = () => {
    return (
        <>
            <Header />

            <main className="min-h-[80vh] bg-gray-100 px-6 py-6">
                <div className="flex gap-6">

                    {/* Sidebar */}
                    <Sidebar />

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
