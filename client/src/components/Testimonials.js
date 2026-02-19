import { useEffect, useState } from "react";
import TestimonialCard from "./Testimonial-card";
import { Star, Users } from 'lucide-react';

function Testimonials() {
  const [featuredReviews, setFeaturedReviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/reviews/featured`)
      .then(res => res.json())
      .then(data => setFeaturedReviews(data))
      .catch(err => console.error("Failed to load featured reviews", err));
  }, []);

  const staticReviews = [
    {
      name: "Tala L.",
      quote: "My car looked better than brand new! Amazing job by the team.",
    },
    {
      name: "Olivia M.",
      quote: "The deluxe package is WORTH IT. Rayan and Tareq pay absolute attention to detail. I highly recommend them!",
    },
    {
      name: "Jason C.",
      quote: "Feels like I got a brand new car after the detail I got from Tareq and Rayan. I highly recommend you try their packages.",
    },
    {
      name: "Steven J.",
      quote: "Nothing is better than their customer service. I had a last minute emergency and they adjusted accordingly.",
    },
    {
      name: "Kayla M.",
      quote: "I have been a returning customer for about 5 months now! I never had any concerns with their detailing.",
    },
  ];

  return (
    <section className="bg-black py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20" data-aos="fade-up">
          <div className="max-w-2xl text-left md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Users className="w-3 h-3" />
              Wall of Love
            </div>
            <h2 className="text-5xl font-extrabold text-white tracking-tight mb-4">
              Why Our Clients <span className="text-purple-500">Trust Us</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Real feedback from real customers across London. Join our growing community of satisfied vehicle owners.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-1 text-yellow-500 mb-2">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 fill-yellow-500" />)}
            </div>
            <span className="text-white font-bold text-xl leading-none">5.0 / 5.0 Rating</span>
          </div>
        </div>

        {/* Grid container for testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticReviews.map((r, i) => (
            <TestimonialCard
              key={i}
              name={r.name}
              quote={r.quote}
              image={`https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=4C1D95&color=fff&bold=true`}
              delay={i * 100}
            />
          ))}

          {featuredReviews.map((r, i) => (
            <TestimonialCard
              key={r.id || i}
              name={r.name}
              quote={r.review}
              image={`https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=6366f1&color=fff&bold=true`}
              delay={(staticReviews.length + i) * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
