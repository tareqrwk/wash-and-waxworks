function Navbar(){
    return (
        <nav className="w-full bg-black text-white px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-800">
            {/* Logo */}
            <div className="text-2xl font-bold">
                Wash<span className="text-blueViolet">&</span>WaxWorks
            </div>
            {/* Links */}
            <div className="hidden md:flex space-x-6 text-sm font-medium">
                <a href="#" className="hover:text-blueViolet transition">Home</a>
                <a href="#" className="hover:text-blueViolet transition">Services</a>
                <a href="#" className="hover:text-blueViolet transition">Book</a>
                <a href="#" className="hover:text-blueViolet transition">Contact</a>
            </div>
        </nav>
    );
}

export default Navbar;