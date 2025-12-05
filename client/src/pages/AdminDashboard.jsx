// // import { useState, useContext } from 'react';
// // import axios from 'axios';
// // import { AuthContext } from '../context/AuthContext';
// // import { Shield, Users, BarChart, Settings, LogOut, Database, Activity, Mail, Send, Loader, CheckCircle, Crown } from 'lucide-react';

// // // --- HELPER COMPONENT ---
// // const AdminStatCard = ({ title, value, icon: Icon, color }) => (
// //     <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
// //         <div className="flex justify-between items-start mb-4">
// //             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</h3>
// //             <Icon size={20} className={color} />
// //         </div>
// //         <p className="text-3xl font-mono text-white">{value}</p>
// //     </div>
// // );

// // // --- MAIN DASHBOARD COMPONENT ---
// // const AdminDashboard = () => {
// //     const { logout } = useContext(AuthContext);

// //     // State for Broadcast Form
// //     const [emailData, setEmailData] = useState({ subject: '', body: '' });
// //     const [status, setStatus] = useState('idle');

// //     const handleBroadcast = async (e) => {
// //         e.preventDefault();
// //         setStatus('sending');
// //         try {
// //             const res = await axios.post('http://localhost:5000/api/admin/broadcast', emailData);
// //             setStatus('success');
// //             alert(`System: ${res.data.message}. Check your Celery terminal for logs!`);
// //             setEmailData({ subject: '', body: '' });
// //             setTimeout(() => setStatus('idle'), 4000);
// //         } catch (err) {
// //             console.error("Broadcast Error:", err);
// //             setStatus('error');
// //             alert("Failed to send broadcast. Check Node terminal/Auth status.");
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-6 md:p-10 pt-20">
// //             <div className="max-w-7xl mx-auto space-y-10">

// //                 {/* Header */}
// //                 <div className="flex justify-between items-center border-b border-slate-800 pb-6">
// //                     <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
// //                         <Shield className="text-indigo-500" /> Command Center
// //                     </h1>
// //                     <button onClick={logout} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition text-sm font-medium">
// //                         <LogOut size={16} /> Logout
// //                     </button>
// //                 </div>

// //                 {/* Stat Cards */}
// //                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //                     <AdminStatCard title="Total Users" value="1,240" icon={Users} color="text-indigo-400" />
// //                     <AdminStatCard title="Active Doctors" value="45" icon={Activity} color="text-emerald-400" />
// //                     <AdminStatCard title="ML API Requests" value="8.4k" icon={Database} color="text-amber-400" />
// //                     <AdminStatCard title="System Health" value="99.9%" icon={BarChart} color="text-sky-400" />
// //                 </div>

// //                 {/* Main Content Grid (Broadcast and User Mgmt) */}
// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

// //                     {/* LEFT COL: Broadcast System (Bulk Email) */}
// //                     <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-8 relative overflow-hidden">
// //                         <div className="absolute top-0 right-0 p-6 opacity-5"><Mail size={120} /></div>

// //                         <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
// //                             <Send className="text-amber-400" /> Global Broadcast Utility
// //                         </h2>

// //                         <form onSubmit={handleBroadcast} className="space-y-4 relative z-10">
// //                             <div><label className="block text-sm text-slate-400 mb-2 uppercase tracking-wider font-bold">Subject Line</label><input type="text" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition" placeholder="e.g., New Feature Announcement" value={emailData.subject} onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })} /></div>
// //                             <div><label className="block text-sm text-slate-400 mb-2 uppercase tracking-wider font-bold">Message Body</label><textarea required rows="4" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none" placeholder="Write your update here..." value={emailData.body} onChange={(e) => setEmailData({ ...emailData, body: e.target.value })} ></textarea></div>

