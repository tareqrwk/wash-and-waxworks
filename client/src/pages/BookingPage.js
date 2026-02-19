import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    User, Mail, Phone, Car, Calendar, Clock, MapPin,
    MessageSquare, ChevronRight, ChevronLeft, Check,
    Wind, Sparkles, ShieldCheck, Droplets, Layout, Zap
} from 'lucide-react';

const SERVICES = [
    {
        id: "Standard Detail Package",
        name: "Standard Detail Package",
        description: "Complete exterior wash and interior cleaning with leather or upholstery care.",
        icon: <Wind className="w-6 h-6" />,
        price: "$99.99",
        duration: "1-2 Hours"
    },
    {
        id: "Shiny Detail Package",
        name: "Shiny Detail Package",
        description: "Enhanced exterior detail with salt removal, trunk cleaning, and tire shine.",
        icon: <Sparkles className="w-6 h-6" />,
        price: "$149.99",
        duration: "2-3 Hours"
    },
    {
        id: "Platinum Detail Package",
        name: "Platinum Detail Package",
        description: "The ultimate detail including exclusive shampoo, trunk cleaning, and silk protectant.",
        icon: <ShieldCheck className="w-6 h-6" />,
        price: "$199.99",
        duration: "2-3 Hours"
    },
    {
        id: "Standard Interior Detail",
        name: "Standard Interior Detail",
        description: "Thorough interior vacuum, window cleaning, and deep seat cleaning.",
        icon: <Layout className="w-6 h-6" />,
        price: "$74.99",
        duration: "1.5-2 Hours"
    },
    {
        id: "Full Interior Detail",
        name: "Full Interior Detail",
        description: "Premium interior restoration with detailed cleaning/protection and leather conditioning.",
        icon: <Zap className="w-6 h-6" />,
        price: "$174.99",
        duration: "2-3 Hours"
    },
    {
        id: "Quick Wash",
        name: "Quick Wash",
        description: "Fast hand wash and tire cleaning with a quick interior vacuum.",
        icon: <Droplets className="w-6 h-6" />,
        price: "$24.99",
        duration: "45-60 Mins"
    }
];

