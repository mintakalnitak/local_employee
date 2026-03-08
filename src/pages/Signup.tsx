import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [adminCode, setAdminCode] = useState('');
    const SECRET_ADMIN_CODE = 'RedIsAdmin';
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (password !== passwordConfirm) {
            return setError('Passwords do not match');
        }

        if (adminCode !== SECRET_ADMIN_CODE) {
            return setError('Invalid admin access code');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            navigate('/admin');
        } catch (err: any) {
            setError('Failed to create an account: ' + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div>
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900">
                        <UserPlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create an account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm relative" role="alert">
                            {error}
                        </div>
                    )}
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password-confirm"
                                name="password-confirm"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password Confirm"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="admin-code"
                                name="admin-code"
                                type="password"
                                autoComplete="off"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Admin Access Code"
                                value={adminCode}
                                onChange={(e) => setAdminCode(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                        Already have an account? Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}
