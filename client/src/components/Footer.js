import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, ShieldCheck } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-black pt-20 pb-10 px-6 border-t border-zinc-900 relative overflow-hidden text-zinc-400">
            {/* Background Accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="text-2xl font-black tracking-tighter block group">
                            <span className="text-white group-hover:text-purple-400 transition-colors">Wash</span>
                            <span className="text-purple-500">&</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">WaxWorks</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            London's premier mobile detailing service. Bringing showroom-quality restoration directly to your doorstep with meticulous precision.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/washthenwaxworks/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-zinc-900 hover:bg-purple-600 transition-colors">
                                <Instagram className="w-5 h-5 text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                            <li><Link to="/services" className="hover:text-purple-400 transition-colors">Services</Link></li>
                            <li><Link to="/book" className="hover:text-purple-400 transition-colors">Book Now</Link></li>
                            <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Services</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li>Standard Detail</li>
                            <li>Shiny Package</li>
                            <li>Platinum Detail</li>
                            <li>Full Interior Restore</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Get In Touch</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-purple-500" />
                                <span>washnwaxworks@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-purple-500" />
                                <span>(226) 700-5701</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-purple-500" />
                                <span>London, ON (Mobile)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-tighter">
                    <div className="flex items-center gap-2 text-zinc-500">
                        <ShieldCheck className="w-4 h-4" />
                        100% Satisfaction Guaranteed
                    </div>
                    <p>&copy; 2025 Wash&WaxWorks. Meticulously Crafted.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;