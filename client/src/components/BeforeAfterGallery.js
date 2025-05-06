function BeforeAfterGallery(){
    const pairs = [
        {before: "/images/gallery/before-after/before1.avif", after:"/images/gallery/before-after/after1.avif"},
        {before: "/images/gallery/before-after/before2.avif", after:"/images/gallery/before-after/after2.avif"},
        {before: "/images/gallery/before-after/before3.avif", after:"/images/gallery/before-after/after3.avif"}
    ];

    return (
        <section className="bg-black py-16 px-4 text-white">
            <h2 className="text-4xl font-bold text-center mb-10">Before & After</h2>
            <div className="space-y-10 max-w-5xl mx-auto">
                {pairs.map((pair, i) => 
                    <div key={i} data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        {/* Before Image */}
                        <div className="relative group overflow-hidden rounded-lg border border-gray-700">
                            <img
                                src={pair.before}
                                alt={`Before ${i}`} 
                                className="w-full object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white font-semibold text-sm px-4 py-2
                                            translate-y-0 md:translate-y-full md:group-hover:translate-y-0
                                            transition-transform duration-300 ease-in-out text-center">
                                Before
                            </div>
                        </div>
                        {/* After Image */}
                        <div className="relative group overflow-hidden rounded-lg border border-gray-700">
                            <img
                                src={pair.after}
                                alt={`After ${i}`} 
                                className="w-full object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white font-semibold text-sm px-4 py-2
                                            translate-y-0 md:translate-y-full md:group-hover:translate-y-0
                                            transition-transform duration-300 ease-in-out text-center">
                                After
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default BeforeAfterGallery;