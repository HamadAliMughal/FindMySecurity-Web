"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBuilding, FaClipboardList, FaIndustry, FaMapMarkerAlt, FaPhone, FaUserTie } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdReport } from "react-icons/md";
import { Globe, Mail } from "lucide-react";

interface BusinessFormProps {
  id: number;
  title: string;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ id, title }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  
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
    premiumService: false, // Change from "" to false
    securityChallenges: false, // Change from "" to false
    receiveEmails: false,
    acceptTerms: false,
  });

  useEffect(() => {
    // Function to detect if the screen is in mobile mode
    const handleResize = () => {
      setIsMobile(window.innerWidth < 568); // Mobile if width < 768px (Tailwind's 'md')
    };

    // Set initial value
    handleResize();

    // Add event listener to update on window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    localStorage.setItem("profileData", JSON.stringify(formData));
    router.push("/profile");
  };

  const fieldCount = Object.keys(formData).length;

  // Default grid layout
  let gridClass = `grid gap-4 mt-4 grid-cols-1 md:grid-cols-2`;

  // Apply condition **only on desktop**
  if (!isMobile && fieldCount % 2 !== 0) {
    gridClass += " md:grid-cols-1 [&>*:last-child]:col-span-2";
  }

  return (
    <div className="max-w-4xl mt-10 mx-auto bg-white shadow-lg p-8 rounded-md text-black">
      <h2 className="text-center text-3xl font-bold mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className={gridClass}>
        {/* Form Fields */}
        {[
          { name: "companyName", placeholder: "Enter company name", icon: <FaBuilding /> },
          { name: "registrationNumber", placeholder: "Enter registration number", icon: <FaUserTie /> },
          { name: "address", placeholder: "Enter address", icon: <FaMapMarkerAlt /> },
          { name: "postCode", placeholder: "Enter post code", icon: <BsPostcard /> },
          { name: "industryType", placeholder: "Enter industry type", icon: <FaIndustry /> },
          { name: "contactPerson", placeholder: "Enter contact person", icon: <CgProfile /> },
          { name: "jobTitle", placeholder: "Enter job title", icon: <MdReport /> },
          { name: "email", placeholder: "Enter email", icon: <Mail />, type: "email" },
          { name: "phone", placeholder: "Enter phone number", icon: <FaPhone />, type: "tel" },
          { name: "website", placeholder: "Enter website URL", icon: <Globe /> },
          { name: "serviceRequirements", placeholder: "Enter service requirements", icon: <FaClipboardList /> },
        ].map(({ name, placeholder, icon, type = "text" }) => (
          <div key={name} className="flex items-center border p-3 border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black">
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

      <div className="grid grid-cols-1 gap-4 mt-4">
        {/* Premium Services Checkbox */}
        <label className="flex items-center space-x-2 text-black cursor-pointer">
          <input
            type="checkbox"
            name="premiumService"
            checked={formData.premiumService}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span>Interested in premium service package for enhanced visibility?</span>
        </label>

        {/* Security Challenges Checkbox */}
        <label className="flex items-center space-x-2 text-black cursor-pointer">
          <input
            type="checkbox"
            name="securityChallenges"
            checked={formData.securityChallenges}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span>Any specific security challenges or requirements?</span>
        </label>
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
