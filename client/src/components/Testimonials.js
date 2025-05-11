import { useEffect, useState } from "react";
import TestimonialCard from "./Testimonial-card";

function Testimonials() {
  const [featuredReviews, setFeaturedReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/reviews/featured')
      .then(res => res.json())
      .then(data => setFeaturedReviews(data))
      .catch(err => console.error("Failed to load featured reviews", err));
  }, []);

  return (
    <section className="bg-black py-20 px-4">
      <h2 className="text-4xl font-bold text-center text-white mb-12">What Our Clients Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            name: "Tala L.",
            quote: "My car looked better than brand new! Amazing job by the team.",
          },
          {
            name: "Olivia M.",
            quote:
              "The deluxe package is WORTH IT. Rayan and Tareq pay absolute attention to detail. I highly recommend them!",
          },
          {
            name: "Jason C.",
            quote:
              "Feels like I got a brand new car after the detail I got from Tareq and Rayan. I highly recommend you try their packages, 100% worth it!",
          },
          {
            name: "Steven J.",
            quote:
              "Nothing is better than their customer service. I had a last minute emergency and they adjusted accordingly. I truly appreciate their attention to detail. Highly recommended!",
          },
          {
            name: "Kayla M.",
            quote:
              "I have been a returning customer for about 5 months now! I never had any concerns with their detailing. Tareq and Rayan are great detailers. I definitely recommend them to anyone.",
          },
        ].map((r, i) => (
          <TestimonialCard
            key={i}
            name={r.name}
            quote={r.quote}
            image={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              r.name
            )}&background=4C1D95&color=fff`}
            animate="fade-left"
            delay={i * 100}
          />
        ))}

        {featuredReviews.map((r, i) => (
          <TestimonialCard
            key={r._id}
            name={r.name}
            quote={r.review}
            image={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              r.name
            )}&background=4C1D95&color=fff`}
            animate="fade-left"
            delay={(i + 5) * 100} 
          />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;