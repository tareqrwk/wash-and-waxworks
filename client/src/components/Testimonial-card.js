//Functional component to render a testimonial card
function TestimonialCard({name, quote, image, animate, delay=0}){
    return (
        //Main card container with animation, styling, and hover effects
        <div
            data-aos={animate}
            data-aos-delay={delay}
            className="bg-gray-900 text-white rounded-xl p-6 shadow-md border border-gray-800 hover:shadow-lg transition">
            {/* Header section with user image and name */}
            <div className="flex items-center mb-4">
                {/* User image */}
                <img
                    src={image}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border border-gray-700"
                />
                {/* User name */}
                <h4 className="text-lg font-semibold">{name}</h4> 
            </div>
            {/* Quote section */}
            <p className="text-gray-300 text-sm italic">"{quote}"</p>
        </div>
    );
}

export default TestimonialCard;
