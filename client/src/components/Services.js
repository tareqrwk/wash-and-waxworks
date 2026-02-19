import ServicesCard from "./Services-card";
import { Sparkles } from 'lucide-react';

function Services() {
  return (
    <section className="bg-black text-white py-24 px-4 relative overflow-hidden">
      {/* Background blur decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3 text-purple-500" />
            Our Expertise
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            World-Class Services
          </h2>
        </div>

        {/* Grid container for service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ServicesCard
            title="Exterior Wash"
            description="Professional-grade decontamination and high-gloss finish that protects your paint."
            image="/images/exterior-wash.jpg"
          />

          <ServicesCard
            title="Interior Detail"
            description="Deep steam cleaning and restoration that brings your interior back to showroom quality."
            image="/images/interior-detail.jpg"
          />

          <ServicesCard
            title="Full Deluxe Package"
            description="The ultimate transformation. Meticulous treatment for both interior and exterior."
            image="/images/deluxe-cover.jpg"
          />
        </div>
      </div>
    </section>
  );
}

export default Services;
