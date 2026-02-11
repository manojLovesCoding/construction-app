import React, { useEffect, useState, useRef } from 'react';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import Footer from '../../common/Footer';
import { apiUrl, token } from '../../common/http';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Show = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);
    const [editingTestimonial, setEditingTestimonial] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Fetch testimonials
    const fetchTestimonials = async () => {
        try {
            const res = await axios.get(`${apiUrl}testimonials`, {
                headers: { Authorization: `Bearer ${token()}` },
            });
            setTestimonials(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    // Upload image
    const handleFileUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${apiUrl}temp-images`, formData, {
                headers: { Authorization: `Bearer ${token()}` },
            });

            if (res.data.status === false) {
                toast.error(res.data.errors.image[0]);
            } else {
                setImageId(res.data.data.id);
                toast.success('Image uploaded successfully');
            }
        } catch {
            toast.error('Image upload failed');
        }
    };

    // Edit
    const handleEdit = (testimonial) => {
        setEditingTestimonial(testimonial);
        reset({
            testimonial: testimonial.testimonial,
            citation: testimonial.citation,
            status: testimonial.status,
        });
        setImageId(null);
        setShowModal(true);
    };

    // Delete
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;

        try {
            await axios.delete(`${apiUrl}testimonials/${id}`, {
                headers: { Authorization: `Bearer ${token()}` },
            });
            toast.success('Testimonial deleted');
            fetchTestimonials();
        } catch {
            toast.error('Delete failed');
        }
    };

    // Submit
    const onSubmit = async (data) => {
        setIsDisable(true);
        const postData = { ...data, imageId };

        try {
            if (editingTestimonial) {
                await axios.put(`${apiUrl}testimonials/${editingTestimonial.id}`, postData, {
                    headers: { Authorization: `Bearer ${token()}` },
                });
                toast.success('Testimonial updated');
            } else {
                await axios.post(`${apiUrl}testimonials`, postData, {
                    headers: { Authorization: `Bearer ${token()}` },
                });
                toast.success('Testimonial created');
            }

            fetchTestimonials();
            reset();
            setImageId(null);
            setEditingTestimonial(null);
            setShowModal(false);
        } catch {
            toast.error('Save failed');
        } finally {
            setIsDisable(false);
        }
    };

    return (
        <>
            <Header />
            <ToastContainer />

            <main className="min-h-[80vh] bg-gray-100 px-6 py-6">
                <div className="flex gap-6">
                    <Sidebar />

                    <section className="flex-1 bg-white shadow rounded p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-700">Testimonials</h2>
                            <button
                                onClick={() => {
                                    reset();
                                    setEditingTestimonial(null);
                                    setImageId(null);
                                    setShowModal(true);
                                }}
                                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded text-sm"
                            >
                                CREATE
                            </button>
                        </div>

                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-sm text-gray-600">
                                    <th className="p-3 border">ID</th>
                                    <th className="p-3 border">Testimonial</th>
                                    <th className="p-3 border">Citation</th>
                                    <th className="p-3 border">Status</th>
                                    <th className="p-3 border text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.length ? testimonials.map(item => (
                                    <tr key={item.id} className="text-sm">
                                        <td className="p-3 border">{item.id}</td>
                                        <td className="p-3 border font-medium">{item.testimonial}</td>
                                        <td className="p-3 border">{item.citation}</td>
                                        <td className="p-3 border">
                                            {item.status == 1 ? (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</span>
                                            ) : (
                                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Inactive</span>
                                            )}

                                        </td>
                                        <td className="p-3 border text-center">
                                            <button onClick={() => handleEdit(item)} className="text-blue-600 mr-3">Edit</button>
                                            <button onClick={() => handleDelete(item.id)} className="text-red-600">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="p-4 text-center text-gray-500">
                                            No testimonials found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                </div>
            </main>

            <Footer />

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-3xl rounded shadow-lg max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-700">
                                {editingTestimonial ? 'Edit Testimonial' : 'Create Testimonial'}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-pink-500 text-white px-3 py-1 rounded text-sm"
                            >
                                BACK
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Testimonial</label>
                                    <textarea
                                        className="w-full border rounded px-3 py-2"
                                        {...register('testimonial', { required: 'Testimonial is required' })}
                                    />
                                    {errors.testimonial && (
                                        <p className="text-red-500 text-xs mt-1">{errors.testimonial.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Citation</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        {...register('citation', { required: 'Citation is required' })}
                                    />
                                    {errors.citation && (
                                        <p className="text-red-500 text-xs mt-1">{errors.citation.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Image</label>
                                    <input
                                        type="file"
                                        className="w-full border rounded px-3 py-2"
                                        onChange={(e) => handleFileUpload(e.target.files[0])}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Status</label>
                                    <select
                                        className="w-full border rounded px-3 py-2"
                                        {...register('status', { required: 'Status is required' })}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isDisable}
                                    className={`px-6 py-2 rounded text-white ${isDisable
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-pink-500 hover:bg-pink-600'
                                        }`}
                                >
                                    {isDisable ? 'Submitting...' : 'SUBMIT'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Show;
