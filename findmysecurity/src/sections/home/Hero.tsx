"use client";
import Image from "next/image";
import lookingForData from "@/sections/data/secuirty_professional.json";
import searchData from "@/sections/data/hero_section.json";
import SearchComponent from "./SearchComponent";

export default function Hero({ initialSearchMode = "basic" }: { initialSearchMode?: "basic" | "advanced" }) {
  
  const handleSearchSubmit = (searchValues: any) => {
    console.log("Search submitted with values:", searchValues);
    // Handle the search submission logic, e.g., make API requests or filter results.
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white px-4 md:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/videos/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="opacity-50"
          priority
        />
      </div> */}

      {/* Content */}
      <div className="relative z-10 flex justify-center w-full my-40">
        <SearchComponent
          lookingForData={lookingForData}
          searchData={searchData}
          title="Professionals"
          onSearchSubmit={handleSearchSubmit} // Pass the callback to handle the submit
          searchMode={initialSearchMode} // Pass the searchMode prop to SearchComponent
        />
      </div>
    </section>
  );
}





// "use client";
// import Image from "next/image";
// import lookingForData from "@/sections/data/secuirty_professional.json";
// import searchData from "@/sections/data/hero_section.json";
// import SearchComponent from "./SearchComponent";

// export default function Hero() {
//   return (
//     <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white px-4 md:px-8">
//       <div className="absolute inset-0">
//         <Image src="/images/hero-bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="opacity-50" />
//       </div>
//       <div className="flex justify-center w-full mt-10">
//       <SearchComponent lookingForData={lookingForData} searchData={searchData} title="Professionals" />
//       </div>
//     </section>
//   );
// }





// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaChevronDown, FaFilter, FaSearch } from "react-icons/fa";
// import Image from "next/image";
// import lookingForData from "@/sections/data/secuirty_professional.json";
// import searchData from "@/sections/data/hero_section.json";
// import useMobileView from "@/sections/hooks/useMobileView";

// interface SearchValues {
//   lookingFor: string;
//   subCategory: string;
//   distance: string;
//   experience: string;
//   location: string;
//   postcode: string;
// }

// export default function Hero() {
//   const [searchValues, setSearchValues] = useState<SearchValues>({
//     lookingFor: "",
//     subCategory: "",
//     distance: "",
//     experience: "",
//     location: "",
//     postcode: "",
//   });

//   const isMobile = useMobileView();
//   const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Handle dropdown selection
//   const handleSelect = (field: keyof SearchValues, value: string) => {
//     setSearchValues((prev) => ({ ...prev, [field]: value }));
//     setOpenDropdown(null);
//   };

//   // Render dropdown options
//   const renderDropdown = (field: keyof SearchValues) => {
//     let options: string[] = [];

//     if (field === "lookingFor") {
//       return (
//         <div ref={dropdownRef} className="absolute top-10 bg-white text-black rounded shadow-lg z-50 border border-gray-300 w-64">
//           {lookingForData.map((category) => (
//             <div
//               key={category.id}
//               className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
//               onClick={() => {
//                 setSearchValues((prev) => ({ ...prev, lookingFor: category.title, subCategory: "" }));
//                 setSelectedMainCategory(category.title);
//                 setOpenDropdown(null);
//               }}
//             >
//               {category.title}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     if (field === "subCategory") {
//       const selectedCategory = lookingForData.find((c) => c.title === selectedMainCategory);
//       options = selectedCategory?.roles || [];
//     }

//     if (field === "distance") {
//       options = searchData.distance; // Assuming `distance` array is in hero_section.json
//     }

//     if (field === "experience") {
//       options = searchData.experience;
//     }

//     if (!options.length) return null;

//     return (
//       <div ref={dropdownRef} className="absolute top-10 bg-white text-black rounded shadow-lg z-50 border border-gray-300 w-64">
//         {options.map((option) => (
//           <div
//             key={option}
//             className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
//             onClick={() => handleSelect(field, option)}
//           >
//             {option}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white px-4 md:px-8">
//       <div className="absolute inset-0">
//         <Image src="/images/hero-bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="opacity-50" />
//       </div>

//       <div className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
//         <h2 className="text-lg font-bold text-gray-800 mb-1">FindMySecurity</h2>

//         {/* Search Fields */}
//         <div className={`${isMobile ? "flex flex-col w-full gap-4" : "flex flex-wrap w-full gap-4 items-center"} `}>

//           {/* Main Category Dropdown */}
//           <div className="relative flex-2">
//             <div
//               className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//               onClick={() => setOpenDropdown("lookingFor")}
//             >
//               {searchValues.lookingFor || "Looking For"}
//               <FaChevronDown className="ml-auto" />
//             </div>
//             {openDropdown === "lookingFor" && renderDropdown("lookingFor")}
//           </div>

