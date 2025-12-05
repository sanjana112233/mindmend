import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, TrendingUp, FileText, Loader, Mail, Activity, Zap } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const PatientFile = () => {
    const { id } = useParams(); // Get patient ID from the URL path: /doctor/patient/:id
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); 

    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatientFile = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch data using the ID from the URL parameter
                const res = await axios.get(`http://localhost:5000/api/doctor/patient/${id}/file`);
                setPatientData(res.data);
            } catch (err) {
                console.error("Failed to fetch patient file:", err.response?.data || err);
                // Handle different error statuses
                const msg = err.response?.status === 403 ? "Access Denied. You do not have permission to view this file." : 
                            err.response?.status === 404 ? "Patient not found." : "Could not load patient data due to a server error.";
                setError(msg);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPatientFile();
        } else {
            setError("Error: Patient ID is missing from the URL.");
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-slate-500 flex items-center gap-3"><Loader className="animate-spin" size={24} /> Loading Patient File...</p>
            </div>
        );
    }

    if (error || !patientData || !patientData.patientDetails) {
        // Fallback to check if patientDetails is missing after loading
        return (
            <div className="min-h-screen flex items-center justify-center bg-rose-50 p-10">
                <div className="text-center">
                    <p className="text-xl font-bold text-rose-700 mb-4">{error || "Patient data structure is invalid."}</p>
                    <button onClick={() => navigate('/doctor-dashboard')} className="text-indigo-600 hover:underline flex items-center gap-2 mx-auto">
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }
    
    // Safely de-structure the fetched data
    const { patientDetails, journals, reports } = patientData;

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10 pt-20 font-sans">
            <div className="max-w-6xl mx-auto space-y-10">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-indigo-100 pb-6">
                    <div>
                        <button onClick={() => navigate('/doctor-dashboard')} className="text-indigo-600 hover:underline flex items-center gap-2 mb-2">
                            <ArrowLeft size={16} /> Back to Directory
                        </button>
                        <h1 className="text-4xl font-serif text-slate-800 font-bold">{patientDetails.name}'s Comprehensive File</h1>
                        <p className="text-slate-500 mt-1 flex items-center gap-2"><Mail size={16} /> {patientDetails.email}</p>
                    </div>
                </div>

                {/* Stats Summary - Using Optional Chaining for Safety */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
                        <p className="text-4xl font-mono text-indigo-700">{patientDetails.gamification?.streak || 0}</p>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest flex items-center justify-center gap-1 mt-2"><Activity size={14}/> Streak</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
                        <p className="text-4xl font-mono text-indigo-700">{patientDetails.gamification?.points || 0}</p>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest flex items-center justify-center gap-1 mt-2"><Zap size={14}/> Points</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
                        <p className="text-4xl font-mono text-indigo-700">{journals?.length || 0}</p>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest flex items-center justify-center gap-1 mt-2"><FileText size={14}/> Entries</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
                        <p className="text-4xl font-mono text-indigo-700">{reports?.length || 0}</p>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest flex items-center justify-center gap-1 mt-2"><TrendingUp size={14}/> Reports</p>
                    </div>
                </div>

                {/* Patient History */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COL: Journal History */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-2xl font-serif font-bold text-slate-800 flex items-center gap-2"><FileText size={24} className="text-indigo-500"/> Journal History</h3>
                        <div className="space-y-6">
                            {(journals && journals.length > 0) ? (
                                journals.map(journal => (
                                    <div key={journal._id} className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
                                        <div className="flex justify-between items-start mb-3">
                                            <p className="text-sm font-medium text-slate-600 flex items-center gap-2"><Calendar size={14}/> {new Date(journal.date).toLocaleString()}</p>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${journal.sentimentScore < -0.2 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                Sentiment: {journal.sentimentScore?.toFixed(2) || 'N/A'}
                                            </span>
                                        </div>
                                        <p className="text-slate-700 mb-3 whitespace-pre-wrap">{journal.text}</p>
                                        <div className="text-xs italic text-indigo-500 font-medium">
                                            Affirmation: "{journal.affirmation}"
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 text-center py-10 bg-white rounded-xl border border-slate-100">No journal entries found for this patient.</p>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COL: Reports Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        <h3 className="text-2xl font-serif font-bold text-slate-800 flex items-center gap-2"><TrendingUp size={24} className="text-emerald-500"/> Report Summaries</h3>
                        <div className="space-y-4">
                            {(reports && reports.length > 0) ? (
                                reports.map((report, index) => (
                                    <div key={index} className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                        <p className="text-sm font-bold text-emerald-700 mb-1 flex items-center gap-2"><Calendar size={14}/> {new Date(report.date).toLocaleDateString()}</p>
                                        <p className="text-slate-700 text-sm">{report.summary}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 text-center py-4 bg-white rounded-xl border border-slate-100">No reports available.</p>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default PatientFile;