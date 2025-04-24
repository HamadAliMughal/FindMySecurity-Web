"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import "../globals.css";
import ActionButtons from "./ActionButtons";
import ProfileMenu from "./ProfileMenu";
import WeeklySchedule from "./WeeklySchedule";

const UserProfile: React.FC = () => {
  const [loginData, setLoginData] = useState<any>(null);
  const router = useRouter();
  const [roleId, setRoleId] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData1 = localStorage.getItem("loginData") || localStorage.getItem("profileData");
      const data1 = storedData1 ? JSON.parse(storedData1) : null; 
      const currentId = data1?.id;
      try {
        const response = await fetch(
          `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/auth/get-user/${currentId}`
        );
  
        if (!response.ok) throw new Error("User not authenticated");
  
        const data = await response.json();
  
        const roleId = data?.role?.id || data?.roleId;
        setRoleId(roleId);
        localStorage.setItem("loginData", JSON.stringify(data));
        setLoginData(data);
  
        // Public profile check for roleId 3
        if (
          roleId === 3 &&
          !(data?.user?.individualProfessional || data?.individualProfessional)
        ) {
          const interval = setInterval(() => {
            if (window.confirm("Make your public profile?")) {
              router.push("/public-profile");
            }
          }, 5000);
  
          return () => clearInterval(interval);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/"); // Redirect if not logged in
      }
    };
  
    fetchUserData();
  }, [router]);
  
  const updateProfile = async () => {
    try {
      const storedData1 = localStorage.getItem("loginData") || localStorage.getItem("profileData");
      const data = storedData1 ? JSON.parse(storedData1) : null;   

      const currentRoleId = data?.role?.id || data?.roleId;

      const response = await fetch(
        `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/profile/individual/${currentRoleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginData: storedData1,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          alert("Profile updated successfully!");
          localStorage.setItem("loginData", JSON.stringify(storedData1));
        } else {
          alert("Failed to update profile.");
        }
      } else {
        throw new Error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  if (!loginData) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <button
        className="absolute top-4 left-4 mt-20 z-2 flex items-center text-gray-600 hover:text-black"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
      </button>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 relative mt-12 md:mt-16">
        

        <ActionButtons 
          loginData={loginData} 
          roleId={roleId} 
          updateProfile={updateProfile} 
        />

        <ProfileMenu roleId={roleId} />

        <WeeklySchedule roleId={roleId} loginData={loginData} />
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
//   const [loginData, setLoginData] = useState<any>(null);
//   const router = useRouter();
//   const [roleId, setRoleId] = useState(0);
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const storedData1 = localStorage.getItem("loginData") || localStorage.getItem("profileData");
//       const data1 = storedData1 ? JSON.parse(storedData1) : null; 
//       const currentId = data1?.id;
//       try {
//         const response = await fetch(
//           `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/auth/get-user/${currentId}`
//         );
  
//         if (!response.ok) throw new Error("User not authenticated");
  
//         const data = await response.json();
  
//         const roleId = data?.role?.id || data?.roleId;
//         setRoleId(roleId);
//         localStorage.setItem("loginData",JSON.stringify(data));
//         setLoginData(data);


  
//         // Public profile check for roleId 3
//         if (
//           roleId === 3 &&
//           !(data?.user?.individualProfessional || data?.individualProfessional)
//         ) {
//           const interval = setInterval(() => {
//             if (window.confirm("Make your public profile?")) {
//               router.push("/public-profile");
//             }
//           }, 5000);
  
//           return () => clearInterval(interval);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         router.push("/"); // Redirect if not logged in
//       }
//     };
  
//     fetchUserData();
//   }, [router]);
  
//   const updateProfile = async () => {
//     try {
//       const storedData1 = localStorage.getItem("loginData") || localStorage.getItem("profileData");
//       const data = storedData1 ? JSON.parse(storedData1) : null;   

//       const currentRoleId = data?.role?.id || data?.roleId;

//       const response = await fetch(
//         `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/profile/individual/${currentRoleId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             loginData: storedData1,
//           }),
//         }
//       );

//       if (response.ok) {
//         const responseData = await response.json();
//         if (responseData.success) {
//           alert("Profile updated successfully!");
//           localStorage.setItem("loginData", JSON.stringify(storedData1));
//         } else {
//           alert("Failed to update profile.");
//         }
//       } else {
//         throw new Error("Failed to update profile.");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Error updating profile. Please try again.");
//     }
//   };

//   if (!loginData) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       <button
//         className="absolute top-4 left-4 mt-20 z-2 flex items-center text-gray-600 hover:text-black"
//         onClick={() => router.push("/")}
//       >
//         <ArrowLeft className="w-6 h-6 mr-2" />
//       </button>

//       <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 relative mt-12 md:mt-16">
//         <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6">
//           <div
//             className="w-28 h-28 rounded-full shadow-lg shadow-gray-400 hover:scale-105 transition-transform duration-300"
//             style={{
//               backgroundImage: `url(${loginData?.individualProfessional?.profilePhoto || "/images/profile.png"})`,
//               backgroundSize: "cover",
//             }}
//           ></div>
//           <div className="text-center md:text-left">
//             <h2 className="text-2xl font-semibold text-gray-800">
// {
//  loginData?.firstName && loginData?.lastName
//     ? `${loginData.firstName} ${loginData.lastName}`
//     : "Mr. Y"}

//             </h2>
//             <h2 className="text-2xl font-semibold text-gray-800">
//             {loginData?.screenName ?? "Mr."}

//             </h2>
//             <p className="text-gray-500">
//             {loginData?.role?.name ?? "Security Officer"}
//             </p>
//             <span className="text-sm text-yellow-500">
//               ✅ Usually responds within 1 hour
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
//           {["Industry", "Member since Jan 2016", "Last Updated Jan 2025", "Last Login 28 Jan 2025"].map(
//             (info, index) => (
//               <span key={index} className="bg-black text-white px-3 py-1 rounded-full text-sm">
//                 {info}
//               </span>
//             )
//           )}
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
//           <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
//             <FaMobileAlt className="mr-2" /> {loginData?.phoneNumber ?? "Mobile"}
//           </button>
//           <div className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
//             <FaHome className="mr-2" />
//             <span className="truncate">
//             {loginData?.address ?? loginData?.role?.address ?? "Home"}

//             </span>
//           </div>
//           <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
//             <FaEnvelope className="mr-2" />
//             <span className="truncate">{loginData?.email ?? "Email"}</span>
//           </button>
//           {roleId === 3 && !(loginData?.individualProfessional) && (
//             <button
//               className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//               onClick={() => router.push("/public-profile")}
//             >
//               <FaBriefcase className="mr-2" /> Create Public Profile
//             </button>
//           )}

//           {roleId === 4 || roleId === 6 || roleId === 5 || roleId === 7 ? (
//             <button
//               className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//               onClick={() => router.push("/job-posting")}
//             >
//               <FaBriefcase className="mr-2" /> Post a Job
//             </button>
//           ) : (
//             <>
//               {roleId !== 3 ? (
//                 <button
//                   className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//                   onClick={() => router.push("/view-job")}
//                 >
//                   <FaBriefcase className="mr-2" /> Hire Professional
//                 </button>
//               ) : (
//                 <button
//                   className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//                   onClick={() => router.push("/view-ads")}
//                 >
//                   <FaBriefcase className="mr-2" /> View Job Ads
//                 </button>
//               )}
//             </>
//           )}
//           <button
//             className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
//             onClick={updateProfile}
//           >
//             <FaBriefcase className="mr-2" /> Update Profile
//           </button>
//         </div>

//         <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
//           Upgrade My Membership
//         </button>

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
//             ...(roleId !== 3 ? [{ icon: <FaAd />, label: "Post Free Ad", route: "/post-ad" }] : []),
//           ].map((item, index) => (
//             <div
//               key={index}
//               onClick={() => item.route && router.push(item.route)}
//               className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition text-center"
//             >
//               <div className="text-2xl">{item.icon}</div>
//               <p className="text-sm mt-1 text-center">{item.label}</p>
//             </div>
//           ))}
//         </div>

//         {roleId == 3 && (loginData?.individualProfessional) && (
//           <div className="mt-6">
//             <h4 className="font-semibold text-gray-800 mb-2">Weekly Schedule</h4>
//             {loginData?.individualProfessional && (
//               <div className="overflow-x-auto text-sm">
//                 <table className="w-full border border-gray-200">
//                   <thead>
//                     <tr className="bg-gray-200">
//                       <th className="p-2 border">Time</th>
//                       {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//                         <th key={day} className="p-2 border">
//                           {day}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Object.entries(loginData?.individualProfessional?.profileData?.availability?.weeklySchedule).map(([time, days]: any) => (
//                       <tr key={time}>
//                         <td className="p-2 border font-medium">{time}</td>
//                         {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//                           <td key={day} className="p-2 border text-center">
//                             {days[day] ? "✅" : "❌"}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
