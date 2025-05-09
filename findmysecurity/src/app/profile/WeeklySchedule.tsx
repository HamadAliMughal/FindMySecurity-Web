"use client";

import React from "react";
import ProfileHeader from "./ProfileHeader";
import BasicInfo from "./BasicInfo";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServiceSection";
import AvailabilitySection from "./AvailabilitySection";
import FeesSection from "./FeeSection";
import ContactSection from "./ContactSection";

const WeeklySchedule = ({ roleId, loginData }: any) => {
  if (roleId !== 3) return null;
  const profileData = loginData?.individualProfessional?.profileData;
  if (!profileData)
    return <div className="p-6 text-center text-gray-500">No profile data available</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gray-50 rounded-xl">
      <ProfileHeader />
      <BasicInfo profileData={profileData} />
      <AboutSection about={profileData.about} />
      <ServicesSection services={profileData.services} />
      <AvailabilitySection availability={profileData.availability} />
      <FeesSection fees={profileData.fees} />
      <ContactSection contact={profileData.contact} />
    </div>
  );
};

export default WeeklySchedule;




// "use client";

// import React from "react";
// import AnimateOnScrollProvider from "@/sections/components/animation/AnimateOnScrollProvider";
// import { CheckCircle, Cancel } from '@mui/icons-material';
 

// interface ProfileData {
//   about?: { aboutMe?: string; experience?: string; qualifications?: string };
//   availability?: {
//     description?: string;
//     weeklySchedule?: {
//       [key: string]: {
//         Mon?: boolean;
//         Tue?: boolean;
//         Wed?: boolean;
//         Thu?: boolean;
//         Fri?: boolean;
//         Sat?: boolean;
//         Sun?: boolean;
//       };
//     };
//   };
//   basicInfo?: {
//     gender?: string;
//     postcode?: string;
//     screenName?: string;
//     profileHeadline?: string;
//   };
//   contact?: {
//     website?: string;
//     homeTelephone?: string;
//     mobileTelephone?: string;
//   };
//   fees?: {
//     hourlyRate?: string;
//     description?: string;
//   };
//   profilePhoto?: string;
//   services?: {
//     otherService?: string;
//     selectedServices?: string[];
//   };
// }

// interface ProfileProps {
//   roleId: number;
//   loginData?: {
//     individualProfessional?: { profileData?: ProfileData };
//   };
// }

// const WeeklySchedule: React.FC<ProfileProps> = ({ roleId, loginData }) => {
//   if (roleId !== 3) return null;

//   const profileData = loginData?.individualProfessional?.profileData;
//   if (!profileData)
//     return (
//       <div className="p-6 text-center text-gray-500">No profile data available</div>
//     );
//     const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
//     <AnimateOnScrollProvider>
//       <div
//         className="bg-white border rounded-xl shadow-sm p-6 mb-6"
//         data-aos="fade-up" // 👈 this adds the animation
//       >
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{title}</h2>
//         {children}
//       </div>
//       </AnimateOnScrollProvider>
//     );

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gray-50 rounded-xl">
//       <h3 className="text-2xl font-bold text-center md:text-left text-gray-900 mb-8">
//         My Profile
//       </h3>

//       {(profileData.basicInfo || profileData.profilePhoto) && (
//         <Section title="Basic Information">
//           <div className="flex items-start gap-6">
//             {profileData.profilePhoto && (
//               <img
//                 src={profileData.profilePhoto}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover border shadow-sm"
//               />
//             )}
//             <div className="flex-1 space-y-2">
//               {profileData.basicInfo?.profileHeadline && (
//                 <p className="text-gray-700 italic">{profileData.basicInfo.profileHeadline}</p>
//               )}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
//                 {profileData.basicInfo?.gender && (
//                   <p>
//                     <span className="font-medium">Gender:</span> {profileData.basicInfo.gender}
//                   </p>
//                 )}
//                 {profileData.basicInfo?.postcode && (
//                   <p>
//                     <span className="font-medium">Location:</span> {profileData.basicInfo.postcode}
//                   </p>
//                 )}
//                 {profileData.fees?.hourlyRate && (
//                   <p>
//                     <span className="font-medium">Rate:</span> ${profileData.fees.hourlyRate}/hr
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </Section>
//       )}

