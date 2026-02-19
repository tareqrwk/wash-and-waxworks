import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ChevronRight, Star } from 'lucide-react';

function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center pt-32 pb-20 md:pt-0 md:pb-0">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 font-bold text-sm uppercase tracking-widest mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            London's Elite Detailing
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Experience the <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-white">Showroom Shine</span> At Your Door
          </h1>
          <p className="text-xl text-zinc-300 mb-8 max-w-xl leading-relaxed">
            Where every vehicle is treated like royalty. Premium mobile detailing services that bring the professional finish directly to you.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link to="/book" className="w-full sm:w-auto">
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all">
                <Calendar className="w-5 h-5" />
                Book Appointment
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">
                Explore Packages
              </button>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="h-10 w-[1px] bg-zinc-800"></div>
            <div>
              <div className="flex text-yellow-500 items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500" />
                <span className="font-bold text-white">5.0</span>
                <span className="text-zinc-500 text-sm">(50+ Reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
export default Hero;
