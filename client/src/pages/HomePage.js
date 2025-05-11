import { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import BeforeAfterGallery from '../components/BeforeAfterGallery';

function HomePage() {
  useEffect(() => {
    document.title = "Wash&WaxWorks | Home";
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <BeforeAfterGallery />
    </>
  );
}

export default HomePage;
