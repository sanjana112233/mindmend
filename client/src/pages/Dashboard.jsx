// import { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { Link } from 'react-router-dom';
// import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
// import { 
//     TrendingUp, Zap, Shield, Heart, ArrowRight, Sparkles, Loader, FileText,
//     Sun, Smile, Frown, Meh, Moon, PenTool, MessageCircle, Crown
// } from 'lucide-react';

// // Import Specialized Dashboards
// import DoctorDashboard from './DoctorDashboard';
// import AdminDashboard from './AdminDashboard';
// //import { UpdateContext } from '../context/UpdateContext';

// // --- SUB-COMPONENTS ---

// const MoodButton = ({ icon: Icon, label, activeColor, isSelected, onClick }) => (
//     <button 
//         onClick={onClick}
//         className={`
//             group relative flex flex-col items-center justify-center p-5 rounded-2xl transition-all duration-500 ease-out
//             ${isSelected 
//                 ? 'bg-white shadow-2xl shadow-indigo-200/50 scale-105 ring-1 ring-indigo-100' 
//                 : 'bg-white/40 hover:bg-white hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-white'
//             }
//         `}
//     >
//         <div className={`
//             p-4 rounded-full mb-3 transition-all duration-300
//             ${isSelected ? activeColor + ' text-white shadow-md' : 'bg-white text-slate-400 group-hover:text-indigo-600'}
//         `}>
//             <Icon size={26} strokeWidth={1.5} />
//         </div>
//         <span className={`text-sm font-medium tracking-wide transition-colors ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>{label}</span>
//     </button>
// );

// const StatCard = ({ icon: Icon, label, value, color, delay }) => (
//     <div 
//         className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-5 transition-transform hover:scale-[1.02]"
//         style={{ animation: `fadeIn 0.5s ease-out ${delay}s forwards`, opacity: 0, transform: 'translateY(10px)' }}
//     >
//         <div className={`p-3.5 rounded-xl ${color} bg-opacity-10`}>
//             <Icon size={24} className={color.replace('bg-', 'text-')} strokeWidth={1.5} />
//         </div>
//         <div>
//             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{label}</p>
//             <p className="text-2xl font-serif text-slate-800">{value}</p>
//         </div>
//     </div>
// );

// const QuickAction = ({ to, icon: Icon, title, desc, gradient, delay }) => (
//     <Link 
//         to={to} 
//         className="group relative overflow-hidden rounded-3xl bg-white p-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
//         style={{ animation: `fadeIn 0.5s ease-out ${delay}s forwards`, opacity: 0, transform: 'translateY(10px)' }}
//     >
//         <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${gradient}`}></div>
//         <div className="relative z-10 flex items-center p-5 gap-5">
//             <div className={`p-4 rounded-2xl text-white shadow-lg ${gradient}`}>
//                 <Icon size={24} strokeWidth={1.5} />
//             </div>
//             <div className="flex-1">
//                 <h3 className="text-lg font-serif font-semibold text-slate-800 group-hover:text-indigo-900 transition-colors">{title}</h3>
//                 <p className="text-sm text-slate-400 font-light">{desc}</p>
//             </div>
//             <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg">
//                 <ArrowRight size={16} />
//             </div>
//         </div>
//     </Link>
// );

// const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-[#1e1b4b] text-white text-xs py-2 px-3 rounded-lg shadow-xl border border-indigo-500/30">
//           <p className="font-bold mb-1">{payload[0].payload.day}</p>
//           <p className="opacity-80">Mood Score: {payload[0].value}%</p>
//         </div>
//       );
//     }
//     return null;
// };

// // --- USER DASHBOARD LOGIC ---

// const UserDashboard = () => {
//     const auth = useContext(AuthContext);
//     const [selectedMood, setSelectedMood] = useState(null);
//     const [stats, setStats] = useState({ streak: 0, points: 0, entries: 0 });
//     const [userName, setUserName] = useState("Friend");
    
