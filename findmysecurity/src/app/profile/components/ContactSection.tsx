import React, { useState } from "react";
import Section from "./Section";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "@/utils/path";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { FaPhone } from "react-icons/fa";

interface PhoneNumberInfo {
  isValid: boolean;
  country?: string;
  formatInternational?: string;
  error?: string;
}

const ContactSection = ({ contact, id }: { contact: any, id: any }) => {
  if (!contact) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    homeTelephone: contact?.homeTelephone || "",
    mobileTelephone: contact?.mobileTelephone || "",
    website: contact?.website || "",
  });

  const [phoneNumberInfo, setPhoneNumberInfo] = useState<{
    home: PhoneNumberInfo;
    mobile: PhoneNumberInfo;
  }>({
    home: { isValid: false },
    mobile: { isValid: false }
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [updatedData, setUpdatedData] = useState({ ...formData });

  const validatePhoneNumber = (phone: string, field: 'home' | 'mobile'): PhoneNumberInfo => {
    if (!phone.trim()) {
      return { isValid: false, error: `${field === 'home' ? 'Home' : 'Mobile'} telephone is required` };
    }

    const phoneNumber = parsePhoneNumberFromString(phone);
    if (!phoneNumber || !phoneNumber.isValid()) {
      return { isValid: false, error: `Invalid ${field === 'home' ? 'home' : 'mobile'} telephone number` };
    }

    return {
      isValid: true,
      country: phoneNumber.country,
      formatInternational: phoneNumber.formatInternational(),
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear previous errors
    setFormErrors(prev => ({ ...prev, [name]: "" }));
    
    if (name === 'homeTelephone' || name === 'mobileTelephone') {
      const field = name === 'homeTelephone' ? 'home' : 'mobile';
      const validation = validatePhoneNumber(value, field);
      
      setPhoneNumberInfo(prev => ({
        ...prev,
        [field]: validation
      }));
      
      if (!validation.isValid) {
        setFormErrors(prev => ({ 
          ...prev, 
          [name]: validation.error || `Invalid ${field} telephone number` 
        }));
      }
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Validate home telephone if it has value
    if (formData.homeTelephone) {
      const homeValidation = validatePhoneNumber(formData.homeTelephone, 'home');
      if (!homeValidation.isValid) {
        errors.homeTelephone = homeValidation.error || "Invalid home telephone number";
        isValid = false;
      }
    }

    // Validate mobile telephone if it has value
    if (formData.mobileTelephone) {
      const mobileValidation = validatePhoneNumber(formData.mobileTelephone, 'mobile');
      if (!mobileValidation.isValid) {
        errors.mobileTelephone = mobileValidation.error || "Invalid mobile telephone number";
        isValid = false;
      }
    }

    // At least one phone number should be provided
    if (!formData.homeTelephone && !formData.mobileTelephone) {
      errors.homeTelephone = "At least one phone number is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    try {
      const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
      if (!token) {
        toast.error("Authorization token not found.");
        return;
      }
  
      const payload = {
        profileData: {
          homeTelephone: formData.homeTelephone,
          mobileTelephone: formData.mobileTelephone,
          website: formData.website,
        },
      };
  
      await axios.put(
        `${API_URL}/profile/individual/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setUpdatedData({ ...formData });
      toast.success("Contact information updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update contact info.";
      toast.error(message);
    }
  };

  const handleCancel = () => {
    setFormData({ ...updatedData });
    setFormErrors({});
    setPhoneNumberInfo({
      home: { isValid: false },
      mobile: { isValid: false }
    });
    setIsEditing(false);
  };

  const formatPhoneNumberDisplay = (phone: string) => {
    const parsed = parsePhoneNumberFromString(phone);
    return parsed?.formatInternational() || phone;
  };

  return (
    <Section
      title={
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Contact</h2>
        </div>
      }
    >
      {isEditing ? (
        <>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Telephone</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="homeTelephone"
                  value={formData.homeTelephone}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded text-gray-700 ${
                    formErrors.homeTelephone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+44 20 1234 5678"
                />
              </div>
              {formData.homeTelephone && phoneNumberInfo.home.country && (
                <div className="mt-1 text-xs text-gray-500">
                  Country: {phoneNumberInfo.home.country}
                </div>
              )}
              {formErrors.homeTelephone && (
                <p className="mt-1 text-xs text-red-500">{formErrors.homeTelephone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Telephone</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="mobileTelephone"
                  value={formData.mobileTelephone}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded text-gray-700 ${
                    formErrors.mobileTelephone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+44 7123 456789"
                />
              </div>
              {formData.mobileTelephone && phoneNumberInfo.mobile.country && (
                <div className="mt-1 text-xs text-gray-500">
                  Country: {phoneNumberInfo.mobile.country}
                </div>
              )}
              {formErrors.mobileTelephone && (
                <p className="mt-1 text-xs text-red-500">{formErrors.mobileTelephone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-700"
                placeholder="https://example.com"
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
          {(updatedData.homeTelephone || updatedData.mobileTelephone) && (
            <div className="space-y-2">
              <h4 className="font-medium">Phone Numbers</h4>
              {updatedData.homeTelephone && (
                <div className="flex items-start">
                  <FaPhone className="mt-1 mr-2 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Home:</p>
                    <p>{formatPhoneNumberDisplay(updatedData.homeTelephone)}</p>
                  </div>
                </div>
              )}
              {updatedData.mobileTelephone && (
                <div className="flex items-start">
                  <FaPhone className="mt-1 mr-2 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Mobile:</p>
                    <p>{formatPhoneNumberDisplay(updatedData.mobileTelephone)}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          {updatedData.website && (
            <div className="mt-4">
              <h4 className="font-medium">Website</h4>
              <a
                href={updatedData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {updatedData.website}
              </a>
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

export default ContactSection;








// import React, { useState } from "react";
// import Section from "./Section";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { API_URL } from "@/utils/path";

// const ContactSection = ({ contact , id}: { contact: any , id : any}) => {
//   if (!contact) return null;

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     homeTelephone: contact?.homeTelephone || "",
//     mobileTelephone: contact?.mobileTelephone || "",
//     website: contact?.website || "",
//   });

//   const [updatedData, setUpdatedData] = useState({ ...formData });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
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
//           homeTelephone: formData.homeTelephone,
//           mobileTelephone: formData.mobileTelephone,
//           website: formData.website,
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
//       toast.success("Contact information updated successfully");
//       setIsEditing(false);
//     } catch (error: any) {
//       const message = error.response?.data?.message || "Failed to update contact info.";
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
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold">Contact</h2>
//         </div>
//       }
//     >
//       {isEditing ? (
//         <>
//           <div className="space-y-3">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Home Telephone</label>
//               <input
//                 type="text"
//                 name="homeTelephone"
//                 value={formData.homeTelephone}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded text-gray-700"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Telephone</label>
//               <input
//                 type="text"
//                 name="mobileTelephone"
//                 value={formData.mobileTelephone}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded text-gray-700"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
//               <input
//                 type="url"
//                 name="website"
//                 value={formData.website}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded text-gray-700"
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
//           {(updatedData.homeTelephone || updatedData.mobileTelephone) && (
//             <div>
//               <h4 className="font-medium">Phone Numbers</h4>
//               {updatedData.homeTelephone && <p>Home: {updatedData.homeTelephone}</p>}
//               {updatedData.mobileTelephone && <p>Mobile: {updatedData.mobileTelephone}</p>}
//             </div>
//           )}
//           {updatedData.website && (
//             <div>
//               <h4 className="font-medium">Website</h4>
//               <a
//                 href={updatedData.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline break-all"
//               >
//                 {updatedData.website}
//               </a>
//             </div>
//           )}
//            {!isEditing && (
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

// export default ContactSection;
