import { useEffect, useState } from "react"; //Import React hooks
import TestimonialCard from "./Testimonial-card";

//Functional component to render the "Testimonials" section
function Testimonials() {
  //State to store featured reviews fetched from the API
  const [featuredReviews, setFeaturedReviews] = useState([]);

  //Fetch featured reviews from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/reviews/featured')
      .then(res => res.json())
      .then(data => setFeaturedReviews(data))
      .catch(err => console.error("Failed to load featured reviews", err));
  }, []);

  return (
    <section className="bg-black py-20 px-4">
      {/* Section title */}
      <h2 className="text-4xl font-bold text-center text-white mb-12">What Our Clients Say</h2>
      {/* Grid container for testimonial cards */}
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
            key={i} //Unique key for each testimonial
            name={r.name} //Client's name
            quote={r.quote} //Client's testimonial
            image={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              r.name
            )}&background=4C1D95&color=fff`} //Generate avatar image dynamically
            animate="fade-left" //Animation type
            delay={i * 100} //Animation delay based on index
          />
        ))}

        {/* Dynamically fetched featured reviews */}
        {featuredReviews.map((r, i) => (
          <TestimonialCard
            key={r._id} //Unique key from the API data
            name={r.name} //Client's name from the API
            quote={r.review} //Client's review from the API
            image={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              r.name
            )}&background=4C1D95&color=fff`} //Generate avatar image dynamically
            animate="fade-left" //Animation type
            delay={(i + 5) * 100} //Animation delay based on index
          />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;