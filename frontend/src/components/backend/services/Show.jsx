import React, { useEffect, useState, useRef } from 'react';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import Footer from '../../common/Footer';
import { apiUrl, token } from '../../common/http';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Show = () => {
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState('');
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);
    const [editingService, setEditingService] = useState(null); // Track edit
    const editor = useRef(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const fetchServices = async () => {
        try {
            const res = await axios.get(`${apiUrl}services`, {
                headers: { Authorization: `Bearer ${token()}` },
            });
            setServices(res.data.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleFileUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${apiUrl}temp-images`, formData, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token()}`,
                },
            });

            if (res.data.status === false) {
                toast.error(res.data.errors.image[0]);
            } else {
                setImageId(res.data.data.id);
                toast.success('Image uploaded successfully!');
            }
        } catch (error) {
            console.error('Image upload failed:', error);
            toast.error('Something went wrong while uploading the image');
        }
    };

    const handleEdit = (service) => {
        setEditingService(service);
        reset({
            title: service.title,
            slug: service.slug,
            short_desc: service.short_desc,
            status: service.status,
        });
        setContent(service.content);
        setImageId(service.imageId || null);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;

        try {
            await axios.delete(`${apiUrl}services/${id}`, {
                headers: { Authorization: `Bearer ${token()}` },
            });
            toast.success('Service deleted!');
            fetchServices();
        } catch (error) {
            toast.error('Failed to delete service');
            console.error(error);
        }
    };

    const onSubmit = async (data) => {
        if (!content.trim()) {
            toast.error('Content is required');
            return;
        }

        setIsDisable(true);
        const postData = { ...data, content, imageId };

        try {
            if (editingService) {
                // Update existing service
                await axios.put(`${apiUrl}services/${editingService.id}`, postData, {
                    headers: { Authorization: `Bearer ${token()}` },
                });
                toast.success('Service updated successfully!');
            } else {
                // Create new service
                await axios.post(`${apiUrl}services`, postData, {
                    headers: { Authorization: `Bearer ${token()}` },
                });
                toast.success('Service created successfully!');
            }

            fetchServices();
            reset();
            setContent('');
            setImageId(null);
            setEditingService(null);
            setShowModal(false);
        } catch (error) {
            console.error('Error submitting service:', error);
            toast.error('Failed to save service');
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
                            <h2 className="text-xl font-semibold text-gray-700">Services</h2>
                            <button
                                onClick={() => {
                                    setEditingService(null);
                                    reset();
                                    setContent('');
                                    setImageId(null);
                                    setShowModal(true);
                                }}
                                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded text-sm"
                            >
                                CREATE
                            </button>
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
                                        services.map((service) => (
                                            <tr key={service.id} className="text-sm">
                                                <td className="p-3 border">{service.id}</td>
                                                <td className="p-3 border font-medium text-gray-700">{service.title}</td>
                                                <td className="p-3 border text-gray-600">{service.slug}</td>
                                                <td className="p-3 border">
                                                    {service.status === '1' ? (
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
                                                        <button
                                                            className="text-blue-600 hover:underline"
                                                            onClick={() => handleEdit(service)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="text-red-600 hover:underline"
                                                            onClick={() => handleDelete(service.id)}
                                                        >
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-3xl rounded shadow-lg max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-700">
                                {editingService ? 'Edit Service' : 'Create Service'}
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
                                    <label className="block text-sm font-medium text-gray-600">Name</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        {...register('title', {
                                            required: 'Name is required',
                                            minLength: { value: 3, message: 'Name must be at least 3 characters' },
                                        })}
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Slug</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        {...register('slug', { required: 'Slug is required' })}
                                    />
                                    {errors.slug && (
                                        <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Short Description</label>
                                    <textarea
                                        rows="3"
                                        className="w-full border rounded px-3 py-2"
                                        {...register('short_desc', { required: 'Short description is required' })}
                                    />
                                    {errors.short_desc && (
                                        <p className="text-red-500 text-xs mt-1">{errors.short_desc.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Content</label>
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        onChange={(newContent) => setContent(newContent)}
                                    />
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
                                    disabled={isDisable || !content.trim()}
                                    className={`px-6 py-2 rounded text-white ${
                                        isDisable || !content.trim()
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
