"use client";

import React from "react";

interface Testimonial {
  name: string;
  position: string;
  image: string;
  text: string;
  quoteColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: "David Johnson",
    position: "Marketing Manager",
    image: "/images/user1.jpg",
    text: "FindMySecurity made hiring so easy! We found top-tier security professionals in no time.",
    quoteColor: "text-blue-500",
  },
  {
    name: "Michael Smith",
    position: "Product Designer",
    image: "/images/user2.jpg",
    text: "A seamless experience! The platform's efficiency and user-friendliness are unmatched.",
    quoteColor: "text-orange-500",
  },
  {
    name: "Chriss Brown",
    position: "Software Engineer",
    image: "/images/user3.jpg",
    text: "An excellent platform with great features! Finding security solutions was never this simple.",
    quoteColor: "text-purple-500",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-20 px-6 md:px-16">
      {/* Heading */}
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        What Our <span className="text-blue-600">Clients Say</span>
      </h2>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        Discover what professionals, businesses, and security experts have to say about FindMySecurity.
      </p>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 gap-5 max-w-6xl mx-auto">
  {testimonials.map((testimonial, index) => (
    <div 
      key={index} 
      className="bg-white shadow-lg rounded-xl p-8 text-center border border-gray-200 
                 transition-all transform hover:-translate-y-2 hover:shadow-2xl 
                 max-w-xs mx-auto"
    >
      {/* Quote Icon */}
      <div className={`text-8xl font-bold ${testimonial.quoteColor} mb-2`}>&ldquo;</div>
      
      {/* Testimonial Text */}
      <p className="text-gray-700 text-xl italic leading-relaxed mb-4">
        {testimonial.text}
      </p>

      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover shadow-md"
        />
        <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
        <p className="text-sm text-gray-500">{testimonial.position}</p>
      </div>
    </div>
  ))}
</div>


    </section>
  );
};

export default Testimonials;
