"use client";
import Image from "next/image";
import SearchComponent from "./SearchComponent";
import lookingForData from "@/sections/data/secuirty_services.json";
import searchData from "@/sections/data/hero_section.json";

const features = [
  { title: "Physical Security & Manned Guarding Services", image: "/images/sec_companies_pic1.jpg" },
  { title: "Specialist Security Services", image: "/images/sec_companies_pic1.jpg" },
  { title: "Serveillance & Monitoring Services", image: "/images/sec_companies_pic1.jpg" },
  { title: "Transport & Maritime Security Services", image: "/images/sec_companies_pic1.jpg" },
  { title: "Advanced Intelligence & Technical Serveillance Services", image: "/images/sec_companies_pic1.jpg" },
  { title: "Technical &  Network Security Services", image: "/images/sec_companies_pic1.jpg" },
  { title: "Public Safety & Law Enforcement Security Services", image: "/images/sec_companies_pic1.jpg" },
  { title: "Access Control Specialist", image: "/images/sec_companies_pic1.jpg" },
  { title: "Private Investigation & Specialist Services", image: "/images/sec_companies_pic1.jpg" },
];

export default function SecurityCompanies() {
  return (
    <section
      className="py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/sec_companies.jpg')" }} // Change this path
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          FindMySecurity
        </h1>
        <h2 className="text-4xl font-extrabold text-gray-900">
          Security Companies
        </h2>
      </div>

      {/* Feature Grid */}
      <div className="max-w-8xl mx-auto px-10 md:px-20 lg:px-26">
        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className="relative w-68 h-60 bg-white rounded-xl shadow-lg transition-all duration-300 transform  hover:shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
              >
                {/* Image Wrapper with Hidden Overflow */}
                <div className="w-full h-50 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={280}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-800 ease-in-out hover:scale-120"
                  />
                </div>

                {/* Feature Title */}
                <div className="flex-1 flex items-center justify-center px-4 text-center">
                  <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
                </div>
              </div>
              

            );
          })}
          
        <SearchComponent lookingForData={lookingForData} searchData={searchData} title="Security Companies" />
        </div>
        
      </div>
    </section>
  );
}
