// import React from 'react';
// import { LogOut, Shield, Users, Activity, AlertTriangle, FileText, Search } from 'lucide-react';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const DoctorDashboard = () => {
//     const { logout, user } = useContext(AuthContext);

//     // Mock Data (Fetched from Node API in a real scenario)
//     const patients = [
//         { id: 1, name: "Alice Sharma", status: "High Risk", lastMood: "Low", sentiment: -0.8 },
//         { id: 2, name: "Rahul Verma", status: "Stable", lastMood: "Joyful", sentiment: 0.6 },
//         { id: 3, name: "Sneha Reddy", status: "Needs Review", lastMood: "Anxious", sentiment: -0.2 },
//     ];

//     return (
//         <div className="min-h-screen bg-slate-50 p-6 md:p-10 pt-20 font-sans">
//             <div className="max-w-7xl mx-auto space-y-10">

//                 {/* Header */}
//                 <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-indigo-100 pb-6">
//                     <div>
//                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-2">
//                             <Activity size={12} /> Medical Portal
//                         </div>
//                         <h1 className="text-4xl font-serif text-slate-800">
//                             Dr. {user?.name || "Psychiatrist"}
//                         </h1>
//                         <p className="text-slate-500 mt-1 font-light">Your insights change lives.</p>
//                     </div>
//                     <button onClick={logout} className="flex items-center gap-2 text-rose-500 hover:text-rose-700 font-medium transition px-4 py-2 rounded-lg hover:bg-rose-50">
//                         <LogOut size={18} /> Sign Out
//                     </button>
//                 </div>

//                 {/* Priority Alerts */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="md:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-50 relative overflow-hidden">
//                         <div className="absolute top-0 right-0 p-6 opacity-5"><AlertTriangle size={100} className="text-rose-500" /></div>
//                         <h2 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
//                             <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
//                             Priority Patient Alerts
//                         </h2>
//                         <div className="space-y-4">
//                             {patients.filter(p => p.sentiment < -0.5).map(p => (
//                                 <div key={p.id} className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl flex justify-between items-center group hover:bg-rose-50 transition">
//                                     <div className="flex items-center gap-4">
//                                         <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-serif font-bold">{p.name[0]}</div>
//                                         <div>
//                                             <h3 className="font-bold text-slate-800 group-hover:text-rose-700 transition">{p.name}</h3>
//                                             <p className="text-xs text-rose-600 font-medium">Sustained negative sentiment detected.</p>
//                                         </div>
//                                     </div>
//                                     <button className="bg-white text-rose-600 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition">View Journal</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Quick Stats */}
//                     <div className="space-y-6">
//                         <div className="bg-[#1e1b4b] text-white p-8 rounded-[2rem] shadow-xl shadow-indigo-900/10 relative overflow-hidden">
//                             <div className="relative z-10">
//                                 <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Total Patients</p>
//                                 <p className="text-4xl font-serif">24</p>
//                             </div>
//                             <Users className="absolute bottom-4 right-4 text-white opacity-10" size={60} />
//                         </div>
//                         <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50">
//                             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Pending Reports</p>
//                             <p className="text-4xl font-serif text-slate-800">05</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Patient List Table */}
//                 <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
//                     <div className="p-6 border-b border-slate-100 flex justify-between items-center">
//                         <h2 className="text-xl font-serif font-bold text-slate-800">Patient Directory</h2>
//                         <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-slate-50 rounded-full text-sm outline-none focus:ring-2 focus:ring-indigo-100 transition" /></div>
//                     </div>
//                     <table className="w-full text-left">
//                         <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-widest">
//                             <tr>
//                                 <th className="p-6">Patient Name</th>
//                                 <th className="p-6">Current Status</th>
//                                 <th className="p-6">Latest Mood</th>
//                                 <th className="p-6 text-right">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-50">
//                             {patients.map(patient => (
//                                 <tr key={patient.id} className="hover:bg-slate-50/50 transition">
//                                     <td className="p-6 font-medium text-slate-700"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">{patient.name[0]}</div><span className="font-medium text-slate-700">{patient.name}</span></div></td>
//                                     <td className="p-6"><span className={`px-3 py-1 rounded-full text-xs font-bold ${patient.status === 'High Risk' ? 'bg-rose-100 text-rose-600' : patient.status === 'Stable' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{patient.status}</span></td>
//                                     <td className="p-6 text-slate-500 font-medium">{patient.lastMood}</td>
//                                     <td className="p-6 text-right"><button className="text-indigo-600 hover:text-indigo-800 font-bold text-sm">Open File</button></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DoctorDashboard;
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 💡 Import useNavigate
import axios from 'axios';
import { LogOut, Users, Activity, AlertTriangle, FileText, Search, Loader } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { UpdateContext } from '../context/UpdateContext';

