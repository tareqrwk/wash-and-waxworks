import ServicesCard from "./Services-card"; // Import the ServicesCard component

//Functional component to render the "Our Services" section
function Services() {
    return (
        // Main container with background color, text styling, and padding
        <div className="bg-black text-white py-16 px-4">
          {/* Section title */}
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>

          {/* Grid container for service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Individual service cards */}
            <ServicesCard
            title = "Exterior Wash"
            description = "A deep clean from top to tire. Shine guaranteed."
            image = "/images/exterior-wash.jpg" />

            <ServicesCard
            title = "Interior Detail"
            description = "Restore your interior to like-new condition."
            image = "/images/interior-detail.jpg" />

            <ServicesCard
            title = "Full Deluxe Package"
            description = "Complete inside-out makeover. Perfect for special occasions."
            image = "/images/deluxe-cover.jpg" />
          </div>
        </div>
      );
    }
  
export default Services;
  