//           {/* Subcategory Dropdown (Always Visible) */}
//           <div className="relative flex-2">
//             <div
//               className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//               onClick={() => setOpenDropdown("subCategory")}
//             >
//               {searchValues.subCategory || "Subcategory"}
//               <FaChevronDown className="ml-auto" />
//             </div>
//             {openDropdown === "subCategory" && renderDropdown("subCategory")}
//           </div>

//           {/* Distance (Replaces Job Title) - Only in Advanced Search */}
//           {showAdvanced && (
//             <div className="relative flex-2">
//               <div
//                 className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//                 onClick={() => setOpenDropdown("distance")}
//               >
//                 {searchValues.distance || "Distance"}
//                 <FaChevronDown className="ml-auto" />
//               </div>
//               {openDropdown === "distance" && renderDropdown("distance")}
//             </div>
//           )}

//           {/* Experience (Only in Advanced Search) */}
//           {showAdvanced && (
//             <div className="relative flex-2">
//               <div
//                 className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//                 onClick={() => setOpenDropdown("experience")}
//               >
//                 {searchValues.experience || "Experience"}
//                 <FaChevronDown className="ml-auto" />
//               </div>
//               {openDropdown === "experience" && renderDropdown("experience")}
//             </div>
//           )}

//           {/* Postcode Input Field */}
//           <input
//             type="text"
//             className="flex-1 px-4 py-2 rounded-lg text-black border border-black w-full focus:outline-none focus:ring-2 focus:ring-black"
//             placeholder="Postcode"
//             value={searchValues.postcode}
//             onChange={(e) => setSearchValues({ ...searchValues, postcode: e.target.value })}
//           />

//           {/* Go Button */}
//           <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
//             <FaSearch className="mr-2" />
//             Go
//           </button>
//         </div>

//         {/* Toggle Button for Advanced Search */}
//         <button
//           className="flex items-center px-4 py-2 mt-4 bg-black text-white rounded-lg hover:bg-gray-800"
//           onClick={() => setShowAdvanced(!showAdvanced)}
//         >
//           <FaFilter className="mr-2" />
//           {showAdvanced ? "Basic Search" : "Advanced Search"}
//         </button>
//       </div>
//     </section>
//   );
// }



// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaChevronDown, FaFilter, FaSearch } from "react-icons/fa";
// import Image from "next/image";
// import lookingForData from "@/sections/data/secuirty_professional.json";
// import searchData from "@/sections/data/hero_section.json";
// import useMobileView from "@/sections/hooks/useMobileView";
// interface SearchValues {
//   lookingFor: string;
//   jobTitle: string;
//   experience: string;
//   location: string;
//   postcode: string;
// }

// export default function Hero() {
//   const [searchValues, setSearchValues] = useState<SearchValues>({
//     lookingFor: "",
//     jobTitle: "",
//     experience: "",
//     location: "",
//     postcode: "",
//   });

//   const isMobile = useMobileView();
//   const [selectedLookingFor, setSelectedLookingFor] = useState<string | null>(null);
//   const [selectedMainLocation, setSelectedMainLocation] = useState<string | null>(null);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null);
//         setSelectedMainLocation(null);
//         setSelectedLookingFor(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };

//   }, []);

//   const handleSelect = (field: keyof SearchValues, value: string) => {
//     setSearchValues((prevValues) => ({ ...prevValues, [field]: value }));
//     setOpenDropdown(null);
//   };

//   const handleLocationSelect = (mainLocation: string, subLocation?: string) => {
//     const locationValue = subLocation ? `${mainLocation} - ${subLocation}` : mainLocation;
//     setSearchValues((prevValues) => ({ ...prevValues, location: locationValue }));
//     setOpenDropdown(null);
//     setSelectedMainLocation(null);
//   };

//   const handleLookingForSelect = (category: string, role?: string) => {
//     const lookingForValue = role ? `${category} - ${role}` : category;
//     setSearchValues((prevValues) => ({ ...prevValues, lookingFor: lookingForValue }));
//     setOpenDropdown(null);
//     setSelectedLookingFor(null);
//   };

//   const renderDropdown = (field: keyof SearchValues) => {
//     if (field === "lookingFor") {
//       const selectedCategory = lookingForData.find((c) => c.id === selectedLookingFor);

//       return (
//         <div ref={dropdownRef} className="absolute left-0 top-10 bg-white text-black rounded shadow-lg z-50 border border-gray-300 flex">
//           <div className="w-64 border-r border-gray-300">
//             {lookingForData.map((category) => (
//               <div
//                 key={category.id}
//                 className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
//                 onClick={() => setSelectedLookingFor(category.id)}
//               >
//                 {category.title}
//               </div>
//             ))}
//           </div>