//     // Live Chart Data State
//     const [chartData, setChartData] = useState([]); 
    
//     const [loading, setLoading] = useState(true);
//     const [reportStatus, setReportStatus] = useState("");
//     const [greeting, setGreeting] = useState("Good Morning");

//     // Helper: Convert Word to Number (Emotional Rhythm Scoring)
//     const getMoodScore = (moodName) => {
//         const map = { "Joyful": 100, "Energetic": 80, "Calm": 60, "Neutral": 50, "Tired": 40, "Low": 30, "Sad": 20 };
//         return map[moodName] || 50;
//     };

//     // Helper: Format Time
//     const formatTime = (m) => {
//         const h = Math.floor(m / 60);
//         const min = Math.floor(m % 60);
//         return h > 0 ? `${h}h ${min}m` : `${min}m`;
//     };

//     // 1. Time-based Greeting
//     useEffect(() => {
//         const hour = new Date().getHours();
//         if (hour < 12) setGreeting("Good Morning");
//         else if (hour < 18) setGreeting("Good Afternoon");
//         else setGreeting("Good Evening");
//     }, []);

//     // 2. Fetch Data from Backend (Stats + Chart History)
//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 if (!auth || !auth.token) throw new Error("No Auth Token");
                
//                 // A. Stats & Name
//                 const statsRes = await axios.get('http://localhost:5000/api/gamification/stats');
//                 setStats({ 
//                     streak: statsRes.data.streak || 0, 
//                     points: statsRes.data.points || 0, 
//                     entries: statsRes.data.entries || 0,
//                     mindfulMinutes: statsRes.data.mindfulMinutes || 0
//                 });
//                 if(statsRes.data.name) setUserName(statsRes.data.name.split(' ')[0]);

//                 // B. Mood History (Real Data!)
//                 const moodRes = await axios.get('http://localhost:5000/api/moods');
                
//                 // Process DB data into Chart format
//                 const formattedData = moodRes.data.map(m => ({
//                     day: new Date(m.date).toLocaleDateString('en-US', { weekday: 'short' }),
//                     mood: getMoodScore(m.mood),
//                     originalMood: m.mood
//                 }));

//                 // If empty, show a baseline neutral line
//                 if (formattedData.length === 0) {
//                     setChartData([{ day: 'Start', mood: 50, originalMood: 'Neutral' }]);
//                 } else {
//                     setChartData(formattedData);
//                 }

//             } catch (err) {
//                 // Silent error handling
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadData();
//     }, [auth]);

//     // 3. Handle Mood Selection (Live Update)
//     const handleMoodSelect = async (mood) => {
//         setSelectedMood(mood);
//         try {
//              if (!auth || !auth.token) return;
            
//             // A. Save to Backend
//             const res = await axios.post('http://localhost:5000/api/moods', { mood });
            
//             // B. Update Stats UI
//             if(res.data.stats) {
//                 setStats(prev => ({ 
//                     ...prev, 
//                     streak: res.data.stats.streak, 
//                     points: res.data.stats.points 
//                 }));
//             }
            
//             // C. Update Chart UI Instantly
//             const newPoint = {
//                 day: 'Now',
//                 mood: getMoodScore(mood),
//                 originalMood: mood
//             };
            
//             setChartData(prev => {
//                 const newData = [...prev, newPoint];
//                 return newData.length > 7 ? newData.slice(newData.length - 7) : newData;
//             });

//         } catch (err) {
//             console.error("Error saving mood:", err);
//         }
//     };

//     const handleGenerateReport = async () => {
//         setReportStatus("Requesting...");
//         try {
//             const res = await axios.post('http://localhost:5000/api/reports/generate');
//             setReportStatus("Processing...");
//             alert(`MindMend AI: ${res.data.message}\n(Processing in background via Celery!)`);
//             setTimeout(() => setReportStatus("Report Ready"), 5000); 
//         } catch (err) {
//             setReportStatus("Failed");
//             alert("Error: Check Background Services.");
//         }
//     };

