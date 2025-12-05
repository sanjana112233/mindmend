import { useState } from 'react';
import axios from 'axios';
import { PenTool, Save, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Journal = () => {
    const [entry, setEntry] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/journal', { text: entry });
            setResult(res.data);
        } catch (err) {
            console.error(err);
            // Fallback for demo if backend isn't running
            setTimeout(() => setResult({
                sentiment_score: 0.8,
                affirmation: "You are glowing with potential today. Keep shining."
            }), 1000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto animate-fade-in">
            
            <Link to="/dashboard" className="inline-flex items-center text-slate-400 hover:text-indigo-600 mb-6 transition">
                <ArrowLeft size={16} className="mr-2" /> Back to Sanctuary
            </Link>

            <div className="text-center mb-10">
                <h1 className="text-4xl font-serif text-slate-800 mb-3">Daily Reflection</h1>
                <p className="text-slate-500">Clear your mind. There is no right or wrong way to feel.</p>
            </div>
            
            <div className="bg-white rounded-[2rem] shadow-xl shadow-indigo-100/50 overflow-hidden border border-slate-50">
                <textarea 
                    className="w-full p-8 h-64 outline-none resize-none text-lg text-slate-700 font-serif leading-loose placeholder:text-slate-300"
                    placeholder="How are you feeling right now? What is on your mind?..."
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                ></textarea>
                
                <div className="bg-slate-50 p-6 flex justify-between items-center border-t border-slate-100">
                    <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'})}
                    </span>
                    <button 
                        onClick={handleSubmit}
                        disabled={loading || !entry}
                        className="bg-[#1e1b4b] text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-900 transition flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-900/20"
                    >
                        {loading ? <Sparkles className="animate-spin h-5 w-5" /> : <Save className="h-5 w-5" />}
                        {loading ? "Reflecting..." : "Save Entry"}
                    </button>
                </div>
            </div>

            {result && (
                <div className="mt-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-2xl animate-fade-in relative overflow-hidden">
                    <div className="relative z-10 text-center">
                        <div className="inline-flex p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
                            <Sparkles size={24} className="text-amber-200" />
                        </div>
                        <h3 className="text-lg font-medium opacity-80 mb-2 uppercase tracking-widest">MindMend Wisdom</h3>
                        <p className="text-2xl md:text-3xl font-serif italic leading-relaxed">"{result.affirmation}"</p>
                    </div>
                    {/* Background glow */}
                    <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 mix-blend-overlay pointer-events-none"></div>
                </div>
            )}
        </div>
    );
};

export default Journal;