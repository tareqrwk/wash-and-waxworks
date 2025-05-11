import ServicesPageCard from "../components/ServicesPageCard";
import { Link } from 'react-router-dom'; //Import Link for navigation
import { useEffect } from "react";
function ServicesPage(){
    //Change tab title for page
    useEffect(() => {
            document.title = "Wash&WaxWorks | Services"
    }, []);

    return(
        <section className="bg-black text-white py-16 px-4">
            <p className="text-2xl text-center mb-12 italic">100% SATISFACTION GUARANTEED</p>
            {/* Section subtitle */}
            <h1 className="text-4xl font-bold text-center mb-12"> Full Detail Services (In & Out)</h1>
            {/* Full Detail Services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
                {/* Standard Detail Package */}
                <ServicesPageCard
                    data-aos="fade-up"
                    data-aos-delays="100"
                    data-aos-duration="2000" 
                    title="Standard"
                    description={`Exterior Detail\n
                                 Vacuum Interior\n
                                 Clean Interior Windows\n 
                                 Dust Dash & Carpet\n
                                 Air Vents & Cup Holders\n
                                 Air Refreshener\n\n
                                 Leather Cleaning\n
                                 Or\n
                                 Upholstery Cleaning`}
                    price="$99.99"
                    button={
                        <Link to={`/book?service=${encodeURIComponent("Standard Detail Package")}`}>
                            <button className="group relative mt-6 px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                Book Now
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-xl pointer-events-none"></div>
                            </button>
                        </Link>
                    }
                />
                
                {/* Shiny Detail Package */}
                <ServicesPageCard
                    data-aos="fade-down"
                    data-aos-delays="100"
                    data-aos-duration="2000" 
                    title="Shiny"
                    description={`Exterior Detail\n
                                 Vacuum Interior\n
                                 Clean Interior Windows\n 
                                 Dust Dash & Carpet\n
                                 Salt Removing\n
                                 Trunk Cleaning\n
                                 Air Vents & Cup Holders\n
                                 Air Refreshener\n
                                 Tire Shine \n\n
                                 Leather Cleaning\n
                                 Or\n
                                 Upholstery Cleaning`}
                    price="$149.99"
                    button={
                        <Link to={`/book?service=${encodeURIComponent("Shiny Detail Package")}`}>
                            <button className="group relative mt-6 px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                Book Now
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-xl pointer-events-none"></div>
                            </button>
                        </Link>
                    }
                />

                {/* Platinum Detail Package */}
                <ServicesPageCard
                    data-aos="fade-up"
                    data-aos-delays="100"
                    data-aos-duration="2000"  
                    title="Platinum"
                    description={`Exterior Detail (Exclusive Car Shampoo)\n
                                 Vacuum Interior\n
                                 Clean Interior Windows\n 
                                 Dust Dash & Carpet\n
                                 Salt Removing\n
                                 Trunk Cleaning\n
                                 Air Vents & Cup Holders\n
                                 Door Jambs\n
                                 Gas Cap Cleaning\n
                                 Air Refreshener\n
                                 Tire Shine \n\n
                                 Interior Silk Shine Protectant\n\n
                                 Leather Cleaning\n
                                 Or\n
                                 Upholstery Cleaning`}
                    price="$199.99"
                    button={
                        <Link to={`/book?service=${encodeURIComponent("Platinum Detail Package")}`}>
                            <button className="group relative mt-6 px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                Book Now
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-xl pointer-events-none"></div>
                            </button>
                        </Link>
                    }
                />
            </div>
            {/* Interior Detail Services Section */}
            <h1 className="text-4xl font-bold text-center mb-12 mt-12"> Interior Detail Services</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
                {/* Full Interior Detail */}
                <ServicesPageCard
                    data-aos="fade-up"
                    data-aos-delays="100"
                    data-aos-duration="2000"   
                    title="Full Interior"
                    description={`Exterior Detail (Exclusive Car Shampoo)\n
                                 Vacuum Interior\n
                                 Clean Interior Windows\n 
                                 Dust Dash & Carpet\n
                                 Salt Removing\n
                                 Air Vents & Cup Holders\n
                                 Door Jambs\n
                                 Air Refreshener\n
                                 Tire Shine \n\n
                                 Interior Silk Shine Protectant\n\n
                                 Leather Cleaning\n
                                 Leather Quick Detailer\n
                                 Leather Conditioning\n
                                 Or\n
                                 Upholstery Cleaning`}
                    price="$174.99"
                    button={
                        <Link to={`/book?service=${encodeURIComponent("Full Interior Detail")}`}>
                            <button className="group relative mt-6 px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                Book Now
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-xl pointer-events-none"></div>
                            </button>
                        </Link>
                    }
                />

                {/* Standard Interior Detail */}
                <ServicesPageCard
                    data-aos="fade-down"
                    data-aos-delays="100"
                    data-aos-duration="2000"   
                    title="Standard Interior"
                    description={`Vacuum Interior\n
                                Clean Interior Windows\n
                                Dust Dash & Carpet\n\n
                                Leather Cleaning\n
                                Or\n
                                Upholstery Cleaning`}
                    price="$74.99"
                    button={
                        <Link to={`/book?service=${encodeURIComponent("Standard Interior Detail")}`}>
                            <button className="group relative mt-6 px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                Book Now
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-xl pointer-events-none"></div>
                            </button>
                        </Link>
                    }
                />

                {/* Quick Wash */}
                <ServicesPageCard
                    data-aos="fade-up"
                    data-aos-delays="100"
                    data-aos-duration="2000"   
                    title="Quick Wash"
                    description={`Hand Wash\n
                                Tire Cleaning\n\n
                                Quick Interior Vacuum`}
                    price="$24.99"
                    button={
                        <Link to={`/book?service=${encodeURIComponent("Quick Wash")}`}>
                            <button className="group relative mt-6 px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                Book Now
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-xl pointer-events-none"></div>
                            </button>
                        </Link>
                    }
                />

            </div>

        </section>
    );
}

export default ServicesPage;