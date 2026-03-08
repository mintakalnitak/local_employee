import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, PlusCircle } from 'lucide-react';

export function AdminDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        name: '',
        profession: '',
        location: '',
        phone: '',
        email: '',
        rating: 0,
        skills: '', // Comma-separated
        availability: 'Full-time',
        photo_url: '',
        description: '',
        experience_years: 0
    });

    if (!currentUser) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
                <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">You must be logged in to view this page.</p>
                <button onClick={() => navigate('/login')} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Go to Login
                </button>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);

            const employeeData = {
                ...formData,
                rating: Number(formData.rating),
                experience_years: Number(formData.experience_years),
                skills: skillsArray,
                email: formData.email || null,
                photo_url: formData.photo_url || null,
            };

            await addDoc(collection(db, 'employees'), employeeData);

            setMessage({ type: 'success', text: 'Employee data added successfully!' });
            // Reset form
            setFormData({
                name: '', profession: '', location: '', phone: '', email: '',
                rating: 0, skills: '', availability: 'Full-time', photo_url: '',
                description: '', experience_years: 0
            });
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Error adding document: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-blue-500" />
                        Add New Employee
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                        <p>Fill out the form below to add a new service provider to the database.</p>
                    </div>

                    {message.text && (
                        <div className={`mt-4 p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <div className="mt-1">
                                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white px-3 py-2 border" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profession</label>
                                <div className="mt-1">
                                    <input type="text" name="profession" id="profession" required value={formData.profession} onChange={handleInputChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white px-3 py-2 border" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                                <div className="mt-1">
                                    <input type="text" name="location" id="location" required value={formData.location} onChange={handleInputChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white px-3 py-2 border" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                <div className="mt-1">
                                    <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleInputChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white px-3 py-2 border" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email (Optional)</label>
                                <div className="mt-1">
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white px-3 py-2 border" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="photo_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo URL (Optional)</label>
                                <div className="mt-1">
                                    <input type="url" name="photo_url" id="photo_url" value={formData.photo_url} onChange={handleInputChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white px-3 py-2 border" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating (0 - 5)</label>
                                <div className="mt-1">
                                    <input type="number" step="0.1" min="0" max="5" name="rating" id="rating" required value={formData.rating} onChange={handleInputChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white px-3 py-2 border" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="experience_years" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience (Years)</label>
                                <div className="mt-1">
                                    <input type="number" min="0" name="experience_years" id="experience_years" required value={formData.experience_years} onChange={handleInputChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white px-3 py-2 border" />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Availability</label>
                                <div className="mt-1">
                                    <select id="availability" name="availability" required value={formData.availability} onChange={handleInputChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white px-3 py-2 border">
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Available">Available</option>
                                        <option value="Weekends only">Weekends only</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skills (Comma-separated)</label>
                                <div className="mt-1">
                                    <input type="text" name="skills" id="skills" required value={formData.skills} onChange={handleInputChange} placeholder="e.g. Plumbing, Heating, Emergency Repairs" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white px-3 py-2 border" />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <div className="mt-1">
                                    <textarea id="description" name="description" rows={3} required value={formData.description} onChange={handleInputChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white px-3 py-2 border" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button disabled={loading} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                                {loading ? 'Submitting...' : 'Add Employee Provider'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
