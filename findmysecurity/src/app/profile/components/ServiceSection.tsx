"use client";
import React, { useState } from "react";
import Section from "./Section";
import toast from "react-hot-toast";
import axios from "axios";
import Select from "react-select";
import { API_URL } from "@/utils/path";
import professionalsList from "@/sections/data/secuirty_professional.json";

interface RoleOption {
  label: string;
  value: string;
  group: string;
  isComingSoon: boolean;
}

interface RoleSelection {
  title: string;
  role: string;
}

const ServicesSection = ({ services, id }: { services: any; id: any }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!services) return null;

  const [formData, setFormData] = useState({
    selectedRoles: services?.selectedServices || [],
    otherService: services?.otherService || "",
  });

  const [updatedData, setUpdatedData] = useState({ ...formData });

  // Transform professional data for select component
  const roleOptions: RoleOption[] = professionalsList.flatMap(category => 
    category.roles.map(role => ({
      label: role,
      value: role,
      group: category.title.replace(" (Coming Soon)", ""),
      isComingSoon: category.title.includes("Coming Soon")
    }))
  );

  const groupedOptions = roleOptions.reduce((acc, option) => {
    if (!acc[option.group]) {
      acc[option.group] = [];
    }
    acc[option.group].push(option);
    return acc;
  }, {} as Record<string, typeof roleOptions>);

  const serviceRequirements = Array.from(
    new Set(formData.selectedRoles.map((item: { title: any; }) => item.title))
  );

  const securityServicesOfferings = [
    ...formData.selectedRoles.map((item: { role: any; }) => item.role),
    ...(formData.otherService ? [formData.otherService.trim()] : [])
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleSelection = (selectedOptions: any) => {
    const selectedItems = selectedOptions.map((option: any) => ({
      title: option.group,
      role: option.value
    }));
    handleInputChange('selectedRoles', selectedItems);
  };

  const handleOtherServiceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange("otherService", e.target.value);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
      if (!token) {
        toast.error("Authorization token not found.");
        return;
      }

      const payload = {
        profileData: {
          selectedServices: formData.selectedRoles,
          otherService: formData.otherService,
          serviceRequirements,
          securityServicesOfferings
        },
      };

      await axios.put(`${API_URL}/profile/individual/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUpdatedData({ ...formData });
      toast.success("Services updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update services.";
      toast.error(message);
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Security Services* <span className="ml-1 text-xs text-gray-500">(Select multiple if applicable)</span>
            </label>
          
            <Select
              isMulti
              options={Object.entries(groupedOptions).map(([label, options]) => ({
                label,
                options
              }))}
              value={roleOptions.filter(option => 
                formData.selectedRoles.some((item: { role: string; }) => item.role === option.value)
              )}
              onChange={handleRoleSelection}
              className="react-select-container"
              classNamePrefix="react-select"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  minHeight: '44px',
                  borderRadius: '8px',
                  borderColor: state.isFocused ? '#6366f1' : '#d1d5db',
                  boxShadow: state.isFocused ? '0 0 0 1px #6366f1' : 'none',
                  '&:hover': {
                    borderColor: state.isFocused ? '#6366f1' : '#9ca3af'
                  },
                  padding: '2px 4px'
                }),
                option: (provided, state) => ({
                  ...provided,
                  fontSize: '14px',
                  padding: '8px 12px',
                  color: state.data.isComingSoon ? '#6b7280' : '#111827',
                  backgroundColor: state.isSelected 
                    ? '#e0e7ff' 
                    : state.isFocused 
                      ? '#f3f4f6' 
                      : 'white',
                  '&:active': {
                    backgroundColor: '#e0e7ff'
                  },
                  display: 'flex',
                  alignItems: 'center'
                }),
                multiValue: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.data.isComingSoon ? '#f3f4f6' : '#e0e7ff',
                  borderRadius: '6px',
                  border: state.data.isComingSoon ? '1px dashed #d1d5db' : 'none'
                }),
                multiValueLabel: (provided, state) => ({
                  ...provided,
                  color: state.data.isComingSoon ? '#6b7280' : '#4338ca',
                  fontWeight: '500',
                  padding: '4px 6px'
                }),
                multiValueRemove: (provided, state) => ({
                  ...provided,
                  color: state.data.isComingSoon ? '#9ca3af' : '#818cf8',
                  ':hover': {
                    backgroundColor: state.data.isComingSoon ? '#e5e7eb' : '#c7d2fe',
                    color: state.data.isComingSoon ? '#6b7280' : '#6366f1'
                  }
                }),
                groupHeading: (provided) => ({
                  ...provided,
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#374151',
                  backgroundColor: '#f9fafb',
                  padding: '8px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  marginBottom: '4px'
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: '#9ca3af',
                  fontSize: '14px'
                })
              }}
              formatGroupLabel={(group) => (
                <div className="flex items-center justify-between">
                  <span>{group.label.replace(" (Coming Soon)", "")}</span>
                  {group.label.includes("Coming Soon") && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Coming Soon
                    </span>
                  )}
                </div>
              )}
              formatOptionLabel={(option) => (
                <div className="flex items-center">
                  {option.isComingSoon && (
                    <span className="mr-2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  )}
                  <span className={option.isComingSoon ? 'text-gray-500' : 'text-gray-900'}>
                    {option.label}
                  </span>
                </div>
              )}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              placeholder={
                <div className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Select security services...
                </div>
              }
              noOptionsMessage={() => "No roles found"}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => (
                  <div className="pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )
              }}
            />
          
            {formData.selectedRoles.length > 0 && (
              <p className="mt-2 text-xs text-gray-500">
                Selected: {formData.selectedRoles.length} service(s)
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Services</label>
            <textarea
              name="otherService"
              value={formData.otherService}
              onChange={handleOtherServiceChange}
              className="w-full border px-3 py-2 rounded text-gray-700"
              rows={4}
              placeholder="Describe other services you offer"
            />
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
          {updatedData.selectedRoles?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {updatedData.selectedRoles.map((item: { role: string }, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {item.role}
                  </span>
                ))}
              </div>
            </div>
          )}
          {updatedData.otherService && (
            <div>
              <h4 className="font-medium text-gray-800">Other Services</h4>
              <p className="text-gray-700">{updatedData.otherService}</p>
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






// "use client";
// import React, { useState } from "react";
// import Section from "./Section";
// import toast from "react-hot-toast";
// import axios from "axios";
// import Select from "react-select";
// import { API_URL } from "@/utils/path";
// import professionalsList from "@/sections/data/secuirty_professional.json";


// interface RoleOption {
//   label: string;
//   value: string;
//   group: string;
//   isComingSoon: boolean;
// }

// interface RoleSelection {
//   title: string;
//   role: string;
// }

// const ServicesSection = ({ services, id }: { services: any; id: any;}) => {
//   const [isEditing, setIsEditing] = useState(false);

//   if (!services) return null;

//   const [formData, setFormData] = useState({
//     selectedRoles: services?.selectedServices || [], // expected to be an array of { title, role }
//     otherService: services?.otherService || "",
//   });

//   const [updatedData, setUpdatedData] = useState({ ...formData });

//   // Create role options from professionalsList
//   const roleOptions: RoleOption[] = professionalsList.flatMap(category =>
//     category.roles.map((role: string) => ({
//       label: role,
//       value: role,
//       group: category.title.replace(" (Coming Soon)", ""),
//       isComingSoon: category.title.includes("Coming Soon"),
//     }))
//   );

//   const groupedOptions = roleOptions.reduce((acc, option) => {
//     if (!acc[option.group]) acc[option.group] = [];
//     acc[option.group].push(option);
//     return acc;
//   }, {} as Record<string, RoleOption[]>);

//   const handleInputChange = (field: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleRoleSelection = (selectedOptions: any) => {
//     const selectedItems = selectedOptions.map((option: any) => ({
//       title: option.group,
//       role: option.value,
//     }));
//     handleInputChange("selectedRoles", selectedItems);
//   };

//   const handleOtherServiceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     handleInputChange("otherService", e.target.value);
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
//       if (!token) {
//         toast.error("Authorization token not found.");
//         return;
//       }

//       const payload = {
//         profileData: {
//           selectedServices: formData.selectedRoles,
//           otherService: formData.otherService,
//         },
//       };

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
//           {/* Multi-Select Security Services */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Security Services*{" "}
//               <span className="ml-1 text-xs text-gray-500">(Select multiple if applicable)</span>
//             </label>

//             <Select
//               isMulti
//               options={Object.entries(groupedOptions).map(([label, options]) => ({
//                 label,
//                 options,
//               }))}
//               value={roleOptions.filter((option) =>
//                 formData.selectedRoles.some((item: { role: string; }) => item.role === option.value)
//               )}
//               onChange={handleRoleSelection}
//               className="react-select-container"
//               classNamePrefix="react-select"
//               styles={{
//                 control: (provided, state) => ({
//                   ...provided,
//                   minHeight: "44px",
//                   borderRadius: "8px",
//                   borderColor: state.isFocused ? "#6366f1" : "#d1d5db",
//                   boxShadow: state.isFocused ? "0 0 0 1px #6366f1" : "none",
//                   padding: "2px 4px",
//                 }),
//                 option: (provided, state) => ({
//                   ...provided,
//                   fontSize: "14px",
//                   padding: "8px 12px",
//                   color: state.data.isComingSoon ? "#6b7280" : "#111827",
//                   backgroundColor: state.isSelected
//                     ? "#e0e7ff"
//                     : state.isFocused
//                     ? "#f3f4f6"
//                     : "white",
//                 }),
//                 multiValue: (provided, state) => ({
//                   ...provided,
//                   backgroundColor: state.data.isComingSoon ? "#f3f4f6" : "#e0e7ff",
//                   borderRadius: "6px",
//                   border: state.data.isComingSoon ? "1px dashed #d1d5db" : "none",
//                 }),
//                 multiValueLabel: (provided, state) => ({
//                   ...provided,
//                   color: state.data.isComingSoon ? "#6b7280" : "#4338ca",
//                   fontWeight: "500",
//                   padding: "4px 6px",
//                 }),
//                 multiValueRemove: (provided, state) => ({
//                   ...provided,
//                   color: state.data.isComingSoon ? "#9ca3af" : "#818cf8",
//                   ":hover": {
//                     backgroundColor: state.data.isComingSoon ? "#e5e7eb" : "#c7d2fe",
//                     color: state.data.isComingSoon ? "#6b7280" : "#6366f1",
//                   },
//                 }),
//                 groupHeading: (provided) => ({
//                   ...provided,
//                   fontSize: "13px",
//                   fontWeight: "600",
//                   color: "#374151",
//                   backgroundColor: "#f9fafb",
//                   padding: "8px 12px",
//                   borderBottom: "1px solid #e5e7eb",
//                   marginBottom: "4px",
//                 }),
//                 menu: (provided) => ({
//                   ...provided,
//                   borderRadius: "8px",
//                   border: "1px solid #e5e7eb",
//                   boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//                 }),
//               }}
//               formatGroupLabel={(group) => (
//                 <div className="flex items-center justify-between">
//                   <span>{group.label.replace(" (Coming Soon)", "")}</span>
//                   {group.label.includes("Coming Soon") && (
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                       Coming Soon
//                     </span>
//                   )}
//                 </div>
//               )}
//               formatOptionLabel={(option) => (
//                 <div className="flex items-center">
//                   {option.isComingSoon && (
//                     <span className="mr-2 text-gray-400">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </span>
//                   )}
//                   <span className={option.isComingSoon ? "text-gray-500" : "text-gray-900"}>
//                     {option.label}
//                   </span>
//                 </div>
//               )}
//               closeMenuOnSelect={false}
//               hideSelectedOptions={false}
//               placeholder={
//                 <div className="flex items-center text-gray-400">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                   Select security services...
//                 </div>
//               }
//               noOptionsMessage={() => "No roles found"}
//               components={{
//                 IndicatorSeparator: () => null,
//                 DropdownIndicator: () => (
//                   <div className="pr-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 ),
//               }}
//             />

//             {formData.selectedRoles.length > 0 && (
//               <p className="mt-2 text-xs text-gray-500">
//                 Selected: {formData.selectedRoles.length} service(s)
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Other Services</label>
//             <textarea
//               name="otherService"
//               value={formData.otherService}
//               onChange={handleOtherServiceChange}
//               className="w-full border px-3 py-2 rounded text-gray-700"
//               rows={4}
//               placeholder="Describe other services you offer"
//             />
//           </div>

//           <div className="flex gap-3 mt-4 justify-end">
//             <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//               Save
//             </button>
//             <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
//               Cancel
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           {updatedData.selectedRoles?.length > 0 && (
//             <div className="mb-4">
//               <h4 className="font-medium text-gray-800 mb-2">Specializations</h4>
//               <div className="flex flex-wrap gap-2">
//                 {updatedData.selectedRoles.map((item: { role: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
//                   <span
//                     key={index}
//                     className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
//                   >
//                     {item.role}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//           {updatedData.otherService && (
//             <div>
//               <h4 className="font-medium text-gray-800">Other Services</h4>
//               <p className="text-gray-700">{updatedData.otherService}</p>
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










// import React, { useState } from "react";
// import Section from "./Section";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { API_URL } from "@/utils/path";

// const ServicesSection = ({ services, id }: { services: any; id: any }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   if (!services) return null;

//   const [formData, setFormData] = useState({
//     selectedServices: services?.selectedServices?.join(", ") || "",
//     otherService: services?.otherService || "",
//   });

//   const [updatedData, setUpdatedData] = useState({ ...formData });

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

//       const payload = {
//         profileData: {
//           selectedServices: formData.selectedServices
//             .split(",")
//             .map((service: string) => service.trim())
//             .filter((service: string) => service.length > 0),
//           otherService: formData.otherService,
//         },
//       };

//       await axios.put(
//         `${API_URL}/profile/individual/${id}`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

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
//                 Specializations (comma-separated)
//               </label>
//               <input
//                 type="text"
//                 name="selectedServices"
//                 value={formData.selectedServices}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded text-gray-700"
//                 placeholder="e.g., Web Development, Graphic Design"
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
//           {updatedData.selectedServices && updatedData.selectedServices.length > 0 && (
//             <div className="mb-4">
//               <h4 className="font-medium text-gray-800 mb-2">Specializations</h4>
//               <div className="flex flex-wrap gap-2">
//                 {updatedData.selectedServices
//                   .split(",")
//                   .map((service: string) => service.trim())
//                   .filter((service: string) => service.length > 0)
//                   .map((service: string, index: number) => (
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
//           {updatedData.otherService && (
//             <div>
//               <h4 className="font-medium text-gray-800">Other Services</h4>
//               <p className="text-gray-700">{updatedData.otherService}</p>
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







// import React from "react";
// import Section from "./Section";

// const ServicesSection = ({ services , id}: { services: any , id :any}) => {
//   if (!services) return null;

//   return (
//     <Section title="Services">
//       {services.selectedServices?.length > 0 && (
//         <div className="mb-4">
//           <h4 className="font-medium text-gray-800 mb-2">Specializations</h4>
//           <div className="flex flex-wrap gap-2">
//             {services.selectedServices.map((service: string, index: number) => (
//               <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
//                 {service}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//       {services.otherService && (
//         <div>
//           <h4 className="font-medium text-gray-800">Other Services</h4>
//           <p className="text-gray-700">{services.otherService}</p>
//         </div>
//       )}
//     </Section>
//   );
// };

// export default ServicesSection;
