import {useState} from "react";

function ContactPage(){
    const [form, setForm] = useState({name: "", email: "", message: ""});
    const [reviewData, setReviewData] = useState ({name: "", review:  ""});
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.message){
            alert("Pleast enter all required fields.")
        }

        try{
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            alert(data.message);
            setForm({ name: '', email: '', message: ''});
        }
        catch (error){
            console.error('Error sending email:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!reviewData.name || !reviewData.review) return alert ("Please fill out all fields");
        fetch('http://localhost:5000/api/review', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reviewData),
        })
            .then(res => res.json())
            .then(() => {
                alert('✅ Review submitted!');
                setReviewData({ name: '', review: '' });
            })
            .catch(() => alert('❌ Failed to submit review.'));
    };

    return (
        <section className="min-h-screen bg-black text-white px-4 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-12" data-aos="fade-up">
            {/* Left Column - Info */}
            <div>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-300 mb-6">
                Have questions or want to book a service? Reach out to us!
            </p>
            <ul className="space-y-4">
                <li><strong>Email:</strong> washnwaxworks@gmail.com</li>
                <li><strong>Phone:</strong> (226) 700-5701 or (226) 973-7286</li>
                <li><strong>Location:</strong> London, ON</li>
            </ul>
            </div>

            {/* Right Column - Form */}
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-800">
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                value={form.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                value={form.email}
                onChange={handleChange}
            />
            <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none resize-none"
                value={form.message}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-900 px-6 py-2 rounded-xl transition font-semibold"
            >
                Send Message
            </button>
            </form>
        </div>

        {/* Bottom Section: Review Prompt + Review Form */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up">
            {/* Encouragement Box */}
            <div className="bg-purple-800/10 border border-purple-700 rounded-xl px-6 py-4 text-xl font-bold text-purple-300 text-center shadow w-fit max-w-full mx-auto">
                <p>
                    Loved your service? Let others know! Your review helps us grow
                    and serve you better.
                </p>
            </div>
            {/* Review Form */}
            <form
            onSubmit={handleReviewSubmit}
            className="space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-800"
            >
            <h2 className="text-lg font-bold text-purple-400">Leave a Review</h2>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                value={reviewData.name}
                onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
            />
            <textarea
                name="review"
                rows="4"
                placeholder="Your Review"
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none resize-none"
                value={reviewData.review}
                onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
            />
            <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-900 px-6 py-2 rounded-xl transition font-semibold"
            >
                Submit Review
            </button>
            </form>
        </div>
        </section>
    );
}

export default ContactPage;