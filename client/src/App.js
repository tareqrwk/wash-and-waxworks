import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from "./components/Footer";
import BookingPage from "./pages/BookingPage";
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import AOS from "aos"; //Animation on Scroll library
import 'aos/dist/aos.css'; //AOS styles 
import { useEffect } from "react"; //React hook for side effects

export default function App() {
  //Initialize AOS animations when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, //Animation duration in milliseconds
      once: true, //Ensure animations run only once
    });
  }, []);

  return (
    //Router to define application routes
    <Router>
      {/* Navbar displayed on all pages */}
      <Navbar />
      {/* Define application routes */}
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<HomePage />} />
        {/* Booking page route */}
        <Route path="/book" element={<BookingPage />} />
        {/* Services page route */}
        <Route path="/services" element={<ServicesPage />} />
        {/* Contact page route */}
        <Route path="/contact" element={<ContactPage />} />
        {/* Admin login page route */}
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* Admin dashboard route (protected) */}
        <Route
            path="/admin-dashboard"
            element={
            <ProtectedRoute> {/* Protect this route */}
              <AdminDashboard /> {/* Admin dashboard component */}
            </ProtectedRoute>
            }
            />
      </Routes>
      {/* Footer displayed on all pages */}
      <Footer />
    </Router>
    
  );
}