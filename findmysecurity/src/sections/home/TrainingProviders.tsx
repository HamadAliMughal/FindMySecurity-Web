"use client";
import Image from "next/image";
import SearchComponent from "./SearchComponent";
import Link from 'next/link';
import lookingForData from "@/sections/data/training_providers.json";
import searchData from "@/sections/data/hero_section.json";
import AnimateOnScrollProvider from "@/sections/components/animation/AnimateOnScrollProvider";

const features = [
  { title: "SIA Licence Courses", image: "/providers/SIA Licence Courses.jpg" },
  { title: "Specialist & Advanced Training", image: "/providers/Specialist & Advance Training.jpg" },
  { title: "First Aid & Emergency Training", image: "/providers/First Aid & Emergency Training.jpg" },
  { title: "Transport & Maritime Security Training", image: "/providers/Transport & Maritime Security Training.jpeg" },
  { title: "Advanced Intelligence & Technical Serveillance Training", image: "/providers/Advance Intelligence and Technical Serveillance Training.jpg" },
  { title: "Corporate & In-House Training", image: "/providers/Corporate & In-House Training.jpg" },
  { title: "Public Safety & Law Enforcement Training", image: "/providers/Public Safety & Law enforcement Training.jpg" },
  { title: "Technical & Control Room Training", image: "/providers/Technical & Control room Training.jpg" },
  { title: "Online & E-learning Courses", image: "/providers/Online & E-learning courses.jpg" },
  { title: "Trainer & Assessor Certification", image: "/providers/Traineer & accessor certification.jpg" },
];

export default function TrainingProviders({ initialSearchMode = "basic" }: { initialSearchMode?: "basic" | "advanced" }) {
  
  const handleSearchSubmit = (searchValues: any) => {
    console.log("Search submitted with values:", searchValues);
    // Handle the search submission logic, e.g., make API requests or filter results.
  };

  return (
    <section
    className="py-10 relative"// Change this path
    >
      {/* Background Video */}
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-60"
      >
        <source src="/videos/front.mp4" type="video/mp4" />
        {/* <source src="/videos/background.webm" type="video/webm" /> */}
        Your browser does not support the video tag.
      </video>
    </div>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
      <h1 className="text-4xl font-extrabold text-gray-900">
        FindMySecurity
      </h1>
      <h2 className="text-4xl font-extrabold text-gray-900">
        Training Providers
      </h2>
    </div>

    <AnimateOnScrollProvider>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-13 relative z-10" data-aos="fade-up">
              <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 py-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 justify-center">

{features.map((feature, index) => (
  <Link
    key={index}
    href={`/course-provider?sr=${encodeURIComponent(feature.title)}`}
    className="flex flex-col items-center w-full max-w-[13rem]"
  >
    {/* Image Container with Fixed Aspect Ratio */}
    <div className="relative w-full aspect-[4/3] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 group" data-aos="fade-up">
      <Image
        src={feature.image}
        alt={feature.title}
        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
        fill
      />

      {/* Overlay - Desktop Only */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-75 transition-opacity duration-500 flex items-center justify-center text-center px-2 md:flex hidden"
        style={{ zIndex: 10 }}
      >
        <h3 className="text-white text-sm font-semibold">
          {feature.title}
        </h3>
      </div>
    </div>

    {/* Text Below Image - Mobile Only */}
    <h3 className="mt-3 text-center text-white text-sm font-semibold md:hidden px-1 min-h-[2rem]">
      {feature.title}
    </h3>
  </Link>
))}

                </div>
              </div>
        {/* Search Component */}
        <div className="flex justify-center w-full mt-10">
          <SearchComponent
            lookingForData={lookingForData}
            searchData={searchData}
            title="Training Providers"
            onSearchSubmit={handleSearchSubmit} // Pass the callback to handle the submit
            searchMode={initialSearchMode} // Pass the searchMode prop to SearchComponent
            hideExperienceField={true} 
          />
        </div>
      </div>
          </AnimateOnScrollProvider>
      
    </section>
  );
}