//     if (loading) return (
//         <div className="min-h-screen flex items-center justify-center bg-[#F8F7FA]">
//             <Loader className="animate-spin h-8 w-8 text-indigo-600" />
//         </div>
//     );

//     return (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-32 animate-fade-in space-y-10">
            
//             {/* HERO SECTION */}
//             <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1e1b4b] shadow-2xl shadow-indigo-900/20">
//                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-indigo-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
//                 <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-purple-500/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
                
//                 <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
//                     <div className="space-y-6 max-w-2xl">
//                         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-amber-100 text-xs font-medium tracking-widest uppercase">
//                             <Sparkles size={12} /> Daily Wisdom
//                         </div>
//                         <h1 className="text-4xl md:text-6xl text-white leading-tight font-serif">
//                             {greeting}, <br/>
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-100 italic">{userName}.</span>
//                         </h1>
//                         <p className="text-indigo-200 text-lg font-light leading-relaxed max-w-lg">
//                             Your serenity is a priority. Let's track your progress and cultivate peace today.
//                         </p>
//                     </div>

//                     <div className="hidden md:block">
//                         <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-center min-w-[180px]">
//                             <p className="text-indigo-200 text-sm uppercase tracking-widest mb-1">Today is</p>
//                             <p className="text-4xl text-white font-serif">{new Date().getDate()}</p>
//                             <p className="text-xl text-amber-100 font-light">{new Date().toLocaleDateString('en-US', { month: 'long' })}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* STATS */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 <StatCard icon={TrendingUp} label="Streak" value={`${stats.streak || 0} Days`} color="text-amber-500 bg-amber-500" delay={0.1} />
//                 <StatCard icon={Zap} label="Spirit Points" value={stats.points || 0} color="text-violet-500 bg-violet-500" delay={0.2} />
//                 <StatCard icon={Shield} label="Entries" value={stats.entries || 0} color="text-emerald-500 bg-emerald-500" delay={0.3} />
//                 <StatCard icon={Heart} label="Mindful" value={formatTime(stats.mindfulMinutes)} color="text-rose-500 bg-rose-500" delay={0.4} />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
//                 {/* LEFT: Mood & Chart */}
//                 <div className="lg:col-span-2 space-y-8">
//                     {/* Mood Tracker */}
//                     <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-slate-50">
//                         <div className="flex items-center justify-between mb-8">
//                             <div>
//                                 <h2 className="text-2xl text-slate-800 mb-1">How are you feeling?</h2>
//                                 <p className="text-slate-400 font-light text-sm">Select to log your mood.</p>
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                             <MoodButton icon={Smile} label="Joyful" activeColor="bg-emerald-500" isSelected={selectedMood === 'Joyful'} onClick={() => handleMoodSelect('Joyful')} />
//                             <MoodButton icon={Zap} label="Energetic" activeColor="bg-amber-400" isSelected={selectedMood === 'Energetic'} onClick={() => handleMoodSelect('Energetic')} />
//                             <MoodButton icon={Meh} label="Calm" activeColor="bg-sky-500" isSelected={selectedMood === 'Calm'} onClick={() => handleMoodSelect('Calm')} />
//                             <MoodButton icon={Frown} label="Low" activeColor="bg-slate-400" isSelected={selectedMood === 'Low'} onClick={() => handleMoodSelect('Low')} />
//                             <MoodButton icon={Moon} label="Tired" activeColor="bg-violet-400" isSelected={selectedMood === 'Tired'} onClick={() => handleMoodSelect('Tired')} />
//                         </div>
//                     </div>

//                     {/* Chart */}
//                     <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-[2rem] border border-indigo-50/50 shadow-sm relative">
//                         <div className="flex justify-between items-end mb-8">
//                             <div>
//                                 <h2 className="text-2xl text-slate-800">Emotional Rhythm</h2>
//                                 <p className="text-slate-500 font-light text-sm mt-1">Your mood flow this week 

