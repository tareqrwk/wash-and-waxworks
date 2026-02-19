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
    <div className="bg-black">
      <Hero />
      <Process />
      <Services />
      <Testimonials />
      <div className="bg-zinc-950">
        <BeforeAfterGallery />
      </div>
    </div>
  );
}

export default HomePage;
