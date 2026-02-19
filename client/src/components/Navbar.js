import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, Calendar, MessageCircle, Menu, X } from 'lucide-react';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Track scroll position for glass effect transition
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', path: '/', icon: Home },
        { label: 'Services', path: '/services', icon: Sparkles },
        { label: 'Book', path: '/book', icon: Calendar },
        { label: 'Contact', path: '/contact', icon: MessageCircle }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
            {/* Glassmorphic Container */}
            <nav className={`mx-auto max-w-7xl px-6 rounded-full transition-all duration-500 border ${scrolled
                    ? 'bg-black/70 backdrop-blur-xl border-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                    : 'bg-transparent border-transparent'
                }`}>
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <Link to="/" className="text-2xl font-black tracking-tighter group">
                        <span className="text-white group-hover:text-purple-400 transition-colors">Wash</span>
                        <span className="text-purple-500">&</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">WaxWorks</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map(({ label, path, icon: Icon }) => (
                            <Link
                                key={label}
                                to={path}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isActive(path)
                                        ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive(path) ? 'animate-pulse' : ''}`} />
                                {label}
                            </Link>
                        ))}

                        <div className="ml-4 pl-4 border-l border-zinc-800">
                            <Link to="/book">
                                <button className="bg-white text-black text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-purple-500 hover:text-white transition-all transform active:scale-95 shadow-lg shadow-white/5">
                                    Get Quote
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                    <div className="flex flex-col space-y-2 pt-2">
                        {navLinks.map(({ label, path, icon: Icon }) => (
                            <Link
                                key={label}
                                to={path}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${isActive(path)
                                        ? 'bg-purple-600/20 text-purple-400'
                                        : 'text-zinc-400 hover:bg-zinc-900'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-bold">{label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Glowing bottom line transition */}
            <div className={`h-[1px] w-full transition-all duration-1000 absolute bottom-0 ${scrolled ? 'bg-gradient-to-r from-transparent via-purple-500/50 to-transparent' : 'bg-transparent'}`} />
        </header>
    );
}

export default Navbar;
