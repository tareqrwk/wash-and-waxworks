function Services() {
    return (
      <section className="py-16 px-6 bg-[#0f0f0f] text-white text-center">
        <h2 className="text-4xl font-bold mb-8">Our Services</h2>
        {/*Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-2">Exterior Wash</h3>
            <p className="text-sm text-gray-400">A deep clean from top to tire. Shine guaranteed.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-5xl mb-4">🧼</div>
            <h3 className="text-xl font-semibold mb-2">Interior Detail</h3>
            <p className="text-sm text-gray-400">Get your brand new interior with our interior package.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2">Full Deluxe Package</h3>
            <p className="text-sm text-gray-400">Why get a brand new car when you can get our full deluxe package. Interior and exterior included.</p>
        </div>

      </section>
    );
  }
  
  export default Services;
  