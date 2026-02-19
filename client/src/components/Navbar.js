import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, Calendar, MessageCircle, Menu, X, ArrowRight, Instagram } from 'lucide-react';

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

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [menuOpen]);

    const navLinks = [
        { label: 'Home', path: '/', icon: Home },
        { label: 'Services', path: '/services', icon: Sparkles },
        { label: 'Book', path: '/book', icon: Calendar },
        { label: 'Contact', path: '/contact', icon: MessageCircle }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
                <nav className={`mx-auto max-w-7xl px-6 transition-all duration-500 border ${scrolled
                    ? 'bg-black/70 backdrop-blur-xl border-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                    : 'bg-black/20 md:bg-transparent border-transparent'
                    } rounded-full`}>
                    <div className="flex justify-between items-center h-16 relative z-[110]">
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

                        {/* Mobile Menu Trigger */}
                        <button
                            className={`md:hidden p-3 rounded-2xl transition-all duration-300 ${menuOpen ? 'bg-white text-black' : 'bg-white/5 text-white'
                                }`}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </nav>

                {/* Glowing bottom line transition */}
                <div className={`h-[1px] w-full transition-all duration-1000 absolute bottom-0 ${scrolled ? 'bg-gradient-to-r from-transparent via-purple-500/50 to-transparent' : 'bg-transparent'}`} />
            </header>

            {/* Mobile Full-Screen Overlay (un-nested from header for absolute full viewport coverage) */}
            <div className={`fixed inset-0 z-[110] md:hidden transition-all duration-700 ease-in-out ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                }`}>
                <div className="absolute inset-0 bg-black backdrop-blur-3xl" />

                {/* Background Decorative Elements inside menu */}
                <div className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] bg-purple-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[20%] left-[-15%] w-[300px] h-[300px] bg-indigo-600/20 blur-[100px] rounded-full" />

                <div className="relative h-full flex flex-col pt-32 pb-12 px-8 overflow-y-auto">
                    {/* Secondary Close Button for redundancy/clarity if needed, but we keep the main one in the header usually. 
                        However, since we un-nested, let's add a dedicated header area in the overlay too. */}
                    <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
                        <Link to="/" onClick={() => setMenuOpen(false)} className="text-2xl font-black tracking-tighter">
                            <span className="text-white">Wash</span>
                            <span className="text-purple-500">&</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">WaxWorks</span>
                        </Link>
                        <button
                            className="p-3 rounded-2xl bg-white text-black transition-all"
                            onClick={() => setMenuOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {navLinks.map(({ label, path, icon: Icon }, index) => (
                            <Link
                                key={label}
                                to={path}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center justify-between p-5 rounded-[2rem] border transition-all duration-500 ${isActive(path)
                                    ? 'bg-purple-600/20 border-purple-500/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                                    : 'bg-white/5 border-white/5 text-zinc-400'
                                    }`}
                                style={{
                                    transitionDelay: `${index * 50}ms`,
                                    transform: menuOpen ? 'translateX(0)' : 'translateX(-10px)'
                                }}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`p-3 rounded-xl ${isActive(path) ? 'bg-purple-500 text-white' : 'bg-black text-purple-400'}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-xl font-black tracking-tight uppercase">{label}</span>
                                </div>
                                <ArrowRight className={`w-5 h-5 transition-transform ${isActive(path) ? 'translate-x-0' : '-translate-x-2 opacity-0'}`} />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Footer CTA */}
                    <div className={`mt-10 transition-all duration-500 delay-300 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                        <Link to="/book" onClick={() => setMenuOpen(false)}>
                            <button className="w-full py-5 rounded-[2rem] bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-purple-600/40 transform active:scale-95 transition-transform text-md">
                                Secure Your Detail
                                <Sparkles className="w-4 h-4 fill-white" />
                            </button>
                        </Link>

                        <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col items-center gap-6">
                            <div className="flex gap-6">
                                <a href="https://www.instagram.com/washthenwaxworks/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 text-zinc-400 hover:text-white transition-colors border border-white/5">
                                    <Instagram className="w-6 h-6" />
                                </a>
                            </div>
                            <div className="text-center group">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">Direct Line</p>
                                <a href="tel:2267005701" className="text-white font-black text-xl hover:text-purple-400 transition-colors tracking-tighter leading-none">(226) 700-5701</a>
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-purple-400 text-[9px] font-black uppercase tracking-widest shadow-xl">
                                <span>LONDON ONTARIO</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
