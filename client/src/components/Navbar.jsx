import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, User, LogOut, ChevronDown, Brain } from 'lucide-react';

const Navbar = () => {
  const { token, logout, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsOpen(false);
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 border-b ${scrolled ? 'bg-white/90 backdrop-blur-xl border-slate-200/60 shadow-sm py-3' : 'bg-[#F8F7FA] border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <Link to="/" className="flex items-center gap-3 group relative z-[101]">
            <div className="relative">
                <div className="absolute inset-0 bg-indigo-300 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-500">
                    <Brain size={20} strokeWidth={2} />
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <span className="font-logo text-2xl text-slate-800 leading-none group-hover:text-indigo-800 transition-colors">MindMend</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" label="Home" active={isActive('/')} />
            {token ? (
              <>
                <NavLink to="/dashboard" label="Sanctuary" active={isActive('/dashboard')} />
                <NavLink to="/journal" label="Journal" active={isActive('/journal')} />
                <NavLink to="/chat" label="AI Companion" active={isActive('/chat')} />
                <div className="ml-4 pl-4 border-l border-slate-200 relative">
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 text-slate-600 font-medium hover:text-indigo-700 transition focus:outline-none group">
                    <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm group-hover:border-indigo-200 group-hover:text-indigo-600"><User size={16} /></div>
                    <div className="text-left hidden lg:block"><p className="text-xs font-bold text-slate-800 uppercase tracking-wider">{role || 'User'}</p></div>
                    <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-[90]" onClick={() => setIsDropdownOpen(false)}></div>
                      <div className="absolute right-0 top-full mt-4 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-fade-in z-[100]">
                        <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-3 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition font-medium">My Sanctuary</Link>
                        <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-sm text-rose-500 hover:bg-rose-50 rounded-xl transition mt-1 text-left font-medium"><LogOut size={16} className="mr-2" /> Sign Out</button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4 ml-8">
                <Link to="/login" className="text-slate-500 hover:text-indigo-900 font-medium transition text-sm">Log In</Link>
                <Link to="/signup" className="bg-[#1e1b4b] text-white px-6 py-2.5 rounded-full font-bold hover:bg-indigo-800 transition shadow-lg shadow-indigo-900/10 text-sm tracking-wide">Get Started</Link>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden z-[101]"><button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 p-2">{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button></div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-xl z-[100] flex flex-col justify-center items-center space-y-8 animate-fade-in">
          <Link to="/" className="font-logo text-4xl text-slate-800" onClick={() => setIsOpen(false)}>MindMend</Link>
          {token ? (
            <>
              <Link to="/dashboard" className="text-2xl font-serif text-slate-600" onClick={() => setIsOpen(false)}>Sanctuary</Link>
              <button onClick={handleLogout} className="text-xl font-medium text-rose-500 pt-4 flex items-center gap-2"><LogOut size={20} /> Sign Out</button>
            </>
          ) : (
            <Link to="/login" className="text-2xl font-serif text-slate-600" onClick={() => setIsOpen(false)}>Log In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, label, active }) => (
    <Link to={to} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active ? 'bg-white text-indigo-800 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-indigo-700 hover:bg-white/50'}`}>{label}</Link>
);

export default Navbar;