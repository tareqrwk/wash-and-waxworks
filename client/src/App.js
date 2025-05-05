import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Testiomonials from "./components/Testimonials";
import Footer from "./components/Footer";
import BookingPage from "./pages/BookingPage";

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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Services />
            <Testiomonials />
          </>
        } />
        <Route path="/book" element={<BookingPage />} />
        </Routes>
        <Footer />
    </Router>
  );
}

