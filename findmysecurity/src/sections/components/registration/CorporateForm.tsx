"use client";

import React, { useState } from "react";
import Icons from "../../../constants/icons/icons"
import { useRouter } from "next/navigation";

interface BusinessFormProps {
  id: number;
  title: string;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ id, title }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    address: "",
    postCode: "",
    industryType: "",
    contactPerson: "",
    jobTitle: "",
    email: "",
    phone: "",
    website: "",
    serviceRequirements: "",
    premiumService: "",
    securityChallenges: "",
    receiveEmails: false,
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
      // Save form data to localStorage
      localStorage.setItem("profileData", JSON.stringify(formData));

      // Redirect to profile page
      router.push("/profile");
  };

  const fieldCount = Object.keys(formData).length;
  
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-md text-black">
      <h2 className="text-center text-3xl font-bold mb-6">{title}</h2>
      <form 
        onSubmit={handleSubmit} 
        className={`grid gap-4 mt-4 grid-cols-2  ${
            fieldCount % 2 !== 0 ? " md:grid-cols-1 [&>*:last-child]:col-span-2" : ""
          }`}
          
      >
        {/* Form Fields */}
        {[
          { name: "companyName", placeholder: "Enter company name", icon: <Icons.FaBuilding /> },
          { name: "registrationNumber", placeholder: "Enter registration number",icon:<Icons.FaUserTie/> },
          { name: "address", placeholder: "Enter address", icon: <Icons.FaMapMarkerAlt /> },
          { name: "postCode", placeholder: "Enter post code",icon: <Icons.Post/> },
          { name: "industryType", placeholder: "Enter industry type", icon: <Icons.FaIndustry /> },
          { name: "contactPerson", placeholder: "Enter contact person",icon:<Icons.Profile/> },
          { name: "jobTitle", placeholder: "Enter job title", icon: <Icons.Report /> },
          { name: "email", placeholder: "Enter email", icon: <Icons.Mail />, type: "email" },
          { name: "phone", placeholder: "Enter phone number", icon: <Icons.FaPhone />, type: "tel" },
          { name: "website", placeholder: "Enter website URL", icon: <Icons.Globe /> },
          { name: "service", placeholder: "Enter service requirements", icon: <Icons.FaClipboardList /> },
        ].map(({ name, placeholder, icon, type = "text" }) => (
            <div
            key={name}
            className={`flex items-center border p-3 border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black`}
          >
            {icon && React.cloneElement(icon, { className: "text-black mr-2", size: 18 })}
            <input
              type={type}
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full outline-none text-black bg-transparent"
            />
          </div>
        ))}
      </form>

      {/* Additional Information */}
      <h2 className="text-black font-bold text-lg mt-6">Additional Information</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center border p-3 border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black" >
          <Icons.Shield className="text-black mr-2" size={18} />
          <input
            type="text"
            name="premiumService"
            value={formData.premiumService}
            onChange={handleChange}
            placeholder="Interested in premium services?"
            className="w-full outline-none text-black bg-transparent"
          />
        </div>

        <div className="flex items-center border p-3 border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black" >
          <Icons.Shield className="text-black mr-2" size={18} />
          <input
            type="text"
            name="securityChallenges"
            value={formData.securityChallenges}
            onChange={handleChange}
            placeholder="Any security challenges?"
            className="w-full outline-none text-black bg-transparent"
          />
        </div>
      </div>

      {/* Terms & Agreement */}
      <h2 className="text-black font-bold text-lg mt-6">Terms & Agreement</h2>
      <div className="mt-4 space-y-2">
        <label className="flex items-center space-x-2 text-black">
          <input type="checkbox" name="receiveEmails" checked={formData.receiveEmails} onChange={handleChange} />
          <span>Receive updates via email</span>
        </label>

        <label className="flex items-center space-x-2 text-black">
          <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} required />
          <span>Accept <a href="#" className="text-blue-600 underline">Terms & Privacy Policy</a></span>
        </label>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        onClick={handleSubmit} 
        className="bg-black text-white py-3 px-4 rounded mt-6 w-full font-bold hover:opacity-80"
      >
        Submit
      </button>
    </div>
  );
};

export default BusinessForm;
