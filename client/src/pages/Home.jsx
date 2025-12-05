import { Link } from 'react-router-dom';
import { Heart, MessageCircle, PenTool, Wind, ArrowRight, Star } from 'lucide-react';

const Home = () => {
    return (
        <div className="w-full bg-[#F8F7FA]">

            {/* 1. Calm Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Gradient Mesh */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-purple-50/30 to-white"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-indigo-50 text-indigo-900/60 mb-8 animate-fade-in">
                        <Star size={28} fill="currentColor" /> <span className="text-xs font-bold tracking-widest uppercase">We are here for your Mental Peace</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        Find your <span className="italic text-indigo-600">INNER CALM </span> <br />
                        in a noisy world.
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        MindMend is your sanctuary. Track your mood, journal your thoughts, and find peace with AI-guided support.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <Link to="/signup" className="group bg-[#1e1b4b] text-white px-10 py-4 rounded-full font-medium hover:bg-indigo-900 transition shadow-xl shadow-indigo-900/20 flex items-center gap-2">
                            Start Your Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/login" className="px-10 py-4 rounded-full font-medium text-slate-600 hover:bg-white hover:shadow-lg transition border border-transparent hover:border-slate-100">
                            Welcome Back
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. Interactive Features Grid */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">Holistic Wellness Tools</h2>
                    <p className="text-slate-500">Select a tool to begin your session.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* NAVIGATION LINKS ADDED HERE */}
                    <FeatureCard
                        to="/dashboard"
                        icon={<Wind />}
                        title="Mood Rhythm"
                        desc="Visualize your emotional patterns with beautiful daily trackers."
                        color="bg-teal-50 text-teal-600"
                    />
                    <FeatureCard
                        to="/chat"
                        icon={<MessageCircle />}
                        title="AI Companion"
                        desc="A safe, judgment-free space to chat whenever you need support."
                        color="bg-violet-50 text-violet-600"
                    />
                    <FeatureCard
                        to="/journal"
                        icon={<PenTool />}
                        title="Reflective Journal"
                        desc="Write freely and receive gentle, positive affirmations instantly."
                        color="bg-rose-50 text-rose-600"
                    />
                    <FeatureCard
                        to="/dashboard" // Placeholder: Redirects to dashboard for self-care tools
                        icon={<Heart />}
                        title="Self-Care"
                        desc="Curated breathing exercises and wisdom to ground you."
                        color="bg-amber-50 text-amber-600"
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-100 py-12 text-center">
                <p className="text-slate-400 font-serif italic text-lg mb-4">"Peace begins with a smile."</p>
                <p className="text-slate-300 text-sm">&copy; 2025 MindMend. Breathe deeply.</p>
            </footer>
        </div>
    );
};

// UPDATED COMPONENT: Uses <Link> instead of <div>
const FeatureCard = ({ to, icon, title, desc, color }) => (
    <Link to={to} className="block group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-50 cursor-pointer">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <div className="scale-125">{icon}</div>
        </div>
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-serif font-bold text-slate-800 mb-3">{title}</h3>
            <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
        </div>
        <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </Link>
);

export default Home;