"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaSearch, FaMapMarkerAlt, FaFilter, FaBuilding, FaRoute } from "react-icons/fa";
import { FaStar, FaRegStar, FaThumbsUp, FaListUl } from "react-icons/fa";
// Define the default data structure
const defaultData = {
  screenName: "",
  postcode: "London",
  profileHeadline: "",
  selectedServices: [],
  otherService: "",
  gender: "",
  aboutMe: "",
  experience: "",
  availability: "",
  selectedDates: [],
  qualifications: "",
  hourlyRate: "",
  profilePhoto: null,
  homeTelephone: "",
  mobileTelephone: "",
  website: ""
};

const ViewJobs: React.FC = () => {
  const router = useRouter();

  const [searchType, setSearchType] = useState<string>("SECURITY COMPANY");
  const [distance, setDistance] = useState<string>("5 Miles");
  const [postcode, setPostcode] = useState<string>("");
  const [filter, setFilter] = useState<string>("All Results");

  const [jobData, setJobData] = useState<any>(defaultData); // State to hold the job data

  // Use useEffect to fetch data from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("jobPostingFormData");
    if (storedData) {
      setJobData(JSON.parse(storedData)); // Parse and set data from localStorage
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      searchType,
      distance,
      postcode,
      filter
    });
  };
  const profileData = {
    name: "Mr. X",
    title: "Security Officer in London",
    rate: "From £14.00/hour",
    responseTime: "Usually responds within 12 hours",
    description: "A well-trained SIA Close Protection Officer with over 10 years of experience in the security industry, specialising in high-risk environments, VIP protection, and threat assessment. Adapt at risk mitigation, conflict resolution, and crisis management, ensuring the safety and security of clients at all times. Highly skilled in physical intervention, surveillance, and defensive tactics, with a strong ability to assess security threats in real-time. Experienced in working with high-profile individuals, ......",
    lastLogin: "Logged in 29 January 25",
    rating: 4.5,
    reviews: 12,
    profileImage: "/profile-placeholder.jpg" // Replace with your image path
  };

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div style={{ marginTop: "90px" }} className="min-h-screen bg-gray-100 p-4 md:p-8 lg:px-32">
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
      {/* Display job data */}
      <div className="mb-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <img 
            src={profileData.profileImage} 
            alt={profileData.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{profileData.name}</h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{profileData.title}</h2>
          <p className="text-lg font-medium text-blue-600 mb-2">{profileData.rate}</p>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-2">❶</span>
        <p className="text-gray-700">{profileData.responseTime}</p>
      </div>
      
      <p className="text-gray-600 mb-6 whitespace-pre-line">{profileData.description}</p>

      {/* Rating Section */}
      <div className="flex items-center mb-4">
        <div className="flex mr-2">
          {renderStars(profileData.rating)}
        </div>
        <span className="text-gray-700">{profileData.rating.toFixed(1)} ({profileData.reviews} reviews)</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Read More
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
          <FaThumbsUp className="mr-2" /> Like
        </button>
        <button className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
          <FaListUl className="mr-2" /> Add to list
        </button>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="font-medium text-yellow-800 mb-1">More for Developer</h3>
        <p className="text-yellow-700 text-sm">Similarly for Rating as Cerebilitations</p>
      </div>
      
      <p className="text-sm text-gray-500">{profileData.lastLogin}</p>
    </div>
    </div>
  );
};

export default ViewJobs;






// "use client";

// import React, { useState } from "react";
// import { ArrowLeft} from "lucide-react";
// import { useRouter } from "next/navigation";
// import { FaSearch, FaMapMarkerAlt, FaFilter, FaBuilding, FaRoute } from "react-icons/fa";

// const ViewJobs: React.FC = () => {
//   const router = useRouter();  

//   const [searchType, setSearchType] = useState<string>("SECURITY COMPANY");
//   const [distance, setDistance] = useState<string>("5 Miles");
//   const [postcode, setPostcode] = useState<string>("");
//   const [filter, setFilter] = useState<string>("All Results");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({
//     });
//   };

//   return (
//   <div style={{marginTop:'90px'}} className="min-h-screen bg-gray-100 p-4 md:p-8 lg:px-32">
//           <div className="absolute top-4 left-4 mt-18 flex items-center text-gray-600 hover:text-black">
//             <button
//               className="flex items-center text-gray-600 hover:text-black transition-all duration-200 mb-6"
//               onClick={() => router.back()}
//             >
//               <ArrowLeft className="w-6 h-6 mr-2" />
//             </button>
//           </div>
//         {/* Header */}
//         <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
//           Find <span className="text-black">Security Providers</span> Near You
//         </h1>
  
//         {/* Search Form - Responsive */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {/* Search Type */}
//             <div className="flex flex-col">
//               <label className="text-gray-900 font-medium flex items-center gap-2">
//                 <FaBuilding /> I'm looking for
//               </label>
//               <select
//                 value={searchType}
//                 onChange={(e) => setSearchType(e.target.value)}
//                 className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-black"
//               >
//                 <option value="SECURITY COMPANY">SECURITY COMPANY</option>
//                 <option value="SECURITY GUARD">SECURITY GUARD</option>
//                 <option value="ALARM SYSTEM">ALARM SYSTEM</option>
//               </select>
//             </div>
  
//             {/* Distance */}
//             <div className="flex flex-col">
//               <label className="text-gray-900 font-medium flex items-center gap-2">
//                 <FaRoute /> Within
//               </label>
//               <select
//                 value={distance}
//                 onChange={(e) => setDistance(e.target.value)}
//                 className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-black"
//               >
//                 <option value="5 Miles">5 Miles</option>
//                 <option value="10 Miles">10 Miles</option>
//                 <option value="25 Miles">25 Miles</option>
//                 <option value="50 Miles">50 Miles</option>
//               </select>
//             </div>
  
//             {/* Postcode */}
//             <div className="flex flex-col">
//               <label className="text-gray-900 font-medium flex items-center gap-2">
//                 <FaMapMarkerAlt /> Postcode
//               </label>
//               <input
//                 type="text"
//                 value={postcode}
//                 onChange={(e) => setPostcode(e.target.value)}
//                 placeholder="Enter Postcode"
//                 className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-black"
//               />
//             </div>
  
//             {/* Filter */}
//             <div className="flex flex-col">
//               <label className="text-gray-900 font-medium flex items-center gap-2">
//                 <FaFilter /> Filter Results
//               </label>
//               <select
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//                 className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-black"
//               >
//                 <option>All Results</option>
//                 <option>Top Rated</option>
//                 <option>Most Affordable</option>
//                 <option>24/7 Available</option>
//               </select>
//             </div>
  
//             {/* Search Button */}
//             <div className="flex items-end">
//               <button
//                 className="w-full py-3 bg-gradient-to-r from-black to-gray-900 text-white rounded-md font-medium hover:from-gray-800 hover:to-gray-900 transition flex justify-center items-center gap-2"
//                 onClick={() => console.log("Search Submitted")}
//               >
//                 <FaSearch /> Search
//               </button>
//             </div>
//           </div>
//         </div>
//         </div>
//   );
// };

// export default ViewJobs;

