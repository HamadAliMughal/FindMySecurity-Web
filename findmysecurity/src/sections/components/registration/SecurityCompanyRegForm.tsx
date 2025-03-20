import { useState } from "react";
import Icons from "@/constants/icons/icons";
import { useRouter } from "next/navigation";

interface ClientGeneralFormProps {
  id: number;
  title: string;
}

const SecurityCompanyForm: React.FC<ClientGeneralFormProps> = ({ id, title }) => {
    const router = useRouter();
  
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    address: "",
    postcode: "",
    industryType: "",
    contactPerson: "",
    jobTitle: "",
    email: "",
    phone: "",
    website: "",
    serviceRequirements: "",
    serviceOfferings: "",
    premiumService: false,
    securityChallenges: "",
    receiveEmails: false,
    acceptTerms: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
          // Save form data to localStorage
          localStorage.setItem("profileData", JSON.stringify(formData));

          // Redirect to profile page
          router.push("/profile");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-md text-black">
      <h1 className="text-center text-3xl font-bold mb-6">{title} Registration</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Company Name & Registration Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative flex items-center">
            <Icons.FaBuilding className="absolute left-3 text-gray-700" />
            <input 
              type="text" name="companyName" placeholder="Company Name"
              value={formData.companyName} onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
              required
            />
          </div>
          <input 
            type="text" name="registrationNumber" placeholder="Registration Number"
            value={formData.registrationNumber} onChange={handleChange}
            className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
          />
        </div>

        {/* Address & Postcode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative flex items-center">
            <Icons.FaMapMarkerAlt className="absolute left-3 text-gray-700" />
            <input 
              type="text" name="address" placeholder="Business Address"
              value={formData.address} onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
              required
            />
          </div>
          <input 
            type="text" name="postcode" placeholder="Post Code"
            value={formData.postcode} onChange={handleChange}
            className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
            required
          />
        </div>

        {/* Industry Type */}
        <div className="relative flex items-center">
          <Icons.FaIndustry className="absolute left-3 text-gray-700" />
          <input 
            type="text" name="industryType" placeholder="Industry Type"
            value={formData.industryType} onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
            required
          />
        </div>

        {/* Contact Person & Job Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative flex items-center">
            <Icons.FaUserTie className="absolute left-3 text-gray-700" />
            <input 
              type="text" name="contactPerson" placeholder="Contact Person"
              value={formData.contactPerson} onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
              required
            />
          </div>
          <input 
            type="text" name="jobTitle" placeholder="Job Title"
            value={formData.jobTitle} onChange={handleChange}
            className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
            required
          />
        </div>

        {/* Email, Phone, Website */}
        <div className="relative flex items-center">
          <Icons.FaEnvelope className="absolute left-3 text-gray-700" />
          <input 
            type="email" name="email" placeholder="Email Address"
            value={formData.email} onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
            required
          />
        </div>

        <div className="relative flex items-center">
          <Icons.FaPhone className="absolute left-3 text-gray-700" />
          <input 
            type="text" name="phone" placeholder="Phone Number"
            value={formData.phone} onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
            required
          />
        </div>

        <div className="relative flex items-center">
          <Icons.FaGlobe className="absolute left-3 text-gray-700" />
          <input 
            type="text" name="website" placeholder="Website (if applicable)"
            value={formData.website} onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
          />
        </div>

        <div className="relative flex items-center">
          <Icons.FaClipboardList className="absolute left-3 text-gray-700" />
          <input 
            type="text" name="service" placeholder="Service Requirements"
            value={formData.serviceRequirements} onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
          />
        </div>
        {/* Service Offerings & Challenges */}
        <textarea 
          name="serviceOfferings" placeholder="Security Service Offerings"
          value={formData.serviceOfferings} onChange={handleChange}
          className="w-full p-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black h-24"
          required
        ></textarea>

        {/* Checkboxes */}
        <div className="flex items-center space-x-3">
          <input type="checkbox" name="premiumService" checked={formData.premiumService} onChange={handleChange} className="w-4 h-4" />
          <label>Interested in premium service packages?</label>
        </div>

        <div className="flex items-center space-x-3">
          <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} required className="w-4 h-4" />
          <span>Agree to <a href="#" className="underline">Terms & Conditions</a></span>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:opacity-80 flex items-center justify-center">
          <Icons.FaCheck className="mr-2" /> Submit
        </button>

      </form>
    </div>
  );
};

export default SecurityCompanyForm;