// --- MAIN DOCTOR DASHBOARD COMPONENT ---
const DoctorDashboard = () => {
    const { logout, user } = useContext(AuthContext);
    const { updateCounter } = useContext(UpdateContext); 
    const navigate = useNavigate(); // 💡 Initialize useNavigate hook

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/doctor/patients');
            setPatients(res.data);
            
        } catch (err) {
            console.error("Failed to fetch patient data:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on mount, when updateCounter changes, and every 60s (polling)
    useEffect(() => {
        fetchPatients();
        const intervalId = setInterval(fetchPatients, 60000); 
        return () => clearInterval(intervalId);
    }, [updateCounter]);

    const highRiskPatients = patients.filter(p => p.sentiment < -0.5);

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10 pt-20 font-sans">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-indigo-100 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-2">
                            <Activity size={12} /> Medical Portal
                        </div>
                        <h1 className="text-4xl font-serif text-slate-800">
                            Dr. {user?.name || "Psychiatrist"}
                        </h1>
                        <p className="text-slate-500 mt-1 font-light">Your insights change lives.</p>
                    </div>
                    <button onClick={logout} className="flex items-center gap-2 text-rose-500 hover:text-rose-700 font-medium transition px-4 py-2 rounded-lg hover:bg-rose-50">
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>

                {/* Priority Alerts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5"><AlertTriangle size={100} className="text-rose-500" /></div>
                        <h2 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                            Priority Patient Alerts ({highRiskPatients.length})
                        </h2>
                        <div className="space-y-4">
                            {loading ? (
                                <p className="text-center text-slate-500 py-4 flex items-center justify-center gap-2"><Loader size={16} className="animate-spin" /> Loading alerts...</p>
                            ) : highRiskPatients.length > 0 ? (
                                highRiskPatients.map(p => (
                                    <div key={p._id} className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl flex justify-between items-center group hover:bg-rose-50 transition">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-serif font-bold">{p.name[0]}</div>
                                            <div>
                                                <h3 className="font-bold text-slate-800 group-hover:text-rose-700 transition">{p.name}</h3>
                                                <p className="text-xs text-rose-600 font-medium">Sustained negative sentiment detected (Score: {p.sentiment.toFixed(2)}).</p>
                                            </div>
                                        </div>
                                        {/* 💡 Use navigate to the new page */}
                                        <button 
                                            onClick={() => navigate(`/doctor/patient/${p._id}`)}
                                            className="bg-white text-rose-600 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition">
                                            View File
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-slate-500 py-4">No high-risk patients currently.</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-6">
                        <div className="bg-[#1e1b4b] text-white p-8 rounded-[2rem] shadow-xl shadow-indigo-900/10 relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Total Patients</p>
                                <p className="text-4xl font-serif">{loading ? '...' : patients.length}</p>
                            </div>
                            <Users className="absolute bottom-4 right-4 text-white opacity-10" size={60} />
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">High Risk Patients</p>
                            <p className="text-4xl font-serif text-slate-800">{loading ? '...' : highRiskPatients.length}</p>
                        </div>
                    </div>
                </div>


                {/* Patient List Table */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="text-xl font-serif font-bold text-slate-800">Patient Directory</h2>
                        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-slate-50 rounded-full text-sm outline-none focus:ring-2 focus:ring-indigo-100 transition" /></div>
                    </div>
                    
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                            <tr>
                                <th className="p-6">Patient Name</th>
                                <th className="p-6">Current Status</th>
                                <th className="p-6">Latest Mood</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan="4" className="p-6 text-center text-slate-500 flex items-center justify-center gap-2"><Loader size={16} className="animate-spin" /> Fetching patient list...</td></tr>
                            ) : patients.length > 0 ? (
                                patients.map(patient => (
                                    <tr key={patient._id} className="hover:bg-slate-50/50 transition">
                                        <td className="p-6 font-medium text-slate-700"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">{patient.name[0]}</div><span className="font-medium text-slate-700">{patient.name}</span></div></td>
                                        <td className="p-6"><span className={`px-3 py-1 rounded-full text-xs font-bold ${patient.status === 'High Risk' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>{patient.status}</span></td>
                                        <td className="p-6 text-slate-500 font-medium">{patient.lastMood}</td>
                                        <td className="p-6 text-right">
                                            {/* 💡 Use navigate to the new dedicated page */}
                                            <button 
                                                onClick={() => navigate(`/doctor/patient/${patient._id}`)} 
                                                className="text-indigo-600 hover:text-indigo-800 font-bold text-sm"
                                            >
                                                Open File
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="p-6 text-center text-slate-500">No patients found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;