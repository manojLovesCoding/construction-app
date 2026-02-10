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
    const [articles, setArticles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState('');
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);
    const [editingArticle, setEditingArticle] = useState(null);
    const editor = useRef(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Fetch articles
    const fetchArticles = async () => {
        try {
            const res = await axios.get(`${apiUrl}articles`, {
                headers: { Authorization: `Bearer ${token()}` },
            });
            setArticles(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // Upload image
    const handleFileUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${apiUrl}temp-images`, formData, {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
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
    const handleEdit = (article) => {
        setEditingArticle(article);
        reset({
            title: article.title,
            slug: article.slug,
            author: article.author,
            status: article.status,
        });
        setContent(article.content);
        setShowModal(true);
    };

    // Delete
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;

        try {
            await axios.delete(`${apiUrl}articles/${id}`, {
                headers: { Authorization: `Bearer ${token()}` },
            });
            toast.success('Article deleted');
            fetchArticles();
        } catch {
            toast.error('Delete failed');
        }
    };

    // Submit
    const onSubmit = async (data) => {
        if (!content.trim()) {
            toast.error('Content is required');
            return;
        }

        setIsDisable(true);
        const postData = { ...data, content, imageId };

        try {
            if (editingArticle) {
                await axios.put(`${apiUrl}articles/${editingArticle.id}`, postData, {
                    headers: { Authorization: `Bearer ${token()}` },
                });
                toast.success('Article updated');
            } else {
                await axios.post(`${apiUrl}articles`, postData, {
                    headers: { Authorization: `Bearer ${token()}` },
                });
                toast.success('Article created');
            }

            fetchArticles();
            reset();
            setContent('');
            setImageId(null);
            setEditingArticle(null);
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
                            <h2 className="text-xl font-semibold text-gray-700">Articles</h2>
                            <button
                                onClick={() => {
                                    reset();
                                    setEditingArticle(null);
                                    setContent('');
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
                                    <th className="p-3 border">Title</th>
                                    <th className="p-3 border">Slug</th>
                                    <th className="p-3 border">Status</th>
                                    <th className="p-3 border text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.length ? articles.map(article => (
                                    <tr key={article.id} className="text-sm">
                                        <td className="p-3 border">{article.id}</td>
                                        <td className="p-3 border font-medium">{article.title}</td>
                                        <td className="p-3 border">{article.slug}</td>
                                        <td className="p-3 border">
                                            {article.status == 1 ? (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</span>
                                            ) : (
                                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Inactive</span>
                                            )}
                                        </td>
                                        <td className="p-3 border text-center">
                                            <button onClick={() => handleEdit(article)} className="text-blue-600 mr-3">Edit</button>
                                            <button onClick={() => handleDelete(article.id)} className="text-red-600">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="p-4 text-center text-gray-500">
                                            No articles found
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
                                {editingArticle ? 'Edit Article' : 'Create Article'}
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
                                    <label className="block text-sm font-medium text-gray-600">Title</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        {...register('title', { required: 'Title is required' })}
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
                                    <label className="block text-sm font-medium text-gray-600">Author</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        {...register('author')}
                                    />
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
                                    className={`px-6 py-2 rounded text-white ${isDisable || !content.trim()
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