//       {profileData.about && (
//         <Section title="About">
//           <div className="space-y-4 text-gray-700">
//             {profileData.about.aboutMe && (
//               <div>
//                 <h4 className="font-medium text-gray-800">About Me</h4>
//                 <p>{profileData.about.aboutMe}</p>
//               </div>
//             )}
//             {profileData.about.experience && (
//               <div>
//                 <h4 className="font-medium text-gray-800">Experience</h4>
//                 <p>{profileData.about.experience}</p>
//               </div>
//             )}
//             {profileData.about.qualifications && (
//               <div>
//                 <h4 className="font-medium text-gray-800">Qualifications</h4>
//                 <p>{profileData.about.qualifications}</p>
//               </div>
//             )}
//           </div>
//         </Section>
//       )}

//       {profileData?.services && (
//         <Section title="Services">
//           {(profileData?.services?.selectedServices?.length ?? 0) > 0 && (
//   <div className="mb-4">
//     <h4 className="font-medium text-gray-800 mb-2">Specializations</h4>
//     <div className="flex flex-wrap gap-2">
//       {profileData.services!.selectedServices!.map((service, index) => (
//         <span
//           key={index}
//           className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
//         >
//           {service}
//         </span>
//       ))}
//     </div>
//   </div>
// )}
//           {profileData.services.otherService && (
//             <div>
//               <h4 className="font-medium text-gray-800">Other Services</h4>
//               <p className="text-gray-700">{profileData.services.otherService}</p>
//             </div>
//           )}
//         </Section>
//       )}

//       {profileData.availability && (
//         <Section title="Availability">
//           {profileData.availability.description && (
//             <p className="text-gray-700 mb-4">{profileData.availability.description}</p>
//           )}
//         {profileData.availability.weeklySchedule && (
//   <div className="overflow-x-auto rounded-lg shadow-lg border bg-white">
//     <table className="w-full text-sm text-gray-700 border-separate border-spacing-0">
//     <thead className="bg-gradient-to-r from-gray-500 via-black to-gray-500 text-white">

//         <tr>
//           <th className="p-4 border-b text-left">Time</th>
//           {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//             <th key={day} className="p-4 text-center border-b">{day}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {Object.entries(profileData.availability.weeklySchedule).map(([time, days]) => (
//           <tr key={time} className="hover:bg-gray-50 transition duration-300">
//             <td className="p-4 border-b font-semibold">{time}</td>
//             {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//               <td
//                 key={day}
//                 className={`p-4 border-b text-center 
                  
//                   rounded-full transition duration-300`}
//               >
//                 {days[day as keyof typeof days] ? (
//                   <CheckCircle className="w-6 h-6 text-green-700 mx-auto" />
//                 ) : (
//                   <Cancel className="w-6 h-6 text-red-700 mx-auto" />
//                 )}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}
//         </Section>
//       )}

//       {profileData.fees && (
//         <Section title="Fees">
//           {profileData.fees.hourlyRate && (
//             <div className="text-lg font-semibold text-gray-800 mb-2">
//               Hourly Rate: ${profileData.fees.hourlyRate}
//             </div>
//           )}
//           {profileData.fees.description && (
//             <p className="text-gray-700">{profileData.fees.description}</p>
//           )}
//         </Section>
//       )}

//       {profileData.contact && (
//         <Section title="Contact">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
//             {(profileData.contact.homeTelephone || profileData.contact.mobileTelephone) && (
//               <div>
//                 <h4 className="font-medium">Phone Numbers</h4>
//                 {profileData.contact.homeTelephone && <p>Home: {profileData.contact.homeTelephone}</p>}
//                 {profileData.contact.mobileTelephone && <p>Mobile: {profileData.contact.mobileTelephone}</p>}
//               </div>
//             )}
//             {profileData.contact.website && (
//               <div>
//                 <h4 className="font-medium">Website</h4>
//                 <a
//                   href={profileData.contact.website}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline break-all"
//                 >
//                   {profileData.contact.website}
//                 </a>
//               </div>
//             )}
//           </div>
//         </Section>
//       )}
//     </div>
//   );
// };

// export default WeeklySchedule;









// // "use client";

// // import React from "react";

