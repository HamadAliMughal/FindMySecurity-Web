"use client"; // Required for using useState in Next.js 13+

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Define types for dropdown options
interface SearchOptions {
  lookingFor: string[];
  jobTitle: string[];
  experience: string[];
  location: string[];
}

// Define state type
interface SearchValues {
  lookingFor: string;
  jobTitle: string;
  experience: string;
  location: string;
}

const options: SearchOptions = {
  lookingFor: ["Corporate & Executive Security", "Physical Security & Manned Guarding", "Specialist Security Roles","Surveillance & Monitoring","Cyber Security & Information Security"],
  jobTitle: ["Corporate Security Manager", "Executive Protection Officer", "Travel Risk Manager","Hotel Security Manager","Bank & Financial Institution Security Manager","Data Centre Security Manager"],
  experience: ["1-5 Year", "5-10 Years", "10-15 Years","15+ years"],
  location: [
    // England
    "North East England - Tyne and Wear, Durham, Northumberland, Teesside",
    "North West England - Greater Manchester, Lancashire, Merseyside, Cheshire, Cumbria",
    "Yorkshire and the Humber - West Yorkshire, South Yorkshire, East Riding of Yorkshire, North Yorkshire",
    "East Midlands - Derbyshire, Leicestershire, Lincolnshire, Northamptonshire, Nottinghamshire, Rutland",
    "West Midlands - Birmingham, Coventry, Staffordshire, Warwickshire, Worcestershire, Shropshire, Herefordshire",
    "East of England - Bedfordshire, Cambridgeshire, Essex, Hertfordshire, Norfolk, Suffolk",
    "South East England - Berkshire, Buckinghamshire, East Sussex, Hampshire, Kent, Oxfordshire, Surrey, West Sussex, Isle of Wight",
    "South West England - Bristol, Cornwall, Devon, Dorset, Gloucestershire, Somerset, Wiltshire",
    "Greater London",

    // Scotland
    "Central Belt - Glasgow, Edinburgh, Stirling, Falkirk",
    "Highlands and Islands - Inverness, Isle of Skye, Outer Hebrides, Orkney, Shetland",
    "North East Scotland - Aberdeen, Moray, Aberdeenshire",
    "Southern Scotland - Dumfries and Galloway, Scottish Borders",
    "Western Scotland - Argyll and Bute, Ayrshire, Renfrewshire",

    // Wales
    "North Wales - Anglesey, Conwy, Gwynedd, Wrexham",
    "Mid Wales - Ceredigion, Powys",
    "South West Wales - Pembrokeshire, Carmarthenshire, Swansea",
    "South East Wales - Cardiff, Newport, Monmouthshire, Rhondda Cynon Taf",

    // Northern Ireland
    "Belfast Metropolitan Area - Belfast, Lisburn, Bangor",
    "Causeway Coast and Glens - Coleraine, Ballycastle",
    "Mid-Ulster - Cookstown, Dungannon",
    "South East Ulster - Newry, Armagh",
    "Fermanagh and Omagh - Enniskillen, Omagh",
  ],
};

export default function Hero() {
  const [searchValues, setSearchValues] = useState<SearchValues>({
    lookingFor: "",
    jobTitle: "",
    experience: "",
    location: "",
  });

  const [openDropdown, setOpenDropdown] = useState<keyof SearchValues | "">("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(""); // Close dropdown
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (field: keyof SearchValues, value: string) => {
    setSearchValues((prevValues) => ({ ...prevValues, [field]: value }));
    setOpenDropdown(""); // Close dropdown after selection
  };

  const renderDropdown = (field: keyof SearchValues) => (
    <div
      ref={dropdownRef}
      className="absolute left-0 mt-1 bg-white text-black rounded shadow-lg w-full max-h-40 overflow-y-auto z-50"
    >
      {options[field]
        .filter((option) =>
          option.toLowerCase().includes(searchValues[field].toLowerCase())
        )
        .map((option) => (
          <div
            key={option}
            className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={() => handleSelect(field, option)}
          >
            {option}
          </div>
        ))}
    </div>
  );

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center bg-gray-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />
      </div>

      {/* Search Bar */}
      <div className="flex items-center z-10 space-x-4 bg-gray-300 p-6 rounded-lg">
        {Object.keys(options).map((field, index) => {
          const typedField = field as keyof SearchValues; // Type assertion

          return (
            <div key={typedField} className="relative">
              <input
                type="text"
                placeholder={typedField.replace(/([A-Z])/g, " $1").trim()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg placeholder-white w-48"
                value={searchValues[typedField]}
                onChange={(e) =>
                  setSearchValues({ ...searchValues, [typedField]: e.target.value })
                }
                onFocus={() => setOpenDropdown(typedField)}
              />
              {openDropdown === typedField && renderDropdown(typedField)}
              {index < Object.keys(options).length - 1 && (
                <span className="text-black text-lg">→</span>
              )}
            </div>
          );
        })}

        {/* Circular "GO" Button */}
        <button className="bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold">
          GO
        </button>
      </div>
    </section>
  );
}

// "use client"; // Only needed if you use hooks in Next.js 13+

// import Image from "next/image";

// export default function Hero() {
//   return (
//     <section className="relative w-full h-screen flex items-center justify-center text-center bg-gray-900 text-white">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <Image
//           src="/images/hero-bg.jpg" // Change this to your image
//           alt="Hero Background"
//           layout="fill"
//           objectFit="cover"
//           className="opacity-60"
//         />
//       </div>

//       {/* Content */}
//       <div className="flex items-center z-10 space-x-4 bg-gray-300 p-6 rounded-lg">
//   {/* Search Fields */}
//   <div className="flex items-center space-x-2">
//     <input
//       type="text"
//       placeholder="I am Looking for"
//       className="bg-red-600 text-white px-4 py-2 rounded-lg placeholder-white"
//     />
//     <span className="text-black text-lg">→</span>

//     <input
//       type="text"
//       placeholder="Job Title"
//       className="bg-red-600 text-white px-4 py-2 rounded-lg placeholder-white"
//     />
//     <span className="text-black text-lg">→</span>

//     <input
//       type="text"
//       placeholder="Years of Experience"
//       className="bg-red-600 text-white px-4 py-2 rounded-lg placeholder-white"
//     />
//     <span className="text-black text-lg">→</span>

//     <input
//       type="text"
//       placeholder="Post Code"
//       className="bg-red-600 text-white px-4 py-2 rounded-lg placeholder-white"
//     />
//     <span className="text-black text-lg">→</span>

//     <input
//       type="text"
//       placeholder="Location"
//       className="bg-red-600 text-white px-4 py-2 rounded-lg placeholder-white"
//     />
//   </div>

//   {/* Circular "GO" Button */}
//   <button className="bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold">
//     GO
//   </button>
// </div>

//       {/* <div className="relative z-10 max-w-2xl">
//         <h1 className="text-4xl sm:text-5xl font-bold mb-4">
//           Secure Your Digital World
//         </h1>
//         <p className="text-lg sm:text-xl mb-6">
//           Protect your data with our top-notch security solutions.
//         </p>
//         <a
//           href="#"
//           className="px-6 py-3 bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-300"
//         >
//           Get Started
//         </a>
//       </div> */}
//     </section>
//   );
// }
