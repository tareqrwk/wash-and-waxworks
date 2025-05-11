import { useState } from 'react';
import { Link } from 'react-router-dom';
function Navbar(){
    //State to track whether the mobile menu is open or closed
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        //Sticky header with shadow for the navigation bar
        <header className="sticky top-0 z-50 shadow-md">
            {/* Navigation bar container*/}
            <nav className="bg-[#0f0f0f] text-white px-6 py-4 flex justify-between items-center relative">
                {/* Logo Section*/}
                <div className="text-2xl font-bold tracking-tight">
                    <span className="text-blue-400">Wash</span>&<span className="text-violet-500">WaxWorks</span>
                </div>
                {/* Desktop Navigation Links */}
                <div className="hidden md:flex space-x-6 text-sm font-medium">
                    {/* Array of navigation links */}
                    {[
                        {label: 'Home', path: '/'},
                        {label: 'Services', path: '/services'},
                        {label: 'Book', path: '/book'},
                        {label: 'Contact', path: '/contact'}
                    ].map(({label, path}) => (
                      <Link
                        key={label} //Unique key for each link
                        to={path}   //Path for navigation
                        className="relative group"
                        >
                            {/* Link text with hover effects */}
                            <span className="transition-colors duration-200 group-hover:text-blue-400">
                                {label}
                            </span>
                            {/* Underline animation on hover */}
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
                        </Link>   
                    ))}
                </div>
                {/* Hamburger Icon for Mobile Menu */}
                <button 
                    className="md:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {/* SVG icon for the hamburger or close button */}
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
                                ? "M6 18L18 6M6 6l12 12" // X icon when menu is open
                                : "M4 6h16M4 12h16M4 18h16" // Hamburger icon when menu is close
                            }
                        />
                    </svg> 
                </button> 
                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#0f0f0f] text-white flex flex-col items-center py-4 space-y-4 md:hidden border-t border-gray-800 z-40">
                        {/* Array of navigation links for mobile */}
                        {[
                            {label: 'Home', path: '/'},
                            {label: 'Services', path: '/services'},
                            {label: 'Book', path: '/book'},
                            {label: 'Contact', path: '/contact'}
                        ].map(({label, path}) => 
                            <Link
                                key={label} //Unique key for each link
                                to={path} //Path for navigation
                                onClick={() => setMenuOpen(false)} //Close menu on link click
                                className="hover:text-blue-400 transition"
                            >
                                {label}
                            </Link>
                        )}
                    </div>
                )}           
            </nav>
            
             {/* Gradient Stripe below the navigation bar*/}
             <div className="h-1 bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600" />
        </header>

    );
}

export default Navbar;