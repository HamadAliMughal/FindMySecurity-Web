"use client";
import Image from "next/image";
import SearchComponent from "./SearchComponent";
import lookingForData from "@/sections/data/secuirty_services.json";
import searchData from "@/sections/data/hero_section.json";
import AnimateOnScrollProvider from "@/sections/components/animation/AnimateOnScrollProvider";

const features = [
  { title: "Physical Security & Manned Guarding Services", image: "/companies/Physical security & manned guarding Services.jpg" },
  { title: "Specialist Security Services", image: "/companies/Specialist Security Services.jpg" },
  { title: "Serveillance & Monitoring Services", image: "/companies/Serveillance & Monitoring services 1.jpg" },
  { title: "Transport & Maritime Security Services", image: "/companies/Transport & Maritime security.jpg" },
  { title: "Advanced Intelligence & Technical Serveillance Services", image: "/companies/Advanced intelligence & Technical serveillance services.jpg" },
  { title: "Technical &  Network Security Services", image: "/companies/Technical & Network Security Services.jpg" },
  { title: "Public Safety & Law Enforcement Security Services", image: "/companies/Publice Safety & Law enforcement security services.jpg" },
  { title: "Access Control Specialist", image: "/companies/Access Control Specialist 1.jpg" },
  { title: "Private Investigation & Specialist Services", image: "/companies/Private Investigation & Specialist Services.jpg" },
];

export default function SecurityCompanies({ initialSearchMode = "basic" }: { initialSearchMode?: "basic" | "advanced" }) {
  // Define the search submit handler
  
  const handleSearchSubmit = (searchValues: any) => {
    console.log("Search submitted with values:", searchValues);
    // Handle the search submission logic, e.g., make API requests or filter results.
  };

  return (
    <section className="py-10 relative">
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
        Security Companies
      </h2>
    </div>
  
    {/* Feature Grid */}
    <AnimateOnScrollProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-13 relative z-10" data-aos="fade-up">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 justify-center">
            {features.map((feature, index) => (
              <div
                key={index}
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
              </div>
            ))}
          </div>
        </div>
  
        {/* Search Component */}
        <div className="flex justify-center w-full mt-10">
          <SearchComponent
            lookingForData={lookingForData}
            searchData={searchData}
            title="Security Companies"
            onSearchSubmit={handleSearchSubmit}
            searchMode={initialSearchMode}
            hideExperienceField={true}
          />
        </div>
      </div>
    </AnimateOnScrollProvider>
  </section>
  );
}