function BookingPage() {
    useEffect(() => {
        document.title = "Wash&WaxWorks | Book"
    }, []);

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
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

    const [searchParams] = useSearchParams();
    const prefilledService = searchParams.get('service');

    useEffect(() => {
        if (prefilledService) {
            setFormData((prev) => ({ ...prev, service: prefilledService }));
            setCurrentStep(2);
        }
    }, [prefilledService]);

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nextStep = () => {
        if (currentStep === 1 && !formData.service) {
            alert("Please select a service first.");
            return;
        }
        if (currentStep === 2 && (!formData.date || !formData.time || !formData.car || !formData.location)) {
            alert("Please fill in all booking details.");
            return;
        }
        if (currentStep === 3 && (!formData.name || !formData.email || !formData.phone)) {
            alert("Please provide your contact information.");
            return;
        }
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Required Field Check (final step)
        if (!formData.name || !formData.email || !formData.phone) {
            alert("Please fill out your contact information.")
            setIsSubmitting(false);
            return;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address");
            setIsSubmitting(false);
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/api/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                setSubmitted(true);
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
                setTimeout(() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                }, 5000);
            })
            .catch((error) => {
                console.error("Booking failed:", error);
                alert("Something went wrong. Please try again.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }

    const stepLabel = (num, label) => (
        <div className={`flex flex-col items-center z-10 ${currentStep >= num ? 'text-purple-400' : 'text-gray-600'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${currentStep >= num ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' : 'bg-gray-800 text-gray-400'}`}>
                {currentStep > num ? <Check className="w-6 h-6" /> : num}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
        </div>
    );

    if (submitted) {
        return (
            <section className="bg-black min-h-screen flex items-center justify-center p-4">
                <div className="bg-zinc-900 border border-purple-500/30 p-12 rounded-3xl text-center backdrop-blur-xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                        <Check className="text-white w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Awesome!</h2>
                    <p className="text-gray-400 mb-8">Your detailing appointment has been booked. Check your email for confirmation!</p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-all duration-300"
                    >
                        Back to Services
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-black min-h-screen text-white pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        Book Your Shine
                    </h1>
                    <p className="text-gray-400 text-lg">Premium detailing at your doorstep. Fast, reliable, and thorough.</p>
                </div>

                {/* Progress Bar */}
                <div className="relative flex justify-between items-center mb-16 px-4">
                    <div className="absolute top-5 left-0 w-full h-1 bg-gray-800 -z-0"></div>
                    <div
                        className="absolute top-5 left-0 h-1 bg-purple-600 transition-all duration-500 ease-in-out -z-0"
                        style={{ width: `${(currentStep - 1) * 33.33}%` }}
                    ></div>
                    {stepLabel(1, "Service")}
                    {stepLabel(2, "Details")}
                    {stepLabel(3, "Contact")}
                    {stepLabel(4, "Review")}
                </div>

                {/* Form Steps Container */}
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-1 rounded-3xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                    <div className="p-8 flex-grow">
                        {currentStep === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <Sparkles className="text-purple-500" />
                                    Choose Your Package
                                </h2>
                                <div className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-4 scrollbar-hide -mx-2 px-2">
                                    {SERVICES.map((service) => (
                                        <div
                                            key={service.id}
                                            onClick={() => setFormData({ ...formData, service: service.name })}
                                            className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden min-w-[85%] md:min-w-0 snap-center ${formData.service === service.name
                                                ? 'bg-purple-600/20 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.2)]'
                                                : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-3 rounded-xl transition-all duration-300 ${formData.service === service.name ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-gray-400 uppercase group-hover:bg-zinc-700 group-hover:text-purple-400'}`}>
                                                    {service.icon}
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-purple-400 font-bold">{service.price}</div>
                                                    <div className="text-[10px] text-gray-500 uppercase tracking-tighter flex items-center gap-1 mt-1">
                                                        <Clock className="w-3 h-3" />
                                                        {service.duration}
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 transition-colors duration-300 group-hover:text-purple-400">{service.name}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>

                                            {formData.service === service.name && (
                                                <div className="absolute top-2 right-2 bg-purple-600 text-white p-1 rounded-full animate-in zoom-in duration-300">
                                                    <Check className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <Calendar className="text-purple-500" />
                                    When and Where?
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Car Model</label>
                                        <div className="relative">
                                            <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                placeholder="e.g. Tesla Model 3"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-colors"
                                                value={formData.car}
                                                onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                placeholder="e.g. 123 Street, London ON"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-colors"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="date"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-colors [color-scheme:dark]"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Time</label>
                                        <div className="relative">
                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="time"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-colors [color-scheme:dark]"
                                                value={formData.time}
                                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <User className="text-purple-500" />
                                    Almost Done!
                                </h2>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-colors"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-colors"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="tel"
                                                placeholder="(226) 000-0000"
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-colors"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Special Instructions (Optional)</label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                                            <textarea
                                                rows={4}
                                                placeholder='Tell us about specific areas to focus on...'
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                                                value={formData.notes}
                                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <Check className="text-purple-500" />
                                    Review Your Appointment
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <Sparkles className="w-12 h-12" />
                                            </div>
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Service Selection</h3>
                                            <div className="text-xl font-bold mb-1">{formData.service}</div>
                                            <div className="text-purple-400 font-bold">{SERVICES.find(s => s.name === formData.service)?.price}</div>
                                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                                                <Clock className="w-4 h-4" />
                                                <span>Estimated time: {SERVICES.find(s => s.name === formData.service)?.duration}</span>
                                            </div>
                                        </div>

                                        <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Timing & Location</h3>
                                            <div className="space-y-3 font-medium">
                                                <div className="flex items-center gap-3 text-gray-200">
                                                    <Calendar className="w-4 h-4 text-purple-500" />
                                                    {formData.date}
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-200">
                                                    <Clock className="w-4 h-4 text-purple-500" />
                                                    {formData.time}
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-200">
                                                    <MapPin className="w-4 h-4 text-purple-500" />
                                                    {formData.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Vehicle & Contact</h3>
                                            <div className="space-y-4 font-medium">
                                                <div className="flex items-center gap-3">
                                                    <Car className="w-4 h-4 text-purple-500" />
                                                    <span className="text-gray-400 px-2 py-0.5 bg-zinc-900 rounded-md text-sm">{formData.car}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <User className="w-4 h-4 text-purple-500" />
                                                    {formData.name}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Mail className="w-4 h-4 text-purple-500" />
                                                    {formData.email}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Phone className="w-4 h-4 text-purple-500" />
                                                    {formData.phone}
                                                </div>
                                            </div>
                                        </div>

                                        {formData.notes && (
                                            <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800">
                                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Special Instructions</h3>
                                                <p className="text-gray-400 text-sm italic italic leading-relaxed">"{formData.notes}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Bar */}
                    <div className="bg-zinc-950/80 p-6 flex justify-between items-center border-t border-zinc-800">
                        {currentStep > 1 ? (
                            <button
                                onClick={prevStep}
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-4 py-2"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Back
                            </button>
                        ) : <div></div>}

                        {currentStep < 4 ? (
                            <button
                                onClick={nextStep}
                                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-10 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]"
                            >
                                Continue
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold px-12 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
                                <ShieldCheck className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Duration Disclaimer */}
                <p className="mt-6 text-center text-sm text-gray-500 italic max-w-2xl mx-auto px-4">
                    * Please note: Service completion times are estimates and may vary depending on the vehicle's size and condition.
                </p>

                {/* Summary Info (Steps 1-3 only) */}
                {formData.service && currentStep < 4 && (
                    <div className="mt-8 flex justify-center animate-in fade-in duration-700">
                        <div className="inline-flex items-center gap-6 px-8 py-3 bg-zinc-900/30 border border-zinc-800 rounded-full text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Sparkles className="w-4 h-4 text-purple-500" />
                                <span className="font-bold text-white uppercase">{formData.service}</span>
                            </div>
                            {formData.date && (
                                <div className="flex items-center gap-2 text-gray-400 border-l border-zinc-800 pl-6">
                                    <Calendar className="w-4 h-4 text-purple-500" />
                                    <span className="font-bold text-white italic">{formData.date} at {formData.time}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default BookingPage;
