"use client";

import { useState, useEffect, useRef } from "react";
import { FaSearch, FaChevronDown, FaFilter } from "react-icons/fa";
import Image from "next/image";

interface SearchOptions {
  lookingFor: string[];
  jobTitle: string[];
  experience: string[];
  location: string[];
}

interface SearchValues {
  lookingFor: string;
  jobTitle: string;
  experience: string;
  location: string;
  postcode: string;
}

const options: SearchOptions = {
  lookingFor: [
    "Corporate & Executive Security",
    "Physical Security & Manned Guarding",
    "Specialist Security Roles",
    "Surveillance & Monitoring",
    "Cyber Security & Information Security",
  ],
  jobTitle: [
    "Corporate Security Manager",
    "Executive Protection Officer",
    "Travel Risk Manager",
    "Hotel Security Manager",
    "Bank & Financial Institution Security Manager",
    "Data Centre Security Manager",
  ],
  experience: ["1-5 Years", "5-10 Years", "10-15 Years", "15+ Years"],
  location: [
    "North East England - Tyne and Wear, Durham, Northumberland, Teesside",
    "North West England - Greater Manchester, Lancashire, Merseyside, Cheshire, Cumbria",
    "Yorkshire and the Humber - West Yorkshire, South Yorkshire, East Riding of Yorkshire, North Yorkshire",
    "East Midlands - Derbyshire, Leicestershire, Lincolnshire, Northamptonshire, Nottinghamshire, Rutland",
    "West Midlands - Birmingham, Coventry, Staffordshire, Warwickshire, Worcestershire, Shropshire, Herefordshire",
    "Greater London",
    "Scotland - Glasgow, Edinburgh, Aberdeen, Highlands",
    "Wales - Cardiff, Newport, Swansea",
    "Northern Ireland - Belfast, Derry, Armagh",
  ],
};

// Utility function to truncate text to a fixed length
const truncateText = (text: string, maxLength: number = 20) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function Hero() {
  const [searchValues, setSearchValues] = useState<SearchValues>({
    lookingFor: "",
    jobTitle: "",
    experience: "",
    location: "",
    postcode: "",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<keyof SearchOptions | "">("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (field: keyof SearchOptions, value: string) => {
    setSearchValues((prevValues) => ({ ...prevValues, [field]: value }));
    setOpenDropdown("");
  };

  const renderDropdown = (field: keyof SearchOptions) => (
    <div
      ref={dropdownRef}
      className="absolute left-0 mt-1 bg-white text-black rounded shadow-lg w-full max-h-40 overflow-y-auto z-50 border border-gray-300"
    >
      {options[field].map((option) => (
        <div
          key={option}
          className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm transition duration-300"
          onClick={() => handleSelect(field, option)}
        >
          {option}
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white px-4 md:px-8">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>

      <div className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">Find My Security</h2>

        {/* Basic Search */}
        {!showAdvanced && (
          <div className="mt-3 flex flex-col sm:flex-row gap-4">
            <div className="relative w-full">
              <div
                className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 min-w-0"
                onClick={() => setOpenDropdown("lookingFor")}
              >
                <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis w-full">
                  {truncateText(searchValues.lookingFor || "Looking For")}
                </span>
                <FaChevronDown className="ml-auto" />
              </div>
              {openDropdown === "lookingFor" && renderDropdown("lookingFor")}
            </div>

            <div className="relative w-full sm:w-auto">
              <div
                className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 min-w-0"
                onClick={() => setOpenDropdown("location")}
              >
                <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis w-full">
                  {truncateText(searchValues.location || "Location")}
                </span>
                <FaChevronDown className="ml-auto" />
              </div>
              {openDropdown === "location" && renderDropdown("location")}
            </div>

            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-bold flex justify-center items-center gap-2 hover:shadow-lg transition duration-300">
               Go
            </button>
          </div>
        )}

        {/* Advanced Search */}
        {showAdvanced && (
          <div className="mt-3 flex flex-col sm:flex-row flex-wrap gap-4 items-center">
            {Object.keys(options).map((field) => {
              const typedField = field as keyof SearchOptions;
              return (
                <div key={typedField} className="relative w-full sm:flex-1">
                  <div
                    className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 w-full"
                    onClick={() => setOpenDropdown(typedField)}
                  >
                    <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis w-full">
                      {truncateText(searchValues[typedField] || typedField.replace(/([A-Z])/g, " $1").trim())}
                    </span>
                    <FaChevronDown className="ml-auto" />
                  </div>
                  {openDropdown === typedField && renderDropdown(typedField)}
                </div>
              );
            })}

            {/* Search Button */}
            <button className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-bold flex justify-center items-center gap-2 hover:shadow-lg transition duration-300">
              Go
            </button>
          </div>
        )}

        {/* Toggle Button */}
        <button
          className="flex items-center gap-2 mt-3 md:mt-1  px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <FaFilter />
          {showAdvanced ? "Basic Search" : "Advanced Search"}
        </button>
      </div>
    </section>
  );
}