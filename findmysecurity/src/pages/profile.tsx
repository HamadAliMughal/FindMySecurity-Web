import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaMobileAlt, FaHome, FaEnvelope, FaSearch, FaHeart, FaUserShield, FaCogs, FaAd } from "react-icons/fa";

const UserProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
      <div
  className="w-24 h-24 bg-gray-300 rounded-full"
  style={{
    backgroundImage: `url(${profileData?.profileImage || "/images/profile.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
></div>

        <div>
          <h2 className="text-xl font-semibold">{profileData?.result.firstName +" "+ profileData?.result.lastName || "Mr. Y"}</h2>
          <p className="text-gray-600">{profileData?.result.role.name || "Security Officer in London"}</p>
          <span className="text-sm text-yellow-500">✅ Usually responds within 1 hour</span>
        </div>
      </div>

      {/* Membership Information */}
      <div className="flex flex-wrap gap-2 my-4">
        <span className="bg-pink-500 text-white px-3 py-1 rounded-full">{profileData?.industryType || "Industry"}</span>
        <span className="bg-purple-500 text-white px-3 py-1 rounded-full">Member since Jan 2016</span>
        <span className="bg-red-500 text-white px-3 py-1 rounded-full">Last Updated Jan 2025</span>
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full">Last Login 28 Jan 2025</span>
      </div>

      {/* Contact Buttons */}
      <div className="flex flex-wrap gap-2 my-4">
        <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg">
          <FaWhatsapp className="mr-2" /> Chat on WhatsApp
        </button>
        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg">
          <FaMobileAlt className="mr-2" /> {profileData?.phone || "Mobile"}
        </button>
        <button className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg">
          <FaHome className="mr-2" /> {profileData?.address || "Home"}
        </button>
        <button className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg">
          <FaEnvelope className="mr-2" /> {profileData?.email || "Message"}
        </button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Upgrade My Membership</button>
      </div>

      {/* Profile Actions */}
      <h3 className="text-lg font-semibold my-4">My Profile</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-gray-200 rounded-lg">
          <FaSearch className="text-red-500 text-2xl mx-auto" />
          <p>My Searches</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <FaHeart className="text-red-500 text-2xl mx-auto" />
          <p>My Favourites</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <FaUserShield className="text-blue-500 text-2xl mx-auto" />
          <p>Who Visited My Profile</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <FaSearch className="text-gray-500 text-2xl mx-auto" />
          <p>Advance Search</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <FaCogs className="text-gray-700 text-2xl mx-auto" />
          <p>Customer Support</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <FaAd className="text-orange-500 text-2xl mx-auto" />
          <p>Post Your Free Ad</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;




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
