import ServicesPageCard from "../components/ServicesPageCard";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { ShieldCheck, Zap, ArrowRight } from 'lucide-react';

function ServicesPage() {
    useEffect(() => {
        document.title = "Wash&WaxWorks | Services";
    }, []);

    const bookButton = (packageName) => (
        <Link to={`/book?service=${encodeURIComponent(packageName)}`} className="w-full">
            <button className="w-full group relative py-4 px-6 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs transition-all duration-300 hover:bg-purple-600 hover:text-white active:scale-95 shadow-lg shadow-white/5 flex items-center justify-center gap-2">
                Secure Booking
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
        </Link>
    );

    return (
        <div className="bg-black min-h-screen relative overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

            <section className="relative z-10 pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-24" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6 shadow-xl">
                            <Zap className="w-3 h-3 fill-purple-400" />
                            Premium Packages
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                            Professional Detailing <br className="hidden md:block" /> For Your Pride & Joy
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
                            Transparent pricing. Meticulous execution. We bring the showroom quality to your driveway with our fully equipped mobile units.
                        </p>
                    </div>

                    {/* Full Detail Section */}
                    <div className="mb-32">
                        <div className="flex items-center gap-4 mb-12" data-aos="fade-right">
                            <div className="w-12 h-[1px] bg-purple-500"></div>
                            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500">Complete Restorations (In & Out)</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <ServicesPageCard
                                data-aos="fade-up"
                                data-aos-delay="100"
                                title="Standard"
                                price="$99.99"
                                description={"Exterior Detail\nVacuum Interior\nClean Interior Windows\nDust Dash & Carpet\nAir Vents & Cup Holders\nAir Refreshener\nLeather Cleaning\nOr\nUpholstery Cleaning"}
                                button={bookButton("Standard Detail Package")}
                            />

                            <ServicesPageCard
                                data-aos="fade-up"
                                data-aos-delay="200"
                                recommended={true}
                                title="Shiny"
                                price="$149.99"
                                description={"Exterior Detail\nVacuum Interior\nClean Interior Windows\nDust Dash & Carpet\nSalt Removing\nTrunk Cleaning\nAir Vents & Cup Holders\nAir Refreshener\nTire Shine\nLeather Cleaning\nOr\nUpholstery Cleaning"}
                                button={bookButton("Shiny Detail Package")}
                            />

                            <ServicesPageCard
                                data-aos="fade-up"
                                data-aos-delay="300"
                                title="Platinum"
                                price="$199.99"
                                description={"Exterior Detail (Exclusive Car Shampoo)\nVacuum Interior\nClean Interior Windows\nDust Dash & Carpet\nSalt Removing\nTrunk Cleaning\nAir Vents & Cup Holders\nDoor Jambs\nGas Cap Cleaning\nAir Refreshener\nTire Shine\nInterior Silk Shine Protectant\nLeather Cleaning\nOr\nUpholstery Cleaning"}
                                button={bookButton("Platinum Detail Package")}
                            />
                        </div>
                    </div>

                    {/* Interior Detail Section */}
                    <div>
                        <div className="flex items-center gap-4 mb-12" data-aos="fade-right">
                            <div className="w-12 h-[1px] bg-indigo-500"></div>
                            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500">Specialized Services</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <ServicesPageCard
                                data-aos="fade-up"
                                data-aos-delay="100"
                                title="Full Interior"
                                price="$174.99"
                                description={"Exterior Detail (Exclusive Car Shampoo)\nVacuum Interior\nClean Interior Windows\nDust Dash & Carpet\nSalt Removing\nAir Vents & Cup Holders\nDoor Jambs\nAir Refreshener\nTire Shine\nInterior Silk Shine Protectant\nLeather Cleaning\nLeather Quick Detailer\nLeather Conditioning\nOr\nUpholstery Cleaning"}
                                button={bookButton("Full Interior Detail")}
                            />

                            <ServicesPageCard
                                data-aos="fade-up"
                                data-aos-delay="200"
                                title="Standard Interior"
                                price="$74.99"
                                description={"Vacuum Interior\nClean Interior Windows\nDust Dash & Carpet\nLeather Cleaning\nOr\nUpholstery Cleaning"}
                                button={bookButton("Standard Interior Detail")}
                            />

                            <ServicesPageCard
                                data-aos="fade-up"
                                data-aos-delay="300"
                                title="Quick Wash"
                                price="$24.99"
                                description={"Hand Wash\nTire Cleaning\nQuick Interior Vacuum"}
                                button={bookButton("Quick Wash")}
                            />
                        </div>
                    </div>

                    {/* Trust Banner */}
                    <div className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 text-center relative overflow-hidden" data-aos="zoom-in">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent)] pointer-events-none"></div>
                        <ShieldCheck className="w-16 h-16 text-purple-500 mx-auto mb-6" />
                        <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">100% Satisfaction Guaranteed</h3>
                        <p className="text-zinc-400 max-w-xl mx-auto font-medium">
                            If you're not absolutely thrilled with the transformation, we'll make it right. No questions asked. We pride ourselves on perfection.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ServicesPage;
