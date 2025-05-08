import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Testiomonials from "./components/Testimonials";
import Footer from "./components/Footer";
import BeforeAfterGallery from './components/BeforeAfterGallery';
import BookingPage from "./pages/BookingPage";
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

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
            <BeforeAfterGallery />
          </>
        } />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
            path="/admin-dashboard"
            element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
            }
            />
      </Routes>
      <Footer />
    </Router>
    
  );
}