// //                             <button
// //                                 type="submit"
// //                                 disabled={status === 'sending' || status === 'success'}
// //                                 className={`w-full py-3 rounded-xl font-bold text-[#0f172a] transition flex items-center justify-center gap-2 ${status === 'success' ? 'bg-emerald-500 text-white' :
// //                                         status === 'sending' ? 'bg-slate-600' : 'bg-amber-400 hover:bg-amber-300'
// //                                     }`}
// //                             >
// //                                 {status === 'sending' ? (
// //                                     <><Loader className="animate-spin" size={18} /> Queuing Tasks...</>
// //                                 ) : status === 'success' ? (
// //                                     <><CheckCircle size={18} /> Tasks Queued Successfully</>
// //                                 ) : (
// //                                     <><Send size={18} /> Send Bulk Broadcast</>
// //                                 )}
// //                             </button>
// //                         </form>
// //                     </div>

// //                     {/* RIGHT COL: System Controls */}
// //                     <div className="space-y-8">
// //                         <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
// //                             <h2 className="text-xl font-bold text-white mb-4">User Management</h2>
// //                             <p className="text-slate-400">System user table and ban/approve actions would go here.</p>
// //                         </div>
// //                         <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
// //                             <h2 className="text-xl font-bold text-white">System Controls</h2>
// //                             <div>
// //                                 <p className="text-sm text-slate-400 mb-2">ML Model Status</p>
// //                                 <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg">
// //                                     <span className="font-mono text-indigo-300">v2.1.0 (Stable)</span>
// //                                     <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
// //                                 </div>
// //                             </div>
// //                             <button className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl transition text-sm">
// //                                 <Settings size={16} /> Advanced Settings
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default AdminDashboard;
// import { useState, useContext, useEffect } from 'react'; // 💡 Import useEffect
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { Shield, Users, BarChart, Settings, LogOut, Database, Activity, Mail, Send, Loader, CheckCircle, Crown, User as UserIcon } from 'lucide-react'; // 💡 Import User as UserIcon

// // --- HELPER COMPONENT (no change) ---
// const AdminStatCard = ({ title, value, icon: Icon, color }) => (
//     <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
//         <div className="flex justify-between items-start mb-4">
//             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</h3>
//             <Icon size={20} className={color} />
//         </div>
//         <p className="text-3xl font-mono text-white">{value}</p>
//     </div>
// );

// // --- MAIN DASHBOARD COMPONENT ---
// const AdminDashboard = () => {
//     const { logout } = useContext(AuthContext);

//     // 💡 State for Dynamic Data
//     const [stats, setStats] = useState({ totalUsers: '...', activeDoctors: '...', totalJournals: '...', systemHealth: '...' });
//     const [users, setUsers] = useState([]); // State for user list

//     // State for Broadcast Form
//     const [emailData, setEmailData] = useState({ subject: '', body: '' });
//     const [status, setStatus] = useState('idle');

//     // 💡 EFFECT: Fetch Data on Load
//     useEffect(() => {
//         const fetchAdminData = async () => {
//             try {
//                 // Fetch Stats
//                 const statsRes = await axios.get('http://localhost:5000/api/admin/stats');
//                 setStats({ 
//                     totalUsers: statsRes.data.totalUsers.toLocaleString(),
//                     activeDoctors: statsRes.data.activeDoctors.toLocaleString(),
//                     totalJournals: statsRes.data.totalJournals.toLocaleString(),
//                     systemHealth: statsRes.data.systemHealth === 'OK' ? '100%' : '99.9%' // Mocking health percentage
//                 });
                
//                 // Fetch Users
//                 const usersRes = await axios.get('http://localhost:5000/api/admin/users');
//                 setUsers(usersRes.data);

//             } catch (err) {
//                 console.error("Failed to fetch admin data:", err);
//                 // Optionally handle error state
//             }
//         };
//         fetchAdminData();
//     }, []); // Empty dependency array runs once on mount

//     // Broadcast Handler (No change needed)
//     const handleBroadcast = async (e) => {
//         // ... (existing implementation) ...
//     };
    

//     return (
//         <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-6 md:p-10 pt-20">
//             <div className="max-w-7xl mx-auto space-y-10">
//                 {/* Header (No change needed) */}
//                 {/* ... (omitted Header JSX) ... */}
                
