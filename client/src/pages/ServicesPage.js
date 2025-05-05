import ServicesPageCard from "../components/ServicesPageCard";
function ServicesPage(){
    return(
        <section className="bg-black text-white py-16 px-4">
            <p className="text-2xl text-center mb-12 italic">100% SATISFACTION GUARANTEED</p>
            <h1 className="text-4xl font-bold text-center mb-12"> Full Detail Services (In & Out)</h1>
            {/*Full Detail Services*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
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
                />
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
                />
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
                />
            </div>
            <h1 className="text-4xl font-bold text-center mb-12 mt-12"> Interior Detail Services</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
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
                />
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
                />
                <ServicesPageCard
                    data-aos="fade-up"
                    data-aos-delays="100"
                    data-aos-duration="2000"   
                    title="Quick Wash"
                    description={`Hand Wash\n
                                Tire Cleaning\n\n
                                Quick Interior Vacuum`}
                    price="$24.99"
                />

            </div>

        </section>
    );
}

export default ServicesPage;