// [Image of Mood Tracker Calendar]
// </p>
//                             </div>
//                         </div>
//                         <div className="h-64 w-full">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <AreaChart data={chartData}>
//                                     <defs>
//                                         <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
//                                             <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
//                                             <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
//                                         </linearGradient>
//                                     </defs>
//                                     <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
//                                     <YAxis hide={true} domain={[0, 100]} />
//                                     <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }} />
//                                     <Area 
//                                         type="monotone" 
//                                         dataKey="mood" 
//                                         stroke="#6366f1" 
//                                         strokeWidth={3} 
//                                         fillOpacity={1} 
//                                         fill="url(#colorMood)" 
//                                         animationDuration={1500}
//                                     />
//                                 </AreaChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </div>
//                 </div>

//                 {/* RIGHT: Tools */}
//                 <div className="space-y-5">
//                     <h2 className="text-xl text-slate-800 px-2">Sanctuary Tools</h2>
                    
//                     <QuickAction to="/journal" icon={PenTool} title="Journaling" desc="Reflect on your day" gradient="bg-gradient-to-r from-rose-400 to-orange-300" delay={0.5} />
//                     <QuickAction to="/chat" icon={MessageCircle} title="AI Companion" desc="Safe space to talk" gradient="bg-gradient-to-r from-violet-600 to-indigo-600" delay={0.6} />
//                     <QuickAction to="/breathing" icon={Sun} title="Breathing" desc="Restore balance" gradient="bg-gradient-to-r from-emerald-400 to-teal-500" delay={0.7} />

//                     {/* Weekly Report Button */}
//                     <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 mt-4 relative overflow-hidden group">
//                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//                             <FileText size={60} className="text-indigo-600" />
//                         </div>
//                         <h3 className="font-serif font-bold text-slate-800 mb-1">Weekly Insight</h3>
//                         <p className="text-sm text-slate-500 mb-4">Deep analysis by MindMend AI.</p>
//                         <button 
//                             onClick={handleGenerateReport}
//                             disabled={reportStatus === "Requesting..." || reportStatus === "Processing..."}
//                             className="w-full bg-[#1e1b4b] text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-900 transition shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                         >
//                             {reportStatus === "Processing..." ? <Loader className="animate-spin h-4 w-4" /> : <Sparkles size={16} />}
//                             {reportStatus || "Generate Report"}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- MASTER ROUTER ---

// const Dashboard = () => {
//     const { role } = useContext(AuthContext);

//     if (role === 'doctor') return <DoctorDashboard />;
//     if (role === 'admin') return <AdminDashboard />;
//     if (role === 'researcher') return <div className="p-10">Research Portal Restricted</div>;

//     return <UserDashboard />;
// };

// export default Dashboard;
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
import { 
    TrendingUp, Zap, Heart, ArrowRight, Sparkles, Loader, FileText,
    Sun, Smile, Frown, Meh, Moon, PenTool, MessageCircle, Download, ListChecks, Activity, XCircle
} from 'lucide-react';

// Import Specialized Dashboards (for Master Router)
import DoctorDashboard from './DoctorDashboard';
import AdminDashboard from './AdminDashboard';
// 💡 CRITICAL IMPORT: UpdateContext for dynamic journal count
import { UpdateContext } from '../context/UpdateContext'; 


// --- SUB-COMPONENTS (Helper functions and StatCard definitions) ---

