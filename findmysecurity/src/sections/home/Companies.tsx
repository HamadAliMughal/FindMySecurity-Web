import Image from "next/image";

const securityCompanies = [
  { name: "ACS", src: "/images/logo-3.png" },
  { name: "Signal 88 Security", src: "/images/logo-2.png" },
  { name: "Allied Universal", src: "/images/logo-4.png" },
  { name: "G4S", src: "/images/logo-5.png" },
  { name: "Itiguard", src: "/images/logo-6.png" },
  { name: "California Panther Security", src: "/images/logo-7.png" },
  { name: "Buford", src: "/images/logo-11.png" },
  { name: "Industry Security Services", src: "/images/logo-10.png" },
  { name: "SFS", src: "/images/logo-8.png" },
  { name: "Fast Guard", src: "/images/logo-12.png" },
  { name: "GardaWorld", src: "/images/logo-14.png" },
  { name: "GardaWorld", src: "/images/logo-14.png" },
];

const TrustedCompanies = () => {
    return (
        <section className="bg-white px-0 sm:px-6 lg:px-10 my-20 flex flex-col items-center">
          <h1 className="text-center text-2xl font-semibold mb-6">
            Trusted Worldwide To Achieve Operational Excellence
          </h1>
      
          {/* Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {securityCompanies.map((company, index) => (
              <div key={index} className="flex justify-center p-4"> {/* Padding for extra spacing */}
                <Image
                  src={company.src}
                  alt={company.name}
                  width={120}  // Increased size for better spacing
                  height={70}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      );
      
};

export default TrustedCompanies;
