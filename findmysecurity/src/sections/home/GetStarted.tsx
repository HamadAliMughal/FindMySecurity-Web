"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import AnimateOnScrollProvider from "@/sections/components/animation/AnimateOnScrollProvider";

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
  const [animationType, setAnimationType] = useState("fade-left");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setAnimationType("fade-up");
      } else {
        setAnimationType("fade-left");
      }
    };

    // Run once on mount
    handleResize();

    // Listen for resize changes
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 py-24 px-4 md:px-16 overflow-x-hidden">
      <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-20 leading-snug">
        It's{" "}
        <span className="text-indigo-500 font-bold">Easy</span> and{" "}
        <span className="text-emerald-600 font-bold">Free</span> to Get Started With{" "}
        <span className="inline-block bg-black text-white px-3 py-1 rounded-full shadow-md">
          FindMySecurity
        </span>
      </h2>

      <AnimateOnScrollProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-13 relative z-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              data-aos={animationType}
              data-aos-delay={index * 150}
              data-aos-duration="800"
            >
              <div className="flex justify-center mb-4">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
                {category.title}
              </h3>

              <ul className="space-y-4 text-sm text-gray-700">
                {category.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start space-x-3">
                    <span className="min-w-[28px] h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-semibold shadow-sm">
                      {stepIndex + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </AnimateOnScrollProvider>
    </section>
  );
};

export default GetStarted;






// "use client";

// import React from "react";
// import { Sparkles } from "lucide-react";
// import AnimateOnScrollProvider from "@/sections/components/animation/AnimateOnScrollProvider";

// interface Category {
//   title: string;
//   steps: string[];
// }

// const categories: Category[] = [
//   {
//     title: "Security Professionals",
//     steps: [
//       "Sign up & create your profile",
//       "Set your availability & showcase your experience",
//       "Browse & apply for jobs via the Job Board",
//       "Receive messages directly from employers",
//     ],
//   },
//   {
//     title: "Security Companies",
//     steps: [
//       "Sign up & build your company profile",
//       "Search for security professionals",
//       "Post Free jobs",
//       "Offer services to businesses",
//       "Send & receive messages to manage recruitment & services",
//     ],
//   },
//   {
//     title: "Training Providers",
//     steps: [
//       "Sign up & register your organisation",
//       "Post and promote your training courses",
//       "Offer packages to security professionals & companies",
//       "Increase your visibility across the platform",
//     ],
//   },
//   {
//     title: "Businesses",
//     steps: [
//       "Sign up & create your business profile",
//       "Hire security professionals, companies & training providers",
//       "Post job requirements or service needs",
//       "Communicate easily with providers via messaging",
//     ],
//   },
// ];

// const GetStarted: React.FC = () => {
//   return (
//     <section className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 py-24 px-4 md:px-16">
//       <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-20 leading-snug">
//         It's{" "}
//         <span className="text-indigo-500 font-bold">Easy</span> and{" "}
//         <span className="text-emerald-600 font-bold">Free</span> to Get Started With{" "}
//         <span className="inline-block bg-black text-white px-3 py-1 rounded-full shadow-md">
//           FindMySecurity
//         </span>
//       </h2>

//       <AnimateOnScrollProvider>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-13 relative z-10">
//           {categories.map((category, index) => (
//             <div
//               key={index}
//               className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-6 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
//               data-aos="fade-left"
//               data-aos-delay={index * 150} // delay each for staggered effect
//               data-aos-duration="800"
//             >
//               <div className="flex justify-center mb-4">
//                 <Sparkles className="h-6 w-6 text-indigo-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
//                 {category.title}
//               </h3>

//               <ul className="space-y-4 text-sm text-gray-700">
//                 {category.steps.map((step, stepIndex) => (
//                   <li key={stepIndex} className="flex items-start space-x-3">
//                     <span className="min-w-[28px] h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-semibold shadow-sm">
//                       {stepIndex + 1}
//                     </span>
//                     <p className="leading-relaxed">{step}</p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </AnimateOnScrollProvider>
//     </section>
//   );
// };

// export default GetStarted;





