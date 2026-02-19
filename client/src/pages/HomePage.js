import { useEffect } from 'react';
import Hero from '../components/Hero';
import Process from '../components/Process';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import BeforeAfterGallery from '../components/BeforeAfterGallery';

function HomePage() {
  useEffect(() => {
    document.title = "Wash&WaxWorks | Home";
  }, []);

  return (
    <div className="bg-black relative overflow-hidden">
      {/* Global Background Accents */}
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[60%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        <Hero />
        <Process />
        <Services />
        <Testimonials />
        <div className="bg-zinc-950">
          <BeforeAfterGallery />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
