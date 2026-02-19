import { Calendar, Car, Sparkles, ArrowRight } from 'lucide-react';

function Process() {
    const steps = [
        {
            icon: Calendar,
            title: "Book Online",
            description: "Choose your package and schedule a time that works for you in seconds.",
            color: "purple"
        },
        {
            icon: Car,
            title: "We Come To You",
            description: "Our mobile team arrives fully equipped to your location in London.",
            color: "indigo"
        },
        {
            icon: Sparkles,
            title: "Showroom Shine",
            description: "Your vehicle is meticulously detailed and restored to its best condition.",
            color: "blue"
        }
    ];

    return (
        <section className="bg-zinc-950 py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">How It Works</h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        We've streamlined the detailing process to be as effortless as possible. Premium results, zero stress.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Decorative Connectors (Desktop only) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent -translate-y-8 z-0"></div>

                    {steps.map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center group" data-aos="fade-up" data-aos-delay={i * 200}>
                            <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 group-hover:border-purple-500/50 group-hover:bg-purple-600/10 transition-all duration-500 shadow-xl">
                                <step.icon className="w-10 h-10 text-purple-500" />
                            </div>

                            <div className="absolute top-10 -right-6 hidden md:block text-zinc-800">
                                {i < steps.length - 1 && <ArrowRight className="w-6 h-6" />}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                            <p className="text-zinc-400 leading-relaxed max-w-xs px-4">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Process;
