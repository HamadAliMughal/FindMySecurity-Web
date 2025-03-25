"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaMobileAlt,
  FaHome,
  FaEnvelope,
  FaSearch,
  FaHeart,
  FaUserShield,
  FaCogs,
  FaAd,
  FaSignOutAlt
} from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import "../globals.css"; 

const UserProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("profileData") || localStorage.getItem("loginData");
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    } else {
      router.push('/'); // Redirect only if no profile data is found
    }
  }, [router]); 

  // const handleLogout = () => {
  //   localStorage.removeItem("profileData");
  //   localStorage.removeItem("loginData");
  //   router.push("/"); // Redirect to homepage after logout
  // };

  if (!profileData) return null;

  return (
    <div>
      <button
        className="absolute top-4 left-4 z-50 mt-20 flex items-center text-gray-600 hover:text-black"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="w-6 h-6 mr-2" /> 
      </button>

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg relative mt-10 md:my-20">
        {/* Profile Header */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6 mt-10 md:mt-0">
          <div
            className="w-28 h-28 bg-gray-300 rounded-full border-4 border-gray-200 shadow-md"
            style={{
              backgroundImage: `url(${profileData?.profileImage || "/images/profile.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              {(profileData?.result?.firstName + " " + profileData?.result?.lastName) || "Mr. Y"}
            </h2>
            <p className="text-gray-500">{profileData?.result?.role.name ||profileData?.result?.role?.roleName || "Security Officer in London"}</p>
            <span className="text-sm text-yellow-500">✅ Usually responds within 1 hour</span>
          </div>
        </div>

        {/* Membership Information */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
            {profileData?.result?.industryType || "Industry"}
          </span>
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
            Member since Jan 2016
          </span>
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
            Last Updated Jan 2025
          </span>
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
            Last Login 28 Jan 2025
          </span>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
            <FaMobileAlt className="mr-2" /> {profileData?.result?.phoneNumber || "Mobile"}
          </button>
          <div className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 min-w-0 whitespace-normal break-words text-center">
  <FaHome className="mr-2 flex-shrink-0" />
  <span className="flex-1 break-words text-left">
    {profileData?.result?.address || profileData?.result.role.address || "Home"}
  </span>
</div>

<button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 min-w-max w-full sm:w-auto">
  <FaEnvelope className="mr-2 flex-shrink-0" />
  <span className="truncate">{profileData?.result?.email || "Email"}</span>
</button>


        </div>

        {/* Upgrade Button */}
        <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
          Upgrade My Membership
        </button>

        {/* Profile Actions */}
        <h3 className="text-lg font-semibold my-6 text-gray-800 text-center md:text-left">My Profile</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <FaSearch className="text-black text-2xl mx-auto" />
            <p className="text-center text-gray-700 mt-2">My Searches</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <FaHeart className="text-black text-2xl mx-auto" />
            <p className="text-center text-gray-700 mt-2">My Favourites</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <FaUserShield className="text-black text-2xl mx-auto" />
            <p className="text-center text-gray-700 mt-2">Visitors</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <FaSearch className="text-black text-2xl mx-auto" />
            <p className="text-center text-gray-700 mt-2">Advance Search</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <FaCogs className="text-black text-2xl mx-auto" />
            <p className="text-center text-gray-700 mt-2">Customer Support</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <FaAd className="text-black text-2xl mx-auto" />
            <p className="text-center text-gray-700 mt-2">Post Free Ad</p>
          </div>
        </div>

        {/* Logout Button */}
        {/* <button
          onClick={handleLogout}
          className="mt-6 w-full bg-black text-white px-4 py-2 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-600"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default UserProfile;




// import React, { useEffect, useState } from "react";
// import {
//   FaWhatsapp,
//   FaMobileAlt,
//   FaHome,
//   FaEnvelope,
//   FaSearch,
//   FaHeart,
//   FaUserShield,
//   FaCogs,
//   FaAd,
// } from "react-icons/fa";
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import "./page-globals.css";


// const UserProfile: React.FC = () => {
//   const [profileData, setProfileData] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const storedData = localStorage.getItem("profileData")||localStorage.getItem("loginData");
//     if (storedData) {
//       setProfileData(JSON.parse(storedData));
//     } else {
//       router.push('/'); // Redirect only if no profile data is found
//     }
//   }, [router]); // Depend on router to prevent issues

//   if (!profileData) return null;

//   return (
//     <div>
//         <button
//         className="absolute top-4 left-4 z-50 mt-20 flex items-center text-gray-600 hover:text-black"
//         onClick={() => router.push("/")}
//       >
//         <ArrowLeft className="w-6 h-6 mr-2" /> 
//       </button>
   
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg relative mt-10 md:my-20">
//       {/* Profile Header */}
//       <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6 mt-10 md:mt-0">
//         <div
//           className="w-28 h-28 bg-gray-300 rounded-full border-4 border-gray-200 shadow-md"
//           style={{
//             backgroundImage: `url(${profileData?.profileImage || "/images/profile.jpg"})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         ></div>
//         <div className="text-center md:text-left">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             {(profileData?.result?.firstName + " " + profileData?.result?.lastName) || "Mr. Y"}
//           </h2>
//           <p className="text-gray-500">{profileData?.result?.jobTitle || "Security Officer in London"}</p>
//           <span className="text-sm text-yellow-500">✅ Usually responds within 1 hour</span>
//         </div>
//       </div>

//       {/* Membership Information */}
//       <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
//         <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
//           {profileData?.result?.industryType || "Industry"}
//         </span>
//         <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
//           Member since Jan 2016
//         </span>
//         <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
//           Last Updated Jan 2025
//         </span>
//         <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
//           Last Login 28 Jan 2025
//         </span>
//       </div>

//       {/* Contact Buttons */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
//         <button className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
//           <FaWhatsapp className="mr-2" /> WhatsApp
//         </button>
//         <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
//           <FaMobileAlt className="mr-2" /> {profileData?.result?.phone || "Mobile"}
//         </button>
//         <button className="flex items-center justify-center bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
//           <FaHome className="mr-2" /> {profileData?.result?.address || "Home"}
//         </button>
//         <button className="flex items-center justify-center bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800">
//           <FaEnvelope className="mr-2" /> {profileData?.result?.email || "Email"}
//         </button>
//       </div>

//       {/* Upgrade Button */}
//       <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
//         Upgrade My Membership
//       </button>

//       {/* Profile Actions */}
//       <h3 className="text-lg font-semibold my-6 text-gray-800 text-center md:text-left">My Profile</h3>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//           <FaSearch className="text-red-500 text-2xl mx-auto" />
//           <p className="text-center text-gray-700 mt-2">My Searches</p>
//         </div>
//         <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//           <FaHeart className="text-red-500 text-2xl mx-auto" />
//           <p className="text-center text-gray-700 mt-2">My Favourites</p>
//         </div>
//         <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//           <FaUserShield className="text-blue-500 text-2xl mx-auto" />
//           <p className="text-center text-gray-700 mt-2">Visitors</p>
//         </div>
//         <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//           <FaSearch className="text-gray-500 text-2xl mx-auto" />
//           <p className="text-center text-gray-700 mt-2">Advance Search</p>
//         </div>
//         <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//           <FaCogs className="text-gray-700 text-2xl mx-auto" />
//           <p className="text-center text-gray-700 mt-2">Customer Support</p>
//         </div>
//         <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//           <FaAd className="text-orange-500 text-2xl mx-auto" />
//           <p className="text-center text-gray-700 mt-2">Post Free Ad</p>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default UserProfile;







// import React, { useEffect, useState } from "react";
// import { FaWhatsapp, FaMobileAlt, FaHome, FaEnvelope, FaSearch, FaHeart, FaUserShield, FaCogs, FaAd } from "react-icons/fa";
// import {ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";

// const UserProfile: React.FC = () => {
//   const [profileData, setProfileData] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Retrieve data from localStorage
//     const storedData = localStorage.getItem("profileData");
//     if (storedData) {
//       setProfileData(JSON.parse(storedData));
//     }
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       {/* Profile Header */}
//       <button className="absolute top-10 left-10 flex items-center text-gray-700 hover:text-black text-lg" onClick={() => router.push("/")}>
//           <ArrowLeft className="w-6 h-6 mr-2" />
//         </button>
//       <div className="flex items-center space-x-4">
//       <div
//   className="w-24 h-24 bg-gray-300 rounded-full"
//   style={{
//     backgroundImage: `url(${profileData?.profileImage || "/images/profile.jpg"})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   }}
// ></div>

//         <div>
//           <h2 className="text-xl font-semibold">{profileData?.result.firstName +" "+ profileData?.result.lastName || "Mr. Y"}</h2>
//           <p className="text-gray-600">{profileData?.result.jobTitle || "Security Officer in London"}</p>
//           <span className="text-sm text-yellow-500">✅ Usually responds within 1 hour</span>
//         </div>
//       </div>

//       {/* Membership Information */}
//       <div className="flex flex-wrap gap-2 my-4">
//         <span className="bg-pink-500 text-white px-3 py-1 rounded-full">{profileData?.result.industryType || "Industry"}</span>
//         <span className="bg-purple-500 text-white px-3 py-1 rounded-full">Member since Jan 2016</span>
//         <span className="bg-red-500 text-white px-3 py-1 rounded-full">Last Updated Jan 2025</span>
//         <span className="bg-blue-500 text-white px-3 py-1 rounded-full">Last Login 28 Jan 2025</span>
//       </div>

//       {/* Contact Buttons */}
//       <div className="flex flex-wrap gap-2 my-4">
//         <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg">
//           <FaWhatsapp className="mr-2" /> Chat on WhatsApp
//         </button>
//         <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg">
//           <FaMobileAlt className="mr-2" /> {profileData?.result.phone || "Mobile"}
//         </button>
//         <button className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg">
//           <FaHome className="mr-2" /> {profileData?.result.address || "Home"}
//         </button>
//         <button className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg">
//           <FaEnvelope className="mr-2" /> {profileData?.result.email || "Message"}
//         </button>
//         <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Upgrade My Membership</button>
//       </div>

//       {/* Profile Actions */}
//       <h3 className="text-lg font-semibold my-4">My Profile</h3>
//       <div className="grid grid-cols-3 gap-4 text-center">
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaSearch className="text-red-500 text-2xl mx-auto" />
//           <p>My Searches</p>
//         </div>
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaHeart className="text-red-500 text-2xl mx-auto" />
//           <p>My Favourites</p>
//         </div>
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaUserShield className="text-blue-500 text-2xl mx-auto" />
//           <p>Who Visited My Profile</p>
//         </div>
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaSearch className="text-gray-500 text-2xl mx-auto" />
//           <p>Advance Search</p>
//         </div>
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaCogs className="text-gray-700 text-2xl mx-auto" />
//           <p>Customer Support</p>
//         </div>
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaAd className="text-orange-500 text-2xl mx-auto" />
//           <p>Post Your Free Ad</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;




// import React from "react";
// import { FaWhatsapp, FaMobileAlt, FaHome, FaEnvelope, FaSearch, FaHeart, FaUserShield, FaCogs, FaAd } from "react-icons/fa";

// const UserProfile: React.FC = () => {
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       {/* Profile Header */}
//       <div className="flex items-center space-x-4">
//         <div className="w-24 h-24 bg-gray-300 rounded-full">
//             <img src="" alt="" />
//             </div> {/* Profile Image */}
//         <div>
//           <h2 className="text-xl font-semibold">Mr. Y</h2>
//           <p className="text-gray-600">Security Officer in London</p>
//           <span className="text-sm text-yellow-500">✅ Usually responds within 1 hour</span>
//         </div>
//       </div>

//       {/* Membership Information */}
//       <div className="flex flex-wrap gap-2 my-4">
//         <span className="bg-pink-500 text-white px-3 py-1 rounded-full">Female</span>
//         <span className="bg-purple-500 text-white px-3 py-1 rounded-full">Member since Jan 2016</span>
//         <span className="bg-red-500 text-white px-3 py-1 rounded-full">Last Updated Jan 2025</span>
//         <span className="bg-blue-500 text-white px-3 py-1 rounded-full">Last Login 28 Jan 2025</span>
//       </div>

//       {/* Contact Buttons */}
//       <div className="flex flex-wrap gap-2 my-4">
//         <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg">
//           <FaWhatsapp className="mr-2" /> Chat on WhatsApp
//         </button>
//         <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg">
//           <FaMobileAlt className="mr-2" /> Mobile
//         </button>
//         <button className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg">
//           <FaHome className="mr-2" /> Home
//         </button>
//         <button className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg">
//           <FaEnvelope className="mr-2" /> Message
//         </button>
//         <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Upgrade My Membership</button>
//       </div>

//       {/* Profile Actions */}
//       <h3 className="text-lg font-semibold my-4">My Profile</h3>
//       <div className="grid grid-cols-3 gap-4 text-center">
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaSearch className="text-red-500 text-2xl mx-auto" />
//           <p>My Searches</p>
//         </div>
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaHeart className="text-red-500 text-2xl mx-auto" />
//           <p>My Favourites</p>
//         </div>
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaUserShield className="text-blue-500 text-2xl mx-auto" />
//           <p>Who Visited My Profile</p>
//         </div>
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaSearch className="text-gray-500 text-2xl mx-auto" />
//           <p>Advance Search</p>
//         </div>
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaCogs className="text-gray-700 text-2xl mx-auto" />
//           <p>Customer Support</p>
//         </div>
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <FaAd className="text-orange-500 text-2xl mx-auto" />
//           <p>Post Your Free Ad</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
