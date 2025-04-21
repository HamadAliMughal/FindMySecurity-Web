"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchComponent from "@/sections/home/SearchComponent";
import securityProfessionals from "@/sections/data/secuirty_professional.json";
import securityCompanies from "@/sections/data/secuirty_services.json";
import trainingProviders from "@/sections/data/training_providers.json";
import searchData from "@/sections/data/hero_section.json";

interface MarkerData {
  id: number;
  position: { lat: number; lng: number };
  title: string;
}

interface SearchValues {
  lookingFor?: string;
  jobTitle?: string;
  experience?: string;
  location?: string;
  postcode?: string;
  [key: string]: any;
}

interface LookingForItem {
  title: string;
  id: string;
  roles: string[];
}

export default function ConnectingBusiness() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [searchValues, setSearchValues] = useState<SearchValues | null>(null);
  const [lookingForData, setLookingForData] = useState<LookingForItem[]>([]);
  const [showSearchComponent, setShowSearchComponent] = useState(false);
  const [searchTitle, setSearchTitle] = useState<string | null>(null);
  // const [searchMode, setSearchMode] = useState<string>(initialSearchMode);
  const [searchMode, setSearchMode] = useState<"basic" | "advanced">("basic");

  const defaultCenter = { lat: 51.5074, lng: -0.1278 };
  const markers: MarkerData[] = [
    { id: 1, position: { lat: 51.5074, lng: -0.1278 }, title: "Security Company A" },
    { id: 2, position: { lat: 51.511, lng: -0.12 }, title: "Security Company B" },
    { id: 3, position: { lat: 51.505, lng: -0.13 }, title: "Security Company C" },
  ];

  useEffect(() => {
    const storedMode = localStorage.getItem("searchMode");

    if (storedMode === "basic" || storedMode === "advanced") {
      setSearchMode(storedMode); // ✅ Now TypeScript is happy
    } else {
      setSearchMode("basic"); // optional fallback
    }
    const values = localStorage.getItem("searchValues");
    const title = localStorage.getItem("title");

    if (!storedMode) {
      router.push("/");
      return;
    }


    if (storedMode === "advanced") {
      const storedData = localStorage.getItem("profileData") || localStorage.getItem("loginData");
      if (storedData) {
        setProfileData(JSON.parse(storedData));
      } else {
        router.push("/");
        return;
      }
    }

    if (values && title) {
      const parsedValues: SearchValues = JSON.parse(values);
      setSearchValues(parsedValues);
      const cleanedTitle = title.replace(/['"]+/g, "").trim();
      setSearchTitle(cleanedTitle);

      let data: LookingForItem[] = [];
      const normalizedTitle = cleanedTitle.toLowerCase();

      if (normalizedTitle.includes("professional")) {
        data = securityProfessionals;
      } else if (normalizedTitle.includes("compan")) {
        data = securityCompanies;
      } else if (normalizedTitle.includes("train")) {
        data = trainingProviders;
      } else {
        console.warn("Unknown title:", cleanedTitle);
        data = securityProfessionals;
      }

      setLookingForData(data);
    }

    setIsLoaded(true);
  }, [router]);

  const handleBack = () => {
    localStorage.removeItem("searchMode");
    localStorage.removeItem("searchValues");
    localStorage.removeItem("title");
    router.back();
  };

  const handleRefineSearch = () => {
    setShowSearchComponent(true);
  };

  const handleSearchSubmit = (newSearchValues: SearchValues) => {
    setSearchValues(newSearchValues);
    localStorage.setItem("searchValues", JSON.stringify(newSearchValues));
    setShowSearchComponent(false);
  };

  const handleSearchModeChange = (mode: "basic" | "advanced") => {
    setSearchMode(mode);
    localStorage.setItem("searchMode", mode);
  };

  const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

  if (!isLoaded) return null;

  return (
    <section className="relative w-full min-h-screen bg-gray-100 text-gray-900 px-4 sm:px-6 md:px-10 lg:px-32 pt-24 pb-16">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <button className="flex items-center text-gray-600 hover:text-black transition-all" onClick={handleBack}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center mb-10 leading-tight">
        Find <span className="text-black">{searchTitle || "Security Providers"}</span> Near You
      </h1>

      {/* Search Component */}
      {showSearchComponent && (
        <div className="relative z-10 flex justify-center mb-8 w-full max-w-4xl mx-auto">
          <SearchComponent
            lookingForData={lookingForData}
            searchData={searchData}
            title={searchTitle || "Professionals"}
            searchMode={searchMode as "basic" | "advanced"}
            onSearchSubmit={handleSearchSubmit}
            onSearchModeChange={handleSearchModeChange}
          />
        </div>
      )}

      {/* Search Values Display */}
      {searchValues && !showSearchComponent && (
        <div className="relative z-10 w-full max-w-4xl mx-auto mb-10 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(searchValues).map(([key, value]) => {
              if (searchMode === "basic" && (key === "lookingFor" || key === "subCategory" || key === "postcode")) {
                return (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
                    <input
                      type="text"
                      readOnly
                      value={value}
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none cursor-not-allowed transition"
                    />
                  </div>
                );
              }

              if (searchMode === "advanced") {
                return (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
                    <input
                      type="text"
                      readOnly
                      value={value}
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none cursor-not-allowed transition"
                    />
                  </div>
                );
              }

              return null;
            })}
            {/* Refine Search Button */}
          {!showSearchComponent && (
            <div className="flex justify-center mt-6">
              <button
                className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 transition"
                onClick={handleRefineSearch}
              >
                🔍 Refine Search
              </button>
            </div>
          )}
          </div>
        </div>
      )}

      {/* Google Map Section */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mb-10">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Security Companies Near You</h2>
        <div className="h-80 sm:h-96 w-full rounded-md overflow-hidden border">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
            <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={13}>
              {markers.map((marker) => (
                <Marker key={marker.id} position={marker.position} title={marker.title} />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </section>
  );
}





// "use client";

// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import SearchComponent from "@/sections/home/SearchComponent";
// import securityProfessionals from "@/sections/data/secuirty_professional.json";
// import securityCompanies from "@/sections/data/secuirty_services.json";
// import trainingProviders from "@/sections/data/training_providers.json";
// import searchData from "@/sections/data/hero_section.json";

// // ------------------ Interfaces ------------------

// interface MarkerData {
//   id: number;
//   position: {
//     lat: number;
//     lng: number;
//   };
//   title: string;
// }

// interface SearchValues {
//   lookingFor?: string;
//   jobTitle?: string;
//   experience?: string;
//   location?: string;
//   postcode?: string;
//   [key: string]: any;
// }

// interface LookingForItem {
//   title: string;
//   id: string;
//   roles: string[];
// }

// // ------------------ Component ------------------

// export default function ConnectingBusiness({ initialSearchMode = "basic" }: { initialSearchMode?: "basic" | "advanced" }) {
//   const router = useRouter();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [profileData, setProfileData] = useState<any>(null);
//   const [searchValues, setSearchValues] = useState<SearchValues | null>(null);
//   const [lookingForData, setLookingForData] = useState<LookingForItem[]>([]);
//   const [showSearchComponent, setShowSearchComponent] = useState(false);
//   const [searchTitle, setSearchTitle] = useState<string | null>(null);
//   const [searchMode, setSearchMode] = useState<string>(initialSearchMode); // Use initialSearchMode prop

//   const defaultCenter = { lat: 51.5074, lng: -0.1278 };

//   const markers: MarkerData[] = [
//     { id: 1, position: { lat: 51.5074, lng: -0.1278 }, title: "Security Company A" },
//     { id: 2, position: { lat: 51.511, lng: -0.12 }, title: "Security Company B" },
//     { id: 3, position: { lat: 51.505, lng: -0.13 }, title: "Security Company C" },
//   ];

//   useEffect(() => {
//     const storedSearchMode = localStorage.getItem("searchMode");
//     const values = localStorage.getItem("searchValues");
//     const title = localStorage.getItem("title");
  
//     if (!storedSearchMode) {
//       router.push("/");
//       return;
//     }
  
//     setSearchMode(storedSearchMode); // Set search mode based on stored value
  
//     if (storedSearchMode === "advanced") {
//       const storedData = localStorage.getItem("profileData") || localStorage.getItem("loginData");
//       if (storedData) {
//         setProfileData(JSON.parse(storedData));
//       } else {
//         router.push("/");
//         return;
//       }
//     }
  
//     if (values && title) {
//       const parsedValues: SearchValues = JSON.parse(values);
//       setSearchValues(parsedValues);
      
//       // Trim and clean up the title to avoid extra quotes or spaces
//       const cleanedTitle = title.replace(/['"]+/g, '').trim(); // Remove any quotes and trim spaces
//       setSearchTitle(cleanedTitle);
  
//       let data: LookingForItem[] = [];
//       const normalizedTitle = cleanedTitle.toLowerCase();
  
//       if (normalizedTitle.includes("professional")) {
//         data = securityProfessionals;
//       } else if (normalizedTitle.includes("compan")) {
//         data = securityCompanies;
//       } else if (normalizedTitle.includes("train")) {
//         data = trainingProviders;
//       } else {
//         console.warn("Unknown title:", cleanedTitle);
//         data = securityProfessionals;
//       }
  
//       setLookingForData(data);
//     }
  
//     setIsLoaded(true);
//   }, [router]);

//   const handleBack = () => {
//     localStorage.removeItem("searchMode");
//     localStorage.removeItem("searchValues");
//     localStorage.removeItem("title");
//     router.back();
//   };
//   const handleRefineSearch = () => {
//     // Just show the search form, do NOT toggle searchMode here
//     setShowSearchComponent(true);
//   };
  
//   const handleSearchSubmit = (newSearchValues: SearchValues, newMode: "basic" | "advanced") => {
//     setSearchValues(newSearchValues);
//     setSearchMode(newMode); // Set search mode only on submit
//     localStorage.setItem("searchValues", JSON.stringify(newSearchValues));
//     localStorage.setItem("searchMode", newMode);
//     setShowSearchComponent(false); // Hide form
//   };
  
  
// //   const handleRefineSearch = () => {
// //     setSearchMode((prevMode) => (prevMode === "basic" ? "advanced" : "basic")); // Toggle between basic and advanced search mode
// //     setShowSearchComponent(true); // Show the search component when refining
// //   };

// //   const handleSearchSubmit = (newSearchValues: SearchValues) => {
// //     setSearchValues(newSearchValues); // Update search values
// //     localStorage.setItem("searchValues", JSON.stringify(newSearchValues)); // Optionally store in localStorage
// //     setShowSearchComponent(false); // Close the search component after submitting
// //   };

//   const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

//   if (!isLoaded) return null;
//   return (
//     <section className="relative w-full min-h-screen bg-gray-100 text-gray-900 px-4 md:px-8 lg:px-32 pt-24">
//       {/* Back Button */}
//       <div className="absolute top-24 left-4 z-20">
//         <button
//           className="flex items-center text-gray-600 hover:text-black transition-all"
//           onClick={handleBack}
//         >
//           <ArrowLeft className="w-6 h-6 mr-2" />
//         </button>
//       </div>

//       {/* Header */}
//       <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
//         Find <span className="text-black">{searchTitle || "Security Providers"}</span> Near You
//       </h1>

//       {searchValues && !showSearchComponent && (
//   <div className="relative z-10 w-full max-w-4xl mx-auto mb-6 bg-white p-6 rounded-lg shadow-lg">
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {Object.entries(searchValues).map(([key, value]) => {
//         // Show only what’s appropriate for current searchMode
//         if (searchMode === "basic" && (key === "lookingFor" || key === "subCategory" || key === "postcode")) {
//           return (
//             <div key={key} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
//               <input
//                 type="text"
//                 readOnly
//                 value={value}
//                 className="w-full px-4 py-3 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none cursor-not-allowed transition duration-300"
//               />
//             </div>
//           );
//         }

//         if (searchMode === "advanced") {
//           return (
//             <div key={key} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
//               <input
//                 type="text"
//                 readOnly
//                 value={value}
//                 className="w-full px-4 py-3 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none cursor-not-allowed transition duration-300"
//               />
//             </div>
//           );
//         }

//         return null;
//       })}
//     </div>

//     <div className="flex justify-end mt-6">
//       <button
//         className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none transition duration-300"
//         onClick={handleRefineSearch}
//       >
//         <span className="mr-1">🔍</span> Refine Search
//       </button>
//     </div>
//   </div>
// )}


//       {/* Show Search Component on Refine */}
//       {showSearchComponent && (
//         <div className="relative z-10 flex justify-center mb-6 w-full max-w-4xl mx-auto">
//             <SearchComponent
//               lookingForData={lookingForData}
//               searchData={searchData}
//               title={searchTitle || "Professionals"}
//               searchMode={searchMode as "basic" | "advanced"} // Cast to the correct type
//               onSearchSubmit={handleSearchSubmit}
//             />

//         </div>
//       )}

//       {/* Google Map */}
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
//         <h2 className="text-lg md:text-xl font-semibold mb-4">
//           Security Companies Near You
//         </h2>
//         <div className="h-80 sm:h-96 w-full rounded-md overflow-hidden border">
//           <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
//             <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={13}>
//               {markers.map((marker) => (
//                 <Marker key={marker.id} position={marker.position} title={marker.title} />
//               ))}
//             </GoogleMap>
//           </LoadScript>
//         </div>
//       </div>
//     </section>
//   );
// }





// "use client";

// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import SearchComponent from "@/sections/home/SearchComponent";
// import securityProfessionals from "@/sections/data/secuirty_professional.json";
// import securityCompanies from "@/sections/data/secuirty_services.json";
// import trainingProviders from "@/sections/data/training_providers.json";
// import searchData from "@/sections/data/hero_section.json";

// // ------------------ Interfaces ------------------

// interface MarkerData {
//   id: number;
//   position: {
//     lat: number;
//     lng: number;
//   };
//   title: string;
// }

// interface SearchValues {
//   lookingFor?: string;
//   jobTitle?: string;
//   experience?: string;
//   location?: string;
//   postcode?: string;
//   [key: string]: any;
// }

// interface LookingForItem {
//   title: string;
//   id: string;
//   roles: string[];
// }

// // ------------------ Component ------------------

// export default function ConnectingBusiness() {
//   const router = useRouter();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [profileData, setProfileData] = useState<any>(null);
//   const [searchValues, setSearchValues] = useState<SearchValues | null>(null);
//   const [lookingForData, setLookingForData] = useState<LookingForItem[]>([]);
//   const [showSearchComponent, setShowSearchComponent] = useState(false);
//   const [searchTitle, setSearchTitle] = useState<string | null>(null);
//   const [searchMode, setSearchMode] = useState<string>("basic"); // Add state for search mode

//   const defaultCenter = { lat: 51.5074, lng: -0.1278 };

//   const markers: MarkerData[] = [
//     { id: 1, position: { lat: 51.5074, lng: -0.1278 }, title: "Security Company A" },
//     { id: 2, position: { lat: 51.511, lng: -0.12 }, title: "Security Company B" },
//     { id: 3, position: { lat: 51.505, lng: -0.13 }, title: "Security Company C" },
//   ];

//   useEffect(() => {
//     const storedSearchMode = localStorage.getItem("searchMode");
//     const values = localStorage.getItem("searchValues");
//     const title = localStorage.getItem("title");
  
//     if (!storedSearchMode) {
//       router.push("/");
//       return;
//     }
  
//     setSearchMode(storedSearchMode); // Set search mode based on stored value
  
//     if (storedSearchMode === "advanced") {
//       const storedData = localStorage.getItem("profileData") || localStorage.getItem("loginData");
//       if (storedData) {
//         setProfileData(JSON.parse(storedData));
//       } else {
//         router.push("/");
//         return;
//       }
//     }
  
//     if (values && title) {
//       const parsedValues: SearchValues = JSON.parse(values);
//       setSearchValues(parsedValues);
      
//       // Trim and clean up the title to avoid extra quotes or spaces
//       const cleanedTitle = title.replace(/['"]+/g, '').trim(); // Remove any quotes and trim spaces
//       setSearchTitle(cleanedTitle);
  
//       let data: LookingForItem[] = [];
//       const normalizedTitle = cleanedTitle.toLowerCase();
  
//       if (normalizedTitle.includes("professional")) {
//         data = securityProfessionals;
//       } else if (normalizedTitle.includes("compan")) {
//         data = securityCompanies;
//       } else if (normalizedTitle.includes("train")) {
//         data = trainingProviders;
//       } else {
//         console.warn("Unknown title:", cleanedTitle);
//         data = securityProfessionals;
//       }
  
//       setLookingForData(data);
//     }
  
//     setIsLoaded(true);
//   }, [router]);
  

//   const handleBack = () => {
//     localStorage.removeItem("searchMode");
//     localStorage.removeItem("searchValues");
//     localStorage.removeItem("title");
//     router.back();
//   };

//   const handleRefineSearch = () => {
//     setShowSearchComponent(true);
//   };

//   const handleSearchSubmit = (newSearchValues: SearchValues) => {
//     setSearchValues(newSearchValues); // Update search values
//     localStorage.setItem("searchValues", JSON.stringify(newSearchValues)); // Optionally store in localStorage
//     setShowSearchComponent(false); // Close the search component after submitting
//   };

//   const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

//   if (!isLoaded) return null;
//   return (
//     <section className="relative w-full min-h-screen bg-gray-100 text-gray-900 px-4 md:px-8 lg:px-32 pt-24">
//       {/* Back Button */}
//       <div className="absolute top-24 left-4 z-20">
//         <button
//           className="flex items-center text-gray-600 hover:text-black transition-all"
//           onClick={handleBack}
//         >
//           <ArrowLeft className="w-6 h-6 mr-2" />
//         </button>
//       </div>
  
//       {/* Header */}
//       <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
//         Find <span className="text-black">{searchTitle || "Security Providers"}</span> Near You
//       </h1>
  
//       {/* Display Search Values */}
//       {searchValues && !showSearchComponent && (
//         <div className="relative z-10 w-full max-w-4xl mx-auto mb-6 bg-white p-6 rounded-lg shadow-lg">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {Object.entries(searchValues).map(([key, value]) => {
//               // Show only the basic fields if searchMode is "basic"
//               if (searchMode === "basic" && (key === "lookingFor" || key === "subCategory" || key === "postcode")) {
//                 return (
//                   <div key={key} className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
//                     <input
//                       type="text"
//                       readOnly
//                       value={value}
//                       className="w-full px-4 py-3 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none cursor-not-allowed transition duration-300"
//                     />
//                   </div>
//                 );
//               }
  
//               // Show all fields if searchMode is "advanced"
//               if (searchMode === "advanced") {
//                 return (
//                   <div key={key} className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
//                     <input
//                       type="text"
//                       readOnly
//                       value={value}
//                       className="w-full px-4 py-3 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none cursor-not-allowed transition duration-300"
//                     />
//                   </div>
//                 );
//               }
  
//               return null;
//             })}
//           </div>
//           <div className="flex justify-end mt-6">
//             <button
//               className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none transition duration-300"
//               onClick={handleRefineSearch}
//             >
//               <span className="mr-1">🔍</span> Refine Search
//             </button>
//           </div>
//         </div>
//       )}
  
//       {/* Show Search Component on Refine */}
//       {showSearchComponent && (
//         <div className="relative z-10 flex justify-center mb-6 w-full max-w-4xl mx-auto">
//           <SearchComponent
//             lookingForData={lookingForData}
//             searchData={searchData}
//             title={searchTitle || "Professionals"}
//             onSearchSubmit={handleSearchSubmit} // Pass the callback to handle the submit
//           />
//         </div>
//       )}
  
//       {/* Google Map */}
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
//         <h2 className="text-lg md:text-xl font-semibold mb-4">
//           Security Companies Near You
//         </h2>
//         <div className="h-80 sm:h-96 w-full rounded-md overflow-hidden border">
//           <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
//             <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={13}>
//               {markers.map((marker) => (
//                 <Marker key={marker.id} position={marker.position} title={marker.title} />
//               ))}
//             </GoogleMap>
//           </LoadScript>
//         </div>
//       </div>
//     </section>
//   );
  
// }











// "use client";

// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import SearchComponent from "@/sections/home/SearchComponent";
// import securityProfessionals from "@/sections/data/secuirty_professional.json";
// import securityCompanies from "@/sections/data/secuirty_services.json";
// import trainingProviders from "@/sections/data/training_providers.json";
// import searchData from "@/sections/data/hero_section.json";

// // ------------------ Interfaces ------------------

// interface MarkerData {
//   id: number;
//   position: {
//     lat: number;
//     lng: number;
//   };
//   title: string;
// }

// interface SearchValues {
//   lookingFor?: string;
//   jobTitle?: string;
//   experience?: string;
//   location?: string;
//   postcode?: string;
//   [key: string]: any;
// }

// interface LookingForItem {
//   title: string;
//   id: string;
//   roles: string[];
// }

// // ------------------ Component ------------------

// export default function ConnectingBusiness() {
//   const router = useRouter();
//     console.log("securityProfessionals",securityProfessionals)
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [profileData, setProfileData] = useState<any>(null);
//   const [searchValues, setSearchValues] = useState<SearchValues | null>(null);
//   const [lookingForData, setLookingForData] = useState<LookingForItem[]>([]);

//   const defaultCenter = { lat: 51.5074, lng: -0.1278 };

//   const markers: MarkerData[] = [
//     { id: 1, position: { lat: 51.5074, lng: -0.1278 }, title: "Security Company A" },
//     { id: 2, position: { lat: 51.511, lng: -0.12 }, title: "Security Company B" },
//     { id: 3, position: { lat: 51.505, lng: -0.13 }, title: "Security Company C" },
//   ];

//   useEffect(() => {
//     const searchMode = localStorage.getItem("searchMode");
//     const values = localStorage.getItem("searchValues");
//     const title = localStorage.getItem("title");

//     if (!searchMode) {
//       router.push("/");
//       return;
//     }

//     if (searchMode === "advanced") {
//       const storedData = localStorage.getItem("profileData") || localStorage.getItem("loginData");
//       if (storedData) {
//         setProfileData(JSON.parse(storedData));
//       } else {
//         router.push("/");
//         return;
//       }
//     }

//     if (values) {
//       const parsedValues: SearchValues = JSON.parse(values);
//       setSearchValues(parsedValues);
      

//       switch (title) {
//         case "Professionals":
//           setLookingForData(securityProfessionals);
//           break;
//         case "Security Companies":
//           setLookingForData(securityCompanies);
//           break;
//         case "Training Providers":
//           setLookingForData(trainingProviders);
//           break;
//         default:
//           setLookingForData([]);
//       }
//     }

//     setIsLoaded(true);
//   }, [router]);

//   const handleBack = () => {
//     localStorage.removeItem("searchMode");
//     localStorage.removeItem("searchValues");
//     localStorage.removeItem("title");
//     router.back();
//   };

//   const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

//   if (!isLoaded) return null;

//   return (
//     <section className="relative w-full min-h-screen bg-gray-100 text-gray-900 px-4 md:px-8 lg:px-32 pt-24">
//       {/* Back Button */}
//       <div className="absolute top-24 left-4 z-20">
//         <button
//           className="flex items-center text-gray-600 hover:text-black transition-all"
//           onClick={handleBack}
//         >
//           <ArrowLeft className="w-6 h-6 mr-2" />
          
//         </button>
//       </div>

//       {/* Header */}
//       <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
//         Find <span className="text-black">Security Providers</span> Near You
//       </h1>

//       {/* Search */}
//       <div className="relative z-10 flex justify-center mb-6">
//         <SearchComponent
//           lookingForData={lookingForData}
//           searchData={searchData}
//           title="Professionals"
//         />
//       </div>

//       {/* Google Map */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-lg md:text-xl font-semibold mb-4">
//           Security Companies Near You
//         </h2>
//         <div className="h-80 sm:h-96 w-full rounded-md overflow-hidden border">
//           <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
//             <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={13}>
//               {markers.map((marker) => (
//                 <Marker key={marker.id} position={marker.position} title={marker.title} />
//               ))}
//             </GoogleMap>
//           </LoadScript>
//         </div>
//       </div>
//     </section>
//   );
// }








// "use client";

// import React, { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import SearchComponent from "@/sections/home/SearchComponent";
// import securityProfessionals from "@/sections/data/secuirty_professional.json";
// import securityCompanies from "@/sections/data/secuirty_services.json";
// import trainingProviders from "@/sections/data/training_providers.json";
// import heroFields from "@/sections/data/hero_section.json";

// // ------------------ Interfaces ------------------

// interface MarkerData {
//   id: number;
//   position: {
//     lat: number;
//     lng: number;
//   };
//   title: string;
// }

// interface SearchValues {
//   lookingFor?: string;
//   jobTitle?: string;
//   experience?: string;
//   location?: string;
//   postcode?: string;
//   [key: string]: any;
// }

// interface FieldData {
//   distance: string[];
//   experience: string[];
// }

// // ------------------ Component ------------------

// const ConnectingBusiness: React.FC = () => {
//   const router = useRouter();

//   const [isLoaded, setIsLoaded] = useState(false);
//   const [profileData, setProfileData] = useState<any>(null);
//   const [searchValues, setSearchValues] = useState<SearchValues | null>(null);
//   const [lookingForData, setLookingForData] = useState<any[]>([]);
//   const [searchData, setSearchData] = useState<FieldData>({
//     distance: [],
//     experience: [],
//   });

//   const defaultCenter = { lat: 51.5074, lng: -0.1278 };

//   const markers: MarkerData[] = [
//     { id: 1, position: { lat: 51.5074, lng: -0.1278 }, title: "Security Company A" },
//     { id: 2, position: { lat: 51.511, lng: -0.12 }, title: "Security Company B" },
//     { id: 3, position: { lat: 51.505, lng: -0.13 }, title: "Security Company C" },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoaded(true);

//       const searchMode = localStorage.getItem("searchMode");
//       const values = localStorage.getItem("searchValues");
//       const title = localStorage.getItem("title");

//       if (!searchMode) {
//         router.push("/");
//         return;
//       }

//       if (searchMode === "advanced") {
//         const storedData = localStorage.getItem("profileData") || localStorage.getItem("loginData");
//         if (storedData) {
//           setProfileData(JSON.parse(storedData));
//         } else {
//           router.push("/");
//           return;
//         }
//       }

//       if (values) {
//         const parsedValues: SearchValues = JSON.parse(values);
//         setSearchValues(parsedValues);

//         try {

//           switch (title) {
//             case "Professionals":
//               setLookingForData(securityProfessionals);
//               break;
//             case "Security Companies":
//               setLookingForData(securityCompanies);
//               break;
//             case "Training Providers":
//               setLookingForData(trainingProviders);
//               break;
//             default:
//               setLookingForData([]);
//           }

//         } catch (err) {
//           console.error("Error loading JSON data:", err);
//         }
//       }
//     };

//     fetchData();
//   }, [router]);

//   if (!isLoaded) return null;

//   const searchMode = typeof window !== "undefined" ? localStorage.getItem("searchMode") : null;
//   if (!searchMode || (searchMode === "advanced" && !profileData)) {
//     return null;
//   }

//   const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

//   return (
//     <div style={{ marginTop: "90px" }} className="min-h-screen bg-gray-100 p-4 md:p-8 lg:px-32">
//       {/* Back Button */}
//       <div className="absolute top-4 left-4 mt-18 flex items-center text-gray-600 hover:text-black">
//         <button
//           className="flex items-center text-gray-600 hover:text-black transition-all duration-200 mb-6"
//           onClick={() => {
//             localStorage.removeItem("searchMode");
//             localStorage.removeItem("searchValues");
//             localStorage.removeItem("title");
//             router.back();
//           }}
//         >
//           <ArrowLeft className="w-6 h-6 mr-2" />
//         </button>
//       </div>

//       {/* Header */}
//       <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
//         Find <span className="text-black">Security Providers</span> Near You
//       </h1>

//       {/* Search Section */}
//       <div className="flex justify-center p-2 mb-6">
//           <SearchComponent
//             lookingForData={lookingForData}
//             searchData={searchData}
//             title={"Professionals"}
//           />
//       </div>

//       {/* Google Map Section */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
//           Security Companies Near You
//         </h2>
//         <div className="h-80 sm:h-96 w-full rounded-md overflow-hidden border">
//           {isLoaded && (
//             <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
//               <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={13}>
//                 {markers.map((marker) => (
//                   <Marker key={marker.id} position={marker.position} title={marker.title} />
//                 ))}
//               </GoogleMap>
//             </LoadScript>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConnectingBusiness;






// "use client";

// import React, { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { FaSearch, FaMapMarkerAlt, FaFilter, FaBuilding, FaRoute } from "react-icons/fa";
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import SearchComponent from "@/sections/home/SearchComponent";
// const ConnectingBusiness = () => {
//     const router = useRouter();
//     const [isLoaded, setIsLoaded] = useState(false);

//     const [profileData, setProfileData] = useState<any>(null);

//     // Default map center (London)
//     const defaultCenter = { lat: 51.5074, lng: -0.1278 };

//     // Sample markers
//     const markers = [
//         { id: 1, position: { lat: 51.5074, lng: -0.1278 }, title: "Security Company A" },
//         { id: 2, position: { lat: 51.511, lng: -0.12 }, title: "Security Company B" },
//         { id: 3, position: { lat: 51.505, lng: -0.13 }, title: "Security Company C" },
//     ];
//     useEffect(() => {
//         setIsLoaded(true);
        
//         const searchMode = localStorage.getItem("searchMode");
        
//         // If there's NO searchMode at all, redirect immediately
//         if (!searchMode) {
//           router.push("/"); // or your preferred redirect path
//           return;
//         }
        
//         // For advanced search only, we require profile data
//         if (searchMode === "advanced") {
//           const storedData = localStorage.getItem("profileData") || localStorage.getItem("loginData");
          
//           if (storedData) {
//             setProfileData(JSON.parse(storedData));
//           } else {
//             router.push("/"); // Redirect if no profile data for advanced search
//           }
//         }
//       }, [router]);
      
//       // Render conditions:
//       if (!isLoaded) {
//         return null; // Wait for initial load
//       }
      
//       const searchMode = localStorage.getItem("searchMode");
      
//       // Block rendering if:
//       // 1. No searchMode exists, or
//       // 2. It's advanced mode but no profileData
//       if (!searchMode || (searchMode === "advanced" && !profileData)) {
//         return null;
//       }

//     // Ensure the map has a proper height
//     const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

//     return (
//         <div style={{ marginTop: '90px' }} className="min-h-screen bg-gray-100 p-4 md:p-8 lg:px-32">
//             <div className="absolute top-4 left-4 mt-18 flex items-center text-gray-600 hover:text-black">
//                 <button
//                     className="flex items-center text-gray-600 hover:text-black transition-all duration-200 mb-6"
//                     onClick={() => {
//                         // Remove searchMode from localStorage when back button is clicked
//                         localStorage.removeItem("searchMode");
//                         localStorage.removeItem("searchValues");
//                         router.back();
//                     }}
//                 >
//                     <ArrowLeft className="w-6 h-6 mr-2" />
//                 </button>
//             </div>
       
//             {/* Header */}
//             <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
//                 Find <span className="text-black">Security Providers</span> Near You
//             </h1>

//             {/* Search Form - Responsive */}
//             <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
//                <div className="relative z-10 flex justify-center w-full my-40">
//                       <SearchComponent
//                         lookingForData={lookingForData}
//                         searchData={searchData}
//                         title="Professionals"
//                       />
//                 </div>
              
     
//             </div>

//             {/* Google Map Section */}
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Security Companies Near You</h2>
//                 <div className="h-80 sm:h-96 w-full rounded-md overflow-hidden border">
//                     {isLoaded && (
//                         <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
//                             <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={13}>
//                                 {markers.map((marker) => (
//                                     <Marker key={marker.id} position={marker.position} title={marker.title} />
//                                 ))}
//                             </GoogleMap>
//                         </LoadScript>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ConnectingBusiness;

     {/* <div className="absolute top-4 left-4 mt-18 flex items-center text-gray-600 hover:text-black">
          <button
            className="flex items-center text-gray-600 hover:text-black transition-all duration-200 mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
          </button>
        </div> */}

           {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-900 font-medium flex items-center gap-2">
                            <FaBuilding /> I'm looking for
                        </label>
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-black"
                        >
                            <option value="SECURITY COMPANY">SECURITY COMPANY</option>
                            <option value="SECURITY GUARD">SECURITY GUARD</option>
                            <option value="ALARM SYSTEM">ALARM SYSTEM</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-900 font-medium flex items-center gap-2">
                            <FaRoute /> Within
                        </label>
                        <select
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-black"
                        >
                            <option value="5 Miles">5 Miles</option>
                            <option value="10 Miles">10 Miles</option>
                            <option value="25 Miles">25 Miles</option>
                            <option value="50 Miles">50 Miles</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-900 font-medium flex items-center gap-2">
                            <FaMapMarkerAlt /> Postcode
                        </label>
                        <input
                            type="text"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            placeholder="Enter Postcode"
                            className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-900 font-medium flex items-center gap-2">
                            <FaFilter /> Filter Results
                        </label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-black"
                        >
                            <option>All Results</option>
                            <option>Top Rated</option>
                            <option>Most Affordable</option>
                            <option>24/7 Available</option>
                        </select>
                    </div>


                    <div className="flex items-end">
                        <button
                            className="w-full py-3 bg-gradient-to-r from-black to-gray-900 text-white rounded-md font-medium hover:from-gray-800 hover:to-gray-900 transition flex justify-center items-center gap-2"
                            onClick={() => console.log("Search Submitted")}
                        >
                            <FaSearch /> Search
                        </button>
                    </div>
                </div> */}
// "use client";

// import React, { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const ConnectingBusiness = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [searchType, setSearchType] = useState<string>("SECURITY COMPANY");
//   const [distance, setDistance] = useState<string>("5 Miles");
//   const [postcode, setPostcode] = useState<string>("");
//   const [filter, setFilter] = useState<string>("All Results");

//   // Default map center (London)
//   const defaultCenter = { lat: 51.5074, lng: -0.1278 };

//   // Sample markers
//   const markers = [
//     { id: 1, position: { lat: 51.5074, lng: -0.1278 }, title: "Security Company A" },
//     { id: 2, position: { lat: 51.511, lng: -0.12 }, title: "Security Company B" },
//     { id: 3, position: { lat: 51.505, lng: -0.13 }, title: "Security Company C" },
//   ];

//   // Load Google Maps only on the client side
//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);

//   // Ensure the map has a proper height
//   const mapStyles = { width: "100%", height: "400px", borderRadius: "8px" };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <h1 className="text-2xl font-bold mb-6">Find Security Providers Near You</h1>

//       {/* Search Form */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <div className="mb-4">
//           <label className="block text-lg font-medium text-gray-700 mb-2">
//             I'm looking for a...
//           </label>
//           <select
//             value={searchType}
//             onChange={(e) => setSearchType(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="SECURITY COMPANY">SECURITY COMPANY</option>
//             <option value="SECURITY GUARD">SECURITY GUARD</option>
//             <option value="ALARM SYSTEM">ALARM SYSTEM</option>
//           </select>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 mb-4">
//           <div className="flex-1">
//             <label className="block text-lg font-medium text-gray-700 mb-2">Within</label>
//             <select
//               value={distance}
//               onChange={(e) => setDistance(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="5 Miles">5 Miles</option>
//               <option value="10 Miles">10 Miles</option>
//               <option value="25 Miles">25 Miles</option>
//               <option value="50 Miles">50 Miles</option>
//             </select>
//           </div>

//           <div className="flex-1">
//             <label className="block text-lg font-medium text-gray-700 mb-2">Postcode</label>
//             <input
//               type="text"
//               value={postcode}
//               onChange={(e) => setPostcode(e.target.value)}
//               placeholder="Enter Postcode"
//               className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-lg font-medium text-gray-700 mb-2">Filter Results</label>
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//           >
//             <option>All Results</option>
//             <option>Top Rated</option>
//             <option>Most Affordable</option>
//             <option>24/7 Available</option>
//           </select>
//         </div>

//         <button
//           className="w-full mt-4 p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           onClick={() => console.log("Search Submitted")}
//         >
//           Search
//         </button>
//       </div>

//       {/* Google Map */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Security Companies Near You</h2>
//         <div className="h-96 w-full rounded-md overflow-hidden">
//           {isLoaded && (
//             <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
//               <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={13}>
//                 {markers.map((marker) => (
//                   <Marker key={marker.id} position={marker.position} title={marker.title} />
//                 ))}
//               </GoogleMap>
//             </LoadScript>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConnectingBusiness;
