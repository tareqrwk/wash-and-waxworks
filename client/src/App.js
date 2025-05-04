import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Testiomonials from "./components/Testimonials";

import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Testiomonials />
    </div>
  );
}

