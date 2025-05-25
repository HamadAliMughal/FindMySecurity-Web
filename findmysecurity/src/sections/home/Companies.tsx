"use client";

import Image from "next/image";
import AnimateOnScrollProvider from "@/sections/components/animation/AnimateOnScrollProvider";

const securityCompanies = [
  { name: "All4 security Ltd", src: "/pro-icons/All4-security-Ltd.jpg" },
  { name: "CERBERUS GLOBAL LOGO", src: "/pro-icons/CERBERUS-GLOBAL-LOGO.jpg" },
  { name: "CONCEPT SECURITY & INVESTIGATIONS", src: "/pro-icons/CONCEPT-SECURITY-&-INVESTIGATIONS.png" },
  { name: "Convergent Group Solutions Ltd", src: "/pro-icons/Convergent-Group-Solutions-Ltd.png" },
  { name: "CROWNOX", src: "/pro-icons/CROWNOX.svg" },
  { name: "D&J SECURITY SERVICES LTD", src: "/pro-icons/D&J-SECURITY-SERVICES-LTD.jpg" },
  { name: "EKS security & CCTV", src: "/pro-icons/EKS-security-&-CCTV.png" },
  { name: "Empire Security SOLUTIONS LTD", src: "/pro-icons/Empire-Security-SOLUTIONS-LTD.jpg" },
  { name: "Event Support uk", src: "/pro-icons/Event-Support-uk.png" },
  { name: "Fenris Security Solutions", src: "/pro-icons/Fenris-Security-Solutions.avif" },
  { name: "FISHER SECURITY & CONSULTING", src: "/pro-icons/FISHER-SECURITY-&-CONSULTING.jpg" },
  { name: "jooble.png", src: "/pro-icons/jooble.png" },
  { name: "Mas Security Solutions Group", src: "/pro-icons/Mas-Security-Solutions-Group.jpg" },
  { name: "MCGEE & DURRANI CONSULTING FIRM.webp", src: "/pro-icons/MCGEE-&-DURRANI-CONSULTING-FIRM.webp" },
  { name: "MinSec", src: "/pro-icons/minsec.jpg" },
  { name: "NORVIC GUARDS SECURITY", src: "/pro-icons/NORVIC-GUARDS-SECURITY.png" },
  { name: "NSB GLOBAL ENTERPRISE LTD", src: "/pro-icons/NSB-GLOBAL-ENTERPRISE-LTD.png" },
  { name: "ONSEC FM LTD", src: "/pro-icons/ONSEC-FM-LTD.png" },
  { name: "PAK SECURITY SERVICES", src: "/pro-icons/PAK-SECURITY-SERVICES.png" },
  { name: "PHOENIX SECURITY", src: "/pro-icons/PHOENIX-SECURITY.png" },
  { name: "PSTC Group", src: "/pro-icons/PSTC-Group.avif" },
  { name: "SAFEDUTY", src: "/pro-icons/SAFEDUTY.png" },
  { name: "security global", src: "/pro-icons/security-global.png" },
  { name: "Streetwise Security Services", src: "/pro-icons/Streetwise-Security-Services.svg" },
  { name: "Total Task Consultansy", src: "/pro-icons/Total-Task-Consultansy.webp" },
];
// TrustedCompanies
const TrustedCompanies = () => {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-10 my-20 flex flex-col items-center text-center">
<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black tracking-tight animate-fade-in">
  Trusted Worldwide to Achieve<br className="hidden sm:inline" /> Operational Excellence
</h1>


      <AnimateOnScrollProvider>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 max-w-7xl">
          {securityCompanies.map((company, index) => (
            <div
              key={index}
              className="w-auto h-40 flex items-center justify-center"
              data-aos="fade-up"
            >
              <Image
                src={company.src}
                alt={company.name}
                width={100}
                height={60}
                className="object-contain max-h-full"
              />
            </div>
          ))}
        </div>
      </AnimateOnScrollProvider>
    </section>
  );
};

export default TrustedCompanies;




