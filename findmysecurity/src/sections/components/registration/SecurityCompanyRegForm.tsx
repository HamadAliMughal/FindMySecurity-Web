import { useState } from "react";
import { FaBuilding, FaCheck, FaClipboardList, FaEnvelope, FaGlobe, FaIndustry, FaMapMarkerAlt, FaPhone, FaUserTie } from "react-icons/fa";
import { LockIcon } from "lucide-react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Select from "react-select";

interface ClientGeneralFormProps {
  id: number;
  title: string;
  onSubmit: (data: any) => void;
}

const SecurityCompanyForm: React.FC<ClientGeneralFormProps> = ({ id, title, onSubmit }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    address: "",
    postcode: "",
    industryType: "",
    contactPerson: "",
    password: "",
    jobTitle: "",
    email: "",
    phone: "",
    website: "",
    serviceRequirements: [],
    serviceOfferings: [],
    premiumService: false,
    securityChallenges: "",
    receiveEmails: false,
    acceptTerms: false,
  });

  const serviceOptions = [
    { value: "Online training", label: "Online Training" },
    { value: "Certification courses", label: "Certification Courses" },
    { value: "Physical security", label: "Physical Security" },
    { value: "Cybersecurity", label: "Cybersecurity" },
  ];

  const offeringOptions = [
    { value: "Firearm training", label: "Firearm Training" },
    { value: "Self-defense", label: "Self-Defense" },
    { value: "Crowd control", label: "Crowd Control" },
    { value: "Risk assessment", label: "Risk Assessment" },
  ];

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleMultiSelectChange = (selectedOptions: any, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: selectedOptions.map((option: any) => option.value),
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formattedData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.companyName.split(" ")[0],
      lastName: formData.companyName.split(" ")[1],
      phoneNumber: formData.phone,
      companyData: {
        companyName: formData.companyName,
        registrationNumber: formData.registrationNumber,
        businessAddress: formData.address,
        postCode: formData.postcode,
        contactPerson: formData.contactPerson,
        jobTitle: formData.jobTitle,
        phoneNumber: formData.phone,
       
        website: formData.website,
      },
      serviceRequirements: formData.serviceRequirements,
      securityServicesOfferings: formData.serviceOfferings,
    
      permissions: {
        premiumServiceNeed: formData.premiumService,
        acceptEmails: formData.receiveEmails,
        acceptTerms: formData.acceptTerms,
      },
      roleId: id, // Ensure this matches your updated role array logic
    };

    console.log("Form Data Submitted:", formattedData);
    onSubmit(formattedData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-md text-black">
    <h1 className="text-center text-3xl font-bold my-6">{title} Registration</h1>

    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Company Name & Registration Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative flex items-center">
          <FaBuilding className="absolute left-3 text-gray-700" />
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
      <div className="relative">
        <LockIcon className="absolute left-3 top-3 text-gray-500" />
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
      {/* Address & Postcode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative flex items-center">
          <FaMapMarkerAlt className="absolute left-3 text-gray-700" />
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
        <FaIndustry className="absolute left-3 text-gray-700" />
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
          <FaUserTie className="absolute left-3 text-gray-700" />
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
        <FaEnvelope className="absolute left-3 text-gray-700" />
        <input
          type="email" name="email" placeholder="Email Address"
          value={formData.email} onChange={handleChange}
          className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
          required
        />
      </div>

      <div className="relative flex items-center">
        <FaPhone className="absolute left-3 text-gray-700" />
        <input
          type="text" name="phone" placeholder="Phone Number"
          value={formData.phone} onChange={handleChange}
          className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
          required
        />
      </div>

      <div className="relative flex items-center">
        <FaGlobe  className="absolute left-3 text-gray-700" />
        <input
          type="text" name="website" placeholder="Website (if applicable)"
          value={formData.website} onChange={handleChange}
          className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
        />
      </div>

        <div className="relative flex items-center">
          <FaClipboardList className="absolute left-3 text-gray-700" />
          <Select
            isMulti
            options={serviceOptions}
            placeholder="Select Service Requirements"
            className="w-full pl-10"
            onChange={selected => handleMultiSelectChange(selected, "serviceRequirements")}
          />
        </div>
        <div className="relative flex items-center">
        <FaClipboardList className="absolute left-3 text-gray-700" />
        <Select
          isMulti
          options={offeringOptions}
          placeholder="Select Security Service Offerings"
          className="w-full pl-10"
          onChange={selected => handleMultiSelectChange(selected, "serviceOfferings")}
        />
      </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="premiumService"
            checked={formData.premiumService}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label>Interested in premium service package for enhanced visibility?</label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
            className="w-4 h-4"
          />
          <span>
            Agree to <a href="#" className="underline">Terms & Conditions</a>
          </span>
        </div>

        <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:opacity-80 flex items-center justify-center">
          <FaCheck className="mr-2" /> Submit
        </button>
      </form>
    </div>
  );
};

export default SecurityCompanyForm;
