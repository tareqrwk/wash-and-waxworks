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
                        <div>
                            <p className="text-center text-sm text-gray-400 mb-2">Before</p>
                            <img src={pair.before} alt={`Before ${i}`} className="w-full rounded-lg border border-gray-700 object-contain h-auto" />
                        </div>
                        <div>
                            <p className="text-center text-sm text-gray-400 mb-2">After</p>
                            <img src={pair.after} alt={`After ${i}`} className="w-full rounded-lg border border-gray-700 object-contains h-auto" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default BeforeAfterGallery;