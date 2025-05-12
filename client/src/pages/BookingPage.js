import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; //Import hook to handle query parameters

function BookingPage(){
    //Change tab title for page
    useEffect(() => {
            document.title = "Wash&WaxWorks | Book"
    }, []);

    const [formData, setFormData] = useState({
        //State to manage form data
        name: '',
        email: '',
        phone: '',
        car: '',
        service: '',
        date: '',
        time: '',
        location: '',
        notes: ''
    });
    //Get query parameters from the URL
    const [searchParams] = useSearchParams();
    const prefilledService = searchParams.get('service'); //Get the "service" parameter from the URL

    //Pre-fill the service field if the query parameter exists
    useEffect(() => {
        if (prefilledService){
            setFormData((prev) => ({ ...prev, service: prefilledService}));
        }
    }, [prefilledService]);
    //State to track if the form was successfully submitted
    const [submitted, setSubmitted] = useState(false);

    //Function to handle form submission
    const handleSubmit = (e) =>{
        e.preventDefault(); //Prevent default form submission behavior

        //Required Field Check
        if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time || !formData.location){
            alert("Please fill out all required fields.")
            return;
        }

        //Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)){
            alert("Please enter a valid email address");
            return;
        }

        //Phone number validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        //Send booking data to the server
        fetch(`${process.env.REACT_APP_API_URL}/api/book`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), //Send form data as JSON
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message); //Log server response
                setSubmitted(true); //Set submission success state
                //Reset form fields
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    car: '',
                    service: '',
                    date: '',
                    time: '',
                    location: '',
                    notes: ''
                });
                //Hide success message after 4 seconds
                setTimeout(() => setSubmitted(false), 4000);
            })
            .catch((error) => {
                console.error("Booking failed:", error); //Log errors
                alert("Something went wrong. Please try again.");
            });
    }

    return(
        //Main section container with background and styling
        <section className="bg-black min-h-screen text-white py-16 px-4">
            <div className="min-h-screen bg-black text-white py-16 px-4">
            {/* Page title */}
            <h1 className="text-4xl font-bold text-center mb-8">Book a Detailing Appointment</h1>

            {/* Success message display */}
            {submitted && (
                <div className="text-green-400 text-center mb-6 font-medium animate-pulse">
                    ✅ Appointment successfully booked!
                </div>
            )}

            {/* Booking form */}
            <form 
            onSubmit={handleSubmit} //Handle form submission
            data-aos = "fade-up" //Animation on scroll
            data-aos-duration="800" //Animation duration
            className="space-y-6 bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800"
            >
                {/* Name input field */}
                <input 
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value})}
                />

                {/* Email input field */}
                <input 
                    type="text"
                    placeholder="Your Email"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                />

                {/* Phone number input field */}
                <input 
                    type="text"
                    placeholder="Your Phone Number"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value})}
                />

                {/* Car model/type input field */}
                <input 
                    type="text"
                    placeholder="Car Model/Type"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.car}
                    onChange={(e) => setFormData({ ...formData, car: e.target.value})}
                />

                {/* Service selection dropdown */}
                <select 
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value})}
                >
                    <option value="">Select a service</option>
                    <option value="Standard Detail Package">Standard Detail Package</option>
                    <option value="Shiny Detail Package">Shiny Detail Package</option>
                    <option value="Platinum Detail Package">Platinum Detail Package</option>
                    <option value="Standard Interior Detail">Standard Interior Detail</option>
                    <option value="Full Interior Detail">Full Interior Detail</option>
                    <option value="Quick Wash">Quick Wash</option>
                </select>

                {/* Date input field */}
                <input 
                    type="date"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value})}
                />

                {/* Time input field */}
                <input 
                    type="time"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value})}
                />

                {/* Location input field */}
                <input
                    type="text"
                    placeholder="Your location"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value})}
                />

                {/* Notes textarea */}
                <textarea
                    rows={4}
                    placeholder='Any special instructions or notes?'
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none resize-none"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value})}
                />
                
                {/* Submit button */}
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-gray-600 font-semibold text-white px-6 py-2 rounded-xl hover:bg-purple-900 transition"
                    >
                        Book Appointment
                    </button>
                </div>
            </form>

            </div>
        </section>

    );
}

export default BookingPage;