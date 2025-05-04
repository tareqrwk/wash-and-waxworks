import {useRef, useState} from "react";

function ServicesCard({title, description, image}){
    return(
        <div
            className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:scale-[1.03] transition-transform duration-300"
            style={{
                backgroundImage: `url("${image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-sm text-gray-300">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default ServicesCard;
