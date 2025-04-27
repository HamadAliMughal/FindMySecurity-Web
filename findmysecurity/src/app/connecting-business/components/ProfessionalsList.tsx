// Assuming that Professional is the type for each professional object in the list
import { useState } from "react";
import { ApiResponse, Professional } from "../types";

// Update the ProfessionalsListProps to allow apiData to be null
interface ProfessionalsListProps {
  apiData: ApiResponse | null; // Allow null or ApiResponse
  loading: boolean;
  error: string | null;
}
interface ProfileData {
  about?: {
    aboutMe?: string;
    experience?: string;
    qualifications?: string;
  };
  services?: {
    selectedServices?: string[];
  };
  fees?: {
    hourlyRate?: number;
  };
  contact?: {
    website?: string;
    homeTelephone?: string;
    mobileTelephone?: string;
  };
}


// Define the type for props in the ProfessionalCard component
interface ProfessionalCardProps {
  professional: Professional;
}

const getDisplayName = (professional: Professional) => {
  return professional.profileData?.basicInfo?.screenName || 
    `${professional.user.firstName} ${professional.user.lastName}`;
};

const getHourlyRate = (professional: Professional) => {
  return professional.profileData?.fees?.hourlyRate ? 
    `£${professional.profileData.fees.hourlyRate}/hr` : "Rate not specified";
};

export default function ProfessionalsList({ apiData, loading, error }: ProfessionalsListProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">
          Available Professionals {apiData && `(${apiData.totalCount} found)`}
        </h2>
      </div>
      
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      
      {!loading && apiData && (
        <>
          {apiData.professionals.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {apiData.professionals.map((professional) => (
                <ProfessionalCard 
                  key={professional.id} 
                  professional={professional} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-gray-200">
              No professionals found matching your criteria.
            </div>
          )}
        </>
      )}
    </div>
  );
}

const ProfessionalCard = ({ professional }: { professional: Professional }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewProfile = () => {
    // Show modal after a 0.5s delay for a smoother effect
    setTimeout(() => {
      setShowModal(true); // Show modal
      setModalVisible(true); // Start fade-in and scale-up transition
    }, 500); // Delay for a smoother effect
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Fade-out and scale-down
    setTimeout(() => {
      setShowModal(false); // Remove modal after animation
    }, 500); // Match the duration of fade-out
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModalVisible(false); // Fade-out and scale-down
      setTimeout(() => {
        setShowModal(false); // Hide modal after fade-out
      }, 500); // Same duration as fade-out
    }
  };

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all bg-white hover:bg-gray-50 transform">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-900">{getDisplayName(professional)}</h3>
            {professional.profileData?.basicInfo?.profileHeadline && (
              <p className="text-gray-600 mt-1">{professional.profileData.basicInfo.profileHeadline}</p>
            )}
            
            <div className="mt-3 flex flex-wrap gap-2">
              {professional.profileData?.services?.selectedServices?.slice(0, 3).map((service, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-200">
                  {service}
                </span>
              ))}
              {((professional.profileData?.services?.selectedServices?.length ?? 0) > 3) && (
                <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-200">
                  +{professional.profileData!.services!.selectedServices!.length - 3} more
                </span>
              )}
            </div>
            
            {professional.user.address && (
              <p className="text-sm text-gray-500 mt-3 flex items-center">
                <LocationIcon />
                {professional.user.address}
              </p>
            )}
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-lg font-semibold text-gray-900">
              {getHourlyRate(professional)}
            </span>
            {professional.profileData?.about?.experience && (
              <span className="text-sm text-gray-500 mt-1">
                {professional.profileData.about.experience} experience
              </span>
            )}
            <button 
              onClick={handleViewProfile} 
              className="mt-3 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
            >
              View Profile
            </button>
          </div>
        </div>
        
        {professional.profileData?.about?.aboutMe && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="font-medium text-gray-900">About</h4>
            <p className="text-gray-600 mt-1 line-clamp-2">
              {professional.profileData.about.aboutMe}
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <ProfileModal 
          professional={professional} 
          closeModal={handleCloseModal} 
          backdropClick={handleBackdropClick}
          modalVisible={modalVisible} // Control visibility
        />
      )}
    </>
  );
};



