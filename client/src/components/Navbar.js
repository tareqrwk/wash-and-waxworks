import { useState } from 'react';
import { Link } from 'react-router-dom';
function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 shadow-md">
            <nav className="bg-[#0f0f0f] text-white px-6 py-4 flex justify-between items-center relative">
                {/* Logo */}
                <div className="text-2xl font-bold tracking-tight">
                    <span className="text-blue-400">Wash</span>&<span className="text-violet-500">WaxWorks</span>
                </div>
                {/*Desktop Links */}
                <div className="hidden md:flex space-x-6 text-sm font-medium">
                    {[
                        {label: 'Home', path: '/'},
                        {label: 'Services', path: '/services'},
                        {label: 'Book', path: '/book'},
                        {label: 'Contact', path: '/contact'}
                    ].map(({label, path}) => (
                      <Link
                        key={label}
                        to={path}
                        className="relative group"
                        >
                            <span className="transition-colors duration-200 group-hover:text-blue-400">
                                {label}
                            </span>
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
                        </Link>   
                    ))}
                </div>
                {/* Hamburger Icon */}
                <button 
                    className="md:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                   <svg
                        className="w-6 h-6"
                        full = "none"
                        stroke = "currentColor"
                        strokeWidth = "2"
                        viewBox = "0 0 24 24"
                    >
                        <path
                            strokeLinecap = "round"
                            strokeLinejoin = "round"
                            d={
                                menuOpen
                                ? "M6 18L18 6M6 6l12 12" // X icon
                                : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
                            }
                        />
                    </svg> 
                </button> 
                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#0f0f0f] text-white flex flex-col items-center py-4 space-y-4 md:hidden border-t border-gray-800 z-40">
                        {[
                            {label: 'Home', path: '/'},
                            {label: 'Services', path: '/services'},
                            {label: 'Book', path: '/book'},
                            {label: 'Contact', path: '/contact'}
                        ].map(({label, path}) => 
                            <Link
                                key={label}
                                to={path}
                                onClick={() => setMenuOpen(false)} //Close on click
                                className="hover:text-blue-400 transition"
                            >
                                {label}
                            </Link>
                        )}
                    </div>
                )}           
            </nav>
            
             {/* Gradient Stripe */}
             <div className="h-1 bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600" />
        </header>

    );
}

export default Navbar;