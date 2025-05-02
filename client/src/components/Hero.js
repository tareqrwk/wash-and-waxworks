function Hero() {
    return (
      <div className="relative h-[500px] w-full overflow-hidden">
        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
  
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
  
        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Wash&WaxWorks Car Detailing</h1>
          <p className="text-xl mb-2">Where Every Car Is Treated Like Royalty</p>
          <p className="text-sm text-gray-300 mb-6">Trusted by 50+ happy car owners</p>
          <button className="bg-blueViolet text-white px-6 py-3 rounded-full font-semibold hover:bg-wildBlue hover:scale-105 hover:shadow-xl transition">
            Book Now!
          </button>
        </div>
      </div>
    );
  }
  export default Hero;
  