function ServicesPageCard({ title, description, price, button, ...rest }){
    return(
        <div {...rest} className="flex flex-col justify-between h-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/30 hover: -translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <span className="text-sm bg-purple-600 px-3 py-1 rounded-full font-medium">
                    {price}
                </span>
            </div>
            <p className="text-gray-300 text-sm">
                {description.split('\n').map((line, idx) => (
                <span key={idx}>
                    {line}
                    <br />
                </span>
            ))}
            </p>
            <div className="mt-8 flex justify-center">
                {button}
            </div>
        </div>
    );
}

export default ServicesPageCard;