// // interface ProfileData {
// //   about?: {
// //     aboutMe?: string;
// //     experience?: string;
// //     qualifications?: string;
// //   };
// //   availability?: {
// //     description?: string;
// //     weeklySchedule?: {
// //       [key: string]: {
// //         Mon?: boolean;
// //         Tue?: boolean;
// //         Wed?: boolean;
// //         Thu?: boolean;
// //         Fri?: boolean;
// //         Sat?: boolean;
// //         Sun?: boolean;
// //       };
// //     };
// //   };
// //   basicInfo?: {
// //     gender?: string;
// //     postcode?: string;
// //     screenName?: string;
// //     profileHeadline?: string;
// //   };
// //   contact?: {
// //     website?: string;
// //     homeTelephone?: string;
// //     mobileTelephone?: string;
// //   };
// //   fees?: {
// //     hourlyRate?: string;
// //     description?: string;
// //   };
// //   profilePhoto?: string;
// //   services?: {
// //     otherService?: string;
// //     selectedServices?: string[];
// //   };
// // }

// // interface ProfileProps {
// //   roleId: number;
// //   loginData?: {
// //     individualProfessional?: {
// //       profileData?: ProfileData;
// //     };
// //   };
// // }

// // const WeeklySchedule: React.FC<ProfileProps> = ({ roleId, loginData }) => {
// //   if (roleId !== 3) return null;

// //   const profileData = loginData?.individualProfessional?.profileData;
// //   if (!profileData) return <div className="p-6 text-gray-500">No profile data available</div>;

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
// //             <h3 className="text-lg font-semibold my-6 text-gray-800 text-center md:text-left">
// //         My Profile
// //       </h3>
// //       {/* Profile Header - Only show if basicInfo or profilePhoto exists */}
// //       {(profileData.basicInfo || profileData.profilePhoto) && (
// //         <div className="flex flex-col md:flex-row gap-6 mb-8">
// //           <div className="flex-1">
// //             {profileData.basicInfo?.profileHeadline && (
// //               <p className="text-gray-600 mb-2">{profileData.basicInfo.profileHeadline}</p>
// //             )}
// //             <div className="flex flex-wrap gap-4 text-sm">
// //               {profileData.basicInfo?.gender && (
// //                 <div>
// //                   <span className="font-semibold">Gender:</span> {profileData.basicInfo.gender}
// //                 </div>
// //               )}
// //               {profileData.basicInfo?.postcode && (
// //                 <div>
// //                   <span className="font-semibold">Location:</span> {profileData.basicInfo.postcode}
// //                 </div>
// //               )}
// //               {profileData.fees?.hourlyRate && (
// //                 <div>
// //                   <span className="font-semibold">Rate:</span> ${profileData.fees.hourlyRate}/hr
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* About Section - Only show if any about data exists */}
// //       {profileData.about && (
// //         <div className="mb-8">
// //           <h2 className="text-xl font-semibold border-b pb-2 mb-4">About</h2>
// //           <div className="space-y-4">
// //             {profileData.about.aboutMe && (
// //               <div>
// //                 <h3 className="font-medium">About Me</h3>
// //                 <p className="text-gray-700">{profileData.about.aboutMe}</p>
// //               </div>
// //             )}
// //             {profileData.about.experience && (
// //               <div>
// //                 <h3 className="font-medium">Experience</h3>
// //                 <p className="text-gray-700">{profileData.about.experience}</p>
// //               </div>
// //             )}
// //             {profileData.about.qualifications && (
// //               <div>
// //                 <h3 className="font-medium">Qualifications</h3>
// //                 <p className="text-gray-700">{profileData.about.qualifications}</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {/* Services Section - Only show if services data exists */}
// //       {profileData.services && (
// //         <div className="mb-8">
// //           <h2 className="text-xl font-semibold border-b pb-2 mb-4">Services</h2>
// //           {profileData.services.selectedServices && profileData.services.selectedServices.length > 0 && (
// //             <div className="mb-4">
// //               <h3 className="font-medium">Specializations</h3>
// //               <div className="flex flex-wrap gap-2 mt-2">
// //                 {profileData.services.selectedServices.map((service, index) => (
// //                   <span
// //                     key={index}
// //                     className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
// //                   >
// //                     {service}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //           {profileData.services.otherService && (
// //             <div>
// //               <h3 className="font-medium">Other Services</h3>
// //               <p className="text-gray-700">{profileData.services.otherService}</p>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Availability Section - Only show if availability data exists */}
// //       {profileData.availability && (
// //         <div className="mb-8">
// //           <h2 className="text-xl font-semibold border-b pb-2 mb-4">Availability</h2>
// //           {profileData.availability.description && (
// //             <p className="text-gray-700 mb-4">{profileData.availability.description}</p>
// //           )}
// //           {profileData.availability.weeklySchedule && (
// //             <div className="overflow-x-auto text-sm">
// //               <table className="w-full border border-gray-200">
// //                 <thead>
// //                   <tr className="bg-gray-200">
// //                     <th className="p-2 border">Time</th>
// //                     {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
// //                       <th key={day} className="p-2 border">
// //                         {day}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {Object.entries(profileData.availability.weeklySchedule).map(
// //                     ([time, days]: [string, any]) => (
// //                       <tr key={time}>
// //                         <td className="p-2 border font-medium">{time}</td>
// //                         {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
// //                           <td key={day} className="p-2 border text-center">
// //                             {days[day] ? "✅" : "❌"}
// //                           </td>
// //                         ))}
// //                       </tr>
// //                     )
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Fees Section - Only show if fees data exists */}
// //       {profileData.fees && (
// //         <div className="mb-8">
// //           <h2 className="text-xl font-semibold border-b pb-2 mb-4">Fees</h2>
// //           {profileData.fees.hourlyRate && (
// //             <div className="flex items-center gap-4 mb-2">
// //               <span className="font-medium">Hourly Rate:</span>
// //               <span className="text-lg font-bold">${profileData.fees.hourlyRate}</span>
// //             </div>
// //           )}
// //           {profileData.fees.description && (
// //             <p className="text-gray-700">{profileData.fees.description}</p>
// //           )}
// //         </div>
// //       )}