const MoodButton = ({ icon: Icon, label, activeColor, isSelected, onClick }) => (
    <button 
        onClick={onClick}
        className={`
            group relative flex flex-col items-center justify-center p-5 rounded-2xl transition-all duration-500 ease-out
            ${isSelected 
                ? 'bg-white shadow-2xl shadow-indigo-200/50 scale-105 ring-1 ring-indigo-100' 
                : 'bg-white/40 hover:bg-white hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-white'
            }
        `}
    >
        <div className={`
            p-4 rounded-full mb-3 transition-all duration-300
            ${isSelected ? activeColor + ' text-white shadow-md' : 'bg-white text-slate-400 group-hover:text-indigo-600'}
        `}>
            <Icon size={26} strokeWidth={1.5} />
        </div>
        <span className={`text-sm font-medium tracking-wide transition-colors ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>{label}</span>
    </button>
);

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
    <div 
        className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-5 transition-transform hover:scale-[1.02]"
        style={{ animation: `fadeIn 0.5s ease-out ${delay}s forwards`, opacity: 0, transform: 'translateY(10px)' }}
    >
        <div className={`p-3.5 rounded-xl ${color} bg-opacity-10`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} strokeWidth={1.5} />
        </div>
        <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{label}</p>
            <p className="text-2xl font-serif text-slate-800">{value}</p>
        </div>
    </div>
);

const QuickAction = ({ to, icon: Icon, title, desc, gradient, delay }) => (
    <Link 
        to={to} 
        className="group relative overflow-hidden rounded-3xl bg-white p-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
        style={{ animation: `fadeIn 0.5s ease-out ${delay}s forwards`, opacity: 0, transform: 'translateY(10px)' }}
    >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${gradient}`}></div>
        <div className="relative z-10 flex items-center p-5 gap-5">
            <div className={`p-4 rounded-2xl text-white shadow-lg ${gradient}`}>
                <Icon size={24} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-serif font-semibold text-slate-800 group-hover:text-indigo-900 transition-colors">{title}</h3>
                <p className="text-sm text-slate-400 font-light">{desc}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-lg">
                <ArrowRight size={16} />
            </div>
        </div>
    </Link>
);

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1b4b] text-white text-xs py-2 px-3 rounded-lg shadow-xl border border-indigo-500/30">
          <p className="font-bold mb-1">{payload[0].payload.day}</p>
          <p className="opacity-80">Mood Score: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
};

// Helper: Convert Word to Number (Emotional Rhythm Scoring)
const getMoodScore = (moodName) => {
    const map = { "Joyful": 100, "Energetic": 80, "Calm": 60, "Neutral": 50, "Tired": 40, "Low": 30, "Sad": 20 };
    return map[moodName] || 50;
};

// Helper: Format Time
const formatTime = (m) => {
    const h = Math.floor(m / 60);
    const min = Math.floor(m % 60);
    return h > 0 ? `${h}h ${min}m` : `${min}m`;
};


// --- USER DASHBOARD LOGIC ---

