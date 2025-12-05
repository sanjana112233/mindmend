import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            login(res.data.token, res.data.role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Signup failed');
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Join MindMend</h2>
                    <p className="text-gray-500 mt-2">Start prioritizing your mental health today</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                required
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition"
                                placeholder="John Doe"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition"
                                placeholder="you@example.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-secondary text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                        Create Account <CheckCircle className="h-5 w-5" />
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-secondary font-semibold hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
