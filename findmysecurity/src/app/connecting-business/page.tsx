"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FaSearch, FaMapMarkerAlt, FaFilter, FaBuilding, FaRoute } from "react-icons/fa";
import { ArrowLeft} from "lucide-react";
import { useRouter } from "next/navigation";
const ConnectingBusiness = () => {
  const router = useRouter();  
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchType, setSearchType] = useState<string>("SECURITY COMPANY");
  const [distance, setDistance] = useState<string>("5 Miles");
  const [postcode, setPostcode] = useState<string>("");
  const [filter, setFilter] = useState<string>("All Results");
  const [profileData, setProfileData] = useState<any>(null);

  // Default map center (London)
  const defaultCenter = { lat: 51.5074, lng: -0.1278 };

  // Sample markers
  const markers = [
    { id: 1, position: { lat: 51.5074, lng: -0.1278 }, title: "Security Company A" },
    { id: 2, position: { lat: 51.511, lng: -0.12 }, title: "Security Company B" },
    { id: 3, position: { lat: 51.505, lng: -0.13 }, title: "Security Company C" },
  ];

  // Load Google Maps only on the client side
  useEffect(() => {
    setIsLoaded(true);
    const storedData =
    localStorage.getItem("profileData") || localStorage.getItem("loginData");
  if (storedData) {
    setProfileData(JSON.parse(storedData));
  } else {
    router.push("/"); // Redirect if no profile data is found
  }
  }, [router]);
  if (!profileData) return null;

  // Ensure the map has a proper height
  const mapStyles = { width: "100%", height: "400px", borderRadius: "12px" };

  return (
    <div style={{marginTop:'90px'}} className="min-h-screen bg-gray-100 p-4 md:p-8 lg:px-32">
        <div className="absolute top-4 left-4 mt-18 flex items-center text-gray-600 hover:text-black">
          <button
            className="flex items-center text-gray-600 hover:text-black transition-all duration-200 mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
          </button>
        </div>
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
        Find <span className="text-black">Security Providers</span> Near You
      </h1>

      {/* Search Form - Responsive */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Search Type */}
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

          {/* Distance */}
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

          {/* Postcode */}
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

          {/* Filter */}
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

          {/* Search Button */}
          <div className="flex items-end">
            <button
              className="w-full py-3 bg-gradient-to-r from-black to-gray-900 text-white rounded-md font-medium hover:from-gray-800 hover:to-gray-900 transition flex justify-center items-center gap-2"
              onClick={() => console.log("Search Submitted")}
            >
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Security Companies Near You</h2>
        <div className="h-80 sm:h-96 w-full rounded-md overflow-hidden border">
          {isLoaded && (
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
              <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={13}>
                {markers.map((marker) => (
                  <Marker key={marker.id} position={marker.position} title={marker.title} />
                ))}
              </GoogleMap>
            </LoadScript>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectingBusiness;




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
