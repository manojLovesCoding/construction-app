import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from '../common/Header'
import Footer from '../common/Footer'

const Login = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/authenticate',
                data
            )

            if (response.data.status === true) {
                const authData = {
                    token: response.data.token,
                    id: response.data.id
                }

                // Store as single key
                localStorage.setItem('auth', JSON.stringify(authData))

                toast.success('Login successful 🎉')

                // Redirect to dashboard
                setTimeout(() => {
                    navigate('/admin/dashboard')
                }, 1000)

            } else {
                toast.error(response.data.error)
            }


        } catch (error) {
            toast.error('Something went wrong 🚫')
        }
    }

    return (
        <>
            <Header />

            <main className="min-h-[80vh] flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Login Here
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-pink-400"
                                {...register('email', { required: 'Email is required' })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-pink-400"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded disabled:opacity-50"
                        >
                            {isSubmitting ? 'Logging in...' : 'LOGIN'}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default Login
