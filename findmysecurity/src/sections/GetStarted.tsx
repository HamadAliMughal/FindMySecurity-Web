"use client";

import React from "react";

interface Category {
  title: string;
  steps: string[];
}

const categories: Category[] = [
  {
    title: "Security Professionals",
    steps: [
      "Sign up & create your profile",
      "Set your availability & showcase your experience",
      "Browse & apply for jobs via the Job Board",
      "Receive messages directly from employers",
    ],
  },
  {
    title: "Security Companies",
    steps: [
      "Sign up & build your company profile",
      "Search for security professionals",
      "Post Free jobs",
      "Offer services to businesses",
      "Send & receive messages to manage recruitment & services",
    ],
  },
  {
    title: "Training Providers",
    steps: [
      "Sign up & register your organisation",
      "Post and promote your training courses",
      "Offer packages to security professionals & companies",
      "Increase your visibility across the platform",
    ],
  },
  {
    title: "Businesses",
    steps: [
      "Sign up & create your business profile",
      "Hire security professionals, companies & training providers",
      "Post job requirements or service needs",
      "Communicate easily with providers via messaging",
    ],
  },
];

const GetStarted: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-gray-300 py-30 px-6 md:px-16">
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 mb-20 leading-snug">
        It's <span className="text-gray-500">Easy</span> and{" "}
        <span className="text-gray-700">Free</span> to Get Started With{" "}
        <span className="bg-gray-900 text-white px-3 py-1 rounded-md shadow-md">
          FindMySecurity
        </span>
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-20">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative bg-white text-gray-900 shadow-lg rounded-2xl p-8 border border-gray-200 transition-all transform hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Category Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{category.title}</h3>

            {/* Steps List */}
            <ul className="text-gray-600 text-sm space-y-4">
              {category.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start space-x-4">
                  {/* Step Number */}
                  <span className="flex items-center justify-center p-2 bg-gray-900 text-white font-bold text-sm">
                    {stepIndex + 1}
                  </span>
                  {/* Step Text */}
                  <p className="leading-relaxed">{step}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetStarted;

