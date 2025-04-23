"use client";

import { useState, useEffect, useRef } from "react";
import { FaBuilding, FaCheck, FaClipboardList, FaEnvelope, FaGlobe, FaIndustry, FaMapMarkerAlt, FaPhone, FaUserTie } from "react-icons/fa";
import { LockIcon } from "lucide-react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Select from "react-select";
import MembershipDialog from "./MembershipDialog";
import TextField from '@mui/material/TextField';

interface ClientGeneralFormProps {
  id: number;
  title: string;
  onSubmit: (data: any) => void;
}

const SecurityCompanyForm: React.FC<ClientGeneralFormProps> = ({ id, title, onSubmit }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
    isValid: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [showMembershipDialog, setShowMembershipDialog] = useState(false);
  const [formSubmissionData, setFormSubmissionData] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
    dateOfBirth: { day: "", month: "", year: "" },
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

  // Validate entire form whenever form data changes
  useEffect(() => {
    const isValid = validateForm();
    setIsFormValid(isValid);
  }, [formData, passwordValidations]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const validations = {
      length: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[.\-_!@#$%^*]/.test(password),
      isValid: false
    };
    validations.isValid = Object.values(validations).slice(0, 5).every(Boolean);
    return validations;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    setFormErrors(prev => ({ ...prev, [name]: "" }));

    if (["day", "month", "year"].includes(name)) {
      setFormData({
        ...formData,
        dateOfBirth: { ...formData.dateOfBirth, [name]: value },
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === "password") {
        setPasswordValidations(validatePassword(value));
      }
    }
  };

  const handleMultiSelectChange = (selectedOptions: any, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: selectedOptions.map((option: any) => option.value),
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    // Password validation
    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (!passwordValidations.isValid) {
      errors.password = "Password doesn't meet requirements";
      isValid = false;
    }

    // Company validation
    if (!formData.companyName.trim()) {
      errors.companyName = "Company name is required";
      isValid = false;
    }

    // Address validation
    if (!formData.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    // Contact person validation
    if (!formData.contactPerson.trim()) {
      errors.contactPerson = "Contact person is required";
      isValid = false;
    }

    // Terms validation
    if (!formData.acceptTerms) {
      errors.acceptTerms = "You must accept the terms and conditions";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid && Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    setIsFormValid(isValid);

    if (!isValid) {
      setShowAllErrors(true);
      setTimeout(() => {
        const firstError = document.querySelector('.border-red-500');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }

    const formattedData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.companyName.split(" ")[0],
      lastName: formData.companyName.split(" ")[1] || "",
      address: formData.address,
      phoneNumber: formData.phone,
      companyData: {
        companyName: formData.companyName,
        registrationNumber: formData.registrationNumber,
        address: formData.address,
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
      roleId: Number(id),
    };

    // Save the submission data and show the membership dialog
    setFormSubmissionData(formattedData);
    setShowMembershipDialog(true);
  };

  const handlePlanSelected = (plan: string) => {
    // Add the selected plan to the submission data
    const finalData = {
      ...formSubmissionData,
      // membershipPlan: plan
    };
    
    // Close the dialog and submit the form with the selected plan
    setShowMembershipDialog(false);
    onSubmit(finalData);
  };

  const handleDialogClose = () => {
    // If user closes the dialog without selecting a plan, submit with basic plan
    const finalData = {
      ...formSubmissionData,
      // membershipPlan: 'basic'
    };
    setShowMembershipDialog(false);
    onSubmit(finalData);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-md text-black">
        <h1 className="text-center text-3xl font-bold my-6">{title} Registration</h1>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name & Registration Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex items-center">
              <FaBuilding className="absolute left-3 text-gray-700" />
              <TextField
                type="text" 
                name="companyName" 
                label="Company Name"
                value={formData.companyName} 
                onChange={handleChange}
                id="outlined-basic"
                variant="outlined"
                className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
                  showAllErrors && formErrors.email ? "border-red-500" : "border-gray-300"
                } focus:border-black`} // Ensuring black border on focus
                InputLabelProps={{
                  style: { color: 'gray' }, // Default label color
                }}
                inputProps={{
                  className: "focus:outline-none" // Optional to remove outline when focused
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: showAllErrors && formErrors.email ? "red" : "gray", // Border color for normal state
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Black border when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black", // Label color when focused
                  },
                }}
                // className={`w-full pl-10 pr-3 py-3 border rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black ${
                //   (showAllErrors && formErrors.companyName) ? "border-red-500" : "border-gray-500"
                // }`}
                required
              />
              {(showAllErrors && formErrors.companyName) && (
                <p className="mt-1 text-xs text-red-500">{formErrors.companyName}</p>
              )}
            </div>
            <TextField
              type="text" 
              name="registrationNumber" 
              label="Registration Number"
              value={formData.registrationNumber} 
              onChange={handleChange}
              id="outlined-basic"
                variant="outlined"
                className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
                  showAllErrors && formErrors.email ? "border-red-500" : "border-gray-300"
                } focus:border-black`} // Ensuring black border on focus
                InputLabelProps={{
                  style: { color: 'gray' }, // Default label color
                }}
                inputProps={{
                  className: "focus:outline-none" // Optional to remove outline when focused
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: showAllErrors && formErrors.email ? "red" : "gray", // Border color for normal state
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Black border when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black", // Label color when focused
                  },
                }}
              // className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockIcon className="absolute left-3 top-3 text-gray-500" />
            <TextField
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              label="Password"
              id="outlined-basic"
                variant="outlined"
                className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
                  showAllErrors && formErrors.email ? "border-red-500" : "border-gray-300"
                } focus:border-black`} // Ensuring black border on focus
                InputLabelProps={{
                  style: { color: 'gray' }, // Default label color
                }}
                inputProps={{
                  className: "focus:outline-none" // Optional to remove outline when focused
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: showAllErrors && formErrors.email ? "red" : "gray", // Border color for normal state
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Black border when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black", // Label color when focused
                  },
                }}
              // className={`w-full pl-10 pr-10 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
              //   (showAllErrors && formErrors.password) ? "border-red-500" : "border-gray-500"
              // }`}
            />
            <button
                              type="button"
                              className="absolute right-3 top-4 text-gray-500"
                              onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                              {passwordVisible ? <IoMdEyeOff className="w-6 h-6" /> : <IoMdEye className="w-6 h-6"/>}
                            </button>
            {/* <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
            </button> */}
            
            {(formData.password || showAllErrors) && (
              <div className="mt-2 text-xs space-y-1">
                {(!passwordValidations.length || showAllErrors) && (
                  <p className={passwordValidations.length ? "text-green-500" : "text-red-500"}>
                    {passwordValidations.length ? "✓" : "✗"} At least 8 characters
                  </p>
                )}
                {(!passwordValidations.hasUpper || showAllErrors) && (
                  <p className={passwordValidations.hasUpper ? "text-green-500" : "text-red-500"}>
                    {passwordValidations.hasUpper ? "✓" : "✗"} At least one capital letter
                  </p>
                )}
                {(!passwordValidations.hasLower || showAllErrors) && (
                  <p className={passwordValidations.hasLower ? "text-green-500" : "text-red-500"}>
                    {passwordValidations.hasLower ? "✓" : "✗"} At least one small letter
                  </p>
                )}
                {(!passwordValidations.hasNumber || showAllErrors) && (
                  <p className={passwordValidations.hasNumber ? "text-green-500" : "text-red-500"}>
                    {passwordValidations.hasNumber ? "✓" : "✗"} At least one number
                  </p>
                )}
                {(!passwordValidations.hasSpecial || showAllErrors) && (
                  <p className={passwordValidations.hasSpecial ? "text-green-500" : "text-red-500"}>
                    {passwordValidations.hasSpecial ? "✓" : "✗"} At least one special character (. - _ ! @ # $ % ^ *)
                  </p>
                )}
              </div>
            )}
            {(showAllErrors && formErrors.password) && (
              <p className="mt-1 text-xs text-red-500">{formErrors.password}</p>
            )}
          </div>

          {/* Address & Postcode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex items-center">
              <FaMapMarkerAlt className="absolute left-3 text-gray-700" />
              <TextField
                type="text" 
                name="address" 
                label="Business Address"
                value={formData.address} 
                onChange={handleChange}
                id="outlined-basic"
                variant="outlined"
                className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
                  showAllErrors && formErrors.email ? "border-red-500" : "border-gray-300"
                } focus:border-black`} // Ensuring black border on focus
                InputLabelProps={{
                  style: { color: 'gray' }, // Default label color
                }}
                inputProps={{
                  className: "focus:outline-none" // Optional to remove outline when focused
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: showAllErrors && formErrors.email ? "red" : "gray", // Border color for normal state
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Black border when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black", // Label color when focused
                  },
                }}
                // className={`w-full pl-10 pr-3 py-3 border rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black ${
                //   (showAllErrors && formErrors.address) ? "border-red-500" : "border-gray-500"
                // }`}
                required
              />
              {(showAllErrors && formErrors.address) && (
                <p className="mt-1 text-xs text-red-500">{formErrors.address}</p>
              )}
            </div>
            <TextField
              type="text" 
              name="postcode" 
              label="Post Code"
              value={formData.postcode} 
              onChange={handleChange}
              id="outlined-basic"
                variant="outlined"
                className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
                  showAllErrors && formErrors.email ? "border-red-500" : "border-gray-300"
                } focus:border-black`} // Ensuring black border on focus
                InputLabelProps={{
                  style: { color: 'gray' }, // Default label color
                }}
                inputProps={{
                  className: "focus:outline-none" // Optional to remove outline when focused
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: showAllErrors && formErrors.email ? "red" : "gray", // Border color for normal state
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Black border when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black", // Label color when focused
                  },
                }}
              // className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
              required
            />
          </div>

          {/* Industry Type */}
          <div className="relative flex items-center">
            <FaIndustry className="absolute left-3 text-gray-700" />
            <TextField
              type="text" 
              name="industryType" 
              label="Industry Type"
              value={formData.industryType} 
              onChange={handleChange}
              id="outlined-basic"
                variant="outlined"
                className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
                  showAllErrors && formErrors.email ? "border-red-500" : "border-gray-300"
                } focus:border-black`} // Ensuring black border on focus
                InputLabelProps={{
                  style: { color: 'gray' }, // Default label color
                }}
                inputProps={{
                  className: "focus:outline-none" // Optional to remove outline when focused
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: showAllErrors && formErrors.email ? "red" : "gray", // Border color for normal state
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Black border when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black", // Label color when focused
                  },
                }}
              // className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
              required
            />
          </div>

          {/* Contact Person & Job Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex items-center">
              <FaUserTie className="absolute left-3 text-gray-700" />
              <TextField
                type="text" 
                name="contactPerson" 
                label="Contact Person"
                value={formData.contactPerson} 
                onChange={handleChange}
                id="outlined-basic"
                variant="outlined"
                className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
                  showAllErrors && formErrors.email ? "border-red-500" : "border-gray-300"
                } focus:border-black`} // Ensuring black border on focus
                InputLabelProps={{
                  style: { color: 'gray' }, // Default label color
                }}
                inputProps={{
                  className: "focus:outline-none" // Optional to remove outline when focused
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: showAllErrors && formErrors.email ? "red" : "gray", // Border color for normal state
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Black border when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black", // Label color when focused
                  },
                }}
                // className={`w-full pl-10 pr-3 py-3 border rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black ${
                //   (showAllErrors && formErrors.contactPerson) ? "border-red-500" : "border-gray-500"
                // }`}
                required
              />
              {(showAllErrors && formErrors.contactPerson) && (
                <p className="mt-1 text-xs text-red-500">{formErrors.contactPerson}</p>
              )}
            </div>
            <TextField
              type="text" 
              name="jobTitle" 
              label="Job Title"
              value={formData.jobTitle} 
              onChange={handleChange}
              id="outlined-basic"
                variant="outlined"
                className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
                  showAllErrors && formErrors.email ? "border-red-500" : "border-gray-300"
                } focus:border-black`} // Ensuring black border on focus
                InputLabelProps={{
                  style: { color: 'gray' }, // Default label color
                }}
                inputProps={{
                  className: "focus:outline-none" // Optional to remove outline when focused
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: showAllErrors && formErrors.email ? "red" : "gray", // Border color for normal state
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Black border when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black", // Label color when focused
                  },
                }}
              // className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
              required
            />
          </div>

          {/* Email */}
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-3 text-gray-700" />
            <TextField
              type="email" 
              name="email" 
              label="Email Address"
              value={formData.email} 
              onChange={handleChange}
              id="outlined-basic"
                variant="outlined"
                className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
                  showAllErrors && formErrors.email ? "border-red-500" : "border-gray-300"
                } focus:border-black`} // Ensuring black border on focus
                InputLabelProps={{
                  style: { color: 'gray' }, // Default label color
                }}
                inputProps={{
                  className: "focus:outline-none" // Optional to remove outline when focused
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: showAllErrors && formErrors.email ? "red" : "gray", // Border color for normal state
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Black border when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black", // Label color when focused
                  },
                }}
              // className={`w-full pl-10 pr-3 py-3 border rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black ${
              //   (showAllErrors && formErrors.email) ? "border-red-500" : "border-gray-500"
              // }`}
              required
            />
            {(showAllErrors && formErrors.email) && (
              <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="relative flex items-center">
            <FaPhone className="absolute left-3 text-gray-700" />
            <TextField
              type="text" 
              name="phone" 
              label="Phone Number"
              value={formData.phone} 
              onChange={handleChange}
              id="outlined-basic"
                variant="outlined"
                className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
                  showAllErrors && formErrors.email ? "border-red-500" : "border-gray-300"
                } focus:border-black`} // Ensuring black border on focus
                InputLabelProps={{
                  style: { color: 'gray' }, // Default label color
                }}
                inputProps={{
                  className: "focus:outline-none" // Optional to remove outline when focused
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: showAllErrors && formErrors.email ? "red" : "gray", // Border color for normal state
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Black border when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black", // Label color when focused
                  },
                }}
              // className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
              required
            />
          </div>

          {/* Website */}
          <div className="relative flex items-center">
            <FaGlobe className="absolute left-3 text-gray-700" />
            <TextField
              type="text" 
              name="website" 
              label="Website (if applicable)"
              value={formData.website} 
              onChange={handleChange}
              id="outlined-basic"
                variant="outlined"
                className={`w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
                  showAllErrors && formErrors.email ? "border-red-500" : "border-gray-300"
                } focus:border-black`} // Ensuring black border on focus
                InputLabelProps={{
                  style: { color: 'gray' }, // Default label color
                }}
                inputProps={{
                  className: "focus:outline-none" // Optional to remove outline when focused
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: showAllErrors && formErrors.email ? "red" : "gray", // Border color for normal state
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black", // Black border when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray", // Default label color
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "black", // Label color when focused
                  },
                }}
              // className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
            />
          </div>

          {/* Service Requirements */}
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

          {/* Service Offerings */}
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

          {/* Premium Service */}
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

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
              className={`w-4 h-4 ${(showAllErrors && formErrors.acceptTerms) ? "border-red-500" : ""}`}
            />
            <span>
              Agree to <a href="#" className="underline">Terms & Conditions</a>
            </span>
            {(showAllErrors && formErrors.acceptTerms) && (
              <p className="mt-1 text-xs text-red-500">{formErrors.acceptTerms}</p>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full py-3 text-white font-bold rounded-md transition-colors ${
              isFormValid ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            <FaCheck className="inline mr-2" /> Submit
          </button>
        </form>
        <MembershipDialog 
        isOpen={showMembershipDialog}
        onClose={handleDialogClose}
        onPlanSelected={handlePlanSelected}
      />
      </div>
    </>
  );
};

export default SecurityCompanyForm;








// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaBuilding, FaCheck, FaClipboardList, FaEnvelope, FaGlobe, FaIndustry, FaMapMarkerAlt, FaPhone, FaUserTie } from "react-icons/fa";
// import { LockIcon } from "lucide-react";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import Select from "react-select";

// interface ClientGeneralFormProps {
//   id: number;
//   title: string;
//   onSubmit: (data: any) => void;
// }

// const SecurityCompanyForm: React.FC<ClientGeneralFormProps> = ({ id, title, onSubmit }) => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [passwordValidations, setPasswordValidations] = useState({
//     length: false,
//     hasUpper: false,
//     hasLower: false,
//     hasNumber: false,
//     hasSpecial: false,
//     isValid: false
//   });
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [showAllErrors, setShowAllErrors] = useState(false);
//   const formRef = useRef<HTMLFormElement>(null);

//   const [formData, setFormData] = useState({
//     companyName: "",
//     registrationNumber: "",
//     address: "",
//     postcode: "",
//     industryType: "",
//     contactPerson: "",
//     password: "",
//     jobTitle: "",
//     email: "",
//     phone: "",
//     website: "",
//     serviceRequirements: [],
//     serviceOfferings: [],
//     premiumService: false,
//     securityChallenges: "",
//     receiveEmails: false,
//     acceptTerms: false,
//     dateOfBirth: { day: "", month: "", year: "" },
//   });

//   const serviceOptions = [
//     { value: "Online training", label: "Online Training" },
//     { value: "Certification courses", label: "Certification Courses" },
//     { value: "Physical security", label: "Physical Security" },
//     { value: "Cybersecurity", label: "Cybersecurity" },
//   ];

//   const offeringOptions = [
//     { value: "Firearm training", label: "Firearm Training" },
//     { value: "Self-defense", label: "Self-Defense" },
//     { value: "Crowd control", label: "Crowd Control" },
//     { value: "Risk assessment", label: "Risk Assessment" },
//   ];

//   // Validate entire form whenever form data changes
//   useEffect(() => {
//     const isValid = validateForm();
//     setIsFormValid(isValid);
//   }, [formData, passwordValidations]);

//   const validateEmail = (email: string) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const validatePassword = (password: string) => {
//     const validations = {
//       length: password.length >= 8,
//       hasUpper: /[A-Z]/.test(password),
//       hasLower: /[a-z]/.test(password),
//       hasNumber: /\d/.test(password),
//       hasSpecial: /[.\-_!@#$%^*]/.test(password),
//       isValid: false
//     };
//     validations.isValid = Object.values(validations).slice(0, 5).every(Boolean);
//     return validations;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type, checked } = e.target as HTMLInputElement;
    
//     setFormErrors(prev => ({ ...prev, [name]: "" }));

//     if (["day", "month", "year"].includes(name)) {
//       setFormData({
//         ...formData,
//         dateOfBirth: { ...formData.dateOfBirth, [name]: value },
//       });
//     } else if (type === "checkbox") {
//       setFormData({
//         ...formData,
//         [name]: checked,
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });

//       if (name === "password") {
//         setPasswordValidations(validatePassword(value));
//       }
//     }
//   };

//   const handleMultiSelectChange = (selectedOptions: any, field: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: selectedOptions.map((option: any) => option.value),
//     }));
//   };

//   const validateForm = () => {
//     const errors: Record<string, string> = {};
//     let isValid = true;

//     // Email validation
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//       isValid = false;
//     } else if (!validateEmail(formData.email)) {
//       errors.email = "Please enter a valid email";
//       isValid = false;
//     }

//     // Password validation
//     if (!formData.password.trim()) {
//       errors.password = "Password is required";
//       isValid = false;
//     } else if (!passwordValidations.isValid) {
//       errors.password = "Password doesn't meet requirements";
//       isValid = false;
//     }

//     // Company validation
//     if (!formData.companyName.trim()) {
//       errors.companyName = "Company name is required";
//       isValid = false;
//     }

//     // Address validation
//     if (!formData.address.trim()) {
//       errors.address = "Address is required";
//       isValid = false;
//     }

//     // Contact person validation
//     if (!formData.contactPerson.trim()) {
//       errors.contactPerson = "Contact person is required";
//       isValid = false;
//     }

//     // Terms validation
//     if (!formData.acceptTerms) {
//       errors.acceptTerms = "You must accept the terms and conditions";
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid && Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const isValid = validateForm();
//     setIsFormValid(isValid);

//     if (!isValid) {
//       setShowAllErrors(true);
//       setTimeout(() => {
//         const firstError = document.querySelector('.border-red-500');
//         if (firstError) {
//           firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//       }, 100);
//       return;
//     }

//     const formattedData = {
//       email: formData.email,
//       password: formData.password,
//       firstName: formData.companyName.split(" ")[0],
//       lastName: formData.companyName.split(" ")[1] || "",
//       phoneNumber: formData.phone,
//       companyData: {
//         companyName: formData.companyName,
//         registrationNumber: formData.registrationNumber,
//         businessAddress: formData.address,
//         postCode: formData.postcode,
//         contactPerson: formData.contactPerson,
//         jobTitle: formData.jobTitle,
//         phoneNumber: formData.phone,
//         website: formData.website,
//       },
//       serviceRequirements: formData.serviceRequirements,
//       securityServicesOfferings: formData.serviceOfferings,
//       permissions: {
//         premiumServiceNeed: formData.premiumService,
//         acceptEmails: formData.receiveEmails,
//         acceptTerms: formData.acceptTerms,
//       },
//       roleId: id,
//     };

//     onSubmit(formattedData);
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-md text-black">
//       <h1 className="text-center text-3xl font-bold my-6">{title} Registration</h1>

//       <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
//         {/* Company Name & Registration Number */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="relative flex items-center">
//             <FaBuilding className="absolute left-3 text-gray-700" />
//             <input
//               type="text" 
//               name="companyName" 
//               placeholder="Company Name"
//               value={formData.companyName} 
//               onChange={handleChange}
//               className={`w-full pl-10 pr-3 py-3 border rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black ${
//                 (showAllErrors && formErrors.companyName) ? "border-red-500" : "border-gray-500"
//               }`}
//               required
//             />
//             {(showAllErrors && formErrors.companyName) && (
//               <p className="mt-1 text-xs text-red-500">{formErrors.companyName}</p>
//             )}
//           </div>
//           <input
//             type="text" 
//             name="registrationNumber" 
//             placeholder="Registration Number"
//             value={formData.registrationNumber} 
//             onChange={handleChange}
//             className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//           />
//         </div>

//         {/* Password */}
//         <div className="relative">
//           <LockIcon className="absolute left-3 top-3 text-gray-500" />
//           <input
//             type={passwordVisible ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             placeholder="Password"
//             className={`w-full pl-10 pr-10 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black ${
//               (showAllErrors && formErrors.password) ? "border-red-500" : "border-gray-500"
//             }`}
//           />
//           <button
//             type="button"
//             className="absolute right-3 top-3 text-gray-500"
//             onClick={() => setPasswordVisible(!passwordVisible)}
//           >
//             {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
//           </button>
          
//           {(formData.password || showAllErrors) && (
//             <div className="mt-2 text-xs space-y-1">
//               {(!passwordValidations.length || showAllErrors) && (
//                 <p className={passwordValidations.length ? "text-green-500" : "text-red-500"}>
//                   {passwordValidations.length ? "✓" : "✗"} At least 8 characters
//                 </p>
//               )}
//               {(!passwordValidations.hasUpper || showAllErrors) && (
//                 <p className={passwordValidations.hasUpper ? "text-green-500" : "text-red-500"}>
//                   {passwordValidations.hasUpper ? "✓" : "✗"} At least one capital letter
//                 </p>
//               )}
//               {(!passwordValidations.hasLower || showAllErrors) && (
//                 <p className={passwordValidations.hasLower ? "text-green-500" : "text-red-500"}>
//                   {passwordValidations.hasLower ? "✓" : "✗"} At least one small letter
//                 </p>
//               )}
//               {(!passwordValidations.hasNumber || showAllErrors) && (
//                 <p className={passwordValidations.hasNumber ? "text-green-500" : "text-red-500"}>
//                   {passwordValidations.hasNumber ? "✓" : "✗"} At least one number
//                 </p>
//               )}
//               {(!passwordValidations.hasSpecial || showAllErrors) && (
//                 <p className={passwordValidations.hasSpecial ? "text-green-500" : "text-red-500"}>
//                   {passwordValidations.hasSpecial ? "✓" : "✗"} At least one special character (. - _ ! @ # $ % ^ *)
//                 </p>
//               )}
//             </div>
//           )}
//           {(showAllErrors && formErrors.password) && (
//             <p className="mt-1 text-xs text-red-500">{formErrors.password}</p>
//           )}
//         </div>

//         {/* Address & Postcode */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="relative flex items-center">
//             <FaMapMarkerAlt className="absolute left-3 text-gray-700" />
//             <input
//               type="text" 
//               name="address" 
//               placeholder="Business Address"
//               value={formData.address} 
//               onChange={handleChange}
//               className={`w-full pl-10 pr-3 py-3 border rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black ${
//                 (showAllErrors && formErrors.address) ? "border-red-500" : "border-gray-500"
//               }`}
//               required
//             />
//             {(showAllErrors && formErrors.address) && (
//               <p className="mt-1 text-xs text-red-500">{formErrors.address}</p>
//             )}
//           </div>
//           <input
//             type="text" 
//             name="postcode" 
//             placeholder="Post Code"
//             value={formData.postcode} 
//             onChange={handleChange}
//             className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//             required
//           />
//         </div>

//         {/* Industry Type */}
//         <div className="relative flex items-center">
//           <FaIndustry className="absolute left-3 text-gray-700" />
//           <input
//             type="text" 
//             name="industryType" 
//             placeholder="Industry Type"
//             value={formData.industryType} 
//             onChange={handleChange}
//             className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//             required
//           />
//         </div>

//         {/* Contact Person & Job Title */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="relative flex items-center">
//             <FaUserTie className="absolute left-3 text-gray-700" />
//             <input
//               type="text" 
//               name="contactPerson" 
//               placeholder="Contact Person"
//               value={formData.contactPerson} 
//               onChange={handleChange}
//               className={`w-full pl-10 pr-3 py-3 border rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black ${
//                 (showAllErrors && formErrors.contactPerson) ? "border-red-500" : "border-gray-500"
//               }`}
//               required
//             />
//             {(showAllErrors && formErrors.contactPerson) && (
//               <p className="mt-1 text-xs text-red-500">{formErrors.contactPerson}</p>
//             )}
//           </div>
//           <input
//             type="text" 
//             name="jobTitle" 
//             placeholder="Job Title"
//             value={formData.jobTitle} 
//             onChange={handleChange}
//             className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//             required
//           />
//         </div>

//         {/* Email */}
//         <div className="relative flex items-center">
//           <FaEnvelope className="absolute left-3 text-gray-700" />
//           <input
//             type="email" 
//             name="email" 
//             placeholder="Email Address"
//             value={formData.email} 
//             onChange={handleChange}
//             className={`w-full pl-10 pr-3 py-3 border rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black ${
//               (showAllErrors && formErrors.email) ? "border-red-500" : "border-gray-500"
//             }`}
//             required
//           />
//           {(showAllErrors && formErrors.email) && (
//             <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
//           )}
//         </div>

//         {/* Phone */}
//         <div className="relative flex items-center">
//           <FaPhone className="absolute left-3 text-gray-700" />
//           <input
//             type="text" 
//             name="phone" 
//             placeholder="Phone Number"
//             value={formData.phone} 
//             onChange={handleChange}
//             className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//             required
//           />
//         </div>

//         {/* Website */}
//         <div className="relative flex items-center">
//           <FaGlobe className="absolute left-3 text-gray-700" />
//           <input
//             type="text" 
//             name="website" 
//             placeholder="Website (if applicable)"
//             value={formData.website} 
//             onChange={handleChange}
//             className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//           />
//         </div>

//         {/* Service Requirements */}
//         <div className="relative flex items-center">
//           <FaClipboardList className="absolute left-3 text-gray-700" />
//           <Select
//             isMulti
//             options={serviceOptions}
//             placeholder="Select Service Requirements"
//             className="w-full pl-10"
//             onChange={selected => handleMultiSelectChange(selected, "serviceRequirements")}
//           />
//         </div>

//         {/* Service Offerings */}
//         <div className="relative flex items-center">
//           <FaClipboardList className="absolute left-3 text-gray-700" />
//           <Select
//             isMulti
//             options={offeringOptions}
//             placeholder="Select Security Service Offerings"
//             className="w-full pl-10"
//             onChange={selected => handleMultiSelectChange(selected, "serviceOfferings")}
//           />
//         </div>

//         {/* Premium Service */}
//         <div className="flex items-center space-x-3">
//           <input
//             type="checkbox"
//             name="premiumService"
//             checked={formData.premiumService}
//             onChange={handleChange}
//             className="w-4 h-4"
//           />
//           <label>Interested in premium service package for enhanced visibility?</label>
//         </div>

//         {/* Terms and Conditions */}
//         <div className="flex items-center space-x-3">
//           <input
//             type="checkbox"
//             name="acceptTerms"
//             checked={formData.acceptTerms}
//             onChange={handleChange}
//             required
//             className={`w-4 h-4 ${(showAllErrors && formErrors.acceptTerms) ? "border-red-500" : ""}`}
//           />
//           <span>
//             Agree to <a href="#" className="underline">Terms & Conditions</a>
//           </span>
//           {(showAllErrors && formErrors.acceptTerms) && (
//             <p className="mt-1 text-xs text-red-500">{formErrors.acceptTerms}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button 
//           type="submit" 
//           className={`w-full py-3 text-white font-bold rounded-md transition-colors ${
//             isFormValid ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
//           }`}
//           disabled={!isFormValid}
//         >
//           <FaCheck className="inline mr-2" /> Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SecurityCompanyForm;






// import { useState } from "react";
// import { FaBuilding, FaCheck, FaClipboardList, FaEnvelope, FaGlobe, FaIndustry, FaMapMarkerAlt, FaPhone, FaUserTie } from "react-icons/fa";
// import { LockIcon } from "lucide-react";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import Select from "react-select";

// interface ClientGeneralFormProps {
//   id: number;
//   title: string;
//   onSubmit: (data: any) => void;
// }

// const SecurityCompanyForm: React.FC<ClientGeneralFormProps> = ({ id, title, onSubmit }) => {
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const [formData, setFormData] = useState({
//     companyName: "",
//     registrationNumber: "",
//     address: "",
//     postcode: "",
//     industryType: "",
//     contactPerson: "",
//     password: "",
//     jobTitle: "",
//     email: "",
//     phone: "",
//     website: "",
//     serviceRequirements: [],
//     serviceOfferings: [],
//     premiumService: false,
//     securityChallenges: "",
//     receiveEmails: false,
//     acceptTerms: false,
//   });

//   const serviceOptions = [
//     { value: "Online training", label: "Online Training" },
//     { value: "Certification courses", label: "Certification Courses" },
//     { value: "Physical security", label: "Physical Security" },
//     { value: "Cybersecurity", label: "Cybersecurity" },
//   ];

//   const offeringOptions = [
//     { value: "Firearm training", label: "Firearm Training" },
//     { value: "Self-defense", label: "Self-Defense" },
//     { value: "Crowd control", label: "Crowd Control" },
//     { value: "Risk assessment", label: "Risk Assessment" },
//   ];

//   const handleChange = (e: any) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleMultiSelectChange = (selectedOptions: any, field: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: selectedOptions.map((option: any) => option.value),
//     }));
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();

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
//         postCode: formData.postcode,
//         contactPerson: formData.contactPerson,
//         jobTitle: formData.jobTitle,
//         phoneNumber: formData.phone,
       
//         website: formData.website,
//       },
//       serviceRequirements: formData.serviceRequirements,
//       securityServicesOfferings: formData.serviceOfferings,
    
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

//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-md text-black">
//     <h1 className="text-center text-3xl font-bold my-6">{title} Registration</h1>

//     <form onSubmit={handleSubmit} className="space-y-6">

//       {/* Company Name & Registration Number */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="relative flex items-center">
//           <FaBuilding className="absolute left-3 text-gray-700" />
//           <input
//             type="text" name="companyName" placeholder="Company Name"
//             value={formData.companyName} onChange={handleChange}
//             className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//             required
//           />
//         </div>
//         <input
//           type="text" name="registrationNumber" placeholder="Registration Number"
//           value={formData.registrationNumber} onChange={handleChange}
//           className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//         />
//       </div>
//       <div className="relative">
//         <LockIcon className="absolute left-3 top-3 text-gray-500" />
//         <input
//           type={passwordVisible ? "text" : "password"}
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           placeholder="Password"
//           className="w-full pl-10 pr-10 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
//         />
//         <button
//           type="button"
//           className="absolute right-3 top-3 text-gray-500"
//           onClick={() => setPasswordVisible(!passwordVisible)}
//         >
//           {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
//         </button>
//       </div>
//       {/* Address & Postcode */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="relative flex items-center">
//           <FaMapMarkerAlt className="absolute left-3 text-gray-700" />
//           <input
//             type="text" name="address" placeholder="Business Address"
//             value={formData.address} onChange={handleChange}
//             className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//             required
//           />
//         </div>
//         <input
//           type="text" name="postcode" placeholder="Post Code"
//           value={formData.postcode} onChange={handleChange}
//           className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//           required
//         />
//       </div>

//       {/* Industry Type */}
//       <div className="relative flex items-center">
//         <FaIndustry className="absolute left-3 text-gray-700" />
//         <input
//           type="text" name="industryType" placeholder="Industry Type"
//           value={formData.industryType} onChange={handleChange}
//           className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//           required
//         />
//       </div>

//       {/* Contact Person & Job Title */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="relative flex items-center">
//           <FaUserTie className="absolute left-3 text-gray-700" />
//           <input
//             type="text" name="contactPerson" placeholder="Contact Person"
//             value={formData.contactPerson} onChange={handleChange}
//             className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//             required
//           />
//         </div>
//         <input
//           type="text" name="jobTitle" placeholder="Job Title"
//           value={formData.jobTitle} onChange={handleChange}
//           className="w-full pl-3 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//           required
//         />
//       </div>

//       {/* Email, Phone, Website */}
//       <div className="relative flex items-center">
//         <FaEnvelope className="absolute left-3 text-gray-700" />
//         <input
//           type="email" name="email" placeholder="Email Address"
//           value={formData.email} onChange={handleChange}
//           className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//           required
//         />
//       </div>

//       <div className="relative flex items-center">
//         <FaPhone className="absolute left-3 text-gray-700" />
//         <input
//           type="text" name="phone" placeholder="Phone Number"
//           value={formData.phone} onChange={handleChange}
//           className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//           required
//         />
//       </div>

//       <div className="relative flex items-center">
//         <FaGlobe  className="absolute left-3 text-gray-700" />
//         <input
//           type="text" name="website" placeholder="Website (if applicable)"
//           value={formData.website} onChange={handleChange}
//           className="w-full pl-10 pr-3 py-3 border border-gray-500 rounded-md bg-gray-100 focus-within:ring-2 focus-within:ring-black"
//         />
//       </div>

//         <div className="relative flex items-center">
//           <FaClipboardList className="absolute left-3 text-gray-700" />
//           <Select
//             isMulti
//             options={serviceOptions}
//             placeholder="Select Service Requirements"
//             className="w-full pl-10"
//             onChange={selected => handleMultiSelectChange(selected, "serviceRequirements")}
//           />
//         </div>
//         <div className="relative flex items-center">
//         <FaClipboardList className="absolute left-3 text-gray-700" />
//         <Select
//           isMulti
//           options={offeringOptions}
//           placeholder="Select Security Service Offerings"
//           className="w-full pl-10"
//           onChange={selected => handleMultiSelectChange(selected, "serviceOfferings")}
//         />
//       </div>

//         <div className="flex items-center space-x-3">
//           <input
//             type="checkbox"
//             name="premiumService"
//             checked={formData.premiumService}
//             onChange={handleChange}
//             className="w-4 h-4"
//           />
//           <label>Interested in premium service package for enhanced visibility?</label>
//         </div>

//         <div className="flex items-center space-x-3">
//           <input
//             type="checkbox"
//             name="acceptTerms"
//             checked={formData.acceptTerms}
//             onChange={handleChange}
//             required
//             className="w-4 h-4"
//           />
//           <span>
//             Agree to <a href="#" className="underline">Terms & Conditions</a>
//           </span>
//         </div>

//         <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:opacity-80 flex items-center justify-center">
//           <FaCheck className="mr-2" /> Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SecurityCompanyForm;