//           {selectedCategory?.roles && selectedCategory.roles.length > 0 && (
//             <div className="w-64">
//               {selectedCategory.roles.map((role) => (
//                 <div
//                   key={role}
//                   className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
//                   onClick={() => handleLookingForSelect(selectedCategory.title, role)}
//                 >
//                   {role}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     }

//     if (field === "location") {
//       const selectedLocation = searchData.location.find((l) => l.id === selectedMainLocation);

//       return (
//         <div ref={dropdownRef} className="absolute left-0 top-10 bg-white text-black rounded shadow-lg z-50 border border-gray-300 flex">
//           <div className="w-64 border-r border-gray-300">
//             {searchData.location.map((location) => (
//               <div
//                 key={location.id}
//                 className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
//                 onClick={() => setSelectedMainLocation(location.id)}
//               >
//                 {location.title}
//               </div>
//             ))}
//           </div>

//           {selectedLocation?.subLocations && selectedLocation.subLocations.length > 0 && (
//             <div className="w-64">
//               {selectedLocation.subLocations.map((subLocation) => (
//                 <div
//                   key={subLocation}
//                   className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
//                   onClick={() => handleLocationSelect(selectedLocation.title, subLocation)}
//                 >
//                   {subLocation}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     }

//     if (field === "jobTitle" || field === "experience") {
//       const options = field === "jobTitle" ? searchData.jobTitles : searchData.experience;

//       return (
//         <div ref={dropdownRef} className="absolute left-0 top-10 bg-white text-black rounded shadow-lg z-50 border border-gray-300 w-64">
//           {options.map((option: string) => (
//             <div
//               key={option}
//               className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
//               onClick={() => handleSelect(field, option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white px-4 md:px-8">
//        <div className="absolute inset-0">
//          <Image src="/images/hero-bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="opacity-50" />
//        </div>

//        <div className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
//         <h2 className="text-lg font-bold text-gray-800 mb-1">FindMySecurity</h2>

//         {/* Search Fields - Full Width Line */}
//         <div className={`${isMobile ? 'flex flex-col w-full gap-4' : 'flex flex-wrap w-full gap-4 items-center'} `}>
//         {/* <div className="flex flex-col w-full gap-4 items-center sm:w-full sm:flex-col md:flex-row"> */}
//         {/* <div className="flex sm:flex-col flex-wrap sm:w-full gap-4"> */}


//           {["lookingFor", "jobTitle", "experience", "location"].map((field) => (
//             (!showAdvanced && field !== "lookingFor") ? null : (
//               <div key={field} className="relative flex-2">
//                 <div
//                   className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//                   onClick={() => setOpenDropdown(field)}
//                 >
//                   {searchValues[field as keyof SearchValues] || `${field}`}
//                   <FaChevronDown className="ml-auto" />
//                 </div>
//                 {openDropdown === field && renderDropdown(field as keyof SearchValues)}
//               </div>
//             )
//           ))}

//           {/* Postcode as Input Field */}
//           <input
//             type="text"
//             className="flex-1 px-4 py-2 rounded-lg text-black border border-black w-full focus:outline-none focus:ring-2 focus:ring-black"
//             placeholder="Postcode"
//             value={searchValues.postcode}
//             onChange={(e) => setSearchValues({ ...searchValues, postcode: e.target.value })}
//           />

//           {/* Go Button */}
//           <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
//             <FaSearch className="mr-2" />
//             Go
//           </button>
//         </div>

//         {/* Toggle Button at Bottom */}
//         <button
//           className="flex items-center px-4 py-2 mt-4 bg-black text-white rounded-lg hover:bg-gray-800"
//           onClick={() => setShowAdvanced(!showAdvanced)}
//         >
//           <FaFilter className="mr-2" />
//           {showAdvanced ? "Basic Search" : "Advanced Search"}
//         </button>
//       </div>
//     </section>
//   );
// }



// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaSearch, FaChevronDown, FaFilter } from "react-icons/fa";
// import Image from "next/image";

// interface SearchOptions {
//   lookingFor: string[];
//   jobTitle: string[];
//   experience: string[];
//   location: Record<string, string[]>;
// }

// interface SearchValues {
//   lookingFor: string;
//   jobTitle: string;
//   experience: string;
//   location: string;
//   postcode: string;
// }