//                 <div className="flex justify-between items-center border-b border-slate-800 pb-6">
//                     <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
//                         <Shield className="text-indigo-500" /> Command Center
//                     </h1>
//                     <button onClick={logout} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition text-sm font-medium">
//                         <LogOut size={16} /> Logout
//                     </button>
//                 </div>


//                 {/* Stat Cards - Use Dynamic Data */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                     <AdminStatCard title="Total Users" value={stats.totalUsers} icon={Users} color="text-indigo-400" />
//                     <AdminStatCard title="Active Doctors" value={stats.activeDoctors} icon={Activity} color="text-emerald-400" />
//                     <AdminStatCard title="Total Journals" value={stats.totalJournals} icon={Database} color="text-amber-400" />
//                     <AdminStatCard title="System Health" value={stats.systemHealth} icon={BarChart} color="text-sky-400" />
//                 </div>

//                 {/* Main Content Grid (Broadcast and User Mgmt) */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                     {/* LEFT COL: Broadcast System (Bulk Email) (No change needed) */}
//                     {/* ... (omitted Broadcast JSX) ... */}
//                     <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-8 relative overflow-hidden">
//                         <div className="absolute top-0 right-0 p-6 opacity-5"><Mail size={120} /></div>

//                         <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
//                             <Send className="text-amber-400" /> Global Broadcast Utility
//                         </h2>

//                         <form onSubmit={handleBroadcast} className="space-y-4 relative z-10">
//                             <div><label className="block text-sm text-slate-400 mb-2 uppercase tracking-wider font-bold">Subject Line</label><input type="text" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition" placeholder="e.g., New Feature Announcement" value={emailData.subject} onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })} /></div>
//                             <div><label className="block text-sm text-slate-400 mb-2 uppercase tracking-wider font-bold">Message Body</label><textarea required rows="4" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none" placeholder="Write your update here..." value={emailData.body} onChange={(e) => setEmailData({ ...emailData, body: e.target.value })} ></textarea></div>

//                             <button
//                                 type="submit"
//                                 disabled={status === 'sending' || status === 'success'}
//                                 className={`w-full py-3 rounded-xl font-bold text-[#0f172a] transition flex items-center justify-center gap-2 ${status === 'success' ? 'bg-emerald-500 text-white' :
//                                         status === 'sending' ? 'bg-slate-600' : 'bg-amber-400 hover:bg-amber-300'
//                                     }`}
//                             >
//                                 {status === 'sending' ? (
//                                     <><Loader className="animate-spin" size={18} /> Queuing Tasks...</>
//                                 ) : status === 'success' ? (
//                                     <><CheckCircle size={18} /> Tasks Queued Successfully</>
//                                 ) : (
//                                     <><Send size={18} /> Send Bulk Broadcast</>
//                                 )}
//                             </button>
//                         </form>
//                     </div>

//                     {/* RIGHT COL: User Management (Using Dynamic Data) */}
//                     <div className="space-y-8 lg:col-span-1">
//                         <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
//                             <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><UserIcon size={20} className="text-indigo-400" /> Recent User Activity</h2>
//                             <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
//                                 {users.length > 0 ? (
//                                     users.slice(0, 5).map(user => (
//                                         <div key={user._id} className="p-3 bg-slate-800 rounded-xl flex items-center justify-between text-sm">
//                                             <span className="font-mono text-slate-300 truncate">{user.name}</span>
//                                             <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-red-500 text-white' : user.role === 'doctor' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white'}`}>{user.role}</span>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-slate-400 text-center py-4">Loading user data...</p>
//                                 )}
//                             </div>
//                         </div>
                        