// //       {/* Contact Section - Only show if contact data exists */}
// //       {profileData.contact && (
// //         <div>
// //           <h2 className="text-xl font-semibold border-b pb-2 mb-4">Contact</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {(profileData.contact.homeTelephone || profileData.contact.mobileTelephone) && (
// //               <div>
// //                 <h3 className="font-medium">Phone Numbers</h3>
// //                 {profileData.contact.homeTelephone && (
// //                   <p className="text-gray-700">Home: {profileData.contact.homeTelephone}</p>
// //                 )}
// //                 {profileData.contact.mobileTelephone && (
// //                   <p className="text-gray-700">Mobile: {profileData.contact.mobileTelephone}</p>
// //                 )}
// //               </div>
// //             )}
// //             {profileData.contact.website && (
// //               <div>
// //                 <h3 className="font-medium">Website</h3>
// //                 <a
// //                   href={profileData.contact.website}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-blue-600 hover:underline"
// //                 >
// //                   {profileData.contact.website}
// //                 </a>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default WeeklySchedule;




// // "use client";

// // import React from "react";

// // interface WeeklyScheduleProps {
// //   roleId: number;
// //   loginData: any;
// // }

// // const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ roleId, loginData }) => {
// //   if (roleId !== 3 || !loginData?.individualProfessional) return null;

// //   return (
// //     <div className="mt-6">
// //       <h4 className="font-semibold text-gray-800 mb-2">Weekly Schedule</h4>
// //       {loginData?.individualProfessional?.profileData?.availability && (
// //         <div className="overflow-x-auto text-sm">
// //           <table className="w-full border border-gray-200">
// //             <thead>
// //               <tr className="bg-gray-200">
// //                 <th className="p-2 border">Time</th>
// //                 {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
// //                   <th key={day} className="p-2 border">
// //                     {day}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>

// //               {Object.entries(
// //                 loginData?.individualProfessional?.profileData?.availability
// //                   ?.weeklySchedule
// //               ).map(([time, days]: any) => (
// //                 <tr key={time}>
// //                   <td className="p-2 border font-medium">{time}</td>
// //                   {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
// //                     (day) => (
// //                       <td key={day} className="p-2 border text-center">
// //                         {days[day] ? "✅" : "❌"}
// //                       </td>
// //                     )
// //                   )}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default WeeklySchedule;