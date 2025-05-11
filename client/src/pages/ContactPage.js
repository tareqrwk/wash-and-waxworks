import { useState } from "react"; //Import React hook for state management
import { useEffect } from 'react';
function ContactPage(){
    //Change tab title for page
    useEffect(() => {
            document.title = "Wash&WaxWorks | Contact"
    }, []);

    //State to manage contact form data
    const [form, setForm] = useState({name: "", email: "", message: ""});
    //State to manage review form data
    const [reviewData, setReviewData] = useState ({name: "", review:  ""});
    //Handle changes in the contact form inputs
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    //Handle contact form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); //Prevent default form submission behavior

        //Validate required fields
        if (!form.name || !form.email || !form.message){
            alert("Pleast enter all required fields.")
        }

        try{
            //Send contact form data to the server
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form) //Send form data as JSON
            });

            const data = await res.json(); //Parse the server response
            alert(data.message); //Display success message
            setForm({ name: '', email: '', message: ''}); //Reset form fields
        }
        catch (error){
            console.error('Error sending email:', error); //Log errors
            alert('Something went wrong. Please try again.'); //Display error message
        }
    };

    //Handle review form submission
    const handleReviewSubmit = (e) => {
        e.preventDefault(); //Prevent default form submission behavior
        //Validate required fields
        if (!reviewData.name || !reviewData.review) return alert ("Please fill out all fields");

        // Send review data to the server
        fetch('http://localhost:5000/api/review', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reviewData), //Send review data as JSON
        })
            .then(res => res.json())
            .then(() => {
                alert('✅ Review submitted!');
                setReviewData({ name: '', review: '' }); //Reset review form fields
            })
            .catch(() => alert('❌ Failed to submit review.'));
    };

    return (
        <section className="min-h-screen bg-black text-white px-4 py-20">
        {/* Contact section */}
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

            {/* Right Column - Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-800">
                {/* Name input field */}
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={form.name}
                    onChange={handleChange} //Update state on change
                />
                {/* Email input field */}
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                    value={form.email}
                    onChange={handleChange} //Update state on change
                />
                {/* Message textarea */}
                <textarea
                    name="message"
                    rows="5"
                    placeholder="Your Message"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none resize-none"
                    value={form.message}
                    onChange={handleChange} //Update state on change
                />
                {/* Submit button */}
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
            onSubmit={handleReviewSubmit} //Handle review form submission
            className="space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-800"
            >
            {/* Name input field */}
            <h2 className="text-lg font-bold text-purple-400">Leave a Review</h2>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                value={reviewData.name}
                onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
            />
            {/* Review textarea */}
            <textarea
                name="review"
                rows="4"
                placeholder="Your Review"
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none resize-none"
                value={reviewData.review}
                onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
            />
            {/* Submit button */}
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