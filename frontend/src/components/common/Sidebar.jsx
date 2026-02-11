import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../backend/context/Auth'


const Sidebar = () => {
    const navigate = useNavigate()
    const {logout} = useContext(AuthContext);

    const handleLogout = () => {
        logout() // Clears user state and localStorage
    }

    return (
        <aside className="w-64 bg-white shadow-lg rounded p-4 h-[calc(100vh-4rem)]">
            <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>

            <ul className="space-y-3">
                <li
                    className="cursor-pointer px-3 py-2 rounded hover:bg-pink-100 hover:text-pink-600"
                    onClick={() => navigate('/admin/dashboard')}
                >
                    Dashboard
                </li>

                <li
                    className="cursor-pointer px-3 py-2 rounded hover:bg-pink-100 hover:text-pink-600"
                    onClick={() => navigate('/admin/services')}
                >
                    Services
                </li>

                <li
                    className="cursor-pointer px-3 py-2 rounded hover:bg-pink-100 hover:text-pink-600"
                    onClick={() => navigate('/admin/projects')}
                >
                    Projects
                </li>

                <li
                    className="cursor-pointer px-3 py-2 rounded hover:bg-pink-100 hover:text-pink-600"
                    onClick={() => navigate('/admin/articles')}
                >
                    Articles
                </li>

                <li
                    className="cursor-pointer px-3 py-2 rounded hover:bg-pink-100 hover:text-pink-600"
                    onClick={() => navigate('/admin/testimonials')}
                >
                    Testimonials
                </li>

                <li
                    className="cursor-pointer px-3 py-2 rounded mt-6 bg-pink-500 text-white text-center hover:bg-pink-600"
                    onClick={handleLogout}
                >
                    Logout
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar
