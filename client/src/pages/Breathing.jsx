import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wind, Play, Square, Eye, Hand, Ear, Coffee, Smile, Layers, Activity } from 'lucide-react';

// --- SUB-COMPONENT 1: 4-7-8 BREATHING ---
const BreathingExercise = ({ onComplete }) => {
    const [phase, setPhase] = useState('Idle');
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);

    const phases = {
        Inhale: { duration: 4, label: "Inhale...", color: "text-emerald-500", scale: "scale-125", border: "border-emerald-200" },
        Hold: { duration: 7, label: "Hold", color: "text-indigo-500", scale: "scale-110", border: "border-indigo-200" },
        Exhale: { duration: 8, label: "Exhale...", color: "text-rose-500", scale: "scale-90", border: "border-rose-200" }
    };

    useEffect(() => {
        let timer;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
        } else if (isActive && timeLeft === 0) {
            if (phase === 'Idle' || phase === 'Exhale') {
                setPhase('Inhale'); setTimeLeft(4);
                if (phase === 'Exhale') setCycleCount(c => c + 1);
            } else if (phase === 'Inhale') {
                setPhase('Hold'); setTimeLeft(7);
            } else if (phase === 'Hold') {
                setPhase('Exhale'); setTimeLeft(8);
            }
        }
        return () => clearInterval(timer);
    }, [isActive, timeLeft, phase]);

    return (
        <div className="flex flex-col items-center justify-center h-full animate-fade-in py-10">
            <div className="relative flex items-center justify-center">
                {/* Dynamic Rings */}
                <div className={`absolute border-2 rounded-full w-80 h-80 transition-all duration-[4000ms] ${isActive ? phases[phase]?.border : 'border-slate-200'} ${isActive ? 'opacity-100 scale-100' : 'opacity-20 scale-90'}`}></div>
                <div className={`absolute border-2 rounded-full w-96 h-96 transition-all duration-[4000ms] delay-100 ${isActive ? phases[phase]?.border : 'border-slate-200'} ${isActive ? 'opacity-50 scale-100' : 'opacity-10 scale-95'}`}></div>

                {/* Core Circle */}
                <div className={`
                    w-64 h-64 rounded-full shadow-2xl flex flex-col items-center justify-center
                    bg-white/90 backdrop-blur-xl border-4 border-white
                    transition-all duration-[4000ms] ease-in-out z-10
                    ${isActive && phases[phase] ? phases[phase].scale : 'scale-100'}
                `}>
                    {isActive ? (
                        <>
                            <span className={`text-3xl font-serif font-medium transition-colors duration-500 ${phases[phase].color}`}>
                                {phases[phase].label}
                            </span>
                            <span className="text-6xl font-light text-slate-300 mt-2 font-mono">
                                {timeLeft}
                            </span>
                        </>
                    ) : (
                        <div className="text-center text-slate-500">
                            <Wind size={40} className="mx-auto mb-2 text-emerald-400" />
                            <span className="text-lg font-medium">Ready?</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-12 text-center">
                <p className="text-slate-500 mb-6">Completed Cycles: <span className="font-bold">{cycleCount}</span></p>
                <button
                    onClick={() => {
                        if (isActive) { setIsActive(false); setPhase('Idle'); setTimeLeft(0); }
                        else { setIsActive(true); setPhase('Inhale'); setTimeLeft(4); }
                    }}
                    className={`px-10 py-4 rounded-full font-medium flex items-center gap-3 shadow-xl hover:-translate-y-1 transition-all ${isActive ? 'bg-white text-rose-500 border border-rose-100' : 'bg-[#1e1b4b] text-white'}`}
                >
                    {isActive ? <><Square size={18} fill="currentColor" /> Stop</> : <><Play size={18} fill="currentColor" /> Start Breathing</>}
                </button>
            </div>
        </div>
    );
};

// --- SUB-COMPONENT 2: 5-4-3-2-1 GROUNDING ---
const GroundingExercise = () => {
    const [step, setStep] = useState(0);
    const steps = [
        { count: 5, label: "Things you can SEE", icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
        { count: 4, label: "Things you can TOUCH", icon: Hand, color: "text-emerald-500", bg: "bg-emerald-50" },
        { count: 3, label: "Things you can HEAR", icon: Ear, color: "text-indigo-500", bg: "bg-indigo-50" },
        { count: 2, label: "Things you can SMELL", icon: Coffee, color: "text-orange-500", bg: "bg-orange-50" },
        { count: 1, label: "Thing you can TASTE", icon: Smile, color: "text-rose-500", bg: "bg-rose-50" }
    ];

    const currentStep = steps[step];
    const Icon = currentStep?.icon;

    if (step >= steps.length) return (
        <div className="flex flex-col items-center justify-center h-full animate-fade-in text-center py-10">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                <Smile size={48} />
            </div>
            <h2 className="text-3xl font-serif text-slate-800 mb-2">You are grounded.</h2>
            <p className="text-slate-500 mb-8">Take a deep breath and carry this calm with you.</p>
            <button onClick={() => setStep(0)} className="bg-[#1e1b4b] text-white px-8 py-3 rounded-full hover:bg-indigo-900 transition">Start Again</button>
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center h-full animate-fade-in max-w-lg mx-auto text-center py-10">
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">Step {step + 1} of 5</span>
            <div className={`w-32 h-32 ${currentStep.bg} rounded-full flex items-center justify-center ${currentStep.color} mb-8 shadow-sm transition-all duration-500`}>
                <Icon size={64} />
            </div>
            <h2 className="text-4xl font-serif text-slate-800 mb-4">Find <span className={currentStep.color}>{currentStep.count}</span> {currentStep.label}</h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                Look around you. Name {currentStep.count} {currentStep.label.toLowerCase().split(' ').slice(3).join(' ')} out loud or in your head.
            </p>
            <button
                onClick={() => setStep(s => s + 1)}
                className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition shadow-sm"
            >
                I have found them
            </button>
        </div>
    );
};

// --- SUB-COMPONENT 3: BODY SCAN ---
const BodyScanExercise = () => {
    const [activePart, setActivePart] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const parts = [
        "Top of your Head", "Forehead & Eyes", "Jaw & Neck",
        "Shoulders", "Arms & Hands", "Chest & Heart",
        "Stomach", "Hips & Legs", "Feet & Toes"
    ];

    useEffect(() => {
        let interval;
        if (isActive && activePart < parts.length) {
            interval = setInterval(() => {
                setActivePart(p => p + 1);
            }, 5000); // 5 seconds per part
        } else if (activePart >= parts.length) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, activePart]);

    const progress = (activePart / parts.length) * 100;

    return (
        <div className="flex flex-col items-center justify-center h-full animate-fade-in max-w-lg mx-auto text-center py-10">
            {!isActive && activePart === 0 ? (
                <>
                    <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 mb-6">
                        <Activity size={48} />
                    </div>
                    <h2 className="text-3xl font-serif text-slate-800 mb-4">Progressive Relaxation</h2>
                    <p className="text-slate-500 mb-8">We will slowly scan down your body, releasing tension from each part.</p>
                    <button onClick={() => setIsActive(true)} className="bg-[#1e1b4b] text-white px-10 py-4 rounded-full hover:bg-indigo-900 transition shadow-lg">Begin Scan</button>
                </>
            ) : activePart >= parts.length ? (
                <>
                    <h2 className="text-3xl font-serif text-slate-800 mb-4">Scan Complete</h2>
                    <p className="text-slate-500 mb-8">Notice how your body feels lighter now.</p>
                    <button onClick={() => setActivePart(0)} className="text-indigo-600 font-bold hover:underline">Restart</button>
                </>
            ) : (
                <>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Focus your attention on...</p>
                    <h2 className="text-5xl font-serif text-slate-800 mb-12 animate-fade-in transition-all duration-1000">
                        {parts[activePart]}
                    </h2>
                    <p className="text-slate-500 italic mb-8">"Soften and let go of any tension here."</p>

                    {/* Progress Bar */}
                    <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 transition-all duration-[5000ms] ease-linear" style={{ width: `${progress}%` }}></div>
                    </div>
                </>
            )}
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const WellnessStudio = () => {
    const [selectedTool, setSelectedTool] = useState(null); // null = Menu

    return (
        // FIX: Added 'pt-28' to ensure content starts below fixed navbar
        <div className="min-h-screen bg-[#F8F7FA] flex flex-col relative overflow-hidden pt-28">

            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-rose-50/30 pointer-events-none"></div>

            {/* Header / Back Button Area */}
            <div className="relative z-10 px-6 mb-4 max-w-5xl mx-auto w-full">
                {selectedTool ? (
                    // FIX: Styled Button
                    <button
                        onClick={() => setSelectedTool(null)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600 font-medium hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all duration-300 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Studio</span>
                    </button>
                ) : (
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600 font-medium hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all duration-300 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Sanctuary</span>
                    </Link>
                )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative z-10 px-6 pb-12">

                {!selectedTool ? (
                    // --- MENU SELECTION ---
                    <div className="max-w-5xl mx-auto pt-4 animate-fade-in">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mb-4">Wellness Studio</h1>
                            <p className="text-slate-500 max-w-xl mx-auto">
                                Select a mindfulness technique to center your mind and body.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Card 1: Breathing */}
                            <button onClick={() => setSelectedTool('breathing')} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left border border-slate-50 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Wind size={100} />
                                </div>
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                    <Wind size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Resonance Breathing</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">4-7-8 technique to activate your parasympathetic nervous system and induce calm.</p>
                            </button>

                            {/* Card 2: Grounding */}
                            <button onClick={() => setSelectedTool('grounding')} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left border border-slate-50 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Layers size={100} />
                                </div>
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                    <Layers size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">5-4-3-2-1 Grounding</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">A powerful mindfulness technique to stop anxiety attacks and connect to the present.</p>
                            </button>

                            {/* Card 3: Body Scan */}
                            <button onClick={() => setSelectedTool('bodyscan')} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left border border-slate-50 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Activity size={100} />
                                </div>
                                <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                    <Activity size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Body Scan</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Progressive muscle relaxation to release physical tension from head to toe.</p>
                            </button>
                        </div>
                    </div>
                ) : (
                    // --- ACTIVE TOOL VIEW ---
                    <div className="h-full flex flex-col animate-fade-in">
                        {selectedTool === 'breathing' && <BreathingExercise />}
                        {selectedTool === 'grounding' && <GroundingExercise />}
                        {selectedTool === 'bodyscan' && <BodyScanExercise />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WellnessStudio;