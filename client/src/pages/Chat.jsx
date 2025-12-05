import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Chat = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hello, friend. I am here to listen. How are you feeling today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/chat', { message: input });
            const botMsg = { sender: 'bot', text: res.data.bot_response };
            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            // Mock response if backend is offline
            setTimeout(() => {
                setMessages((prev) => [...prev, { sender: 'bot', text: "I hear you. You are strong and capable. (Backend Offline Mode)" }]);
            }, 1000);
        }
        setLoading(false);
    };

    return (
        <div className="h-screen pt-20 pb-6 px-4 max-w-4xl mx-auto flex flex-col">
             <div className="flex items-center gap-4 mb-4 px-2">
                <Link to="/dashboard" className="p-2 rounded-full hover:bg-white transition text-slate-500">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-xl font-serif text-slate-800">MindMend Companion</h1>
                    <p className="text-xs text-green-500 font-medium flex items-center gap-1">● Online & Listening</p>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-[2rem] shadow-xl shadow-indigo-100/50 border border-slate-50 flex flex-col overflow-hidden relative">
                
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA]">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                                max-w-[80%] p-5 rounded-2xl text-base leading-relaxed
                                ${msg.sender === 'user' 
                                    ? 'bg-[#1e1b4b] text-white rounded-br-none shadow-md' 
                                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-sm'
                                }
                            `}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start animate-pulse">
                            <div className="bg-white px-6 py-4 rounded-2xl rounded-bl-none border border-slate-100 text-slate-400 text-sm">
                                ... MindMend is thinking
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-50">
                    <form onSubmit={sendMessage} className="flex gap-2 items-center bg-slate-50 p-2 rounded-full border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-100 transition">
                        <input 
                            type="text" 
                            className="flex-1 bg-transparent px-6 py-2 outline-none text-slate-700 placeholder:text-slate-400"
                            placeholder="Type your message..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;