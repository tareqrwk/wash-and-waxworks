import ServicesCard from "./Services-card";
function Services() {
    return (
        <div className="bg-black text-white py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ServicesCard />
          </div>
        </div>
      );
    }
  
export default Services;
  