// const options: SearchOptions = {
//   lookingFor: [
//     "Corporate & Executive Security",
//     "Physical Security & Manned Guarding",
//     "Specialist Security Roles",
//     "Surveillance & Monitoring",
//     "Cyber Security & Information Security",
//   ],
//   jobTitle: [
//     "Corporate Security Manager",
//     "Executive Protection Officer",
//     "Travel Risk Manager",
//     "Hotel Security Manager",
//     "Bank & Financial Institution Security Manager",
//     "Data Centre Security Manager",
//   ],
//   experience: ["1-5 Years", "5-10 Years", "10-15 Years", "15+ Years"],
//   location: {
//     "North East England": ["Tyne and Wear", "Durham", "Northumberland", "Teesside"],
//     "North West England": ["Greater Manchester", "Lancashire", "Merseyside", "Cheshire", "Cumbria"],
//     "Yorkshire and the Humber": ["West Yorkshire", "South Yorkshire", "East Riding of Yorkshire", "North Yorkshire"],
//     "East Midlands": ["Derbyshire", "Leicestershire", "Lincolnshire", "Northamptonshire", "Nottinghamshire", "Rutland"],
//     "West Midlands": ["Birmingham", "Coventry", "Staffordshire", "Warwickshire", "Worcestershire"],
//     "Greater London": [],
//     "Scotland": ["Glasgow", "Edinburgh", "Aberdeen", "Highlands"],
//     "Wales": ["Cardiff", "Newport", "Swansea"],
//     "Northern Ireland": ["Belfast", "Derry", "Armagh"],
//   },
// };

// export default function Hero() {
//   const [searchValues, setSearchValues] = useState<SearchValues>({
//     lookingFor: "",
//     jobTitle: "",
//     experience: "",
//     location: "",
//     postcode: "",
//   });

