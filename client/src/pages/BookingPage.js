import {useState} from 'react';

function BookingPage(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        car: '',
        service: '',
        date: '',
        time: '',
        notes: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Submitted Book:", formData);
        setSubmitted(true);
        setFormData({
            name: '',
            email: '',
            phone: '',
            car: '',
            service: '',
            date: '',
            time: '',
            notes: ''
        });
        setTimeout(() => setSubmitted(false), 4000);
        // TODO: send to backend
    }

    return(
        <section className="bg-black min-h-screen text-white py-16 px-4">
            <div className="min-h-screen bg-black text-white py-16 px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Book a Detailing Appointment</h1>
            {submitted && (
                <div className="text-green-400 text-center mb-6 font-medium animate-pulse">
                    ✅ Appointment successfully booked!
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800">
                <input 
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value})}
                />
                <input 
                    type="text"
                    placeholder="Your Email"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                />
                <input 
                    type="text"
                    placeholder="Your Phone Number"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value})}
                />
                <input 
                    type="text"
                    placeholder="Car Model/Type"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.car}
                    onChange={(e) => setFormData({ ...formData, car: e.target.value})}
                />
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
                <input 
                    type="date"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value})}
                />
                <input 
                    type="time"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value})}
                />
                <textarea
                    rows={4}
                    placeholder='Any special instructions or notes?'
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none resize-none"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value})}
                />

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