const LocationIcon = () => (
  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ProfileModal = ({
  professional,
  closeModal,
  backdropClick,
  modalVisible,
}: {
  professional: Professional;
  closeModal: () => void;
  backdropClick: (e: React.MouseEvent) => void;
  modalVisible: boolean; // Control modal visibility
}) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-500 ease-in-out ${
        modalVisible ? "opacity-100" : "opacity-0"
      } pointer-events-auto`}
      onClick={backdropClick}
    >
      <div
        className={`bg-white p-10 rounded-lg shadow-xl w-11/12 max-w-4xl transition-all duration-500 ease-in-out transform ${
          modalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 font-bold text-xl hover:text-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-gray-800">{getDisplayName(professional)}'s Profile</h2>

        <div className="space-y-6">
          <p className="text-gray-700"><strong>Email:</strong> <span className="text-gray-500">{professional.user.email}</span></p>
          <p className="text-gray-700"><strong>Phone Number:</strong> <span className="text-gray-500">{professional.user.phoneNumber}</span></p>
          <p className="text-gray-700"><strong>About Me:</strong> <span className="text-gray-500">{professional.profileData?.about?.aboutMe || "No information available"}</span></p>
          <p className="text-gray-700"><strong>Experience:</strong> <span className="text-gray-500">{professional.profileData?.about?.experience || "No experience information"}</span></p>
          <p className="text-gray-700"><strong>Qualifications:</strong> <span className="text-gray-500">{professional.profileData?.about?.qualifications || "No qualifications listed"}</span></p>
          <p className="text-gray-700"><strong>Services:</strong> <span className="text-gray-500">{professional.profileData?.services?.selectedServices?.join(", ") || "No services listed"}</span></p>
          <p className="text-gray-700"><strong>Hourly Rate:</strong> <span className="text-gray-500">£{professional.profileData?.fees?.hourlyRate || "Not specified"}/hr</span></p>
          <p className="text-gray-700"><strong>Website:</strong> 
  <a 
    href={professional.profileData?.contact?.website || "#"} // Fallback to "#" if no website
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-blue-500 hover:underline"
  >
    {professional.profileData?.contact?.website || "No website provided"}
  </a>
</p>
<p className="text-gray-700"><strong>Home Phone:</strong> 
  <span className="text-gray-500">{professional.profileData?.contact?.homeTelephone || "No home phone provided"}</span>
</p>
<p className="text-gray-700"><strong>Mobile Phone:</strong> 
  <span className="text-gray-500">{professional.profileData?.contact?.mobileTelephone || "No mobile phone provided"}</span>
</p> </div>
      </div>
    </div>
  );
};











// import React, { useState, useEffect } from "react";
// import { ApiResponse, Professional } from "../types";

// interface ProfessionalsListProps {
//   apiData: ApiResponse | null;
//   loading: boolean;
//   error: string | null;
// }

// const getDisplayName = (professional: Professional) => {
//   return professional.profileData?.basicInfo?.screenName || 
//     `${professional.user.firstName} ${professional.user.lastName}`;
// };

// const getHourlyRate = (professional: Professional) => {
//   return professional.profileData?.fees?.hourlyRate ? 
//     `£${professional.profileData.fees.hourlyRate}/hr` : "Rate not specified";
// };

// export default function ProfessionalsList({ apiData, loading, error }: ProfessionalsListProps) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mb-10">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg md:text-xl font-semibold">
//           Available Professionals {apiData && `(${apiData.totalCount} found)`}
//         </h2>
//       </div>
      
//       {loading && (
//         <div className="flex justify-center items-center py-10">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
//         </div>
//       )}
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//           {error}
//         </div>
//       )}
      
//       {!loading && apiData && (
//         <>
//           {apiData.professionals.length > 0 ? (
//             <div className="grid grid-cols-1 gap-6">
//               {apiData.professionals.map((professional) => (
//                 <ProfessionalCard 
//                   key={professional.id} 
//                   professional={professional} 
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-gray-200">
//               No professionals found matching your criteria.
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// const ProfessionalCard = ({ professional }: { professional: Professional }) => {
//   const [showModal, setShowModal] = useState(false);

//   const handleViewProfile = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   // Close modal when clicking outside of it
//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       setShowModal(false);
//     }
//   };

//   return (
//     <>
//       <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all bg-white hover:bg-gray-50 transform hover:scale-101">
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
//               {((professional.profileData?.services?.selectedServices?.length ?? 0) > 3) && (
//                 <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-200">
//                   +{professional.profileData!.services!.selectedServices!.length - 3} more
//                 </span>
//               )}
//             </div>
            
//             {professional.user.address && (
//               <p className="text-sm text-gray-500 mt-3 flex items-center">
//                 <LocationIcon />
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
//             <button 
//               onClick={handleViewProfile} 
//               className="mt-3 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
//             >
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

//       {showModal && (
//         <ProfileModal 
//           professional={professional} 
//           closeModal={handleCloseModal} 
//           backdropClick={handleBackdropClick}
//         />
//       )}
//     </>
//   );
// };

// const LocationIcon = () => (
//   <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//   </svg>
// );

// const ProfileModal = ({ professional, closeModal, backdropClick }: { professional: Professional, closeModal: () => void, backdropClick: (e: React.MouseEvent) => void }) => {
//   return (
//     <div 
//       className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 opacity-100 pointer-events-auto"
//       onClick={backdropClick}
//     >
//       <div className="bg-white p-10 rounded-lg shadow-xl w-11/12 max-w-4xl transition-transform transform duration-500 ease-in-out scale-100 opacity-100 pointer-events-auto">
//         <button 
//           onClick={closeModal} 
//           className="absolute top-4 right-4 text-gray-600 font-bold text-xl hover:text-gray-800 transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
        
//         <h2 className="text-3xl font-semibold mb-6 text-gray-800">{getDisplayName(professional)}'s Profile</h2>

