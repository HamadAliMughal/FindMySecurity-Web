import React, { useState, useEffect } from "react";
import Section from "./Section";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "@/utils/path";

type ProfileType = {
  id: number;
  userId: number;
  companyName: string;
  serviceRequirements?: string[];
  securityServicesOfferings?: string[];
  otherService?: string;
};

interface Props {
  profile: ProfileType | null;
  roleId: number;
  userId: number;
}

const ServicesSection = ({ profile, userId, roleId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!profile) return null;

  const isSecurityCompany = roleId === 5;
  const isCourseProvider = roleId === 6;
  const isCorporateClient = roleId === 7;

  const getCombinedServices = () => {
    const sr = profile.serviceRequirements ?? [];
    const sso = profile.securityServicesOfferings ?? [];
    return Array.from(new Set([...sr, ...sso]));
  };

  const [formData, setFormData] = useState({
    selectedServices: getCombinedServices().join(", "),
    otherService: profile.otherService || "",
  });

  const [updatedData, setUpdatedData] = useState({ ...formData });

  useEffect(() => {
    const combined = getCombinedServices().join(", ");
    setFormData({
      selectedServices: combined,
      otherService: profile.otherService || "",
    });
    setUpdatedData({
      selectedServices: combined,
      otherService: profile.otherService || "",
    });
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
      if (!token) return toast.error("Authorization token not found.");

      const selectedServicesArr = formData.selectedServices
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const payloadData: any = {
        otherService: formData.otherService,
      };

      if (isSecurityCompany || isCourseProvider) {
        payloadData.securityServicesOfferings = selectedServicesArr;
      }

      if (isCorporateClient || isCourseProvider) {
        payloadData.serviceRequirements = selectedServicesArr;
      }

      let endpoint = "";
      switch (roleId) {
        case 5:
          endpoint = `${API_URL}/users/security-companies/${userId}`;
          break;
        case 6:
          endpoint = `${API_URL}/users/course-providers/${userId}`;
          break;
        case 7:
          endpoint = `${API_URL}/users/corporate-clients/${userId}`;
          break;
        default:
          toast.error("Unknown role type.");
          return;
      }

      const payload = { ...profile, ...payloadData };

      await axios.put(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUpdatedData({ ...formData });
      toast.success("Services updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update services.");
    }
  };

  const handleCancel = () => {
    setFormData({ ...updatedData });
    setIsEditing(false);
  };

  return (
    <Section
      title={
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold">Services</h2>
        </div>
      }
    >
      {isEditing ? (
        <>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Services / Specializations (comma-separated)
              </label>
              <input
                type="text"
                name="selectedServices"
                value={formData.selectedServices}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-700"
                placeholder="e.g., Security Officer, CCTV Services"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other Services
              </label>
              <textarea
                name="otherService"
                value={formData.otherService}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-700"
                rows={4}
                placeholder="Describe other services you offer"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4 justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {formData.selectedServices && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Services / Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {formData.selectedServices
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s.length > 0)
                  .map((service, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
              </div>
            </div>
          )}
          {formData.otherService && (
            <div>
              <h4 className="font-medium text-gray-800">Other Services</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{formData.otherService}</p>
            </div>
          )}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm px-5 py-2 mt-5 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Edit
            </button>
          )}
        </>
      )}
    </Section>
  );
};

export default ServicesSection;






// import React, { useState, useEffect } from "react";
// import Section from "./Section";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { API_URL } from "@/utils/path";

// type ProfileType = {
//   id: number;
//   userId: number;
//   companyName: string;
//   serviceRequirements?: string[];           // for corporateClient + others
//   securityServicesOfferings?: string[];     // for securityCompany + courseProvider
//   otherService?: string;                     // add this field if you want
// };

// interface Props {
//   profile: ProfileType | null;
//   id: number;
// }

// const ServicesSection = ({ profile, id }: Props) => {
//   const [isEditing, setIsEditing] = useState(false);

//   if (!profile) return null;

//   // Merge service arrays from profile, depending on what's available
//   const getCombinedServices = () => {
//     const sr = profile.serviceRequirements ?? [];
//     const sso = profile.securityServicesOfferings ?? [];
//     const combined = [...sr, ...sso];
//     // Remove duplicates
//     return Array.from(new Set(combined));
//   };

//   // Initialize form data from merged service arrays and otherService (optional)
//   const [formData, setFormData] = useState({
//     selectedServices: getCombinedServices().join(", "),
//     otherService: profile.otherService || "",
//   });

