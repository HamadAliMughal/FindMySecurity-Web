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
  FaBriefcase,
  FaUserAlt,
  FaClock,
  FaGlobe,
  FaGraduationCap,
  FaPhoneAlt,
  FaPhone,
  FaStar
} from "react-icons/fa";
import { CheckCircle, XCircle,ArrowLeft } from "lucide-react";

import "../globals.css";

const UserProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [publicProfileData, setPublicProfileData] = useState<any>(null);
  const router = useRouter();
  const [roleId, setRoleId] = useState(0);
  const [profileCreated, setProfileCreated] = useState(false);

  useEffect(() => {
    const storedData1 = localStorage.getItem("loginData") || localStorage.getItem("profileData");
    const data = storedData1 ? JSON.parse(storedData1) : null;

    const currentRoleId = data?.result?.role?.id || data?.result?.id;
    setRoleId(currentRoleId);
    setProfileData(data);

    if (!data) {
      router.push("/");
      return;
    }

    const createdProfiles = localStorage.getItem("createdPublicProfiles");
    if (currentRoleId === 3 && !createdProfiles) {
      const interval = setInterval(() => {
        if (window.confirm("Make your public profile?")) {
          setProfileCreated(false);
          router.push("/public-profile");
        }
      }, 5000);
      return () => clearInterval(interval);
    } else if (currentRoleId === 3 && createdProfiles) {
      setPublicProfileData(JSON.parse(createdProfiles));
      setProfileCreated(true);
    }
  }, [router]);

  if (!profileData) return null;
  const profileDetails = [
    { label: "Headline", value: publicProfileData.profileHeadline, icon: <FaUserAlt /> },
    { label: "About Me", value: publicProfileData.aboutMe, icon: <FaUserAlt /> },
    { label: "Availability", value: publicProfileData.availability, icon: <FaClock /> },
    { label: "Experience", value: publicProfileData.experience, icon: <FaBriefcase /> },
    { label: "Gender", value: publicProfileData.gender || "Not specified", icon: <FaUserAlt /> },
    { label: "Hourly Rate", value: `$${publicProfileData.hourlyRate}/hr`, icon: <FaStar /> },
    { label: "Postcode", value: publicProfileData.postcode, icon: <FaGlobe /> },
    { label: "Website", value: publicProfileData.website, icon: <FaGlobe /> },
    { label: "Qualifications", value: publicProfileData.qualifications, icon: <FaGraduationCap /> },
    { label: "Other Service", value: publicProfileData.otherService, icon: <FaUserShield /> },
    { label: "Home Phone", value: publicProfileData.homeTelephone, icon: <FaPhone /> },
    { label: "Mobile Phone", value: publicProfileData.mobileTelephone, icon: <FaPhoneAlt /> },
    { label: "Selected Services", value: publicProfileData.selectedServices?.join(", "), icon: <FaCogs /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <button
        className="absolute top-4 left-4 mt-20 z-2 flex items-center text-gray-600 hover:text-black"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
      </button>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 relative mt-12 md:mt-16">
        <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6">
          <div
            className="w-28 h-28 rounded-full shadow-lg shadow-gray-400 hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `url(${publicProfileData?.profilePhoto || "/images/profile.png"})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              {profileData?.result?.firstName + " " + profileData?.result?.lastName || "Mr. Y"}
            </h2>
            <h2 className="text-2xl font-semibold text-gray-800">
              {publicProfileData?.screenName || "Mr."}
            </h2>
            <p className="text-gray-500">
              {profileData?.result?.role?.name || profileData?.result?.role?.roleName || "Security Officer"}
            </p>
            <span className="text-sm text-yellow-500">
              ✅ Usually responds within 1 hour
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
          {["Industry", "Member since Jan 2016", "Last Updated Jan 2025", "Last Login 28 Jan 2025"].map(
            (info, index) => (
              <span key={index} className="bg-black text-white px-3 py-1 rounded-full text-sm">
                {info}
              </span>
            )
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
            <FaMobileAlt className="mr-2" /> {profileData?.result?.phoneNumber || "Mobile"}
          </button>
          <div className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
            <FaHome className="mr-2" />
            <span className="truncate">
              {profileData?.result?.address || profileData?.result?.role?.address || "Home"}
            </span>
          </div>
          <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
            <FaEnvelope className="mr-2" />
            <span className="truncate">{profileData?.result?.email || "Email"}</span>
          </button>
          {roleId === 3 && !profileCreated && (
            <button
              className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
              onClick={() => router.push("/public-profile")}
            >
              <FaBriefcase className="mr-2" /> Create Public Profile
            </button>
          )}
          {roleId === 5 || roleId === 7 ? (
            <button
              className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
              onClick={() => router.push("/job-posting")}
            >
              <FaBriefcase className="mr-2" /> Post a Job
            </button>
          ) : (
            <button
              className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
              onClick={() => router.push("/view-job")}
            >
              <FaBriefcase className="mr-2" /> View Jobs
            </button>
          )}
        </div>

        <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
          Upgrade My Membership
        </button>

        <h3 className="text-lg font-semibold my-6 text-gray-800 text-center md:text-left">
          My Profile
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[{ icon: <FaSearch />, label: "My Searches" },
            { icon: <FaHeart />, label: "My Favourites" },
            { icon: <FaUserShield />, label: "Visitors" },
            { icon: <FaSearch />, label: "Advance Search" },
            { icon: <FaCogs />, label: "Customer Support" },
            { icon: <FaAd />, label: "Post Free Ad" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition text-center"
            >
              <div className="text-black text-2xl mx-auto">{item.icon}</div>
              <p className="text-gray-700 mt-2">{item.label}</p>
            </div>
          ))}
        </div>

        {publicProfileData && (
  <div className="mt-10">
    <h4 className="font-semibold text-gray-800 mb-4 text-xl text-center md:text-left">
      Weekly Schedule
    </h4>
    {publicProfileData.weeklySchedule && (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gradient-to-r from-black via-gray-700 to-gray-400 text-white text-sm uppercase">
            <tr>
              <th className="p-3 text-left text-gray-100">Time</th>
              {["Mon", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <th key={day} className="p-3 text-center text-gray-100">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(publicProfileData.weeklySchedule).map(([time, days]: any, index) => (
              <tr
                key={time}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-gray-200 transition`}
              >
                <td className="p-3 font-medium text-gray-700 border border-gray-300">{time}</td>
                {["Mon", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <td key={day} className="p-3 text-center border border-gray-300">
                    {days[day] ? (
                      <CheckCircle className="text-green-500 w-5 h-5 mx-auto" />
                    ) : (
                      <XCircle className="text-red-400 w-5 h-5 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}


        {/* Enhanced Profile Details */}
        {publicProfileData && (
        <div className="mt-10">
          <h4 className="font-semibold text-gray-800 mb-4 text-xl text-center md:text-left">More About Me</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {profileDetails.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex items-start gap-4"
              >
                <div className="text-gray-500 text-xl mt-1">{item.icon}</div>
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{item.label}</p>
                  <p className="text-gray-900 font-semibold mt-1 break-words">{item.value || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default UserProfile;









// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaMobileAlt,
//   FaHome,
//   FaEnvelope,
//   FaSearch,
//   FaHeart,
//   FaUserShield,
//   FaCogs,
//   FaAd,
//   FaBriefcase,
// } from "react-icons/fa";
// import { ArrowLeft } from "lucide-react";
// import "../globals.css";

// const UserProfile: React.FC = () => {
//   const [profileData, setProfileData] = useState<any>(null);
//   const [publicProfileData, setPublicProfileData] = useState<any>(null);
//   const router = useRouter();
//   const [roleId, setRoleId] = useState(0);
//   const [profileCreated, setProfileCreated] = useState(false);

//   useEffect(() => {
//     // Get login or profile data from localStorage
//     const storedData1 = localStorage.getItem("loginData") || localStorage.getItem("profileData");
//     const data = storedData1 ? JSON.parse(storedData1) : null;

//     const currentRoleId = data?.result?.role?.id || data?.result?.id;
//     setRoleId(currentRoleId);
//     setProfileData(data);

//     if (!data) {
//       router.push("/"); // Redirect to home if no data found
//       return;
//     }

//     // Get the created profile data
//     const createdProfiles = localStorage.getItem("createdPublicProfiles");
//     if (currentRoleId === 3 && !createdProfiles) {
//       const interval = setInterval(() => {
//         if (window.confirm("Make your public profile?")) {
//           setProfileCreated(false);
//           router.push("/public-profile");
//         }
//       }, 5000);
//       return () => clearInterval(interval);
//     } else if (currentRoleId === 3 && createdProfiles) {
//       // Parse the created profile data and set it in state
//       setPublicProfileData(JSON.parse(createdProfiles)); // Parse the stored data correctly
//       setProfileCreated(true);
//     }
//   }, [router]);

//   if (!profileData) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       {/* Back Button */}
//       <button
//         className="absolute top-4 left-4 mt-20 z-2 flex items-center text-gray-600 hover:text-black"
//         onClick={() => router.push("/")}
//       >
//         <ArrowLeft className="w-6 h-6 mr-2" />
//       </button>

//       {/* Profile Card */}
//       <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 relative mt-12 md:mt-16">
//         {/* Profile Header */}
//         <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6">
//           {/* Profile Picture */}
//           <div
//             className="w-28 h-28 rounded-full shadow-lg shadow-gray-400 hover:scale-105 transition-transform duration-300"
//             style={{
//               backgroundImage: `url(${publicProfileData?.profilePhoto || "/images/profile.png"})`,
//               backgroundSize: "cover",
//             }}
//           ></div>
//           {/* Profile Details */}
//           <div className="text-center md:text-left">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {profileData?.result?.firstName + " " + profileData?.result?.lastName || "Mr. Y"}
//             </h2>
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {publicProfileData?.screenName || "Mr."}
//             </h2>
//             <p className="text-gray-500">
//               {profileData?.result?.role?.name || profileData?.result?.role?.roleName || "Security Officer"}
//             </p>
//             <span className="text-sm text-yellow-500">
//               ✅ Usually responds within 1 hour
//             </span>
//           </div>
//         </div>

//         {/* Membership Info */}
//         <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
//           {["Industry", "Member since Jan 2016", "Last Updated Jan 2025", "Last Login 28 Jan 2025"].map(
//             (info, index) => (
//               <span key={index} className="bg-black text-white px-3 py-1 rounded-full text-sm">
//                 {info}
//               </span>
//             )
//           )}
//         </div>

//         {/* Contact Buttons */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
//           {/* Phone */}
//           <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
//             <FaMobileAlt className="mr-2" /> {profileData?.result?.phoneNumber || "Mobile"}
//           </button>
//           {/* Address */}
//           <div className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
//             <FaHome className="mr-2" />
//             <span className="truncate">
//               {profileData?.result?.address || profileData?.result?.role?.address || "Home"}
//             </span>
//           </div>
//           {/* Email */}
//           <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
//             <FaEnvelope className="mr-2" />
//             <span className="truncate">{profileData?.result?.email || "Email"}</span>
//           </button>
//           {roleId === 3 && !profileCreated && (
//             <button
//               className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//               onClick={() => router.push("/public-profile")}
//             >
//               <FaBriefcase className="mr-2" /> Create Public Profile
//             </button>
//           )}

//           {/* Post Job */}
//           {roleId === 5 || roleId === 7 ? (
//             <button
//               className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//               onClick={() => router.push("/job-posting")}
//             >
//               <FaBriefcase className="mr-2" /> Post a Job
//             </button>
//           ) : (
//             <button
//               className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//               onClick={() => router.push("/view-job")}
//             >
//               <FaBriefcase className="mr-2" /> View Jobs
//             </button>
//           )}
//         </div>

//         {/* Upgrade Membership */}
//         <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
//           Upgrade My Membership
//         </button>

//         {/* Profile Actions */}
//         <h3 className="text-lg font-semibold my-6 text-gray-800 text-center md:text-left">
//           My Profile
//         </h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           {[{ icon: <FaSearch />, label: "My Searches" },
//             { icon: <FaHeart />, label: "My Favourites" },
//             { icon: <FaUserShield />, label: "Visitors" },
//             { icon: <FaSearch />, label: "Advance Search" },
//             { icon: <FaCogs />, label: "Customer Support" },
//             { icon: <FaAd />, label: "Post Free Ad" },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition text-center"
//             >
//               <div className="text-black text-2xl mx-auto">{item.icon}</div>
//               <p className="text-gray-700 mt-2">{item.label}</p>
//             </div>
//           ))}
//         </div>
//          {/* Weekly Schedule */}
//          {publicProfileData && <div className="mt-6">
//       <h4 className="font-semibold text-gray-800 mb-2">Weekly Schedule</h4>
//       {publicProfileData.weeklySchedule && (
//         <div className="overflow-x-auto text-sm">
//           <table className="w-full border border-gray-200">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-2 border">Time</th>
//                 {["Mon", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//                   <th key={day} className="p-2 border">{day}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(publicProfileData.weeklySchedule).map(([time, days]: any) => (
//                 <tr key={time}>
//                   <td className="p-2 border font-medium">{time}</td>
//                   {["Mon", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//                     <td key={day} className="p-2 border text-center">
//                       {days[day] ? "✅" : "❌"}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;











// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaMobileAlt,
//   FaHome,
//   FaEnvelope,
//   FaSearch,
//   FaHeart,
//   FaUserShield,
//   FaCogs,
//   FaAd,
//   FaBriefcase,
// } from "react-icons/fa";
// import { ArrowLeft } from "lucide-react";
// import "../globals.css";

// const UserProfile: React.FC = () => {
//   const [profileData, setProfileData] = useState<any>(null);
//   const [publicProfileData, setPublicProfileData] = useState<any>(null);
//   const router = useRouter();
//   const [roleId, setRoleId] = useState(0);
//   const [profileCreated, setProfileCreated] = useState(false);


//   useEffect(() => {
//      const storedData1 =
//     localStorage.getItem("loginData") || localStorage.getItem("profileData");
//   const data = storedData1 ? JSON.parse(storedData1) : null;

//   const currentRoleId = data?.result?.role?.id || data?.result?.id;
//   setRoleId(currentRoleId);
//   setProfileData(data);

//   if (!data) {
//     router.push("/");
//     return;
//   }

//   const createdProfiles = localStorage.getItem("createdPublicProfiles")
//   if (currentRoleId === 3 && !createdProfiles) {
//     const interval = setInterval(() => {
//       if (window.confirm("Make your public profile?")) {
//         setProfileCreated(false); // 👈 update state immediately
//         router.push("/public-profile");
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }
//   else if(currentRoleId === 3 && createdProfiles){
//     setPublicProfileData(createdProfiles)
//     setProfileCreated(true); // 👈 update state immediately

//   }
//   }, [router]);
  
//   if (!profileData) return null;
  

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       {/* Back Button */}
//       <button
//         className="absolute top-4 left-4 mt-20 z-2 flex items-center text-gray-600 hover:text-black"
//         onClick={() => router.push("/")}
//       >
//         <ArrowLeft className="w-6 h-6 mr-2" />
//       </button>

//       {/* Profile Card */}
//       <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 relative mt-12 md:mt-16">
//         {/* Profile Header */}
//         <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6">
//           {/* Profile Picture */}
//           <div
//             className="w-28 h-28 rounded-full shadow-lg shadow-gray-400 hover:scale-105 transition-transform duration-300"
//             style={{
//               backgroundImage: `url(${publicProfileData?.profilePhoto || "/images/profile.png"})`,
//               backgroundSize: "cover",
//               // backgroundPosition: "center",
//             }}
//           ></div>
//           {/* Profile Details */}
//           <div className="text-center md:text-left">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {profileData?.result?.firstName +
//                 " " +
//                 profileData?.result?.lastName || "Mr. Y"}
//             </h2>
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {publicProfileData.screenName || "Mr."}
//             </h2>
//             <p className="text-gray-500">
//               {profileData?.result?.role?.name ||
//                 profileData?.result?.role?.roleName ||
//                 "Security Officer"}
//             </p>
//             <span className="text-sm text-yellow-500">
//               ✅ Usually responds within 1 hour
//             </span>
//           </div>
//         </div>

//         {/* Membership Info */}
//         <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
//           {["Industry", "Member since Jan 2016", "Last Updated Jan 2025", "Last Login 28 Jan 2025"].map(
//             (info, index) => (
//               <span key={index} className="bg-black text-white px-3 py-1 rounded-full text-sm">
//                 {info}
//               </span>
//             )
//           )}
//         </div>

//         {/* Contact Buttons */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
//           {/* Phone */}
//           <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
//             <FaMobileAlt className="mr-2" /> {profileData?.result?.phoneNumber || "Mobile"}
//           </button>
//           {/* Address */}
//           <div className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
//             <FaHome className="mr-2" />
//             <span className="truncate">
//               {profileData?.result?.address || profileData?.result?.role?.address || "Home"}
//             </span>
//           </div>
//           {/* Email */}
//           <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
//             <FaEnvelope className="mr-2" />
//             <span className="truncate">{profileData?.result?.email || "Email"}</span>
//           </button>
//           {roleId === 3 && !profileCreated && (
//   <button
//     className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//     onClick={() => router.push("/public-profile")}
//   >
//     <FaBriefcase className="mr-2" /> Create Public Profile
//   </button>
// )}

//           {/* Post Job */}
//           {
//           roleId ===5 || roleId ===7?(
     
//           <button
//             className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//             onClick={() => router.push("/job-posting")}
//           >
//             <FaBriefcase className="mr-2" /> Post a Job
//           </button>
//            ) :
//            (
//             <button
//             className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//             onClick={() => router.push("/view-job")}
//           >
//             <FaBriefcase className="mr-2" /> View Jobs
//           </button>
//            )
//           }
//         </div>

//         {/* Upgrade Membership */}
//         <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
//           Upgrade My Membership
//         </button>

//         {/* Profile Actions */}
//         <h3 className="text-lg font-semibold my-6 text-gray-800 text-center md:text-left">
//           My Profile
//         </h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           {[{ icon: <FaSearch />, label: "My Searches" },
//             { icon: <FaHeart />, label: "My Favourites" },
//             { icon: <FaUserShield />, label: "Visitors" },
//             { icon: <FaSearch />, label: "Advance Search" },
//             { icon: <FaCogs />, label: "Customer Support" },
//             { icon: <FaAd />, label: "Post Free Ad" },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition text-center"
//             >
//               <div className="text-black text-2xl mx-auto">{item.icon}</div>
//               <p className="text-gray-700 mt-2">{item.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;









// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaMobileAlt,
//   FaHome,
//   FaEnvelope,
//   FaSearch,
//   FaHeart,
//   FaUserShield,
//   FaCogs,
//   FaAd,
//   FaSignOutAlt,
//   FaBriefcase,
// } from "react-icons/fa";
// import { ArrowLeft } from "lucide-react";
// import "../globals.css";

// const UserProfile: React.FC = () => {
//   const [profileData, setProfileData] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const storedData =
//       localStorage.getItem("profileData") || localStorage.getItem("loginData");
//     if (storedData) {
//       setProfileData(JSON.parse(storedData));
//     } else {
//       router.push("/"); // Redirect if no profile data is found
//     }
//   }, [router]);

//   if (!profileData) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       {/* Back Button */}
//       <button
//         className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-black"
//         onClick={() => router.push("/")}
//       >
//         <ArrowLeft className="w-6 h-6 mr-2" /> Back
//       </button>

//       {/* Profile Card */}
//       <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 relative mt-12 md:mt-16">
//         {/* Profile Header */}
//         <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6">
//           {/* Profile Picture */}
//           <div
//             className="w-28 h-28 bg-gray-300 rounded-full border-4 border-gray-200 shadow-md"
//             style={{
//               backgroundImage: `url(${profileData?.profileImage || "/images/profile.jpg"})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           ></div>
//           {/* Profile Details */}
//           <div className="text-center md:text-left">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {profileData?.result?.firstName +
//                 " " +
//                 profileData?.result?.lastName || "Mr. Y"}
//             </h2>
//             <p className="text-gray-500">
//               {profileData?.result?.role?.name ||
//                 profileData?.result?.role?.roleName ||
//                 "Security Officer"}
//             </p>
//             <span className="text-sm text-yellow-500">
//               ✅ Usually responds within 1 hour
//             </span>
//           </div>
//         </div>

//         {/* Membership Info */}
//         <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
//           {["Industry", "Member since Jan 2016", "Last Updated Jan 2025", "Last Login 28 Jan 2025"].map(
//             (info, index) => (
//               <span key={index} className="bg-black text-white px-3 py-1 rounded-full text-sm">
//                 {info}
//               </span>
//             )
//           )}
//         </div>

//         {/* Contact Buttons */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
//           {/* Phone */}
//           <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
//             <FaMobileAlt className="mr-2" /> {profileData?.result?.phoneNumber || "Mobile"}
//           </button>
//           {/* Address */}
//           <div className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
//             <FaHome className="mr-2" />
//             <span className="truncate">
//               {profileData?.result?.address || profileData?.result?.role?.address || "Home"}
//             </span>
//           </div>
//           {/* Email */}
//           <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
//             <FaEnvelope className="mr-2" />
//             <span className="truncate">{profileData?.result?.email || "Email"}</span>
//           </button>
//           {/* Post Job */}
//           <button
//             className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//             onClick={() => router.push("/job-posting")}
//           >
//             <FaBriefcase className="mr-2" /> Post a Job
//           </button>
//         </div>

//         {/* Upgrade Membership */}
//         <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
//           Upgrade My Membership
//         </button>

//         {/* Profile Actions */}
//         <h3 className="text-lg font-semibold my-6 text-gray-800 text-center md:text-left">
//           My Profile
//         </h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           {[
//             { icon: <FaSearch />, label: "My Searches" },
//             { icon: <FaHeart />, label: "My Favourites" },
//             { icon: <FaUserShield />, label: "Visitors" },
//             { icon: <FaSearch />, label: "Advance Search" },
//             { icon: <FaCogs />, label: "Customer Support" },
//             { icon: <FaAd />, label: "Post Free Ad" },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition text-center"
//             >
//               <div className="text-black text-2xl mx-auto">{item.icon}</div>
//               <p className="text-gray-700 mt-2">{item.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;






// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaMobileAlt,
//   FaHome,
//   FaEnvelope,
//   FaSearch,
//   FaHeart,
//   FaUserShield,
//   FaCogs,
//   FaAd,
//   FaSignOutAlt,
//   FaBriefcase
// } from "react-icons/fa";
// import { ArrowLeft } from "lucide-react";
// import "../globals.css"; 

// const UserProfile: React.FC = () => {
//   const [profileData, setProfileData] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const storedData = localStorage.getItem("profileData") || localStorage.getItem("loginData");
//     if (storedData) {
//       setProfileData(JSON.parse(storedData));
//     } else {
//       router.push('/'); // Redirect only if no profile data is found
//     }
//   }, [router]); 

//   if (!profileData) return null;

//   return (
//     <div>
//       <button
//         className="absolute top-4 left-4 z-50 mt-20 flex items-center text-gray-600 hover:text-black"
//         onClick={() => router.push("/")}
//       >
//         <ArrowLeft className="w-6 h-6 mr-2" /> 
//       </button>

//       <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg relative mt-10 md:my-20">
//         {/* Profile Header */}
//         <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6 mt-10 md:mt-0">
//           <div
//             className="w-28 h-28 bg-gray-300 rounded-full border-4 border-gray-200 shadow-md"
//             style={{
//               backgroundImage: `url(${profileData?.profileImage || "/images/profile.jpg"})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           ></div>
//           <div className="text-center md:text-left">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {(profileData?.result?.firstName + " " + profileData?.result?.lastName) || "Mr. Y"}
//             </h2>
//             <p className="text-gray-500">{profileData?.result?.role.name ||profileData?.result?.role?.roleName || "Security Officer in London"}</p>
//             <span className="text-sm text-yellow-500">✅ Usually responds within 1 hour</span>
//           </div>
//         </div>

//         {/* Membership Information */}
//         <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
//           <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
//             {profileData?.result?.industryType || "Industry"}
//           </span>
//           <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
//             Member since Jan 2016
//           </span>
//           <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
//             Last Updated Jan 2025
//           </span>
//           <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
//             Last Login 28 Jan 2025
//           </span>
//         </div>

//         {/* Contact Buttons */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
//           <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
//             <FaMobileAlt className="mr-2" /> {profileData?.result?.phoneNumber || "Mobile"}
//           </button>
//           <div className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 min-w-0 whitespace-normal break-words text-center">
//             <FaHome className="mr-2 flex-shrink-0" />
//             <span className="flex-1 break-words text-left">
//               {profileData?.result?.address || profileData?.result.role.address || "Home"}
//             </span>
//           </div>
//           <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 min-w-max w-full sm:w-auto">
//             <FaEnvelope className="mr-2 flex-shrink-0" />
//             <span className="truncate">{profileData?.result?.email || "Email"}</span>
//           </button>
//           <button 
//             className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
//             onClick={() => router.push("/job-posting")}
//           >
//             <FaBriefcase className="mr-2" /> Post a Job
//           </button>
//         </div>

//         {/* Upgrade Button */}
//         <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
//           Upgrade My Membership
//         </button>

//         {/* Profile Actions */}
//         <h3 className="text-lg font-semibold my-6 text-gray-800 text-center md:text-left">My Profile</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaSearch className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">My Searches</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaHeart className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">My Favourites</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaUserShield className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">Visitors</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaSearch className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">Advance Search</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaCogs className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">Customer Support</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaAd className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">Post Free Ad</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;






// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaMobileAlt,
//   FaHome,
//   FaEnvelope,
//   FaSearch,
//   FaHeart,
//   FaUserShield,
//   FaCogs,
//   FaAd,
//   FaSignOutAlt
// } from "react-icons/fa";
// import { ArrowLeft } from "lucide-react";
// import "../globals.css"; 

// const UserProfile: React.FC = () => {
//   const [profileData, setProfileData] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const storedData = localStorage.getItem("profileData") || localStorage.getItem("loginData");
//     if (storedData) {
//       setProfileData(JSON.parse(storedData));
//     } else {
//       router.push('/'); // Redirect only if no profile data is found
//     }
//   }, [router]); 

//   if (!profileData) return null;

//   return (
//     <div>
//       <button
//         className="absolute top-4 left-4 z-50 mt-20 flex items-center text-gray-600 hover:text-black"
//         onClick={() => router.push("/")}
//       >
//         <ArrowLeft className="w-6 h-6 mr-2" /> 
//       </button>

//       <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg relative mt-10 md:my-20">
//         {/* Profile Header */}
//         <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6 mt-10 md:mt-0">
//           <div
//             className="w-28 h-28 bg-gray-300 rounded-full border-4 border-gray-200 shadow-md"
//             style={{
//               backgroundImage: `url(${profileData?.profileImage || "/images/profile.jpg"})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           ></div>
//           <div className="text-center md:text-left">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {(profileData?.result?.firstName + " " + profileData?.result?.lastName) || "Mr. Y"}
//             </h2>
//             <p className="text-gray-500">{profileData?.result?.role.name ||profileData?.result?.role?.roleName || "Security Officer in London"}</p>
//             <span className="text-sm text-yellow-500">✅ Usually responds within 1 hour</span>
//           </div>
//         </div>

//         {/* Membership Information */}
//         <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
//           <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
//             {profileData?.result?.industryType || "Industry"}
//           </span>
//           <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
//             Member since Jan 2016
//           </span>
//           <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
//             Last Updated Jan 2025
//           </span>
//           <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
//             Last Login 28 Jan 2025
//           </span>
//         </div>

//         {/* Contact Buttons */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
//           <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
//             <FaMobileAlt className="mr-2" /> {profileData?.result?.phoneNumber || "Mobile"}
//           </button>
//           <div className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 min-w-0 whitespace-normal break-words text-center">
//   <FaHome className="mr-2 flex-shrink-0" />
//   <span className="flex-1 break-words text-left">
//     {profileData?.result?.address || profileData?.result.role.address || "Home"}
//   </span>
// </div>

// <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 min-w-max w-full sm:w-auto">
//   <FaEnvelope className="mr-2 flex-shrink-0" />
//   <span className="truncate">{profileData?.result?.email || "Email"}</span>
// </button>


//         </div>

//         {/* Upgrade Button */}
//         <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
//           Upgrade My Membership
//         </button>

//         {/* Profile Actions */}
//         <h3 className="text-lg font-semibold my-6 text-gray-800 text-center md:text-left">My Profile</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaSearch className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">My Searches</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaHeart className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">My Favourites</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaUserShield className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">Visitors</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaSearch className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">Advance Search</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaCogs className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">Customer Support</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
//             <FaAd className="text-black text-2xl mx-auto" />
//             <p className="text-center text-gray-700 mt-2">Post Free Ad</p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UserProfile;




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
