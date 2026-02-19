import { ArrowUpRight } from 'lucide-react';

function ServicesCard({ title, description, image }) {
    return (
        <div data-aos="zoom-in" className="group">
            <div
                className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-800 transition-all duration-500 hover:border-purple-500/50 hover:shadow-purple-500/10"
            >
                {/* Image background with zoom effect */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url("${image}")` }}
                ></div>

                {/* Intelligent Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-80"></div>

                {/* Glass Bottom Info Section */}
                <div className="absolute bottom-0 left-0 right-0 p-8 m-4 rounded-[2rem] bg-zinc-900/40 backdrop-blur-xl border border-white/10 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
                        <div className="p-2 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                        {description}
                    </p>
                    <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-700"></div>
                </div>
            </div>
        </div>
    );
}

export default ServicesCard;