//         <div className="space-y-6">
//           <p className="text-gray-700"><strong>Email:</strong> <span className="text-gray-500">{professional.user.email}</span></p>
//           <p className="text-gray-700"><strong>Phone Number:</strong> <span className="text-gray-500">{professional.user.phoneNumber}</span></p>
//           <p className="text-gray-700"><strong>About Me:</strong> <span className="text-gray-500">{professional.profileData?.about?.aboutMe || "No information available"}</span></p>
//           <p className="text-gray-700"><strong>Experience:</strong> <span className="text-gray-500">{professional.profileData?.about?.experience || "No experience information"}</span></p>
//           <p className="text-gray-700"><strong>Qualifications:</strong> <span className="text-gray-500">{professional.profileData?.about?.qualifications || "No qualifications listed"}</span></p>
//           <p className="text-gray-700"><strong>Services:</strong> <span className="text-gray-500">{professional.profileData?.services?.selectedServices?.join(", ") || "No services listed"}</span></p>
//           <p className="text-gray-700"><strong>Hourly Rate:</strong> <span className="text-gray-500">£{professional.profileData?.fees?.hourlyRate || "Not specified"}/hr</span></p>
//           <p className="text-gray-700"><strong>Website:</strong> 
//             <a 
//               href={professional.profileData?.contact?.website} 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               className="text-blue-500 hover:underline"
//             >
//               {professional.profileData?.contact?.website || "No website provided"}
//             </a>
//           </p>
//           <p className="text-gray-700"><strong>Home Phone:</strong> <span className="text-gray-500">{professional.profileData?.contact?.homeTelephone || "No home phone provided"}</span></p>
//           <p className="text-gray-700"><strong>Mobile Phone:</strong> <span className="text-gray-500">{professional.profileData?.contact?.mobileTelephone || "No mobile phone provided"}</span></p>
//         </div>
//       </div>
//     </div>
//   );
// };





// import React from "react";
// import { ApiResponse, Professional } from "../types";

// interface ProfessionalsListProps {
//   apiData: ApiResponse | null;
//   loading: boolean;
//   error: string | null;
// }

// const getDisplayName = (professional: Professional) => {
//   return professional.profileData?.basicInfo?.screenName || 
//     `${professional.user.firstName} ${professional.user.lastName}`;
// };

// const getHourlyRate = (professional: Professional) => {
//   return professional.profileData?.fees?.hourlyRate ? 
//     `£${professional.profileData.fees.hourlyRate}/hr` : "Rate not specified";
// };

// export default function ProfessionalsList({ apiData, loading, error }: ProfessionalsListProps) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto mb-10">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg md:text-xl font-semibold">
//           Available Professionals {apiData && `(${apiData.totalCount} found)`}
//         </h2>
//       </div>
      
//       {loading && (
//         <div className="flex justify-center items-center py-10">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
//         </div>
//       )}
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//           {error}
//         </div>
//       )}
      
//       {!loading && apiData && (
//         <>
//           {apiData.professionals.length > 0 ? (
//             <div className="grid grid-cols-1 gap-6">
//               {apiData.professionals.map((professional) => (
//                 <ProfessionalCard 
//                   key={professional.id} 
//                   professional={professional} 
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-gray-200">
//               No professionals found matching your criteria.
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// const ProfessionalCard = ({ professional }: { professional: Professional }) => {
//   return (
//     <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all bg-white hover:bg-gray-50">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div className="flex-1">
//           <h3 className="font-bold text-xl text-gray-900">{getDisplayName(professional)}</h3>
//           {professional.profileData?.basicInfo?.profileHeadline && (
//             <p className="text-gray-600 mt-1">{professional.profileData.basicInfo.profileHeadline}</p>
//           )}
          
//           <div className="mt-3 flex flex-wrap gap-2">
//             {professional.profileData?.services?.selectedServices?.slice(0, 3).map((service, index) => (
//               <span key={index} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-200">
//                 {service}
//               </span>
//             ))}
//        {((professional.profileData?.services?.selectedServices?.length ?? 0) > 3) && (
//   <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-200">
//     +{professional.profileData!.services!.selectedServices!.length - 3} more
//   </span>
// )}
//           </div>
          
//           {professional.user.address && (
//             <p className="text-sm text-gray-500 mt-3 flex items-center">
//               <LocationIcon />
//               {professional.user.address}
//             </p>
//           )}
//         </div>
        
//         <div className="flex flex-col items-end">
//           <span className="text-lg font-semibold text-gray-900">
//             {getHourlyRate(professional)}
//           </span>
//           {professional.profileData?.about?.experience && (
//             <span className="text-sm text-gray-500 mt-1">
//               {professional.profileData.about.experience} experience
//             </span>
//           )}
//           <button className="mt-3 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors shadow-sm">
//             View Profile
//           </button>
//         </div>
//       </div>
      
//       {professional.profileData?.about?.aboutMe && (
//         <div className="mt-4 pt-4 border-t border-gray-100">
//           <h4 className="font-medium text-gray-900">About</h4>
//           <p className="text-gray-600 mt-1 line-clamp-2">
//             {professional.profileData.about.aboutMe}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// const LocationIcon = () => (
//   <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//   </svg>
// );