//                         {/* System Controls (No Change Needed) */}
//                         <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
//                             <h2 className="text-xl font-bold text-white">System Controls</h2>
//                             <div>
//                                 <p className="text-sm text-slate-400 mb-2">ML Model Status</p>
//                                 <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg">
//                                     <span className="font-mono text-indigo-300">v2.1.0 (Stable)</span>
//                                     <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
//                                 </div>
//                             </div>
//                             <button className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl transition text-sm">
//                                 <Settings size={16} /> Advanced Settings
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Shield, Users, BarChart, Settings, LogOut, Database, Activity, Mail, Send, Loader, CheckCircle, Crown, User as UserIcon, XCircle, CheckSquare } from 'lucide-react';
import { UpdateContext } from '../context/UpdateContext';

// --- HELPER COMPONENT (Stat Card) ---
const AdminStatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</h3>
            <Icon size={20} className={color} />
        </div>
        <p className="text-3xl font-mono text-white">{value}</p>
    </div>
);

// --- MAIN DASHBOARD COMPONENT ---
const AdminDashboard = () => {
    const { logout } = useContext(AuthContext);
    const { updateCounter } = useContext(UpdateContext); 

    // State for Dynamic Data
    const [stats, setStats] = useState({ totalUsers: '...', activeDoctors: '...', totalJournals: '...', systemHealth: '...' });
    const [users, setUsers] = useState([]); 

    // State for Broadcast Form
    const [emailData, setEmailData] = useState({ subject: '', body: '' });
    const [status, setStatus] = useState('idle');
    const [broadcastMessage, setBroadcastMessage] = useState(null); 
    const [loading, setLoading] = useState(true);

    // EFFECT: Fetch Data on Load
    useEffect(() => {
        const fetchAdminData = async () => {
            setLoading(true);
            try {
                // Fetch Stats
                const statsRes = await axios.get('http://localhost:5000/api/admin/stats');
                setStats({ 
                    totalUsers: statsRes.data.totalUsers.toLocaleString(),
                    activeDoctors: statsRes.data.activeDoctors.toLocaleString(),
                    totalJournals: statsRes.data.totalJournals.toLocaleString(),
                    systemHealth: statsRes.data.systemHealth === 'OK' ? '100%' : '99.9%'
                });
                
                // Fetch Users
                const usersRes = await axios.get('http://localhost:5000/api/admin/users');
                setUsers(usersRes.data); 

            } catch (err) {
                console.error("Failed to fetch admin data:", err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchAdminData();
        
        const intervalId = setInterval(fetchAdminData, 30000); 
        return () => clearInterval(intervalId);

    }, [updateCounter]); 

    // Broadcast Handler (FINAL)
    const handleBroadcast = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setBroadcastMessage(null); // Clear previous message

        try {
            // This POST route is protected by roleCheck(['admin'])
            const res = await axios.post('http://localhost:5000/api/admin/broadcast', emailData);
            
            setStatus('success');
            setBroadcastMessage({
                type: 'success',
                text: res.data.message || `Bulk email job queued successfully.`
            });
            
            setEmailData({ subject: '', body: '' });
            
            setTimeout(() => setStatus('idle'), 4000); 

        } catch (err) {
            console.error("Broadcast Error:", err);
            
            setStatus('error');
            setBroadcastMessage({
                type: 'error',
                text: err.response?.data?.msg || 'Failed to send broadcast. Check network or ML service (Port 8000).'
            });
            
            setTimeout(() => setStatus('idle'), 4000);
        }
    };
    
    // Handler to manually dismiss the broadcast banner
    const handleDismissBroadcast = () => {
        setBroadcastMessage(null);
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-6 md:p-10 pt-20">
            <div className="max-w-7xl mx-auto space-y-10">
                
                <div className="flex justify-between items-center border-b border-slate-800 pb-6">
                    <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
                        <Shield className="text-indigo-500" /> Command Center
                    </h1>
                    <button onClick={logout} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition text-sm font-medium">
                        <LogOut size={16} /> Logout
                    </button>
                </div>


                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <AdminStatCard title="Total Users" value={stats.totalUsers} icon={Users} color="text-indigo-400" />
                    <AdminStatCard title="Active Doctors" value={stats.activeDoctors} icon={Activity} color="text-emerald-400" />
                    <AdminStatCard title="Total Journals" value={stats.totalJournals} icon={Database} color="text-amber-400" />
                    <AdminStatCard title="System Health" value={stats.systemHealth} icon={BarChart} color="text-sky-400" />
                </div>

                {/* Main Content Grid (Broadcast and User Mgmt) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COL: Broadcast System (Bulk Email) */}
                    <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-8 relative overflow-hidden">
                        
                        {/* Broadcast Message Pop-up/Banner */}
                        {broadcastMessage && (
                            <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 transition-opacity ${
                                broadcastMessage.type === 'success' 
                                    ? 'bg-emerald-800/50 border-emerald-600 text-emerald-300' 
                                    : 'bg-rose-800/50 border-rose-600 text-rose-300'
                            }`}>
                                {broadcastMessage.type === 'success' ? <CheckSquare size={20} className="mt-1" /> : <XCircle size={20} className="mt-1" />}
                                <div className='flex-1'>
                                    <p className="font-bold text-sm">Broadcast Status: {broadcastMessage.type === 'success' ? 'SUCCESS' : 'FAILURE'}</p>
                                    <p className="text-xs mt-1">{broadcastMessage.text}</p>
                                </div>
                                <button onClick={handleDismissBroadcast} className="text-white opacity-70 hover:opacity-100 transition">
                                    <XCircle size={18} />
                                </button>
                            </div>
                        )}
                        
                        <div className="absolute top-0 right-0 p-6 opacity-5"><Mail size={120} /></div>

                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Send className="text-amber-400" /> Global Broadcast Utility
                        </h2>

                        <form onSubmit={handleBroadcast} className="space-y-4 relative z-10">
                            <div><label className="block text-sm text-slate-400 mb-2 uppercase tracking-wider font-bold">Subject Line</label><input type="text" required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition" placeholder="e.g., New Feature Announcement" value={emailData.subject} onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })} /></div>
                            <div><label className="block text-sm text-slate-400 mb-2 uppercase tracking-wider font-bold">Message Body</label><textarea required rows="4" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none" placeholder="Write your update here..." value={emailData.body} onChange={(e) => setEmailData({ ...emailData, body: e.target.value })} ></textarea></div>

                            <button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className={`w-full py-3 rounded-xl font-bold text-[#0f172a] transition flex items-center justify-center gap-2 ${status === 'success' ? 'bg-emerald-500 text-white' :
                                        status === 'sending' ? 'bg-slate-600' : 'bg-amber-400 hover:bg-amber-300'
                                    }`}
                            >
                                {status === 'sending' ? (
                                    <><Loader className="animate-spin" size={18} /> Queuing Tasks...</>
                                ) : status === 'success' ? (
                                    <><CheckCircle size={18} /> Tasks Queued Successfully</>
                                ) : (
                                    <><Send size={18} /> Send Bulk Broadcast</>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT COL: User Management (Using Dynamic Data) */}
                    <div className="space-y-8 lg:col-span-1">
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><UserIcon size={20} className="text-indigo-400" /> Recent User Activity</h2>
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                {loading ? (
                                    <p className="text-slate-400 text-center py-4">Loading user data...</p>
                                ) : users.length > 0 ? (
                                    users.slice(0, 5).map(user => (
                                        <div key={user._id} className="p-3 bg-slate-800 rounded-xl flex items-center justify-between text-sm">
                                            <span className="font-mono text-slate-300 truncate">{user.name}</span>
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-red-500 text-white' : user.role === 'doctor' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white'}`}>{user.role}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-400 text-center py-4">No users found.</p>
                                )}
                            </div>
                        </div>
                        
                        {/* System Controls (No Change Needed) */}
                        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
                            <h2 className="text-xl font-bold text-white">System Controls</h2>
                            <div>
                                <p className="text-sm text-slate-400 mb-2">ML Model Status</p>
                                <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg">
                                    <span className="font-mono text-indigo-300">v2.1.0 (Stable)</span>
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                                </div>
                            </div>
                            <button className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl transition text-sm">
                                <Settings size={16} /> Advanced Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;