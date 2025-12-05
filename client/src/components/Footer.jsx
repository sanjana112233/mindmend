import { Brain, Heart, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 text-center md:text-left">
            
            <div className="col-span-1 md:col-span-2 space-y-6">
                <div className="flex items-center justify-center md:justify-start gap-3 text-slate-800">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                        <Brain size={18} />
                    </div>
                    <span className="font-serif text-3xl font-bold pt-1">MindMend</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto md:mx-0 font-medium">
                    Your digital sanctuary for mental clarity. 
                    Merging cognitive science with serene design to help you flourish.
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                    <SocialIcon icon={Twitter} />
                    <SocialIcon icon={Instagram} />
                    <SocialIcon icon={Facebook} />
                </div>
            </div>
            
            <div>
                <h4 className="font-bold text-slate-900 mb-6 font-serif">Discover</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                    <li><a href="#" className="hover:text-indigo-600 transition">Meditation</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition">Sleep Stories</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition">Focus Sounds</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition">Masterclasses</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-6 font-serif">Company</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                    <li><a href="#" className="hover:text-indigo-600 transition">Our Mission</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition">Careers</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition">Blog</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition">Contact</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 mb-6 font-serif">Support</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    "Quiet the mind, and the soul will speak."
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm text-indigo-600 font-bold hover:underline">
                    <Mail size={14} /> Contact Care Team
                </a>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs">
            <p>&copy; 2025 MindMend Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
                <a href="#" className="hover:text-indigo-600">Terms of Service</a>
                <a href="#" className="hover:text-indigo-600">Cookies Settings</a>
            </div>
        </div>
    </footer>
  );
};

const SocialIcon = ({ icon: Icon }) => (
    <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition shadow-sm">
        <Icon size={18} />
    </a>
);

export default Footer;