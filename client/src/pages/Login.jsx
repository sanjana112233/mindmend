import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(res.data.token, res.data.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FA] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-50/60 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 p-10 border border-white relative z-10 animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-50 rounded-2xl mb-4 text-indigo-600">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Your sanctuary awaits.</p>
        </div>

        {error && <div className="bg-rose-50 text-rose-600 p-4 rounded-xl mb-6 text-sm text-center border border-rose-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition text-slate-700"
                placeholder="you@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition text-slate-700"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1e1b4b] text-white py-4 rounded-xl font-bold hover:bg-indigo-900 transition shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? 'Signing In...' : <>Sign In <ArrowRight className="h-5 w-5" /></>}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          New to MindMend? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Begin Journey</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;