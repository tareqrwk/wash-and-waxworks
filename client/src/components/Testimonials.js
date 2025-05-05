import TestimonialCard from "./Testimonial-card";

function Testimonials(){
    return(
        <section className="bg-black py-20 px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-12">What Our Clients Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grind-cols-3 gap-8 max-w-6xl mx-auto">
                <TestimonialCard
                    name="Tala L."
                    quote="My car looked better than brand new! Amazing job by the team."
                    image="https://ui-avatars.com/api/?name=Tala+L&background=4C1D95&color=fff"
                    animate="fade-left"
                    delay={0}
                />

                <TestimonialCard
                    name="Omar S."
                    quote="My car looked better than brand new! Amazing job by the team."
                    image="https://ui-avatars.com/api/?name=Omar+S&background=4C1D95&color=fff"
                    animate="fade-left"
                    delay={100}
                />

                <TestimonialCard
                    name="Olivia M."
                    quote="The deluxe package is WORTH IT. Rayan and Tareq pay absolute attention to detail. I highly recommend them!"
                    image="https://ui-avatars.com/api/?name=Oliva+M&background=4C1D95&color=fff"
                    animate="fade-left"
                    delay={200}
                />

                <TestimonialCard
                    name="Jason C."
                    quote="Feels like I got a brand new car after the detail I got from Tareq and Rayan. I highly recommend you try their packages, 100% worth it!"
                    image="https://ui-avatars.com/api/?name=Jason+C&background=4C1D95&color=fff"
                    animate="fade-left"
                    delay={300}
                />

                <TestimonialCard
                    name="Steven J."
                    quote="Nothing is better than their customer service. I had a last minute emergency and they adjusted accordingly. I truly appreciate their attention to detail. Highly recommended!"
                    image="https://ui-avatars.com/api/?name=Steven+J&background=4C1D95&color=fff"
                    animate="fade-left"
                    delay={400}
                />

                <TestimonialCard
                    name="Kayla M."
                    quote="I have been a returning customer for about 5 months now! I never had any concerns with their detailing. Tareq and Rayan are great detailers. I definitely recommend them to anyone."
                    image="https://ui-avatars.com/api/?name=Kayla+M&background=4C1D95&color=fff"
                    animate="fade-left"
                    delay={500}
                />

                
            </div>
        </section>
    );
}

export default Testimonials;