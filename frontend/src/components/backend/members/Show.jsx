import React, { useEffect, useState } from 'react';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import Footer from '../../common/Footer';
import { apiUrl, fileUrl, token } from '../../common/http';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Show = () => {
    const [members, setMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);
    const [editingMember, setEditingMember] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Fetch Members
    const fetchMembers = async () => {
        try {
            const res = await axios.get(`${apiUrl}members`, {
                headers: { Authorization: `Bearer ${token()}` },
            });

            console.log("API Response:", res.data);

            setMembers(res.data.members); // adjust if needed

        } catch (error) {
            console.error("Fetch Error:", error.response);
        }
    };


    useEffect(() => {
        fetchMembers();
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
    const handleEdit = (member) => {
        setEditingMember(member);

        reset({
            name: member.name,
            job_title: member.job_title,
            linkedin_url: member.linkedin_url,
            status: member.status,
        });

        setImageId(null);
        setShowModal(true);
    };

    // Delete
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;

        try {
            await axios.delete(`${apiUrl}members/${id}`, {
                headers: { Authorization: `Bearer ${token()}` },
            });

            toast.success('Member deleted');
            fetchMembers();
        } catch {
            toast.error('Delete failed');
        }
    };

    // Submit
    const onSubmit = async (data) => {
        setIsDisable(true);
        const postData = { ...data, imageId };

        try {
            if (editingMember) {
                await axios.put(`${apiUrl}members/${editingMember.id}`, postData, {
                    headers: { Authorization: `Bearer ${token()}` },
                });

                toast.success('Member updated');
            } else {
                await axios.post(`${apiUrl}members`, postData, {
                    headers: { Authorization: `Bearer ${token()}` },
                });

                toast.success('Member created');
            }

            fetchMembers();
            reset();
            setImageId(null);
            setEditingMember(null);
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
                            <h2 className="text-xl font-semibold text-gray-700">Members</h2>
                            <button
                                onClick={() => {
                                    reset();
                                    setEditingMember(null);
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
                                    <th className="p-3 border">Image</th>
                                    <th className="p-3 border">Name</th>
                                    <th className="p-3 border">Job Title</th>
                                    <th className="p-3 border">Status</th>
                                    <th className="p-3 border text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.length ? members.map(item => (
                                    <tr key={item.id} className="text-sm">
                                        <td className="p-3 border">{item.id}</td>

                                        <td className="p-3 border">
                                            {item.image && (
                                                <img
                                                    src={`${fileUrl}uploads/members/${item.image}`}
                                                    alt={item.name}
                                                    className="w-16 h-20 object-cover rounded"
                                                />

                                            )}
                                        </td>

                                        <td className="p-3 border font-medium">{item.name}</td>
                                        <td className="p-3 border">{item.job_title}</td>

                                        <td className="p-3 border">
                                            {item.status == 1 ? (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-3 border text-center">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-600 mr-3"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="p-4 text-center text-gray-500">
                                            No members found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
                                {editingMember ? 'Edit Member' : 'Create Member'}
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
                                        {...register('name', { required: 'Name is required' })}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Job Title</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        {...register('job_title', { required: 'Job title is required' })}
                                    />
                                    {errors.job_title && (
                                        <p className="text-red-500 text-xs mt-1">{errors.job_title.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">LinkedIn URL</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        {...register('linkedin_url')}
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
