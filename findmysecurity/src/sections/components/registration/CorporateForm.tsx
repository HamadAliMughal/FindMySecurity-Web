
"use client";

import React, { useState, useEffect } from "react";
import { FaBuilding, FaClipboardList, FaIndustry, FaMapMarkerAlt, FaPhone, FaUserTie } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdReport } from "react-icons/md";
import { Globe, Mail, Lock } from "lucide-react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
interface BusinessFormProps {
  id: number;
  title: string;
  onSubmit: (data: any) => void;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ id, title, onSubmit }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    address: "",
    password: "",
    postCode: "",
    industryType: "",  // Ensure it is not `undefined`
    contactPerson: "",
    jobTitle: "",
    email: "",
    phone: "",
    website: "",
    serviceRequirements: "",
    premiumService: false,
    securityChallenges: false,
    receiveEmails: false,
    acceptTerms: false,
  });
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formattedData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.companyName.split(" ")[0],
      lastName: formData.companyName.split(" ")[1] || "",
      phoneNumber: formData.phone,
      
      companyData: {
        companyName: formData.companyName,
        registrationNumber: formData.registrationNumber,
        address: formData.address,  // <-- Changed from `businessAddress` to `address`
        postCode: formData.postCode,
        industryType: formData.industryType, // <-- Ensure this is not `undefined`
        contactPerson: formData.contactPerson,
        jobTitle: formData.jobTitle,
        phoneNumber: formData.phone,
        website: formData.website,
      },
      serviceRequirements: formData.serviceRequirements,
      securityServicesOfferings: formData.premiumService,
      permissions: {
        premiumServiceNeed: formData.premiumService,
        acceptEmails: formData.receiveEmails,
        acceptTerms: formData.acceptTerms,
      },
      roleId: id,
    };
    
    onSubmit(formattedData);
  };
  

  return (
    <div className="max-w-3xl mt-10 mx-auto bg-white shadow-lg p-6 md:p-8 rounded-lg">
      <h2 className="text-center text-2xl font-bold mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {["companyName", "registrationNumber", "address", "postCode", "industryType", "contactPerson", "jobTitle", "email", "phone", "website", "serviceRequirements"].map((field, index) => {
          const fieldProps: any = {
            companyName: { placeholder: "Enter company name", icon: <FaBuilding size={18}/> },
            registrationNumber: { placeholder: "Enter registration number", icon: <FaUserTie size={18}/> },
            address: { placeholder: "Enter address", icon: <FaMapMarkerAlt size={18}/> },
            postCode: { placeholder: "Enter post code", icon: <BsPostcard size={18}/> },
            industryType: { placeholder: "Enter industry type", icon: <FaIndustry size={18}/> },
            contactPerson: { placeholder: "Enter contact person", icon: <CgProfile size={18}/> },
            jobTitle: { placeholder: "Enter job title", icon: <MdReport size={18}/> },
            email: { placeholder: "Enter email", icon: <Mail size={18}/>, type: "email" },
            phone: { placeholder: "Enter phone number", icon: <FaPhone size={18}/>, type: "tel" },
            website: { placeholder: "Enter website URL", icon: <Globe size={18}/> },
            serviceRequirements: { placeholder: "Enter service requirements", icon: <FaClipboardList size={18}/> },
          }[field];
          return (
            <div key={index} className="relative">
              {fieldProps.icon && React.cloneElement(fieldProps.icon, { className: "absolute left-3 top-3 text-gray-500" })}
              <input
                type={fieldProps.type || "text"}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                placeholder={fieldProps.placeholder}
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
              />
            </div>
          );
        })}

        {/* Password Field */}
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3 text-gray-500" />
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full pl-10 pr-10 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
          </button>
        </div>

        {/* Checkboxes */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
          {["Interested in premium service package for enhanced visibility?", "Any specific security challenges or requirements?", "Receive updates via email", "acceptTerms"].map((field, index) => (
            <label key={index} className="flex items-center space-x-2 text-black">
              <input type="checkbox" name={field} checked={(formData as any)[field]} onChange={handleChange} />
              <span>{field === "acceptTerms" ? "Accept Terms & Privacy Policy" : `${field.replace(/([A-Z])/g, ' $1')}`}</span>
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-black text-white py-3 px-4 rounded w-full font-bold hover:opacity-80 col-span-1 md:col-span-2">Submit</button>
      </form>
    </div>
  );
};

export default BusinessForm;








// "use client";

// import React, { useState, useEffect } from "react";
// import { FaBuilding, FaClipboardList, FaIndustry, FaMapMarkerAlt, FaPhone, FaUserTie } from "react-icons/fa";
// import { BsPostcard } from "react-icons/bs";
// import { CgProfile } from "react-icons/cg";
// import { MdReport } from "react-icons/md";
// import { Globe, Mail } from "lucide-react";
// import { LockIcon } from "lucide-react";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";

// interface BusinessFormProps {
//   id: number;
//   title: string;
//   onSubmit: (data: any) => void;
// }

// const BusinessForm: React.FC<BusinessFormProps> = ({ id, title, onSubmit }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const [formData, setFormData] = useState({
//     companyName: "",
//     registrationNumber: "",
//     address: "",
//     password: "",
//     postCode: "",
//     industryType: "",
//     contactPerson: "",
//     jobTitle: "",
//     email: "",
//     phone: "",
//     website: "",
//     serviceRequirements: "",
//     premiumService: false, // Change from "" to false
//     securityChallenges: false, // Change from "" to false
//     receiveEmails: false,
//     acceptTerms: false,
//   });

//   useEffect(() => {
//     // Function to detect if the screen is in mobile mode
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 568); // Mobile if width < 768px (Tailwind's 'md')
//     };

//     // Set initial value
//     handleResize();

//     // Add event listener to update on window resize
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleChange = (e: any) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     console.log("click")
//     const formattedData = {
//       email: formData.email,
//       password: formData.password,
//       firstName: formData.companyName.split(" ")[0],
//       lastName: formData.companyName.split(" ")[1],
//       phoneNumber: formData.phone,
//       companyData: {
//         companyName: formData.companyName,
//         registrationNumber: formData.registrationNumber,
//         businessAddress: formData.address,
//         postCode: formData.postCode,
//         contactPerson: formData.contactPerson,
//         jobTitle: formData.jobTitle,
//         phoneNumber: formData.phone,

//         website: formData.website,
//       },
//       serviceRequirements: formData.serviceRequirements,
//       securityServicesOfferings: formData.premiumService,

//       permissions: {
//         premiumServiceNeed: formData.premiumService,
//         acceptEmails: formData.receiveEmails,
//         acceptTerms: formData.acceptTerms,
//       },
//       roleId: id, // Ensure this matches your updated role array logic
//     };

//     console.log("Form Data Submitted:", formattedData);
//     onSubmit(formattedData);
//   };

//   const fieldCount = Object.keys(formData).length;

//   // Default grid layout
//   let gridClass = `grid gap-4 mt-4 grid-cols-1 md:grid-cols-2`;

//   // Apply condition **only on desktop**
//   if (!isMobile && fieldCount % 2 !== 0) {
//     gridClass += " md:grid-cols-1 [&>*:last-child]:col-span-2";
//   }

//   return (
//     <div className="max-w-4xl mt-10 mx-auto bg-white shadow-lg p-8 rounded-md text-black">
//       <h2 className="text-center text-3xl font-bold mb-6">{title}</h2>
//       <form onSubmit={handleSubmit} className={gridClass}>
//         {[
//           { name: "companyName", placeholder: "Enter company name", type: "text", icon: <FaBuilding size={18} /> },
//           { name: "registrationNumber", placeholder: "Enter registration number", icon: <FaUserTie size={18} /> },
//         ].map(({ name, placeholder, icon, type }) => (
//           <div key={name} className="relative">
//             {icon && React.cloneElement(icon, {
//               className: "absolute left-3 top-3 text-gray-500"
//             })}
//             <input
//               type={type}
//               name={name}
//               value={(formData as any)[name]}
//               onChange={handleChange}
//               placeholder={placeholder}
//               className="w-full pl-10 pr-10 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
//             />
//           </div>
//         ))}

//         {/* Password Field */}
//         <div className="relative">
//           <LockIcon size={18} className="absolute left-3 top-3 text-gray-500" />
//           <input
//             type={passwordVisible ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             placeholder="Password"
//             className="w-full pl-10 pr-10 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
//           />
//           <button
//             type="button"
//             className="absolute right-3 top-3 text-gray-500"
//             onClick={() => setPasswordVisible(!passwordVisible)}
//           >
//             {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
//           </button>
//         </div>

//         {[
//           { name: "address", placeholder: "Enter address", icon: <FaMapMarkerAlt size={18} /> },
//           { name: "postCode", placeholder: "Enter post code", icon: <BsPostcard size={18} /> },
//           { name: "industryType", placeholder: "Enter industry type", icon: <FaIndustry size={18} /> },
//           { name: "contactPerson", placeholder: "Enter contact person", icon: <CgProfile size={18} /> },
//           { name: "jobTitle", placeholder: "Enter job title", icon: <MdReport size={18} /> },
//           { name: "email", placeholder: "Enter email", icon: <Mail size={18} />, type: "email" },
//           { name: "phone", placeholder: "Enter phone number", icon: <FaPhone size={18} />, type: "tel" },
//           { name: "website", placeholder: "Enter website URL", icon: <Globe size={18} /> },
//           { name: "serviceRequirements", placeholder: "Enter service requirements", icon: <FaClipboardList size={18} /> },
//         ].map(({ name, placeholder, icon, type = "text" }) => (
//           <div key={name} className="relative">
//             {icon && React.cloneElement(icon, {
//               className: "absolute left-3 top-3 text-gray-500"
//             })}
//             <input
//               type={type}
//               name={name}
//               value={(formData as any)[name]}
//               onChange={handleChange}
//               placeholder={placeholder}
//               className="w-full pl-10 pr-10 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
//             />
//           </div>
//         ))}
//         <div className="relative"> 
//           {/* Additional Information */}
//           <h2 className="text-black font-bold text-lg mt-6">Additional Information</h2>

//           <div className="grid grid-cols-1 gap-4 mt-4">
//             {/* Premium Services Checkbox */}
//             <label className="flex items-center space-x-2 text-black cursor-pointer">
//               <input
//                 type="checkbox"
//                 name="premiumService"
//                 checked={formData.premiumService}
//                 onChange={handleChange}
//                 className="w-5 h-5"
//               />
//               <span>Interested in premium service package for enhanced visibility?</span>
//             </label>

//             {/* Security Challenges Checkbox */}
//             <label className="flex items-center space-x-2 text-black cursor-pointer">
//               <input
//                 type="checkbox"
//                 name="securityChallenges"
//                 checked={formData.securityChallenges}
//                 onChange={handleChange}
//                 className="w-5 h-5"
//               />
//               <span>Any specific security challenges or requirements?</span>
//             </label>
//           </div>




//           {/* Terms & Agreement */}
//           <h2 className="text-black font-bold text-lg mt-6">Terms & Agreement</h2>
//           <div className="mt-4 space-y-2">
//             <label className="flex items-center space-x-2 text-black">
//               <input type="checkbox" name="receiveEmails" checked={formData.receiveEmails} onChange={handleChange} />
//               <span>Receive updates via email</span>
//             </label>

//             <label className="flex items-center space-x-2 text-black">
//               <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} required />
//               <span>Accept <a href="#" className="text-blue-600 underline">Terms & Privacy Policy</a></span>
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="bg-black cursor-pointer text-white py-3 px-4 rounded mt-6 w-full font-bold hover:opacity-80"
//           >
//             Submit
//           </button>
//         </div>

//       </form>

//     </div>
//   );
// };

// export default BusinessForm;