//   const [updatedData, setUpdatedData] = useState({ ...formData });

//   // If profile changes, reset formData
//   useEffect(() => {
//     setFormData({
//       selectedServices: getCombinedServices().join(", "),
//       otherService: profile.otherService || "",
//     });
//     setUpdatedData({
//       selectedServices: getCombinedServices().join(", "),
//       otherService: profile.otherService || "",
//     });
//   }, [profile]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
//       if (!token) {
//         toast.error("Authorization token not found.");
//         return;
//       }

//       // Prepare updated service arrays from the comma separated input
//       const selectedServicesArr = formData.selectedServices
//         .split(",")
//         .map((s) => s.trim())
//         .filter((s) => s.length > 0);

//       // Prepare payload according to the type of profile.
//       // We'll keep both arrays updated if both exist, else only serviceRequirements

//       let payloadData: any = {
//         otherService: formData.otherService,
//       };

//       // If profile has securityServicesOfferings, update it too
//       if (profile.securityServicesOfferings) {
//         payloadData.securityServicesOfferings = selectedServicesArr;
//       }

//       if (profile.serviceRequirements) {
//         payloadData.serviceRequirements = selectedServicesArr;
//       }

//       const payload = { profileData: payloadData };

//       await axios.put(`${API_URL}/profile/individual/${id}`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       setUpdatedData({ ...formData });
//       toast.success("Services updated successfully");
//       setIsEditing(false);
//     } catch (error: any) {
//       const message = error.response?.data?.message || "Failed to update services.";
//       toast.error(message);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({ ...updatedData });
//     setIsEditing(false);
//   };

//   return (
//     <Section
//       title={
//         <div className="flex items-center justify-between w-full">
//           <h2 className="text-lg font-semibold">Services</h2>
//         </div>
//       }
//     >
//       {isEditing ? (
//         <>
//           <div className="space-y-3">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Services / Specializations (comma-separated)
//               </label>
//               <input
//                 type="text"
//                 name="selectedServices"
//                 value={formData.selectedServices}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded text-gray-700"
//                 placeholder="e.g., Security Officer, CCTV Services"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Other Services
//               </label>
//               <textarea
//                 name="otherService"
//                 value={formData.otherService}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded text-gray-700"
//                 rows={4}
//                 placeholder="Describe other services you offer"
//               />
//             </div>
//           </div>
//           <div className="flex gap-3 mt-4 justify-end">
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               Save
//             </button>
//             <button
//               onClick={handleCancel}
//               className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           {formData.selectedServices && formData.selectedServices.length > 0 && (
//             <div className="mb-4">
//               <h4 className="font-medium text-gray-800 mb-2">Services / Specializations</h4>
//               <div className="flex flex-wrap gap-2">
//                 {formData.selectedServices
//                   .split(",")
//                   .map((service) => service.trim())
//                   .filter((service) => service.length > 0)
//                   .map((service, index) => (
//                     <span
//                       key={index}
//                       className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
//                     >
//                       {service}
//                     </span>
//                   ))}
//               </div>
//             </div>
//           )}
//           {formData.otherService && (
//             <div>
//               <h4 className="font-medium text-gray-800">Other Services</h4>
//               <p className="text-gray-700 whitespace-pre-wrap">{formData.otherService}</p>
//             </div>
//           )}
//           {!isEditing && (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="text-sm px-5 py-2 mt-5 bg-black text-white rounded hover:bg-gray-800 transition"
//             >
//               Edit
//             </button>
//           )}
//         </>
//       )}
//     </Section>
//   );
// };

// export default ServicesSection;







// const ServicesSection = ({ profile }: { profile: any }) => {
//     return (
//       <div>
//         <h2 className="text-lg font-semibold mb-2">Services</h2>
//         {profile.serviceRequirements?.length > 0 && (
//           <>
//             <h4 className="font-medium">Service Requirements:</h4>
//             <ul className="list-disc list-inside mb-2">
//               {profile.serviceRequirements.map((service: string, i: number) => (
//                 <li key={i}>{service}</li>
//               ))}
//             </ul>
//           </>
//         )}
//         {profile.securityServicesOfferings?.length > 0 && (
//           <>
//             <h4 className="font-medium">Security Services Offerings:</h4>
//             <ul className="list-disc list-inside">
//               {profile.securityServicesOfferings.map((offering: string, i: number) => (
//                 <li key={i}>{offering}</li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//     );
//   };
  
//   export default ServicesSection;
  