const UserDashboard = () => {
    const auth = useContext(AuthContext);
    const { updateCounter } = useContext(UpdateContext); 

    const [selectedMood, setSelectedMood] = useState(null);
    const [stats, setStats] = useState({ streak: 0, points: 0, entries: 0, mindfulMinutes: 0 });
    const [userName, setUserName] = useState("Friend");
    const [chartData, setChartData] = useState([]); 
    
    const [loading, setLoading] = useState(true);
    
    // REPORT STATUS STATE: Persistence and Polling Logic
    const [reportTaskId, setReportTaskId] = useState(localStorage.getItem('reportTaskId') || null);
    const [reportStatus, setReportStatus] = useState(reportTaskId ? "Processing..." : "");
    const [reportSummary, setReportSummary] = useState(null); 
    
    // 💡 ADMIN MESSAGE STATE
    const [adminMessage, setAdminMessage] = useState(null);
    const DISMISS_KEY = 'mindmend_admin_msg_id'; 


    const [greeting, setGreeting] = useState("Good Morning");

    // 1. Time-based Greeting
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    // 2. Fetch Data (Stats + Chart History)
    useEffect(() => {
        const loadData = async () => {
            try {
                if (!auth || !auth.token) throw new Error("No Auth Token");
                
                // A. Stats & Name 
                const statsRes = await axios.get('http://localhost:5000/api/user/stats');
                
                setStats({ 
                    streak: statsRes.data.streak || 0, 
                    points: statsRes.data.points || 0, 
                    entries: statsRes.data.journalCount || 0, // Dynamic journal count fix relies on this
                    mindfulMinutes: statsRes.data.mindfulMinutes || 0,
                });

                if(statsRes.data.name) setUserName(statsRes.data.name.split(' ')[0]);

                // B. Mood History 
                const moodRes = await axios.get('http://localhost:5000/api/moods');
                
                // Process DB data into Chart format
                const formattedData = moodRes.data.map(m => ({
                    // FIX: XAxis relies on this 'day' format
                    day: new Date(m.date).toLocaleDateString('en-US', { weekday: 'short' }),
                    mood: getMoodScore(m.mood),
                    originalMood: m.mood
                }));

                if (formattedData.length === 0) {
                    setChartData([{ day: 'Start', mood: 50, originalMood: 'Neutral' }]);
                } else {
                    setChartData(formattedData);
                }

            } catch (err) {
                setStats({ streak: 'Error', points: 'Error', entries: 'Error', mindfulMinutes: 'Error' });
                console.error("Dashboard Data Load Error:", err);
            } finally {
                setLoading(false);
            }
        };
        
        loadData();

        // Polling (fetch every 60 seconds)
        const intervalId = setInterval(loadData, 60000); 
        return () => clearInterval(intervalId);

    }, [auth, updateCounter]); // 💡 Dependency on updateCounter for dynamic refresh

    // 3. Admin Message Polling
    useEffect(() => {
        let intervalId;

        const fetchLatestMessage = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/user/latest-broadcast');
                const message = res.data;
                const dismissedId = localStorage.getItem(DISMISS_KEY);

                if (message && message._id !== dismissedId) {
                    setAdminMessage(message);
                } else if (message && message._id === dismissedId) {
                    setAdminMessage(null); 
                }
            } catch (err) {
                console.error("Failed to fetch admin message:", err);
            }
        };

        fetchLatestMessage();
        intervalId = setInterval(fetchLatestMessage, 10000); 

        return () => clearInterval(intervalId);
    }, [auth]); 

    const handleDismissMessage = () => {
        if (adminMessage) {
            localStorage.setItem(DISMISS_KEY, adminMessage._id);
            setAdminMessage(null); // Clear the banner from the UI
        }
    };


    // 4. Report Status Polling Logic
    useEffect(() => {
        let intervalId;

        const checkReportStatus = async () => {
            if (!reportTaskId) return;

            try {
                const res = await axios.get(`http://localhost:5000/api/reports/result/${reportTaskId}`);
                
                if (res.data.status === 'SUCCESS') {
                    setReportStatus("Report Ready");
                    setReportSummary({ 
                        summary: res.data.result?.summary || "Summary not available.",
                        reportLink: res.data.result?.link || null
                    }); 
                    
                    localStorage.removeItem('reportTaskId');
                    setReportTaskId(null);
                    clearInterval(intervalId); 
                } else if (res.data.status === 'PENDING') {
                    setReportStatus("Processing...");
                } else if (res.data.status === 'FAILURE') {
                    setReportStatus("Failed");
                    localStorage.removeItem('reportTaskId');
                    setReportTaskId(null);
                    setReportSummary(null);
                    clearInterval(intervalId);
                }
            } catch (err) {
                console.error("Report Status Check Failed:", err);
                setReportStatus("Failed to Connect");
                setReportSummary(null);
                clearInterval(intervalId);
            }
        };

        if (reportTaskId) {
            checkReportStatus(); 
            // FIX: Polling interval reduced for faster feedback
            intervalId = setInterval(checkReportStatus, 2000); 
        }

        return () => clearInterval(intervalId);
    }, [reportTaskId]); 

    // 5. Handlers
    const handleMoodSelect = async (mood) => {
        setSelectedMood(mood);
        try {
            if (!auth || !auth.token) return;
            
            const res = await axios.post('http://localhost:5000/api/moods', { mood });
            
            if(res.data.stats) {
                setStats(prev => ({ 
                    ...prev, 
                    streak: res.data.stats.streak, 
                    points: res.data.stats.points 
                }));
            }
            
            const newPoint = {
                day: 'Now',
                mood: getMoodScore(mood),
                originalMood: mood
            };
            
            setChartData(prev => {
                const newData = [...prev, newPoint];
                return newData.length > 7 ? newData.slice(newData.length - 7) : newData;
            });

        } catch (err) {
            console.error("Error saving mood:", err);
        }
    };


    const handleGenerateReport = async () => {
        setReportStatus("Requesting...");
        setReportSummary(null); 
        try {
            const res = await axios.post('http://localhost:5000/api/reports/generate');
            
            const taskId = res.data.taskId; 
            localStorage.setItem('reportTaskId', taskId);
            setReportTaskId(taskId); 

            setReportStatus("Processing...");
            alert(`MindMend AI: Report generation started in background.`);
            
        } catch (err) {
            setReportStatus("Failed");
            alert("Error: Check Background Services.");
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F7FA]">
            <Loader className="animate-spin h-8 w-8 text-indigo-600" />
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-32 animate-fade-in space-y-10">
            
            {/* 💡 ADMIN BROADCAST BANNER - Placed at the top of the main container */}
            {adminMessage && (
                <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-xl flex justify-between items-start sticky top-2 z-40">
                    <div className="flex-1">
                        <p className="font-bold text-sm">{adminMessage.subject}</p>
                        <p className="text-xs mt-1 opacity-90">{adminMessage.body}</p>
                    </div>
                    <button onClick={handleDismissMessage} className="text-white opacity-70 hover:opacity-100 transition">
                        <XCircle size={18} />
                    </button>
                </div>
            )}
            
            {/* HERO SECTION */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1e1b4b] shadow-2xl shadow-indigo-900/20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-indigo-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-purple-500/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
                
                <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-6 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-amber-100 text-xs font-medium tracking-widest uppercase">
                            <Sparkles size={12} /> Daily Wisdom
                        </div>
                        <h1 className="text-4xl md:text-6xl text-white leading-tight font-serif">
                            {greeting}, <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-100 italic">{userName}.</span>
                        </h1>
                        <p className="text-indigo-200 text-lg font-light leading-relaxed max-w-lg">
                            Your serenity is a priority. Let's track your progress and cultivate peace today.
                        </p>
                    </div>

                    <div className="hidden md:block">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-center min-w-[180px]">
                            <p className="text-indigo-200 text-sm uppercase tracking-widest mb-1">Today is</p>
                            <p className="text-4xl text-white font-serif">{new Date().getDate()}</p>
                            <p className="text-xl text-amber-100 font-light">{new Date().toLocaleDateString('en-US', { month: 'long' })}</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard icon={TrendingUp} label="Streak" value={`${stats.streak || 0} Days`} color="text-amber-500 bg-amber-500" delay={0.1} />
                <StatCard icon={Zap} label="Spirit Points" value={stats.points || 0} color="text-violet-500 bg-violet-500" delay={0.2} />
                <StatCard icon={FileText} label="Entries" value={stats.entries || 0} color="text-emerald-500 bg-emerald-500" delay={0.3} />
                <StatCard icon={Heart} label="Mindful" value={formatTime(stats.mindfulMinutes)} color="text-rose-500 bg-rose-500" delay={0.4} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT: Mood & Chart */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Mood Tracker */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-slate-50">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl text-slate-800 mb-1">How are you feeling?</h2>
                                <p className="text-slate-400 font-light text-sm">Select to log your mood.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <MoodButton icon={Smile} label="Joyful" activeColor="bg-emerald-500" isSelected={selectedMood === 'Joyful'} onClick={() => handleMoodSelect('Joyful')} />
                            <MoodButton icon={Zap} label="Energetic" activeColor="bg-amber-400" isSelected={selectedMood === 'Energetic'} onClick={() => handleMoodSelect('Energetic')} />
                            <MoodButton icon={Meh} label="Calm" activeColor="bg-sky-500" isSelected={selectedMood === 'Calm'} onClick={() => handleMoodSelect('Calm')} />
                            <MoodButton icon={Frown} label="Low" activeColor="bg-slate-400" isSelected={selectedMood === 'Low'} onClick={() => handleMoodSelect('Low')} />
                            <MoodButton icon={Moon} label="Tired" activeColor="bg-violet-400" isSelected={selectedMood === 'Tired'} onClick={() => handleMoodSelect('Tired')} />
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-[2rem] border border-indigo-50/50 shadow-sm relative">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-2xl text-slate-800">Emotional Rhythm</h2>
                                <p className="text-slate-500 font-light text-sm mt-1">Your mood flow this week</p>
                            </div>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    {/* FIX: XAxis displays the calendar/days of the week */}
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} /> 
                                    <YAxis hide={true} domain={[0, 100]} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }} />
                                    <Area 
                                        type="monotone" 
                                        dataKey="mood" 
                                        stroke="#6366f1" 
                                        strokeWidth={3} 
                                        fillOpacity={1} 
                                        fill="url(#colorMood)" 
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Tools & Report Status */}
                <div className="space-y-5">
                    <h2 className="text-xl text-slate-800 px-2">Sanctuary Tools</h2>
                    
                    <QuickAction to="/journal" icon={PenTool} title="Journaling" desc="Reflect on your day" gradient="bg-gradient-to-r from-rose-400 to-orange-300" delay={0.5} />
                    <QuickAction to="/chat" icon={MessageCircle} title="AI Companion" desc="Safe space to talk" gradient="bg-gradient-to-r from-violet-600 to-indigo-600" delay={0.6} />
                    <QuickAction to="/breathing" icon={Sun} title="Breathing" desc="Restore balance" gradient="bg-gradient-to-r from-emerald-400 to-teal-500" delay={0.7} />

                    {/* Weekly Report Button/Status Display */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 mt-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FileText size={60} className="text-indigo-600" />
                        </div>
                        <h3 className="font-serif font-bold text-slate-800 mb-1">Weekly Insight</h3>
                        <p className="text-sm text-slate-500 mb-4">Deep analysis by MindMend AI.</p>
                        
                        {/* 1. Button/Loading Status */}
                        <button 
                            onClick={handleGenerateReport}
                            disabled={reportStatus === "Processing..." || reportStatus === "Requesting..." || reportStatus === "Report Ready"}
                            className="w-full py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 
                                        bg-[#1e1b4b] text-white hover:bg-indigo-900 shadow-lg shadow-indigo-200 
                                        disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {(reportStatus === "Processing..." || reportStatus === "Requesting...") ? <Loader className="animate-spin h-4 w-4" /> : <Sparkles size={16} />}
                            {reportStatus || "Generate Report"}
                        </button>

                        {/* 2. Final Report Output Card */}
                        {reportSummary && (
                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                                <h4 className="text-sm font-bold text-emerald-600 flex items-center gap-2"><ListChecks size={16} /> Latest Summary:</h4>
                                <p className="text-slate-700 text-sm italic">{reportSummary.summary}</p>
                                {reportSummary.reportLink && (
                                    <a 
                                        href={reportSummary.reportLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline"
                                    >
                                        View Full Report PDF <Download size={14} />
                                    </a>
                                )}
                            </div>
                        )}
                        
                        {/* 3. Failed Status Message */}
                        {reportStatus === "Failed" && (
                            <p className="mt-4 text-sm text-rose-500 font-medium">Report generation failed. Please try again later.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MASTER ROUTER (Wrapper Component) ---

const Dashboard = () => {
    // This component determines which dashboard to render based on role.
    const { role } = useContext(AuthContext);

    if (role === 'doctor') return <DoctorDashboard />;
    if (role === 'admin') return <AdminDashboard />;
    
    // Default fallback to UserDashboard
    return <UserDashboard />;
};

export default Dashboard;