//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState<keyof SearchOptions | "">("");
//   const [openSubLocation, setOpenSubLocation] = useState<string | "">("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown("");
//         setOpenSubLocation("");
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSelect = (field: keyof SearchOptions, value: string) => {
//     setSearchValues((prevValues) => ({ ...prevValues, [field]: value }));
//     setOpenDropdown("");
//     setOpenSubLocation("");
//   };

//   const renderDropdown = (field: keyof SearchOptions) => {
//     if (field === "location") {
//       return (
//         <div ref={dropdownRef} className="absolute left-0 mt-1 bg-white text-black rounded shadow-lg w-72 z-50 border border-gray-300 flex">
//           <div className="w-1/2 border-r border-gray-300">
//             {Object.keys(options.location).map((mainLocation) => (
//               <div
//                 key={mainLocation}
//                 className={`px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm transition duration-300 ${
//                   openSubLocation === mainLocation ? "bg-gray-700 text-white" : ""
//                 }`}
//                 onClick={() => setOpenSubLocation(openSubLocation === mainLocation ? "" : mainLocation)}
//               >
//                 {mainLocation}
//               </div>
//             ))}
//           </div>
//           {openSubLocation && options.location[openSubLocation].length > 0 && (
//             <div className="w-1/2 bg-gray-100">
//               {options.location[openSubLocation].map((subLocation) => (
//                 <div
//                   key={subLocation}
//                   className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm transition duration-300"
//                   onClick={() => handleSelect("location", subLocation)}
//                 >
//                   {subLocation}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     }

//     return (
//       <div ref={dropdownRef} className="absolute left-0 mt-1 bg-white text-black rounded shadow-lg w-full z-50 border border-gray-300">
//         {options[field].map((option) => (
//           <div
//             key={option}
//             className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm transition duration-300"
//             onClick={() => handleSelect(field, option)}
//           >
//             {option}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white px-4 md:px-8">
//       <div className="absolute inset-0">
//         <Image src="/images/hero-bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="opacity-50" />
//       </div>

//       <div className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
//         <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">Find My Security</h2>

//         {/* Search Fields in a Single Row */}
//         <div className="mt-3 flex flex-wrap justify-center gap-4">
//           {(["lookingFor", "location", ...(showAdvanced ? ["jobTitle", "experience", "postcode"] : [])] as (keyof SearchOptions | "postcode")[]).map(
//             (field) => (
//               <div key={field} className="relative w-full sm:w-auto">
//                 <div
//                   className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition duration-300"
//                   onClick={() => setOpenDropdown(field as keyof SearchOptions)}
//                 >
//                   <span className="truncate w-full">{searchValues[field as keyof SearchValues] || field.replace(/([A-Z])/g, " $1")}</span>
//                   <FaChevronDown className="ml-auto" />
//                 </div>
//                 {openDropdown === field && renderDropdown(field as keyof SearchOptions)}
//               </div>
//             )
//           )}
//           <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-bold flex justify-center items-center gap-2 transition duration-300">
//             <FaSearch />
//             Go
//           </button>
//         </div>

//         {/* Toggle Button */}
//         <button className="mt-3 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition duration-300" onClick={() => setShowAdvanced(!showAdvanced)}>
//           <FaFilter />
//           {showAdvanced ? "Basic Search" : "Advanced Search"}
//         </button>
//       </div>
//     </section>
//   );
// }




// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaChevronDown } from "react-icons/fa";
// import lookingForData from "@/sections/data/secuirty_professional.json";
// import searchData from "@/sections/data/hero_section.json";

// interface SearchValues {
//   lookingFor: string;
//   jobTitle: string;
//   experience: string;
//   location: string;
//   postcode: string;
// }

// export default function Hero() {
//   const [searchValues, setSearchValues] = useState<SearchValues>({
//     lookingFor: "",
//     jobTitle: "",
//     experience: "",
//     location: "",
//     postcode: "",
//   });

//   const [selectedLookingFor, setSelectedLookingFor] = useState<string | null>(null);
//   const [selectedMainLocation, setSelectedMainLocation] = useState<string | null>(null);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null);
//         setSelectedMainLocation(null);
//         setSelectedLookingFor(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSelect = (field: keyof SearchValues, value: string) => {
//     setSearchValues((prevValues) => ({ ...prevValues, [field]: value }));
//     setOpenDropdown(null);
//   };

//   const handleLocationSelect = (mainLocation: string, subLocation?: string) => {
//     const locationValue = subLocation ? `${mainLocation} - ${subLocation}` : mainLocation;
//     setSearchValues((prevValues) => ({ ...prevValues, location: locationValue }));
//     setOpenDropdown(null);
//     setSelectedMainLocation(null);
//   };

//   const handleLookingForSelect = (category: string, role?: string) => {
//     const lookingForValue = role ? `${category} - ${role}` : category;
//     setSearchValues((prevValues) => ({ ...prevValues, lookingFor: lookingForValue }));
//     setOpenDropdown(null);
//     setSelectedLookingFor(null);
//   };

//   const renderDropdown = (field: keyof SearchValues) => {
//     if (field === "lookingFor") {
//       const selectedCategory = lookingForData.find((c) => c.id === selectedLookingFor);

//       return (
//         <div ref={dropdownRef} className="absolute left-0 top-10 bg-white text-black rounded shadow-lg z-50 border border-gray-300 flex">
//           <div className="w-64 border-r border-gray-300">
//             {lookingForData.map((category) => (
//               <div
//                 key={category.id}
//                 className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
//                 onClick={() => setSelectedLookingFor(category.id)}
//               >
//                 {category.title}
//               </div>
//             ))}
//           </div>

//           {selectedCategory?.roles && selectedCategory.roles.length > 0 && (
//             <div className="w-64">
//               {selectedCategory.roles.map((role) => (
//                 <div
//                   key={role}
//                   className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
//                   onClick={() => handleLookingForSelect(selectedCategory.title, role)}
//                 >
//                   {role}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     }

//     if (field === "location") {
//       const selectedLocation = searchData.location.find((l) => l.id === selectedMainLocation);

//       return (
//         <div ref={dropdownRef} className="absolute left-0 top-10 bg-white text-black rounded shadow-lg z-50 border border-gray-300 flex">
//           <div className="w-64 border-r border-gray-300">
//             {searchData.location.map((location) => (
//               <div
//                 key={location.id}
//                 className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
//                 onClick={() => setSelectedMainLocation(location.id)}
//               >
//                 {location.title}
//               </div>
//             ))}
//           </div>

//           {selectedLocation?.subLocations && selectedLocation.subLocations.length > 0 && (
//             <div className="w-64">
//               {selectedLocation.subLocations.map((subLocation) => (
//                 <div
//                   key={subLocation}
//                   className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
//                   onClick={() => handleLocationSelect(selectedLocation.title, subLocation)}
//                 >
//                   {subLocation}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     }

//     if (field === "jobTitle" || field === "experience") {
//       const options = field === "jobTitle" ? searchData.jobTitles : searchData.experience;

//       return (
//         <div ref={dropdownRef} className="absolute left-0 top-10 bg-white text-black rounded shadow-lg z-50 border border-gray-300 w-64">
//           {options.map((option: string) => (
//             <div
//               key={option}
//               className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
//               onClick={() => handleSelect(field, option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white px-4">
//       <div className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
//         <h2 className="text-lg font-bold text-gray-800 mb-1">FindMySecurity</h2>

//         <div className="flex flex-wrap gap-4">
//           {["lookingFor", "jobTitle", "experience", "location", "postcode"].map((field) => (
//             <div key={field} className="relative w-48">
//               <div
//                 className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg"
//                 onClick={() => setOpenDropdown(field)}
//               >
//                 {searchValues[field as keyof SearchValues] || `Select ${field}`}
//                 <FaChevronDown className="ml-auto" />
//               </div>
//               {openDropdown === field && renderDropdown(field as keyof SearchValues)}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaChevronDown, FaFilter } from "react-icons/fa";
// import Image from "next/image";

// interface SearchOptions {
//   lookingFor: string[];
//   jobTitle: string[];
//   experience: string[];
//   location: Record<string, string[]>;
// }

// interface SearchValues {
//   lookingFor: string;
//   jobTitle: string;
//   experience: string;
//   location: string;
//   postcode: string;
// }

// const options: SearchOptions = {
//   lookingFor: [
//     "Corporate & Executive Security",
//     "Physical Security & Manned Guarding",
//     "Specialist Security Roles",
//     "Surveillance & Monitoring",
//     "Cyber Security & Information Security",
//   ],
//   jobTitle: [
//     "Corporate Security Manager",
//     "Executive Protection Officer",
//     "Travel Risk Manager",
//     "Hotel Security Manager",
//     "Bank & Financial Institution Security Manager",
//     "Data Centre Security Manager",
//   ],
//   experience: ["1-5 Years", "5-10 Years", "10-15 Years", "15+ Years"],
//   location: {
//     "North East England": ["Tyne and Wear", "Durham", "Northumberland", "Teesside"],
//     "North West England": ["Greater Manchester", "Lancashire", "Merseyside", "Cheshire", "Cumbria"],
//     "Yorkshire and the Humber": ["West Yorkshire", "South Yorkshire", "East Riding of Yorkshire", "North Yorkshire"],
//     "East Midlands": ["Derbyshire", "Leicestershire", "Lincolnshire", "Northamptonshire", "Nottinghamshire", "Rutland"],
//     "West Midlands": ["Birmingham", "Coventry", "Staffordshire", "Warwickshire", "Worcestershire"],
//     "Greater London": [],
//     "Scotland": ["Glasgow", "Edinburgh", "Aberdeen", "Highlands"],
//     "Wales": ["Cardiff", "Newport", "Swansea"],
//     "Northern Ireland": ["Belfast", "Derry", "Armagh"],
//   },
// };

// export default function Hero() {
//   const [searchValues, setSearchValues] = useState<SearchValues>({
//     lookingFor: "",
//     jobTitle: "",
//     experience: "",
//     location: "",
//     postcode: "",
//   });
//   const [selectedMainLocation, setSelectedMainLocation] = useState<string | null>(null);

//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState<keyof SearchOptions | "">("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown("");
//         setSelectedMainLocation(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSelect = (field: keyof SearchOptions, value: string) => {
//     setSearchValues((prevValues) => ({ ...prevValues, [field]: value }));
//     setOpenDropdown("");
//   };

//   const handleLocationSelect = (mainLocation: string, subLocation?: string) => {
//     const locationValue = subLocation ? `${mainLocation} - ${subLocation}` : mainLocation;
//     setSearchValues((prevValues) => ({ ...prevValues, location: locationValue }));
//     setOpenDropdown("");
//     setSelectedMainLocation(null);
//   };
//   const renderDropdown = (field: keyof SearchOptions) => {
//     const fieldOptions = options[field];
//     if (field === "location") {
//       return (
//         <div className="relative">
//         {/* Main Locations Dropdown */}
//         <div ref={dropdownRef} className="absolute left-0 top-0 bg-white text-black rounded shadow-lg z-50 border border-gray-300 min-w-max flex">
//           <div className="w-48 border-r border-gray-300">
//             {Object.keys(options.location).map((mainLocation) => (
//               <div
//                 key={mainLocation}
//                 className={`px-4 py-2 cursor-pointer text-sm transition duration-300 ${
//                   selectedMainLocation === mainLocation ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white"
//                 }`}
//                 onClick={() => setSelectedMainLocation(mainLocation)}
//               >
//                 {mainLocation}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Sub Locations Separate Div (Aligned to Top) */}
//         {selectedMainLocation && options.location[selectedMainLocation]?.length > 0 && (
//           <div className="absolute left-[200px] top-0 bg-white text-black rounded shadow-lg z-50 border border-gray-300 w-48">
//             {options.location[selectedMainLocation].map((subLocation) => (
//               <div
//                 key={subLocation}
//                 className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm transition duration-300"
//                 onClick={() => handleLocationSelect(selectedMainLocation, subLocation)}
//               >
//                 {subLocation}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       );
//     }
//     if (!Array.isArray(fieldOptions)) {
//       return null;
//     }

//     return (
//       <div
//         ref={dropdownRef}
//         className="absolute left-0 mt-1 bg-white text-black rounded shadow-lg z-50 border border-gray-300 min-w-max"
//       >
//         {fieldOptions.map((option) => (
//           <div
//             key={option}
//             className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm transition duration-300"
//             onClick={() => handleSelect(field, option)}
//           >
//             {option}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white px-4 md:px-8">
//       <div className="absolute inset-0">
//         <Image src="/images/hero-bg.jpg" alt="Hero Background" layout="fill" objectFit="cover" className="opacity-50" />
//       </div>

//       <div className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
//         <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">FindMySecurity</h2>

//         {/* Search Fields */}
//         <div className="mt-3 flex flex-col sm:flex-row flex-wrap gap-4 items-center">
//           {/* Looking For */}
//           <div className="relative w-full sm:flex-1">
//             <div
//               className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 w-full"
//               onClick={() => setOpenDropdown("lookingFor")}
//             >
//               <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis w-full">
//                 {searchValues.lookingFor || "Looking For"}
//               </span>
//               <FaChevronDown className="ml-auto" />
//             </div>
//             {openDropdown === "lookingFor" && renderDropdown("lookingFor")}
//           </div>

//           {/* Advanced Search Fields */}
//           {showAdvanced && (
//             <>
//               {/* Job Title */}
//               <div className="relative w-full sm:flex-1">
//                 <div
//                   className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 w-full"
//                   onClick={() => setOpenDropdown("jobTitle")}
//                 >
//                   <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis w-full">
//                     {searchValues.jobTitle || "Job Title"}
//                   </span>
//                   <FaChevronDown className="ml-auto" />
//                 </div>
//                 {openDropdown === "jobTitle" && renderDropdown("jobTitle")}
//               </div>

//               {/* Experience */}
//               <div className="relative w-full sm:flex-1">
//                 <div
//                   className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 w-full"
//                   onClick={() => setOpenDropdown("experience")}
//                 >
//                   <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis w-full">
//                     {searchValues.experience || "Experience"}
//                   </span>
//                   <FaChevronDown className="ml-auto" />
//                 </div>
//                 {openDropdown === "experience" && renderDropdown("experience")}
//               </div>

//               {/* Location */}
//               <div className="relative w-full sm:flex-1">
//                 <div
//                   className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 w-full"
//                   onClick={() => setOpenDropdown("location")}
//                 >
//                   <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis w-full">
//                     {searchValues.location || "Location"}
//                   </span>
//                   <FaChevronDown className="ml-auto" />
//                 </div>
//                 {openDropdown === "location" && renderDropdown("location")}
//               </div>
//             </>
//           )}
//           {/* Postcode */}
//           <input
//             type="text"
//             placeholder="Enter Postcode"
//             value={searchValues.postcode}
//             onChange={(e) => setSearchValues({ ...searchValues, postcode: e.target.value })}
//             className="w-full sm:w-auto px-4 py-2 rounded-lg text-black border border-black focus:outline-none focus:ring-2 focus:ring-gray-600"
//           />
//           {/* Search Button */}
//           <button className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-bold flex justify-center items-center gap-2 hover:shadow-lg transition duration-300">
//             Go
//           </button>
//         </div>

//         {/* Toggle Button */}
//         <div className="mt-3 flex justify-left">
//           <button
//             className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg"
//             onClick={() => setShowAdvanced(!showAdvanced)}
//           >
//             <FaFilter />
//             {showAdvanced ? "Basic Search" : "Advanced Search"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }







// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaSearch, FaChevronDown, FaFilter } from "react-icons/fa";
// import Image from "next/image";

// interface SearchOptions {
//   lookingFor: string[];
//   jobTitle: string[];
//   experience: string[];
//   location: string[];
// }

// interface SearchValues {
//   lookingFor: string;
//   jobTitle: string;
//   experience: string;
//   location: string;
//   postcode: string;
// }

// const options: SearchOptions = {
//   lookingFor: [
//     "Corporate & Executive Security",
//     "Physical Security & Manned Guarding",
//     "Specialist Security Roles",
//     "Surveillance & Monitoring",
//     "Cyber Security & Information Security",
//   ],
//   jobTitle: [
//     "Corporate Security Manager",
//     "Executive Protection Officer",
//     "Travel Risk Manager",
//     "Hotel Security Manager",
//     "Bank & Financial Institution Security Manager",
//     "Data Centre Security Manager",
//   ],
//   experience: ["1-5 Years", "5-10 Years", "10-15 Years", "15+ Years"],
//   location: [
//     "North East England - Tyne and Wear, Durham, Northumberland, Teesside",
//     "North West England - Greater Manchester, Lancashire, Merseyside, Cheshire, Cumbria",
//     "Yorkshire and the Humber - West Yorkshire, South Yorkshire, East Riding of Yorkshire, North Yorkshire",
//     "East Midlands - Derbyshire, Leicestershire, Lincolnshire, Northamptonshire, Nottinghamshire, Rutland",
//     "West Midlands - Birmingham, Coventry, Staffordshire, Warwickshire, Worcestershire, Shropshire, Herefordshire",
//     "Greater London",
//     "Scotland - Glasgow, Edinburgh, Aberdeen, Highlands",
//     "Wales - Cardiff, Newport, Swansea",
//     "Northern Ireland - Belfast, Derry, Armagh",
//   ],
// };

// // Utility function to truncate text to a fixed length
// const truncateText = (text: string, maxLength: number = 20) => {
//   return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// };

// export default function Hero() {
//   const [searchValues, setSearchValues] = useState<SearchValues>({
//     lookingFor: "",
//     jobTitle: "",
//     experience: "",
//     location: "",
//     postcode: "",
//   });

//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState<keyof SearchOptions | "">("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown("");
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSelect = (field: keyof SearchOptions, value: string) => {
//     setSearchValues((prevValues) => ({ ...prevValues, [field]: value }));
//     setOpenDropdown("");
//   };

//   const renderDropdown = (field: keyof SearchOptions) => (
//     <div
//       ref={dropdownRef}
//       className="absolute left-0 mt-1 bg-white text-black rounded shadow-lg w-full max-h-40 overflow-y-auto z-50 border border-gray-300"
//     >
//       {options[field].map((option) => (
//         <div
//           key={option}
//           className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm transition duration-300"
//           onClick={() => handleSelect(field, option)}
//         >
//           {option}
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white px-4 md:px-8">
//       <div className="absolute inset-0">
//         <Image
//           src="/images/hero-bg.jpg"
//           alt="Hero Background"
//           layout="fill"
//           objectFit="cover"
//           className="opacity-50"
//         />
//       </div>

//       <div className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
//         <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">FindMySecurity</h2>

//         {/* Basic Search */}
//         {!showAdvanced && (
//           <div className="mt-3 flex flex-col sm:flex-row gap-4">
//             <div className="relative w-full">
//               <div
//                 className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 min-w-0"
//                 onClick={() => setOpenDropdown("lookingFor")}
//               >
//                 <span className="overflow-auto whitespace-normal  break-words w-full">
//                   {(searchValues.lookingFor || "Looking For")}
//                 </span>
//                 <FaChevronDown className="ml-auto" />
//               </div>
//               {openDropdown === "lookingFor" && renderDropdown("lookingFor")}
//             </div>

//             <div className="relative w-full sm:w-auto">
//   <div className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 min-w-0">
//     <input
//       type="text"
//       className="bg-black text-white w-full truncate outline-none border-none placeholder-white"
//       placeholder="Postal Code"
//       value={searchValues.location || ""}
//       onChange={(e) => setSearchValues({ ...searchValues, location: e.target.value })}
//       onClick={() => setOpenDropdown("location")}
//     />
    
//   </div>
 
// </div>

//             <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-bold flex justify-center items-center gap-2 hover:shadow-lg transition duration-300">
//                Go
//             </button>
//           </div>
//         )}

//         {/* Advanced Search */}
//         {showAdvanced && (
//   <div className="mt-3 flex flex-col sm:flex-row flex-wrap gap-4 items-center">
//     {Object.keys(options).map((field) => {
//       const typedField = field as keyof SearchOptions;

//       return typedField === "location" ? (
//         // Render a text input for "location" (renamed to Postal Code)
//         <div key={typedField} className="relative w-full sm:flex-1">
//           <input
//             type="text"
//             className="bg-black text-white px-4 py-2 rounded-lg w-full outline-none border-none placeholder-white"
//             placeholder="Postal Code"
//             value={searchValues[typedField] || ""}
//             onChange={(e) => setSearchValues({ ...searchValues, [typedField]: e.target.value })}
//           />
//         </div>
//       ) : (
//         // Render a dropdown for other fields
//         <div key={typedField} className="relative w-full sm:flex-1">
//           <div
//             className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 w-full"
//             onClick={() => setOpenDropdown(typedField)}
//           >
//             <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis w-full">
//               {truncateText(searchValues[typedField] || typedField.replace(/([A-Z])/g, " $1").trim())}
//             </span>
//             <FaChevronDown className="ml-auto" />
//           </div>
//           {openDropdown === typedField && renderDropdown(typedField)}
//         </div>
//       );
//     })}

//     {/* Search Button */}
//     <button className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-bold flex justify-center items-center gap-2 hover:shadow-lg transition duration-300">
//       Go
//     </button>
//   </div>
// )}


//         {/* Toggle Button */}
//         <button
//           className="flex items-center gap-2 mt-3 md:mt-1  px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg"
//           onClick={() => setShowAdvanced(!showAdvanced)}
//         >
//           <FaFilter />
//           {showAdvanced ? "Basic Search" : "Advanced Search"}
//         </button>
//       </div>
//     </section>
//   );
// }
