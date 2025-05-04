function TestimonialCard({name, quote, image}){
    return (
        <div className="bg-gray-900 text-white rounded-xl p-6 shadow-md border border-gray-800 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
                <img
                    src={image}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border border-gray-700"
                />
                <h4 className="text-lg font-semibold">{name}</h4> 
            </div>
            <p className="text-gray-300 text-sm italic">"{quote}"</p>
        </div>
    );
}

export default TestimonialCard;
