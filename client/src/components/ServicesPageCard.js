//Functional component to render a service card for the services page
function ServicesPageCard({ title, description, price, button, ...rest }){
    return(
        //Main card container with gradient background, border, and hover effects
        <div {...rest} className="flex flex-col justify-between h-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/30 hover: -translate-y-1 transition-all duration-300">
            {/* Header section with title and price */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">{title}</h3>
                {/* Price badge */}
                <span className="text-sm bg-purple-600 px-3 py-1 rounded-full font-medium">
                    {price}
                </span>
            </div>
            {/* Description section */}
            <p className="text-gray-300 text-sm">
                {/* Split description into lines and render each line with a line break */}
                {description.split('\n').map((line, idx) => (
                <span key={idx}>
                    {line}
                    <br />
                </span>
            ))}
            </p>
            {/* Button container */}
            <div className="mt-8 flex justify-center">
                {button}
            </div>
        </div>
    );
}

export default ServicesPageCard;