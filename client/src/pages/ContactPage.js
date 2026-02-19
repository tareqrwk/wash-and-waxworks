import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, Star, Sparkles, CheckCircle2 } from 'lucide-react';

function ContactPage() {
    // Change tab title for page
    useEffect(() => {
        document.title = "Wash&WaxWorks | Contact"
    }, []);

    // State to manage contact form data
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    // State to manage review form data
    const [reviewData, setReviewData] = useState({ name: "", review: "" });
    const [isSubmittingContact, setIsSubmittingContact] = useState(false);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    // Handle changes in the contact form inputs
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle contact form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            return alert("Please enter all required fields.");
        }

        setIsSubmittingContact(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            alert(data.message || "Message sent successfully!");
            setForm({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmittingContact(false);
        }
    };

    // Handle review form submission
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!reviewData.name || !reviewData.review) return alert("Please fill out all fields");

        setIsSubmittingReview(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/review`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        })
            .then(res => res.json())
            .then(() => {
                alert('✅ Review submitted!');
                setReviewData({ name: '', review: '' });
            })
            .catch(() => alert('❌ Failed to submit review.'))
            .finally(() => setIsSubmittingReview(false));
    };

    const InfoCard = ({ icon: Icon, title, content }) => (
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all group">
            <div className="p-3 rounded-xl bg-purple-600/10 text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-zinc-400 text-sm font-medium mb-1">{title}</h3>
                <p className="text-white font-semibold">{content}</p>
            </div>
        </div>
    );

    return (
        <section className="min-h-screen bg-black text-white px-4 py-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20" data-aos="fade-down">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                        Get In Touch
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Have questions about our services or want to book a custom detail? Our team is ready to help you restore your vehicle to its best condition.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                    {/* Left Column - Contact Info */}
                    <div className="lg:col-span-5 space-y-6" data-aos="fade-right">
                        <div className="space-y-6 mb-12">
                            <InfoCard icon={Mail} title="Email Us" content="washnwaxworks@gmail.com" />
                            <InfoCard icon={Phone} title="Call Us" content="(226) 700-5701 / (226) 973-7286" />
                            <InfoCard icon={MapPin} title="Our Base" content="London, ON (Mobile Service)" />
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/20 backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                <Sparkles className="w-20 h-20" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <CheckCircle2 className="text-purple-400" />
                                Premium Quality
                            </h2>
                            <p className="text-zinc-300 leading-relaxed italic">
                                "100% Satisfaction Guaranteed. We treat every vehicle as if it were our own, ensuring meticulous attention to detail."
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="lg:col-span-7" data-aos="fade-left">
                        <form onSubmit={handleSubmit} className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        className="w-full p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-all placeholder:text-zinc-700 font-medium"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        className="w-full p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-all placeholder:text-zinc-700 font-medium"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">How can we help?</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    placeholder="Tell us about your vehicle and the service you're interested in..."
                                    className="w-full p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-all resize-none placeholder:text-zinc-700 font-medium"
                                    value={form.message}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmittingContact}
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] disabled:opacity-50"
                            >
                                {isSubmittingContact ? 'Sending...' : 'Send Message'}
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Review Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-aos="fade-up">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 font-bold text-sm uppercase tracking-wider mb-6">
                            <Star className="w-4 h-4 fill-purple-400" />
                            Client Feedback
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Loved your service?</h2>
                        <p className="text-zinc-400 text-lg mb-8 max-w-lg">
                            Your review helps us grow and serve you better. Share your experience with the community and let others know what they can expect from Wash&WaxWorks.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-black bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <div className="flex text-yellow-500">
                                    <Star className="w-4 h-4 fill-yellow-500" />
                                    <Star className="w-4 h-4 fill-yellow-500" />
                                    <Star className="w-4 h-4 fill-yellow-500" />
                                    <Star className="w-4 h-4 fill-yellow-500" />
                                    <Star className="w-4 h-4 fill-yellow-500" />
                                </div>
                                <span className="text-xs text-zinc-500 font-bold uppercase tracking-tighter">Verified Customers</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleReviewSubmit} className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl space-y-4">
                        <h3 className="text-xl font-bold text-purple-400 mb-2 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Leave a Review
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="w-full p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-all placeholder:text-zinc-700 font-medium"
                                value={reviewData.name}
                                onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                            />
                            <textarea
                                name="review"
                                rows="4"
                                placeholder="How was your experience?"
                                className="w-full p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 focus:border-purple-500 focus:outline-none transition-all resize-none placeholder:text-zinc-700 font-medium"
                                value={reviewData.review}
                                onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
                            />
                            <button
                                type="submit"
                                disabled={isSubmittingReview}
                                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl border border-zinc-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                                <Star className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ContactPage;
