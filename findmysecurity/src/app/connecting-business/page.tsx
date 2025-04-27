"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import securityProfessionals from "@/sections/data/secuirty_professional.json";
import securityCompanies from "@/sections/data/secuirty_services.json";
import trainingProviders from "@/sections/data/training_providers.json";
import searchData from "@/sections/data/hero_section.json";
import SearchComponent from "@/sections/home/SearchComponent";
import SearchValuesDisplay from "./components/SearchValuesDisplay";
import ProfessionalsList from "./components/ProfessionalsList";
import MapSection from "./components/MapSection";
import BackButton from './BackButton'
import { ApiResponse, SearchValues, LookingForItem } from "./types";

export default function ConnectingBusiness() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [searchValues, setSearchValues] = useState<SearchValues | null>(null);
  const [lookingForData, setLookingForData] = useState<LookingForItem[]>([]);
  const [showSearchComponent, setShowSearchComponent] = useState(false);
  const [searchTitle, setSearchTitle] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<string>("basic");
  const [hideExperience, setHideExperience] = useState(false);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch professionals data
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          "https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/users/professionals"
        );
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data: ApiResponse = await response.json();
        setApiData(data);
      } catch (err) {
        console.error("Error fetching professionals:", err);
        setError("Failed to load professionals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  // Load search settings from localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem("searchMode");
    if (storedMode === "basic" || storedMode === "advanced") {
      setSearchMode(storedMode);
    } else {
      setSearchMode("basic");
    }
    
    const values = localStorage.getItem("searchValues");
    const title = localStorage.getItem("title");

    if (!storedMode) {
      router.push("/");
      return;
    }

    if (storedMode === "advanced") {
      const storedData = localStorage.getItem("profileData") || localStorage.getItem("loginData");
      if (storedData) setProfileData(JSON.parse(storedData));
      else {
        router.push("/");
        return;
      }
    }

    if (values && title) {
      const parsedValues: SearchValues = JSON.parse(values);
      setSearchValues(parsedValues);
      const cleanedTitle = title.replace(/['"]+/g, "").trim();
      setSearchTitle(cleanedTitle);

      // Set appropriate data based on title
      let data: LookingForItem[] = [];
      const normalizedTitle = cleanedTitle.toLowerCase();

      if (normalizedTitle.includes("professional")) {
        data = securityProfessionals;
        setHideExperience(false);
      } else if (normalizedTitle.includes("compan")) {
        data = securityCompanies;
        setHideExperience(true);
      } else if (normalizedTitle.includes("train")) {
        data = trainingProviders;
        setHideExperience(true);
      } else {
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

  const handleRefineSearch = () => setShowSearchComponent(true);

  const handleSearchSubmit = (newSearchValues: SearchValues) => {
    setSearchValues(newSearchValues);
    localStorage.setItem("searchValues", JSON.stringify(newSearchValues));
    setShowSearchComponent(false);
  };

  const handleSearchModeChange = (mode: "basic" | "advanced") => {
    setSearchMode(mode);
    localStorage.setItem("searchMode", mode);
  };

  if (!isLoaded) return null;

  return (
    <section className="relative w-full min-h-screen bg-gray-100 text-gray-900 px-4 sm:px-6 md:px-10 lg:px-32 pt-24 pb-16">
      <BackButton onClick={handleBack} />
      
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center mb-10 leading-tight">
        Find <span className="text-black">{searchTitle || "Security Professionals"}</span> Near You
      </h1>

      {showSearchComponent && (
        <div className="relative z-10 flex justify-center mb-8 w-full max-w-4xl mx-auto">
          <SearchComponent
            lookingForData={lookingForData}
            searchData={searchData}
            title={searchTitle || "Professionals"}
            searchMode={searchMode as "basic" | "advanced"}
            onSearchSubmit={handleSearchSubmit}
            onSearchModeChange={handleSearchModeChange}
            hideExperienceField={hideExperience} 
          />
        </div>
      )}

      {searchValues && !showSearchComponent && (
        <SearchValuesDisplay 
          searchValues={searchValues}
          searchMode={searchMode}
          isCompanyOrTraining={searchTitle?.toLowerCase().includes("compan") || searchTitle?.toLowerCase().includes("train")}
          onRefineSearch={handleRefineSearch}
        />
      )}

      <ProfessionalsList 
        apiData={apiData}
        loading={loading}
        error={error}
      />

      <MapSection professionals={apiData?.professionals || []} />
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

// interface MarkerData {
//   id: number;
//   position: { lat: number; lng: number };
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

// interface Professional {
//   id: number;
//   userId: number;
//   user: {
//     id: number;
//     firstName: string;
//     lastName: string;
//     screenName: string;
//     phoneNumber: string;
//     address: string;
//     email: string;
//     validated: boolean;
//   };
//   profileData?: {
//     fees?: {
//       hourlyRate?: string;
//       description?: string;
//     };
//     about?: {
//       aboutMe?: string;
//       experience?: string;
//       qualifications?: string;
//     };
//     services?: {
//       selectedServices?: string[];
//       otherService?: string;
//     };
//     basicInfo?: {
//       screenName?: string;
//       profileHeadline?: string;
//       postcode?: string;
//     };
//     availability?: {
//       description?: string;
//     };
//   };
//   createdAt: string;
// }

// interface ApiResponse {
//   totalCount: number;
//   page: number;
//   pageSize: number;
//   professionals: Professional[];
// }

// export default function ConnectingBusiness() {
//   const router = useRouter();
//   const initialSearchMode: "basic" | "advanced" = "basic";
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [profileData, setProfileData] = useState<any>(null);
//   const [searchValues, setSearchValues] = useState<SearchValues | null>(null);
//   const [lookingForData, setLookingForData] = useState<LookingForItem[]>([]);
//   const [showSearchComponent, setShowSearchComponent] = useState(false);
//   const [searchTitle, setSearchTitle] = useState<string | null>(null);
//   const [searchMode, setSearchMode] = useState<string>(initialSearchMode);
//   const [hideExperience, setHideExperience] = useState(false);
//   const [apiData, setApiData] = useState<ApiResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const defaultCenter = { lat: 51.5074, lng: -0.1278 };
//   const [markers, setMarkers] = useState<MarkerData[]>([]);

//   useEffect(() => {
//     const fetchProfessionals = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch(
//           "https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/users/professionals"
//         );
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data: ApiResponse = await response.json();
//         setApiData(data);
        
//         // Create markers from professionals data
//         const newMarkers = data.professionals
//           .filter(pro => pro.user.address) // Only create markers for professionals with addresses
//           .map((pro, index) => ({
//             id: index,
//             position: {
//               lat: defaultCenter.lat + (Math.random() * 0.02 - 0.01),
//               lng: defaultCenter.lng + (Math.random() * 0.02 - 0.01)
//             },
//             title: pro.user.firstName + " " + pro.user.lastName
//           }));
        
//         setMarkers(newMarkers);
//       } catch (err) {
//         console.error("Error fetching professionals:", err);
//         setError("Failed to load professionals. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfessionals();
//   }, []);

//   useEffect(() => {
//     const storedMode = localStorage.getItem("searchMode");

//     if (storedMode === "basic" || storedMode === "advanced") {
//       setSearchMode(storedMode);
//     } else {
//       setSearchMode("basic");
//     }
    
//     const values = localStorage.getItem("searchValues");
//     const title = localStorage.getItem("title");

//     if (!storedMode) {
//       router.push("/");
//       return;
//     }

//     if (storedMode === "advanced") {
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
//       const cleanedTitle = title.replace(/['"]+/g, "").trim();
//       setSearchTitle(cleanedTitle);

//       let data: LookingForItem[] = [];
//       const normalizedTitle = cleanedTitle.toLowerCase();

//       if (normalizedTitle.includes("professional")) {
//         data = securityProfessionals;
//         setHideExperience(false);
//       } else if (normalizedTitle.includes("compan")) {
//         data = securityCompanies;
//         setHideExperience(true);
//       } else if (normalizedTitle.includes("train")) {
//         data = trainingProviders;
//         setHideExperience(true);
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
//     setSearchValues(newSearchValues);
//     localStorage.setItem("searchValues", JSON.stringify(newSearchValues));
//     setShowSearchComponent(false);
//   };

//   const handleSearchModeChange = (mode: "basic" | "advanced") => {
//     setSearchMode(mode);
//     localStorage.setItem("searchMode", mode);
//   };

//   const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

//   if (!isLoaded) return null;

//   const lowerTitle = (searchTitle || "").toLowerCase();
//   const isCompanyOrTraining = lowerTitle.includes("compan") || lowerTitle.includes("train");

//   // Function to get display name for a professional
//   const getDisplayName = (professional: Professional) => {
//     if (professional.profileData?.basicInfo?.screenName) {
//       return professional.profileData.basicInfo.screenName;
//     }
//     return `${professional.user.firstName} ${professional.user.lastName}`;
//   };

//   // Function to get hourly rate
//   const getHourlyRate = (professional: Professional) => {
//     if (professional.profileData?.fees?.hourlyRate) {
//       return `£${professional.profileData.fees.hourlyRate}/hr`;
//     }
//     return "Rate not specified";
//   };

//   // Function to get services
//   const getServices = (professional: Professional) => {
//     if (professional.profileData?.services?.selectedServices) {
//       return professional.profileData.services.selectedServices.join(", ");
//     }
//     return "Services not specified";
//   };

//   return (
//     <section className="relative w-full min-h-screen bg-gray-100 text-gray-900 px-4 sm:px-6 md:px-10 lg:px-32 pt-24 pb-16">
//       {/* Back Button */}
//       <div className="absolute top-24 left-6 z-20">
//         <button className="flex items-center text-gray-600 hover:text-black transition-all" onClick={handleBack}>
//           <ArrowLeft className="w-5 h-5 mr-2" />
//         </button>
//       </div>

//       {/* Page Title */}
//       <h1 className="text-3xl lg:text-4xl font-extrabold text-center mb-10 leading-tight">
//         Find <span className="text-black">{searchTitle || "Security Professionals"}</span> Near You
//       </h1>

//       {/* Search Component */}
//       {showSearchComponent && (
//         <div className="relative z-10 flex justify-center mb-8 w-full max-w-4xl mx-auto">
//           <SearchComponent
//             lookingForData={lookingForData}
//             searchData={searchData}
//             title={searchTitle || "Professionals"}
//             searchMode={searchMode as "basic" | "advanced"}
//             onSearchSubmit={handleSearchSubmit}
//             onSearchModeChange={handleSearchModeChange}
//             hideExperienceField={hideExperience} 
//           />
//         </div>
//       )}

//       {/* Search Values Display */}
//       {searchValues && !showSearchComponent && (
//         <div className="relative z-10 w-full max-w-4xl mx-auto mb-10 bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {Object.entries(searchValues).map(([key, value]) => {
//               if (key === "experience" && isCompanyOrTraining) return null;

//               if (searchMode === "basic" && (key === "lookingFor" || key === "subCategory" || key === "postcode")) {
//                 return (
//                   <div key={key} className="space-y-1">
//                     <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
//                     <input
//                       type="text"
//                       readOnly
//                       value={value}
//                       className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none cursor-not-allowed transition"
//                     />
//                   </div>
//                 );
//               }

//               if (searchMode === "advanced") {
//                 return (
//                   <div key={key} className="space-y-1">
//                     <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
//                     <input
//                       type="text"
//                       readOnly
//                       value={value}
//                       className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none cursor-not-allowed transition"
//                     />
//                   </div>
//                 );
//               }

//               return null;
//             })}
//             {/* Refine Search Button */}
//             {!showSearchComponent && (
//               <div className="flex justify-center -ml-24 mt-6">
//                 <button
//                   className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 hover:scale-105 transition-all duration-300"
//                   onClick={handleRefineSearch}
//                 >
//                   🔍 Refine Search
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Professionals List Section */}
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mb-10">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg md:text-xl font-semibold">
//             Available Professionals {apiData && `(${apiData.totalCount} found)`}
//           </h2>
//         </div>
        
//         {loading && (
//           <div className="flex justify-center items-center py-10">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
//           </div>
//         )}
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             {error}
//           </div>
//         )}
        
//       {!loading && apiData && apiData.professionals.length > 0 && (
//   <div className="grid grid-cols-1 gap-6">
//     {apiData.professionals.map((professional) => (
//       <div key={professional.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all bg-white hover:bg-gray-50">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div className="flex-1">
//             <h3 className="font-bold text-xl text-gray-900">{getDisplayName(professional)}</h3>
//             {professional.profileData?.basicInfo?.profileHeadline && (
//               <p className="text-gray-600 mt-1">{professional.profileData.basicInfo.profileHeadline}</p>
//             )}
            
//             <div className="mt-3 flex flex-wrap gap-2">
//               {professional.profileData?.services?.selectedServices?.slice(0, 3).map((service, index) => (
//                 <span key={index} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-200">
//                   {service}
//                 </span>
//               ))}
//               {professional.profileData?.services?.selectedServices && 
//                 professional.profileData.services.selectedServices.length > 3 && (
//                 <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-200">
//                   +{professional.profileData.services.selectedServices.length - 3} more
//                 </span>
//               )}
//             </div>
            
//             {professional.user.address && (
//               <p className="text-sm text-gray-500 mt-3 flex items-center">
//                 <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 {professional.user.address}
//               </p>
//             )}
//           </div>
          
//           <div className="flex flex-col items-end">
//             <span className="text-lg font-semibold text-gray-900">
//               {getHourlyRate(professional)}
//             </span>
//             {professional.profileData?.about?.experience && (
//               <span className="text-sm text-gray-500 mt-1">
//                 {professional.profileData.about.experience} experience
//               </span>
//             )}
//             <button className="mt-3 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors shadow-sm">
//               View Profile
//             </button>
//           </div>
//         </div>
        
//         {professional.profileData?.about?.aboutMe && (
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <h4 className="font-medium text-gray-900">About</h4>
//             <p className="text-gray-600 mt-1 line-clamp-2">
//               {professional.profileData.about.aboutMe}
//             </p>
//           </div>
//         )}
//       </div>
//     ))}
//   </div>
// )}

// {!loading && apiData && apiData.professionals.length === 0 && (
//   <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-gray-200">
//     No professionals found matching your criteria.
//   </div>
// )}
//       </div>

//       {/* Google Map Section */}
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mb-10">
//         <h2 className="text-lg md:text-xl font-semibold mb-4">Security Professionals Locations</h2>
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

// interface MarkerData {
//   id: number;
//   position: { lat: number; lng: number };
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

// export default function ConnectingBusiness() {
//   const router = useRouter();
//   const initialSearchMode: "basic" | "advanced" = "basic";
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [profileData, setProfileData] = useState<any>(null);
//   const [searchValues, setSearchValues] = useState<SearchValues | null>(null);
//   const [lookingForData, setLookingForData] = useState<LookingForItem[]>([]);
//   const [showSearchComponent, setShowSearchComponent] = useState(false);
//   const [searchTitle, setSearchTitle] = useState<string | null>(null);
//   const [searchMode, setSearchMode] = useState<string>(initialSearchMode);
//   const [hideExperience, setHideExperience] = useState(false);

//   const defaultCenter = { lat: 51.5074, lng: -0.1278 };
//   const markers: MarkerData[] = [
//     { id: 1, position: { lat: 51.5074, lng: -0.1278 }, title: "Security Company A" },
//     { id: 2, position: { lat: 51.511, lng: -0.12 }, title: "Security Company B" },
//     { id: 3, position: { lat: 51.505, lng: -0.13 }, title: "Security Company C" },
//   ];

//   useEffect(() => {
//     const storedMode = localStorage.getItem("searchMode");

//     if (storedMode === "basic" || storedMode === "advanced") {
//       setSearchMode(storedMode); // ✅ Now TypeScript is happy
//     } else {
//       setSearchMode("basic"); // optional fallback
//     }
//     const values = localStorage.getItem("searchValues");
//     const title = localStorage.getItem("title");

//     if (!storedMode) {
//       router.push("/");
//       return;
//     }


//     if (storedMode === "advanced") {
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
//       const cleanedTitle = title.replace(/['"]+/g, "").trim();
//       setSearchTitle(cleanedTitle);

//       let data: LookingForItem[] = [];
//       const normalizedTitle = cleanedTitle.toLowerCase();

//       if (normalizedTitle.includes("professional")) {
//         data = securityProfessionals;
//         setHideExperience(false);
//       } else if (normalizedTitle.includes("compan")) {
//         data = securityCompanies;
//         setHideExperience(true);
//       } else if (normalizedTitle.includes("train")) {
//         data = trainingProviders;
//         setHideExperience(true);
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
//     setSearchValues(newSearchValues);
//     localStorage.setItem("searchValues", JSON.stringify(newSearchValues));
//     setShowSearchComponent(false);
//   };

//   const handleSearchModeChange = (mode: "basic" | "advanced") => {
//     setSearchMode(mode);
//     localStorage.setItem("searchMode", mode);
//   };

//   const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

//   if (!isLoaded) return null;

//   const lowerTitle = (searchTitle || "").toLowerCase();
//   const isCompanyOrTraining = lowerTitle.includes("compan") || lowerTitle.includes("train");

//   return (
//     <section className="relative w-full min-h-screen bg-gray-100 text-gray-900 px-4 sm:px-6 md:px-10 lg:px-32 pt-24 pb-16">
//       {/* Back Button */}
//       <div className="absolute top-24 left-6 z-20">
//         <button className="flex items-center text-gray-600 hover:text-black transition-all" onClick={handleBack}>
//           <ArrowLeft className="w-5 h-5 mr-2" />
//         </button>
//       </div>

//       {/* Page Title */}
//       <h1 className="text-3xl lg:text-4xl font-extrabold text-center mb-10 leading-tight">
//         Find <span className="text-black">{searchTitle || "Security Providers"}</span> Near You
//       </h1>

//       {/* Search Component */}
//       {showSearchComponent && (
//         <div className="relative z-10 flex justify-center mb-8 w-full max-w-4xl mx-auto">
//           <SearchComponent
//             lookingForData={lookingForData}
//             searchData={searchData}
//             title={searchTitle || "Professionals"}
//             searchMode={searchMode as "basic" | "advanced"}
//             onSearchSubmit={handleSearchSubmit}
//             onSearchModeChange={handleSearchModeChange}
//             hideExperienceField={hideExperience} 
            
//           />
//         </div>
//       )}

//       {/* Search Values Display */}
//       {searchValues && !showSearchComponent && (
//         <div className="relative z-10 w-full max-w-4xl mx-auto mb-10 bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {Object.entries(searchValues).map(([key, value]) => {
//               if (key === "experience" && isCompanyOrTraining) return null;

//               if (searchMode === "basic" && (key === "lookingFor" || key === "subCategory" || key === "postcode")) {
//                 return (
//                   <div key={key} className="space-y-1">
//                     <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
//                     <input
//                       type="text"
//                       readOnly
//                       value={value}
//                       className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none cursor-not-allowed transition"
//                     />
//                   </div>
//                 );
//               }

//               if (searchMode === "advanced") {
//                 return (
//                   <div key={key} className="space-y-1">
//                     <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
//                     <input
//                       type="text"
//                       readOnly
//                       value={value}
//                       className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none cursor-not-allowed transition"
//                     />
//                   </div>
//                 );
//               }

//               return null;
//             })}
//             {/* Refine Search Button */}
//             {!showSearchComponent && (
//               <div className="flex justify-center -ml-24 mt-6">
//               <button
//   className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 hover:scale-105 transition-all duration-300"
//   onClick={handleRefineSearch}
// >
//   🔍 Refine Search
// </button>

//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Google Map Section */}
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mb-10">
//         <h2 className="text-lg md:text-xl font-semibold mb-4">Security Companies Near You</h2>
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



