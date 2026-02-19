import { CheckCircle2, Star } from 'lucide-react';

function ServicesPageCard({ title, description, price, button, recommended, ...rest }) {
    return (
        <div {...rest} className={`flex flex-col relative group h-full rounded-[2.5rem] p-8 transition-all duration-500 border ${recommended
            ? 'bg-zinc-900/60 border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)] scale-[1.02] z-10'
            : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 backdrop-blur-md'
            }`}>
            {recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-purple-600/20">
                    <Star className="w-3 h-3 fill-white" />
                    Most Popular
                </div>
            )}

            <div className="mb-8 text-left">
                <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{price}</span>
                </div>
            </div>

            <div className="space-y-3 mb-10 flex-grow">
                {description.split('\n').filter(line => line.trim()).map((line, idx) => {
                    const isOr = line.trim().toLowerCase() === 'or';
                    return (
                        <div key={idx} className={`flex items-start gap-3 group/item ${isOr ? 'justify-center py-1' : ''}`}>
                            {!isOr && <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 shrink-0 transition-transform group-hover/item:scale-110" />}
                            <span className={`text-sm font-medium ${isOr ? 'text-zinc-500 italic uppercase tracking-widest text-[10px]' : 'text-zinc-300'} leading-tight text-left`}>
                                {line.trim()}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="mt-auto">
                {button}
            </div>
        </div>
    );
}

export default ServicesPageCard;