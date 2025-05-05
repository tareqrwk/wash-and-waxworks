import { Link } from 'react-router-dom';
function Navbar(){
    return (
        <header className="sticky top-0 z-50 shadow-md">
            <nav className="bg-[#0f0f0f] text-white px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold tracking-tight">
                    <span className="text-blue-400">Wash</span>&<span className="text-violet-500">WaxWorks</span>
                </div>
                {/* Links */}
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
            </nav>
            
             {/* Gradient Stripe */}
             <div className="h-1 bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600" />
        </header>

    );
}

export default Navbar;