"use client";

import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { CheckCircle, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { uploadToS3 } from "@/utils/s3file";
import { API_URL } from "@/utils/path";

interface FormData {
  screenName: string;
  postcode: string;
  profileHeadline: string;
  selectedServices: string[];
  otherService: string;
  gender: string;
  aboutMe: string;
  experience: string;
  availability: string;
  qualifications: string;
  hourlyRate: string;
  profilePhoto: File | null;
  homeTelephone: string;
  mobileTelephone: string;
  website: string;
  compulsoryDocuments: File[];
  weeklySchedule: {
    [timeSlot: string]: {
      [day: string]: boolean;
    };
  };
}

const JobPosting: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeSlots = [
    'Morning',
    'Afternoon',
    'Evening',
    'Overnight'
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData1 = localStorage.getItem("loginData") || localStorage.getItem("profileData");
      const data = storedData1 ? JSON.parse(storedData1) : null;
      const currentRoleId = data?.id || data?.user?.id;
      setUserId(currentRoleId);
    }
  }, []);

  const [formData, setFormData] = useState<FormData>(() => {
    const defaultData = {
      screenName: "",
      postcode: "London",
      profileHeadline: "",
      selectedServices: [],
      otherService: "",
      gender: "",
      aboutMe: "",
      experience: "",
      availability: "",
      qualifications: "",
      hourlyRate: "",
      profilePhoto: null,
      homeTelephone: "",
      mobileTelephone: "",
      website: "",
      compulsoryDocuments: [],
      weeklySchedule: (() => {
        const initialSchedule: any = {};
        timeSlots.forEach(slot => {
          initialSchedule[slot] = {};
          days.forEach(day => {
            initialSchedule[slot][day] = false;
          });
        });
        return initialSchedule;
      })()
    };

    if (typeof window === 'undefined') return defaultData;

    try {
      const savedData = localStorage.getItem('loginData');
      if (!savedData) return defaultData;

      const parsedData = JSON.parse(savedData);
      return {
        ...defaultData,
        ...parsedData,
        weeklySchedule: parsedData.weeklySchedule || defaultData.weeklySchedule
      };
    } catch (error) {
      console.error("Error parsing saved form data:", error);
      return defaultData;
    }
  });

  const safeLocalStorageSet = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("LocalStorage quota exceeded:", error);
    }
  };

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleInputChange('profilePhoto', e.target.files[0]);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newDocuments = Array.from(e.target.files);
      handleInputChange('compulsoryDocuments', [...formData.compulsoryDocuments, ...newDocuments]);
    }
  };

  const removeDocument = (index: number) => {
    const updatedDocuments = [...formData.compulsoryDocuments];
    updatedDocuments.splice(index, 1);
    handleInputChange('compulsoryDocuments', updatedDocuments);
  };

  const removeProfilePhoto = () => {
    handleInputChange('profilePhoto', null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, '');
  
    try {
      if (!userId) throw new Error("User ID not found");
  
      let profilePhotoUrl = null;
      // Upload profile photo if it exists
      if (formData.profilePhoto) {
        profilePhotoUrl = await uploadToS3({
          file: formData.profilePhoto,
          token: token!,
        });
      }
  
      // Upload documents
      const uploadedDocumentUrls = [];
      for (const file of formData.compulsoryDocuments) {
        const uploadedDocUrl = await uploadToS3({
          file,
          token: token!,
        });
        uploadedDocumentUrls.push(uploadedDocUrl);
      }
  
      const apiData = {
        profileData: {
          profilePhoto: profilePhotoUrl,
          basicInfo: {
            screenName: formData.screenName,
            postcode: formData.postcode,
            profileHeadline: formData.profileHeadline,
            gender: formData.gender,
          },
          services: {
            selectedServices: formData.selectedServices,
            otherService: formData.otherService,
          },
          about: {
            aboutMe: formData.aboutMe.substring(0, 1000),
            experience: formData.experience.substring(0, 1000),
            qualifications: formData.qualifications.substring(0, 1000),
          },
          availability: {
            description: formData.availability,
            weeklySchedule: formData.weeklySchedule,
          },
          fees: {
            description: formData.availability,
            hourlyRate: formData.hourlyRate,
          },
          contact: {
            homeTelephone: formData.homeTelephone,
            mobileTelephone: formData.mobileTelephone,
            website: formData.website,
          },
          documents: uploadedDocumentUrls,
        },
      };
  
      const response = await fetch(
        `${API_URL}/profile/individual/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(apiData),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed (${response.status})`);
      }
  
      const result = await response.json();
      safeLocalStorageSet("loginData", JSON.stringify(result?.user));
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowModal(true);
    } catch (error) {
      console.error("Error:", error);
      alert((error as Error).message || "Submission failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const services = [
    'Corporate Security',
    'Retail Security',
    'Event Security',
    'Door Supervisor',
    'Mobile Patrol',
    'Loss Prevention',
    'Construction Site Security',
    'Close Protection',
    'Maritime Security',
    'High-Value Goods Escort',
    'Residential Security Team (RST)',
    'K9 Security Handler',
    'Armed Security Professional',
    'VIP Chauffeur & Security Driver',
    'CCTV Operator',
    'Security Control Room Operator',
    'Covert Surveillance Specialist'
  ] as const;

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
  };

  const handleCheckboxChange = (timeSlot: string, day: string) => {
    setFormData(prev => ({
      ...prev,
      weeklySchedule: {
        ...prev.weeklySchedule,
        [timeSlot]: {
          ...prev.weeklySchedule[timeSlot],
          [day]: !prev.weeklySchedule[timeSlot][day]
        }
      }
    }));
  };

  const closeModalAndRedirect = () => {
    setShowModal(false);
    router.push("/profile");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 my-8 sm:my-20 bg-white rounded-lg shadow-lg border border-gray-200">
            {/* Back Button */}
      <div className="absolute top-4 left-4 mt-20 flex items-center text-gray-600 hover:text-black">
        <button
          className="flex items-center text-gray-600 hover:text-black transition-all duration-200 mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
        </button>
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mt-10 mb-6 text-center">My Public Profile</h1>
      
      <div className="mb-6 space-y-4">
        <p className="text-center text-red-600 text-sm font-medium">
          Congratulations! You have successfully registered with FindMySecurity. To begin your exceptional journey with us, 
          please complete your profile to become visible to potential employers.
        </p>
        <p className="text-gray-700">
          Your profile is your public advert for the services you offer. Please read our Safety Centre for guidance. 
          Any changes made to your profile must be approved by our human moderation team before being published.
        </p>
        <p>
          <span className="font-semibold">
            <Link href="#" className="text-blue-600 underline">Profile</Link> Status:
          </span> You have not yet completed your profile
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* Screen Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Screen Name* (Maximum 8 characters)</label>
          <input
            type="text"
            value={formData.screenName}
            onChange={(e) => handleInputChange('screenName', e.target.value)}
            maxLength={8}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
          />
        </div>

        {/* Postcode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Postcode*</label>
          <input
            type="text"
            value={formData?.postcode}
            onChange={(e) => handleInputChange('postcode', e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
          />
        </div>

        {/* Profile Headline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Headline</label>
          <input
            type="text"
            value={formData.profileHeadline}
            onChange={(e) => handleInputChange('profileHeadline', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
          />
        </div>

        {/* Gender Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Gender</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose an option*</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleInputChange('gender', "Male")}
                className={`px-4 py-2 border rounded-lg transition-all ${
                  formData.gender === "Male"
                    ? "bg-black text-white border-black"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('gender', "Female")}
                className={`px-4 py-2 border rounded-lg transition-all ${
                  formData.gender === "Female"
                    ? "bg-black text-white border-black"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                Female
              </button>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="border-t border-gray-200 pt-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Services Offered*</label>
          <p className="text-sm text-gray-600 mb-4">Select all relevant security services:</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service} className="flex items-center bg-gray-100 p-3 rounded-md shadow-md hover:bg-gray-200 transition">
                <input
                  type="checkbox"
                  id={service}
                  checked={formData.selectedServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={service} className="ml-3 flex items-center text-gray-700 font-medium">
                  <FaCheckCircle className={formData.selectedServices.includes(service) ? "text-blue-500 mr-2" : "text-gray-400 mr-2"} />
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Other Services */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Other Services:</label>
          <input
            type="text"
            value={formData.otherService}
            onChange={(e) => handleInputChange('otherService', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
            placeholder="Enter any additional service"
          />
        </div>

        {/* About Me Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About me*</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Describe your service* (Minimum 50 characters)</label>
            <textarea
              value={formData.aboutMe}
              onChange={(e) => handleInputChange('aboutMe', e.target.value)}
              minLength={50}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
              placeholder="Describe the services you offer..."
            />
          </div>
        </div>

        {/* Experience Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Experience*</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Describe your experience* (Minimum 50 characters)</label>
            <textarea
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              minLength={50}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
              placeholder="Describe your professional experience..."
            />
          </div>
        </div>

        {/* Availability Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Availability</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Describe your availability</label>
            <textarea
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
              placeholder="Describe your general availability..."
            />
          </div>

          {/* Weekly Schedule Table with Checkboxes */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Weekly Availability</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">Time Slot</th>
                    {days.map(day => (
                      <th key={day} className="border border-gray-300 px-4 py-2 bg-gray-100">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(timeSlot => (
                    <tr key={timeSlot}>
                      <td className="border border-gray-300 px-4 py-2">{timeSlot}</td>
                      {days.map(day => (
                        <td key={`${timeSlot}-${day}`} className="border border-gray-300 px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={formData.weeklySchedule[timeSlot][day]}
                            onChange={() => handleCheckboxChange(timeSlot, day)}
                            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Qualifications Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Qualifications*</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Describe your qualifications* (Minimum 50 characters)</label>
            <textarea
              value={formData.qualifications}
              onChange={(e) => handleInputChange('qualifications', e.target.value)}
              minLength={50}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
              placeholder="Describe your qualifications..."
            />
            <p className="text-xs text-gray-500 mt-1">
              To Check Required Qualification <Link href="/guidance" className="text-blue-600 underline">Click here</Link>
            </p>
          </div>
        </div>

        {/* Compulsory Documents Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Compulsary Documents</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload required documents (PDF, DOC, JPG, PNG)
              </label>
              <input
                type="file"
                onChange={handleDocumentUpload}
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            {formData.compulsoryDocuments
  .filter(file => file !== null)
  .map((file, index) => (
    <li key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
      <span className="text-gray-700">{file.name}</span>
      <button
        type="button"
        onClick={() => removeDocument(index)}
      >
        Remove
      </button>
    </li>
  ))}        

          </div>
        </div>

        {/* Fees Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Fees</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Describe your fees</label>
            <textarea
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
              placeholder="Describe your fees..."
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rates*</label>
            <div className="flex items-center">
              <span className="mr-2">From £</span>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="0.00"
              />
              <span className="ml-2">per hour</span>
            </div>
          </div>
        </div>

        {/* Profile Photo Section */}
        {/* <div className="border-t border-gray-200 pt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Photo</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your photo must be of yourself or your setting only. No children or logos.
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload a new Profile Photo*</label>
          <input
                type="file"
                onChange={handleProfilePhotoUpload}
                multiple
                accept=".jpg,.jpeg,.png"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
        </div>
        
      </div> */}
       {/* Profile Photo Section - Updated */}
       <div className="border-t border-gray-200 pt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Photo</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your photo must be of yourself or your setting only. No children or logos.
        </p>
        <div className="space-y-4">
          {formData.profilePhoto ? (
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
              <div className="flex items-center">
                <img 
                  src={URL.createObjectURL(formData.profilePhoto)} 
                  alt="Profile preview" 
                  className="w-16 h-16 object-cover rounded-md mr-3"
                />
                <span className="text-gray-700">{formData.profilePhoto.name}</span>
              </div>
              <button
                type="button"
                onClick={removeProfilePhoto}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Profile Photo</label>
              <input
                type="file"
                onChange={handleProfilePhotoUpload}
                accept=".jpg,.jpeg,.png"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          )}
        </div>
      </div>

        {/* Direct Contact Details Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Direct Contact Details</h2>
          <p className="text-sm text-gray-600 mb-4">
            You can optionally add your direct contact details to your profile. This can be viewed by premium members. You can see which other members have viewed your contact details on the Who's Looked At Me? page.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Telephone</label>
              <input
                type="tel"
                value={formData.homeTelephone}
                onChange={(e) => handleInputChange('homeTelephone', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Telephone</label>
              <input
                type="tel"
                value={formData.mobileTelephone}
                onChange={(e) => handleInputChange('mobileTelephone', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <p className="text-xs text-gray-500 mb-2">Premium Members Only: You can enter your website address here, but you'll need to upgrade to Gold Membership for it to be visible to other members.</p>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
              isSubmitting 
                ? "bg-gray-600 cursor-not-allowed" 
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
      {/* ✅ Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={closeModalAndRedirect}>
              <X className="w-5 h-5" />
            </button>

            <CheckCircle className="w-12 h-12 mx-auto text-green-600" />
            <h2 className="text-xl font-bold mt-2">Success!</h2>
            <p className="text-gray-600 mt-2">Your form has been submitted successfully.</p>

            <button
              className="mt-4 bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
              onClick={closeModalAndRedirect}
            >
              Go to Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPosting;






// "use client";

// import React, { useState, useEffect } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { CheckCircle, Loader2, X } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import axios from "axios";
// import { uploadToS3 } from "@/utils/s3file";
// import { API_URL } from "@/utils/path";
// interface FormData {
//   screenName: string;
//   postcode: string;
//   profileHeadline: string;
//   selectedServices: string[];
//   otherService: string;
//   gender: string;
//   aboutMe: string;
//   experience: string;
//   availability: string;
//   qualifications: string;
//   hourlyRate: string;
//   profilePhoto: File | string | null ;
//   homeTelephone: string;
//   mobileTelephone: string;
//   website: string;
//   compulsoryDocuments: File[];
//   weeklySchedule: {
//     [timeSlot: string]: {
//       [day: string]: boolean;
//     };
//   };
// }

// const JobPosting: React.FC = () => {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);
//   const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//   const timeSlots = [
//     'Morning',
//     'Afternoon',
//     'Evening',
//     'Overnight'
//   ];

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//         // Get login or profile data from localStorage
//         const storedData1 = localStorage.getItem("loginData") || localStorage.getItem("profileData");
//         const data = storedData1 ? JSON.parse(storedData1) : null;
    
//         const currentRoleId = data?.id || data?.user?.id ;
//         setUserId(currentRoleId);
//     }
//   }, []);
//   // Initialize state with localStorage data or defaults
//   const [formData, setFormData] = useState<FormData>(() => {
//     const defaultData = {
//       screenName: "",
//       postcode: "London",
//       profileHeadline: "",
//       selectedServices: [],
//       otherService: "",
//       gender: "",
//       aboutMe: "",
//       experience: "",
//       availability: "",
//       qualifications: "",
//       hourlyRate: "",
//       profilePhoto: null,
//       homeTelephone: "",
//       mobileTelephone: "",
//       website: "",
//       compulsoryDocuments: [],
//       weeklySchedule: (() => {
//         const initialSchedule: any = {};
//         timeSlots.forEach(slot => {
//           initialSchedule[slot] = {};
//           days.forEach(day => {
//             initialSchedule[slot][day] = false;
//           });
//         });
//         return initialSchedule;
//       })()
//     };

//     if (typeof window === 'undefined') return defaultData;

//     try {
//       const savedData = localStorage.getItem('loginData');
//       console.log("savedData",savedData)
//       if (!savedData) return defaultData;

//       const parsedData = JSON.parse(savedData);
//       return {
//         ...defaultData,
//         ...parsedData,
//         weeklySchedule: parsedData.weeklySchedule || defaultData.weeklySchedule
//       };
//     } catch (error) {
//       console.error("Error parsing saved form data:", error);
//       return defaultData;
//     }
//   });

//   // Handle localStorage quota issues
//   const safeLocalStorageSet = (key: string, value: string) => {
//     try {
//       localStorage.setItem(key, value);
//     } catch (error) {
//       console.error("LocalStorage quota exceeded:", error);
//     }
//   };



//   const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newDocuments = Array.from(e.target.files);
//       handleInputChange('compulsoryDocuments', [...formData.compulsoryDocuments, ...newDocuments]);
//     }
//   };

//   const removeDocument = (index: number) => {
//     const updatedDocuments = [...formData.compulsoryDocuments];
//     updatedDocuments.splice(index, 1);
//     handleInputChange('compulsoryDocuments', updatedDocuments);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, '');
  
//     try {
//       if (!userId) throw new Error("User ID not found");
  
//       const uploadedProfileImageUrls: string[] = [];
//       const uploadedDocumentUrls: string[] = [];
  
//       // Upload profile photo
//       if (formData.profilePhoto instanceof File) {
//         const uploadedFileUrl = await uploadToS3({
//           file: formData.profilePhoto,
//           token: token!,
//         });
//         uploadedProfileImageUrls.push(uploadedFileUrl);
//       }
  
//       // Upload documents
//       for (const file of formData.compulsoryDocuments) {
//         const uploadedDocUrl = await uploadToS3({
//           file,
//           token: token!,
//         });
//         uploadedDocumentUrls.push(uploadedDocUrl);
//       }
  
//       const apiData = {
//         profileData: {
//           profilePhoto: uploadedProfileImageUrls[0] || null,
//           basicInfo: {
//             screenName: formData.screenName,
//             postcode: formData.postcode,
//             profileHeadline: formData.profileHeadline,
//             gender: formData.gender,
            
//           },
//           services: {
//             selectedServices: formData.selectedServices,
//             otherService: formData.otherService,
//           },
//           about: {
//             aboutMe: formData.aboutMe.substring(0, 1000),
//             experience: formData.experience.substring(0, 1000),
//             qualifications: formData.qualifications.substring(0, 1000),
//           },
//           availability: {
//             description: formData.availability,
//             weeklySchedule: formData.weeklySchedule,
//           },
//           fees: {
//             description: formData.availability,
//             hourlyRate: formData.hourlyRate,
//           },
//           contact: {
//             homeTelephone: formData.homeTelephone,
//             mobileTelephone: formData.mobileTelephone,
//             website: formData.website,
//           },
//           documents: uploadedDocumentUrls,
//         },
//       };
  
//       const response = await fetch(
//         `${API_URL}/profile/individual/${userId}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify(apiData),
//         }
//       );
  
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `Request failed (${response.status})`);
//       }
  
//       const result = await response.json();
//       safeLocalStorageSet("loginData", JSON.stringify(result?.user));
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       setShowModal(true);
//     } catch (error) {
//       console.error("Error:", error);
//       alert((error as Error).message || "Submission failed. Try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
  

  

//   const handleInputChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const services = [
//     'Corporate Security',
//     'Retail Security',
//     'Event Security',
//     'Door Supervisor',
//     'Mobile Patrol',
//     'Loss Prevention',
//     'Construction Site Security',
//     'Close Protection',
//     'Maritime Security',
//     'High-Value Goods Escort',
//     'Residential Security Team (RST)',
//     'K9 Security Handler',
//     'Armed Security Professional',
//     'VIP Chauffeur & Security Driver',
//     'CCTV Operator',
//     'Security Control Room Operator',
//     'Covert Surveillance Specialist'
//   ] as const;

//   const handleServiceToggle = (service: string) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedServices: prev.selectedServices.includes(service)
//         ? prev.selectedServices.filter(s => s !== service)
//         : [...prev.selectedServices, service]
//     }));
//   };
//   const handleCheckboxChange = (timeSlot: string, day: string) => {
//     setFormData(prev => ({
//       ...prev,
//       weeklySchedule: {
//         ...prev.weeklySchedule,
//         [timeSlot]: {
//           ...prev.weeklySchedule[timeSlot],
//           [day]: !prev.weeklySchedule[timeSlot][day]
//         }
//       }
//     }));
//   };

//   const closeModalAndRedirect = () => {
//     setShowModal(false);
//     router.push("/profile"); // Redirect to profile page
//   };
  // return (
  //   <div className="max-w-4xl mx-auto p-4 sm:p-8 my-8 sm:my-20 bg-white rounded-lg shadow-lg border border-gray-200">
  //           {/* Back Button */}
  //     <div className="absolute top-4 left-4 mt-20 flex items-center text-gray-600 hover:text-black">
  //       <button
  //         className="flex items-center text-gray-600 hover:text-black transition-all duration-200 mb-6"
  //         onClick={() => router.back()}
  //       >
  //         <ArrowLeft className="w-6 h-6 mr-2" />
  //       </button>
  //     </div>
  //     <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mt-10 mb-6 text-center">My Public Profile</h1>
      
  //     <div className="mb-6 space-y-4">
  //       <p className="text-center text-red-600 text-sm font-medium">
  //         Congratulations! You have successfully registered with FindMySecurity. To begin your exceptional journey with us, 
  //         please complete your profile to become visible to potential employers.
  //       </p>
  //       <p className="text-gray-700">
  //         Your profile is your public advert for the services you offer. Please read our Safety Centre for guidance. 
  //         Any changes made to your profile must be approved by our human moderation team before being published.
  //       </p>
  //       <p>
  //         <span className="font-semibold">
  //           <Link href="#" className="text-blue-600 underline">Profile</Link> Status:
  //         </span> You have not yet completed your profile
  //       </p>
  //     </div>

  //     <form onSubmit={handleSubmit} className="space-y-6 mt-6">
  //       {/* Screen Name */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Screen Name* (Maximum 8 characters)</label>
  //         <input
  //           type="text"
  //           value={formData.screenName}
  //           onChange={(e) => handleInputChange('screenName', e.target.value)}
  //           maxLength={8}
  //           required
  //           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
  //         />
  //       </div>

  //       {/* Postcode */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Postcode*</label>
  //         <input
  //           type="text"
  //           value={formData?.postcode}
  //           onChange={(e) => handleInputChange('postcode', e.target.value)}
  //           required
  //           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
  //         />
  //       </div>

  //       {/* Profile Headline */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Profile Headline</label>
  //         <input
  //           type="text"
  //           value={formData.profileHeadline}
  //           onChange={(e) => handleInputChange('profileHeadline', e.target.value)}
  //           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
  //         />
  //       </div>

  //       {/* Gender Section */}
  //       <div className="border-t border-gray-200 pt-6">
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">Gender</h2>
  //         <div className="space-y-2">
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Choose an option*</label>
  //           <div className="flex gap-4">
  //             <button
  //               type="button"
  //               onClick={() => handleInputChange('gender', "Male")}
  //               className={`px-4 py-2 border rounded-lg transition-all ${
  //                 formData.gender === "Male"
  //                   ? "bg-black text-white border-black"
  //                   : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
  //               }`}
  //             >
  //               Male
  //             </button>
  //             <button
  //               type="button"
  //               onClick={() => handleInputChange('gender', "Female")}
  //               className={`px-4 py-2 border rounded-lg transition-all ${
  //                 formData.gender === "Female"
  //                   ? "bg-black text-white border-black"
  //                   : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
  //               }`}
  //             >
  //               Female
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Services Section */}
  //       <div className="border-t border-gray-200 pt-6">
  //         <label className="block text-lg font-semibold text-gray-700 mb-2">Services Offered*</label>
  //         <p className="text-sm text-gray-600 mb-4">Select all relevant security services:</p>
          
  //         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  //           {services.map((service) => (
  //             <div key={service} className="flex items-center bg-gray-100 p-3 rounded-md shadow-md hover:bg-gray-200 transition">
  //               <input
  //                 type="checkbox"
  //                 id={service}
  //                 checked={formData.selectedServices.includes(service)}
  //                 onChange={() => handleServiceToggle(service)}
  //                 className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
  //               />
  //               <label htmlFor={service} className="ml-3 flex items-center text-gray-700 font-medium">
  //                 <FaCheckCircle className={formData.selectedServices.includes(service) ? "text-blue-500 mr-2" : "text-gray-400 mr-2"} />
  //                 {service}
  //               </label>
  //             </div>
  //           ))}
  //         </div>
  //       </div>

  //       {/* Other Services */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Other Services:</label>
  //         <input
  //           type="text"
  //           value={formData.otherService}
  //           onChange={(e) => handleInputChange('otherService', e.target.value)}
  //           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
  //           placeholder="Enter any additional service"
  //         />
  //       </div>

  //       {/* About Me Section */}
  //       <div className="border-t border-gray-200 pt-6">
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">About me*</h2>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Describe your service* (Minimum 50 characters)</label>
  //           <textarea
  //             value={formData.aboutMe}
  //             onChange={(e) => handleInputChange('aboutMe', e.target.value)}
  //             minLength={50}
  //             required
  //             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
  //             placeholder="Describe the services you offer..."
  //           />
  //         </div>
  //       </div>

  //       {/* Experience Section */}
  //       <div className="border-t border-gray-200 pt-6">
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">My Experience*</h2>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Describe your experience* (Minimum 50 characters)</label>
  //           <textarea
  //             value={formData.experience}
  //             onChange={(e) => handleInputChange('experience', e.target.value)}
  //             minLength={50}
  //             required
  //             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
  //             placeholder="Describe your professional experience..."
  //           />
  //         </div>
  //       </div>

  //       {/* Availability Section */}
  //       <div className="border-t border-gray-200 pt-6">
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">My Availability</h2>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Describe your availability</label>
  //           <textarea
  //             value={formData.availability}
  //             onChange={(e) => handleInputChange('availability', e.target.value)}
  //             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
  //             placeholder="Describe your general availability..."
  //           />
  //         </div>

  //         {/* Weekly Schedule Table with Checkboxes */}
  //         <div className="mt-8">
  //           <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Weekly Availability</h3>
  //           <div className="overflow-x-auto">
  //             <table className="min-w-full border border-gray-200">
  //               <thead>
  //                 <tr>
  //                   <th className="border border-gray-300 px-4 py-2 bg-gray-100">Time Slot</th>
  //                   {days.map(day => (
  //                     <th key={day} className="border border-gray-300 px-4 py-2 bg-gray-100">{day}</th>
  //                   ))}
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {timeSlots.map(timeSlot => (
  //                   <tr key={timeSlot}>
  //                     <td className="border border-gray-300 px-4 py-2">{timeSlot}</td>
  //                     {days.map(day => (
  //                       <td key={`${timeSlot}-${day}`} className="border border-gray-300 px-4 py-2 text-center">
  //                         <input
  //                           type="checkbox"
  //                           checked={formData.weeklySchedule[timeSlot][day]}
  //                           onChange={() => handleCheckboxChange(timeSlot, day)}
  //                           className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
  //                         />
  //                       </td>
  //                     ))}
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Qualifications Section */}
  //       <div className="border-t border-gray-200 pt-6">
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">My Qualifications*</h2>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Describe your qualifications* (Minimum 50 characters)</label>
  //           <textarea
  //             value={formData.qualifications}
  //             onChange={(e) => handleInputChange('qualifications', e.target.value)}
  //             minLength={50}
  //             required
  //             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
  //             placeholder="Describe your qualifications..."
  //           />
  //           <p className="text-xs text-gray-500 mt-1">
  //             To Check Required Qualification <Link href="/guidance" className="text-blue-600 underline">Click here</Link>
  //           </p>
  //         </div>
  //       </div>

  //       {/* Compulsory Documents Section */}
  //       <div className="border-t border-gray-200 pt-6">
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Compulsary Documents</h2>
  //         <div className="space-y-4">
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Upload required documents (PDF, DOC, JPG, PNG)
  //             </label>
  //             <input
  //               type="file"
  //               onChange={handleDocumentUpload}
  //               multiple
  //               accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
  //               className="block w-full text-sm text-gray-500
  //                 file:mr-4 file:py-2 file:px-4
  //                 file:rounded-md file:border-0
  //                 file:text-sm file:font-semibold
  //                 file:bg-blue-50 file:text-blue-700
  //                 hover:file:bg-blue-100"
  //             />
  //           </div>
  //           {formData.compulsoryDocuments
  // .filter(file => file !== null)
  // .map((file, index) => (
  //   <li key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
  //     <span className="text-gray-700">{file.name}</span>
  //     <button
  //       type="button"
  //       onClick={() => removeDocument(index)}
  //     >
  //       Remove
  //     </button>
  //   </li>
  // ))}        

  //         </div>
  //       </div>

  //       {/* Fees Section */}
  //       <div className="border-t border-gray-200 pt-6">
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">My Fees</h2>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Describe your fees</label>
  //           <textarea
  //             value={formData.availability}
  //             onChange={(e) => handleInputChange('availability', e.target.value)}
  //             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
  //             placeholder="Describe your fees..."
  //           />
  //         </div>
  //         <div className="mt-4">
  //           <label className="block text-sm font-medium text-gray-700 mb-2">Rates*</label>
  //           <div className="flex items-center">
  //             <span className="mr-2">From £</span>
  //             <input
  //               type="number"
  //               value={formData.hourlyRate}
  //               onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
  //               className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
  //               placeholder="0.00"
  //             />
  //             <span className="ml-2">per hour</span>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Profile Photo Section */}
  //       <div className="border-t border-gray-200 pt-6">
  //       <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Photo</h2>
  //       <p className="text-sm text-gray-600 mb-4">
  //         Your photo must be of yourself or your setting only. No children or logos.
  //       </p>
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">Upload a new Profile Photo*</label>
  //         <input
  //               type="file"
  //               onChange={handleDocumentUpload}
  //               multiple
  //               accept=".jpg,.jpeg,.png"
  //               className="block w-full text-sm text-gray-500
  //                 file:mr-4 file:py-2 file:px-4
  //                 file:rounded-md file:border-0
  //                 file:text-sm file:font-semibold
  //                 file:bg-blue-50 file:text-blue-700
  //                 hover:file:bg-blue-100"
  //             />
  //       </div>
  //     </div>

  //       {/* Direct Contact Details Section */}
  //       <div className="border-t border-gray-200 pt-6">
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">Direct Contact Details</h2>
  //         <p className="text-sm text-gray-600 mb-4">
  //           You can optionally add your direct contact details to your profile. This can be viewed by premium members. You can see which other members have viewed your contact details on the Who's Looked At Me? page.
  //         </p>
          
  //         <div className="space-y-4">
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">Home Telephone</label>
  //             <input
  //               type="tel"
  //               value={formData.homeTelephone}
  //               onChange={(e) => handleInputChange('homeTelephone', e.target.value)}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
  //             />
  //           </div>
            
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Telephone</label>
  //             <input
  //               type="tel"
  //               value={formData.mobileTelephone}
  //               onChange={(e) => handleInputChange('mobileTelephone', e.target.value)}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
  //             />
  //           </div>
            
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
  //             <p className="text-xs text-gray-500 mb-2">Premium Members Only: You can enter your website address here, but you'll need to upgrade to Gold Membership for it to be visible to other members.</p>
  //             <input
  //               type="url"
  //               value={formData.website}
  //               onChange={(e) => handleInputChange('website', e.target.value)}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
  //               placeholder="https://example.com"
  //             />
  //           </div>
  //         </div>
  //       </div>

  //       <div className="flex justify-start">
  //         <button
  //           type="submit"
  //           disabled={isSubmitting}
  //           className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
  //             isSubmitting 
  //               ? "bg-gray-600 cursor-not-allowed" 
  //               : "bg-black hover:bg-gray-800"
  //           }`}
  //         >
  //           {isSubmitting ? "Saving..." : "Save Profile"}
  //         </button>
  //       </div>
  //     </form>
  //     {/* ✅ Success Modal */}
  //     {showModal && (
  //       <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
  //         <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
  //           <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={closeModalAndRedirect}>
  //             <X className="w-5 h-5" />
  //           </button>

  //           <CheckCircle className="w-12 h-12 mx-auto text-green-600" />
  //           <h2 className="text-xl font-bold mt-2">Success!</h2>
  //           <p className="text-gray-600 mt-2">Your form has been submitted successfully.</p>

  //           <button
  //             className="mt-4 bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
  //             onClick={closeModalAndRedirect}
  //           >
  //             Go to Profile
  //           </button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
// };

// export default JobPosting;







// "use client";

// import React, { useState, useEffect } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { CheckCircle, Loader2, X } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";

// interface FormData {
//   screenName: string;
//   postcode: string;
//   profileHeadline: string;
//   selectedServices: string[];
//   otherService: string;
//   gender: string;
//   aboutMe: string;
//   experience: string;
//   availability: string;
//   qualifications: string;
//   hourlyRate: string;
//   profilePhoto: string | null;
//   homeTelephone: string;
//   mobileTelephone: string;
//   website: string;
//   weeklySchedule: {
//     [timeSlot: string]: {
//       [day: string]: boolean;
//     };
//   };
// }

// const JobPosting: React.FC = () => {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//   const timeSlots = [
//     // 'Before School',
//     'Morning',
//     'Afternoon',
//     // 'After School',
//     'Evening',
//     'Overnight'
//   ];

//   // Initialize state with localStorage data or defaults
//   const [formData, setFormData] = useState<FormData>(() => {
//     const defaultData = {
//       screenName: "",
//       postcode: "London",
//       profileHeadline: "",
//       selectedServices: [],
//       otherService: "",
//       gender: "",
//       aboutMe: "",
//       experience: "",
//       availability: "",
//       qualifications: "",
//       hourlyRate: "",
//       profilePhoto: null,
//       homeTelephone: "",
//       mobileTelephone: "",
//       website: "",
//       weeklySchedule: (() => {
//         const initialSchedule: any = {};
//         timeSlots.forEach(slot => {
//           initialSchedule[slot] = {};
//           days.forEach(day => {
//             initialSchedule[slot][day] = false;
//           });
//         });
//         return initialSchedule;
//       })()
//     };

//     if (typeof window === 'undefined') return defaultData;

//     try {
//       const savedData = localStorage.getItem('createdPublicProfiles');
//       console.log("savedData",savedData)
//       if (!savedData) return defaultData;

//       const parsedData = JSON.parse(savedData);
//       return {
//         ...defaultData,
//         ...parsedData,
//         weeklySchedule: parsedData.weeklySchedule || defaultData.weeklySchedule
//       };
//     } catch (error) {
//       console.error("Error parsing saved form data:", error);
//       return defaultData;
//     }
//   });

//   // Handle localStorage quota issues
//   const safeLocalStorageSet = (key: string, value: string) => {
//     try {
//       localStorage.setItem(key, value);
//     } catch (error) {
//       console.error("LocalStorage quota exceeded:", error);
//     }
//   };

  
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const file = e.target.files[0];

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         if (event.target?.result) {
//           handleInputChange("profilePhoto", event.target.result as string);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  
  
// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Prepare form data for submission
//       const dataToStore = { ...formData };
//       console.log("dataToStore",dataToStore)
//       safeLocalStorageSet("createdPublicProfiles", JSON.stringify(dataToStore));

//       // Simulate form submission delay
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       setShowModal(true);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Error submitting the form. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const services = [
//     'Corporate Security',
//     'Retail Security',
//     'Event Security',
//     'Door Supervisor',
//     'Mobile Patrol',
//     'Loss Prevention',
//     'Construction Site Security',
//     'Close Protection',
//     'Maritime Security',
//     'High-Value Goods Escort',
//     'Residential Security Team (RST)',
//     'K9 Security Handler',
//     'Armed Security Professional',
//     'VIP Chauffeur & Security Driver',
//     'CCTV Operator',
//     'Security Control Room Operator',
//     'Covert Surveillance Specialist'
//   ] as const;

//   const handleServiceToggle = (service: string) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedServices: prev.selectedServices.includes(service)
//         ? prev.selectedServices.filter(s => s !== service)
//         : [...prev.selectedServices, service]
//     }));
//   };
//   const handleCheckboxChange = (timeSlot: string, day: string) => {
//     setFormData(prev => ({
//       ...prev,
//       weeklySchedule: {
//         ...prev.weeklySchedule,
//         [timeSlot]: {
//           ...prev.weeklySchedule[timeSlot],
//           [day]: !prev.weeklySchedule[timeSlot][day]
//         }
//       }
//     }));
//   };

//   const closeModalAndRedirect = () => {
//     setShowModal(false);
//     router.push("/profile"); // Redirect to profile page
//   };
//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-8 my-8 sm:my-20 bg-white rounded-lg shadow-lg border border-gray-200">
//             {/* Back Button */}
//       <div className="absolute top-4 left-4 mt-20 flex items-center text-gray-600 hover:text-black">
//         <button
//           className="flex items-center text-gray-600 hover:text-black transition-all duration-200 mb-6"
//           onClick={() => router.back()}
//         >
//           <ArrowLeft className="w-6 h-6 mr-2" />
//         </button>
//       </div>
//       <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mt-10 mb-6 text-center">My Public Profile</h1>
      
//       <div className="mb-6 space-y-4">
//         <p className="text-center text-red-600 text-sm font-medium">
//           Congratulations! You have successfully registered with FindMySecurity. To begin your exceptional journey with us, 
//           please complete your profile to become visible to potential employers.
//         </p>
//         <p className="text-gray-700">
//           Your profile is your public advert for the services you offer. Please read our Safety Centre for guidance. 
//           Any changes made to your profile must be approved by our human moderation team before being published.
//         </p>
//         <p>
//           <span className="font-semibold">
//             <Link href="#" className="text-blue-600 underline">Profile</Link> Status:
//           </span> You have not yet completed your profile
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6 mt-6">
//         {/* Screen Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Screen Name* (Maximum 8 characters)</label>
//           <input
//             type="text"
//             value={formData.screenName}
//             onChange={(e) => handleInputChange('screenName', e.target.value)}
//             maxLength={8}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//           />
//         </div>

//         {/* Postcode */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Postcode*</label>
//           <input
//             type="text"
//             value={formData.postcode}
//             onChange={(e) => handleInputChange('postcode', e.target.value)}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//           />
//         </div>

//         {/* Profile Headline */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Profile Headline</label>
//           <input
//             type="text"
//             value={formData.profileHeadline}
//             onChange={(e) => handleInputChange('profileHeadline', e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//           />
//         </div>

//         {/* Gender Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Gender</h2>
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Choose an option*</label>
//             <div className="flex gap-4">
//               <button
//                 type="button"
//                 onClick={() => handleInputChange('gender', "Male")}
//                 className={`px-4 py-2 border rounded-lg transition-all ${
//                   formData.gender === "Male"
//                     ? "bg-black text-white border-black"
//                     : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
//                 }`}
//               >
//                 Male
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleInputChange('gender', "Female")}
//                 className={`px-4 py-2 border rounded-lg transition-all ${
//                   formData.gender === "Female"
//                     ? "bg-black text-white border-black"
//                     : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
//                 }`}
//               >
//                 Female
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Services Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Services Offered*</label>
//           <p className="text-sm text-gray-600 mb-4">Select all relevant security services:</p>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {services.map((service) => (
//               <div key={service} className="flex items-center bg-gray-100 p-3 rounded-md shadow-md hover:bg-gray-200 transition">
//                 <input
//                   type="checkbox"
//                   id={service}
//                   checked={formData.selectedServices.includes(service)}
//                   onChange={() => handleServiceToggle(service)}
//                   className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
//                 />
//                 <label htmlFor={service} className="ml-3 flex items-center text-gray-700 font-medium">
//                   <FaCheckCircle className={formData.selectedServices.includes(service) ? "text-blue-500 mr-2" : "text-gray-400 mr-2"} />
//                   {service}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Other Services */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Other Services:</label>
//           <input
//             type="text"
//             value={formData.otherService}
//             onChange={(e) => handleInputChange('otherService', e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//             placeholder="Enter any additional service"
//           />
//         </div>

//         {/* About Me Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">About me*</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your service* (Minimum 50 characters)</label>
//             <textarea
//               value={formData.aboutMe}
//               onChange={(e) => handleInputChange('aboutMe', e.target.value)}
//               minLength={50}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe the services you offer..."
//             />
//           </div>
//         </div>

//         {/* Experience Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Experience*</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your experience* (Minimum 50 characters)</label>
//             <textarea
//               value={formData.experience}
//               onChange={(e) => handleInputChange('experience', e.target.value)}
//               minLength={50}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your professional experience..."
//             />
//           </div>
//         </div>

//         {/* Availability Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Availability</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your availability</label>
//             <textarea
//               value={formData.availability}
//               onChange={(e) => handleInputChange('availability', e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your general availability..."
//             />
//           </div>

//           {/* Weekly Schedule Table with Checkboxes */}
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Weekly Availability</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full border border-gray-200">
//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 px-4 py-2 bg-gray-100">Time Slot</th>
//                     {days.map(day => (
//                       <th key={day} className="border border-gray-300 px-4 py-2 bg-gray-100">{day}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {timeSlots.map(timeSlot => (
//                     <tr key={timeSlot}>
//                       <td className="border border-gray-300 px-4 py-2">{timeSlot}</td>
//                       {days.map(day => (
//                         <td key={`${timeSlot}-${day}`} className="border border-gray-300 px-4 py-2 text-center">
//                           <input
//                             type="checkbox"
//                             checked={formData.weeklySchedule[timeSlot][day]}
//                             onChange={() => handleCheckboxChange(timeSlot, day)}
//                             className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Qualifications Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Qualifications*</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your qualifications* (Minimum 50 characters)</label>
//             <textarea
//               value={formData.qualifications}
//               onChange={(e) => handleInputChange('qualifications', e.target.value)}
//               minLength={50}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your qualifications..."
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               To Check Required Qualification <Link href="/guidance" className="text-blue-600 underline">Click here</Link>
//             </p>
//           </div>
//         </div>

//         {/* Fees Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Fees</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your fees</label>
//             <textarea
//               value={formData.availability}
//               onChange={(e) => handleInputChange('availability', e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your fees..."
//             />
//           </div>
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Rates*</label>
//             <div className="flex items-center">
//               <span className="mr-2">From £</span>
//               <input
//                 type="number"
//                 value={formData.hourlyRate}
//                 onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
//                 className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//                 placeholder="0.00"
//               />
//               <span className="ml-2">per hour</span>
//             </div>
//           </div>
//         </div>

//         {/* Profile Photo Section */}
//         <div className="border-t border-gray-200 pt-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Photo</h2>
//         <p className="text-sm text-gray-600 mb-4">
//           Your photo must be of yourself or your setting only. No children or logos.
//         </p>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Upload a new Profile Photo*</label>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             accept="image/*"
//             className="block w-full text-sm text-gray-500
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-md file:border-0
//               file:text-sm file:font-semibold
//               file:bg-blue-50 file:text-blue-700
//               hover:file:bg-blue-100"
//           />
//           {formData.profilePhoto && (
//             <div className="mt-4">
//               <img
//                 src={formData.profilePhoto}
//                 alt="Profile preview"
//                 className="h-32 w-32 object-cover rounded-md"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//         {/* Direct Contact Details Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Direct Contact Details</h2>
//           <p className="text-sm text-gray-600 mb-4">
//             You can optionally add your direct contact details to your profile. This can be viewed by premium members. You can see which other members have viewed your contact details on the Who's Looked At Me? page.
//           </p>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Home Telephone</label>
//               <input
//                 type="tel"
//                 value={formData.homeTelephone}
//                 onChange={(e) => handleInputChange('homeTelephone', e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Telephone</label>
//               <input
//                 type="tel"
//                 value={formData.mobileTelephone}
//                 onChange={(e) => handleInputChange('mobileTelephone', e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
//               <p className="text-xs text-gray-500 mb-2">Premium Members Only: You can enter your website address here, but you'll need to upgrade to Gold Membership for it to be visible to other members.</p>
//               <input
//                 type="url"
//                 value={formData.website}
//                 onChange={(e) => handleInputChange('website', e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//                 placeholder="https://example.com"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-start">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
//               isSubmitting 
//                 ? "bg-gray-600 cursor-not-allowed" 
//                 : "bg-black hover:bg-gray-800"
//             }`}
//           >
//             {isSubmitting ? "Saving..." : "Save Profile"}
//           </button>
//         </div>
//       </form>
//       {/* ✅ Success Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
//             <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={closeModalAndRedirect}>
//               <X className="w-5 h-5" />
//             </button>

//             <CheckCircle className="w-12 h-12 mx-auto text-green-600" />
//             <h2 className="text-xl font-bold mt-2">Success!</h2>
//             <p className="text-gray-600 mt-2">Your form has been submitted successfully.</p>

//             <button
//               className="mt-4 bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
//               onClick={closeModalAndRedirect}
//             >
//               Go to Profile
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobPosting;


 // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  
  //   try {
  //     // Prepare form data for submission
  //     const dataToStore = { ...formData };
  //     console.log("dataToStore", dataToStore);
  
  //     // Save the form data to localStorage
  //     safeLocalStorageSet("createdPublicProfiles", JSON.stringify(dataToStore));
  
  //     // Send the form data to the API
      // const response = await fetch("https://findmysecurity-backend.onrender.com/api/profile/individual", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(dataToStore),
      // });
  
  //     if (response.ok) {
  //       // Simulate form submission delay
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  
  //       // Show success modal after successful submission
  //       setShowModal(true);
  //     } else {
  //       throw new Error("Failed to submit form");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("Error submitting the form. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

 // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     // Save to localStorage before submitting
  //     localStorage.setItem('createdPublicProfiles', JSON.stringify(formData));

  //     // Simulate API request delay
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     setShowModal(true);
  //   } catch (error) {
  //     console.error("Form submission error:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


// "use client";

// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { FaCheckCircle } from "react-icons/fa";
// import Link from "next/link";

// const localizer = momentLocalizer(moment);

// interface FormData {
//   screenName: string;
//   postcode: string;
//   profileHeadline: string;
//   selectedServices: string[];
//   otherService: string;
//   gender: string;
//   aboutMe: string;
//   experience: string;
//   availability: string;
//   selectedDates: Date[];
//   qualifications: string;
//   hourlyRate: string;
//   profilePhoto: File | null;
//   homeTelephone: string;
//   mobileTelephone: string;
//   website: string;
// }

// const JobPosting: React.FC = () => {
//   // Initialize state with localStorage data or defaults
//   const [formData, setFormData] = useState(() => {
//     if (typeof window !== 'undefined') {
//       const savedData = localStorage.getItem('jobPostingFormData');
//       return savedData ? JSON.parse(savedData) : {
//         screenName: "",
//         postcode: "London",
//         profileHeadline: "",
//         selectedServices: [],
//         otherService: "",
//         gender: "",
//         aboutMe: "",
//         experience: "",
//         availability: "",
//         selectedDates: [],
//         qualifications: "",
//         hourlyRate: "",
//         profilePhoto: null,
//         homeTelephone: "",
//         mobileTelephone: "",
//         website: ""
//       };
//     }
//     return {
//       screenName: "",
//       postcode: "London",
//       profileHeadline: "",
//       selectedServices: [],
//       otherService: "",
//       gender: "",
//       aboutMe: "",
//       experience: "",
//       availability: "",
//       selectedDates: [],
//       qualifications: "",
//       hourlyRate: "",
//       profilePhoto: null,
//       homeTelephone: "",
//       mobileTelephone: "",
//       website: ""
//     };
//   });

//   // Update localStorage whenever formData changes
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('jobPostingFormData', JSON.stringify(formData));
//     }
//   }, [formData]);

//   const handleInputChange = (field: string, value: any) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSelectSlot = (slotInfo: { start: Date }) => {
//     setFormData(prev => {
//       const isAlreadySelected = prev.selectedDates.some(
//         (selectedDate: Date) => moment(selectedDate).isSame(slotInfo.start, "day")
//       );

//       const newDates = isAlreadySelected
//         ? prev.selectedDates.filter(
//             (selectedDate: Date) => !moment(selectedDate).isSame(slotInfo.start, "day")
//           )
//         : [...prev.selectedDates, slotInfo.start];

//       return {
//         ...prev,
//         selectedDates: newDates
//       };
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       handleInputChange('profilePhoto', e.target.files[0]);
//     }
//   };

//   const services = [
//     'Corporate Security',
//     'Retail Security',
//     'Event Security',
//     'Door Supervisor',
//     'Mobile Patrol',
//     'Loss Prevention',
//     'Construction Site Security',
//     'Close Protection',
//     'Maritime Security',
//     'High-Value Goods Escort',
//     'Residential Security Team (RST)',
//     'K9 Security Handler',
//     'Armed Security Professional',
//     'VIP Chauffeur & Security Driver',
//     'CCTV Operator',
//     'Security Control Room Operator',
//     'Covert Surveillance Specialist'
//   ];

//   const handleServiceToggle = (service: string) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedServices: prev.selectedServices.includes(service) 
//         ? prev.selectedServices.filter((s: string) => s !== service) 
//         : [...prev.selectedServices, service]
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(formData);
//     // Here you would typically send the data to your backend
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8 my-20 bg-white rounded-lg shadow-lg border border-gray-200">
//       <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">My Public Profile</h1>
//       <p className="text-center text-red-600 text-sm font-medium mb-4">Congratulations! You have successfully registered with FindMySecurity. To begin your exceptional journey with us, please complete your profile to become visible to potential employers. While you can update your profile at any time, it will only be published on the platform once all required details are completed.</p>
//       <p className="text-gray-700 text-left mb-4">Your profile is your public advert for the services you offer. Please read our Safety Centre for guidance. Any changes made to your profile must be approved by our human moderation team before being published.</p>
//       <p className="text-left"><span className='font-semibold'><a href="" className='text-blue-600 underline'>Profile</a> Status:</span> You have not yet completed your profile</p>

//       <form onSubmit={handleSubmit} className="space-y-6 mt-6">
//         {/* Screen Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Screen Name* (Maximum 8 characters)</label>
//           <input
//             type="text"
//             value={formData.screenName}
//             onChange={(e) => handleInputChange('screenName', e.target.value)}
//             maxLength={8}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//           />
//         </div>

//         {/* Postcode */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Postcode*</label>
//           <input
//             type="text"
//             value={formData.postcode}
//             onChange={(e) => handleInputChange('postcode', e.target.value)}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//           />
//         </div>

//         {/* Profile Headline */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Profile Headline</label>
//           <input
//             type="text"
//             value={formData.profileHeadline}
//             onChange={(e) => handleInputChange('profileHeadline', e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//           />
//         </div>

//         {/* Gender Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Gender</h2>
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Choose an option*</label>
//             <div className="flex gap-4">
//               <button
//                 type="button"
//                 onClick={() => handleInputChange('gender', "Male")}
//                 className={`px-4 py-2 border rounded-lg transition-all ${
//                   formData.gender === "Male"
//                     ? "bg-black text-white border-black"
//                     : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
//                 }`}
//               >
//                 Male
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleInputChange('gender', "Female")}
//                 className={`px-4 py-2 border rounded-lg transition-all ${
//                   formData.gender === "Female"
//                     ? "bg-black text-white border-black"
//                     : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
//                 }`}
//               >
//                 Female
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Services Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Services Offered*</label>
//           <p className="text-sm text-gray-600 mb-4">Select all relevant security services:</p>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {services.map((service) => (
//               <div key={service} className="flex items-center bg-gray-100 p-3 rounded-md shadow-md hover:bg-gray-200 transition">
//                 <input
//                   type="checkbox"
//                   id={service}
//                   checked={formData.selectedServices.includes(service)}
//                   onChange={() => handleServiceToggle(service)}
//                   className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
//                 />
//                 <label htmlFor={service} className="ml-3 flex items-center text-gray-700 font-medium">
//                   <FaCheckCircle className={formData.selectedServices.includes(service) ? "text-blue-500 mr-2" : "text-gray-400 mr-2"} />
//                   {service}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Other Services */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Other Services:</label>
//           <input
//             type="text"
//             value={formData.otherService}
//             onChange={(e) => handleInputChange('otherService', e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//             placeholder="Enter any additional service"
//           />
//         </div>

//         {/* About Me Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">About me*</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your service* (Minimum 50 characters)</label>
//             <textarea
//               value={formData.aboutMe}
//               onChange={(e) => handleInputChange('aboutMe', e.target.value)}
//               minLength={50}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe the services you offer..."
//             />
//           </div>
//         </div>

//         {/* Experience Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Experience*</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your experience* (Minimum 50 characters)</label>
//             <textarea
//               value={formData.experience}
//               onChange={(e) => handleInputChange('experience', e.target.value)}
//               minLength={50}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your professional experience..."
//             />
//           </div>
//         </div>

//         {/* Availability Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Availability</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your availability</label>
//             <textarea
//               value={formData.availability}
//               onChange={(e) => handleInputChange('availability', e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your general availability..."
//             />
//           </div>

//           {/* Calendar Table */}
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Availability</h3>
//             <Calendar
//               localizer={localizer}
//               selectable
//               events={formData.selectedDates.map((date: Date) => ({
//                 start: date,
//                 end: moment(date).add(1, "hours").toDate(),
//                 title: "Available",
//               }))}
//               startAccessor="start"
//               endAccessor="end"
//               style={{ height: 500 }}
//               onSelectSlot={handleSelectSlot}
//             />
//           </div>
//         </div>

//         {/* Qualifications Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Qualifications*</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your qualifications* (Minimum 50 characters)</label>
//             <textarea
//               value={formData.qualifications}
//               onChange={(e) => handleInputChange('qualifications', e.target.value)}
//               minLength={50}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your qualifications..."
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               To Check Required Qualification <Link href="/guidance" className="text-blue-600 underline">Click here</Link>
//             </p>
//           </div>
//         </div>

//         {/* Fees Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Fees</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your fees</label>
//             <textarea
//               value={formData.availability}
//               onChange={(e) => handleInputChange('availability', e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your fees..."
//             />
//           </div>
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Rates*</label>
//             <div className="flex items-center">
//               <span className="mr-2">From £</span>
//               <input
//                 type="number"
//                 value={formData.hourlyRate}
//                 onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
//                 className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//                 placeholder="0.00"
//               />
//               <span className="ml-2">per hour</span>
//             </div>
//           </div>
//         </div>

//         {/* Profile Photo Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Photo</h2>
//           <p className="text-sm text-gray-600 mb-4">
//             Your photo must be of yourself or your setting only. No children or logos.
//           </p>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Upload a new Profile Photo*</label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               accept="image/*"
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//             />
//           </div>
//         </div>

//         {/* Direct Contact Details Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Direct Contact Details</h2>
//           <p className="text-sm text-gray-600 mb-4">
//             You can optionally add your direct contact details to your profile. This can be viewed by premium members. You can see which other members have viewed your contact details on the Who's Looked At Me? page.
//           </p>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Home Telephone</label>
//               <input
//                 type="tel"
//                 value={formData.homeTelephone}
//                 onChange={(e) => handleInputChange('homeTelephone', e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Telephone</label>
//               <input
//                 type="tel"
//                 value={formData.mobileTelephone}
//                 onChange={(e) => handleInputChange('mobileTelephone', e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
//               <p className="text-xs text-gray-500 mb-2">Premium Members Only: You can enter your website address here, but you'll need to upgrade to Gold Membership for it to be visible to other members.</p>
//               <input
//                 type="url"
//                 value={formData.website}
//                 onChange={(e) => handleInputChange('website', e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//                 placeholder="https://example.com"
//               />
//             </div>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Save Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default JobPosting;








// "use client";

// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { FaCheckCircle } from "react-icons/fa";
// import Link from "next/link";

// const localizer = momentLocalizer(moment);

// const JobPosting: React.FC = () => {
//   const [screenName, setScreenName] = useState("");
//   const [postcode, setPostcode] = useState("London");
//   const [profileHeadline, setProfileHeadline] = useState("");
//   const [selectedServices, setSelectedServices] = useState<string[]>([]);
//   const [otherService, setOtherService] = useState("");
//   const [gender, setGender] = useState("");
//   const [aboutMe, setAboutMe] = useState("");
//   const [experience, setExperience] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [selectedDates, setSelectedDates] = useState<Date[]>([]);
//   const [qualifications, setQualifications] = useState("");
//   const [hourlyRate, setHourlyRate] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
//   const [homeTelephone, setHomeTelephone] = useState("");
//   const [mobileTelephone, setMobileTelephone] = useState("");
//   const [website, setWebsite] = useState("");

//   const handleSelectSlot = (slotInfo: { start: Date }) => {
//     setSelectedDates((prevDates) => {
//       const isAlreadySelected = prevDates.some(
//         (selectedDate) => moment(selectedDate).isSame(slotInfo.start, "day")
//       );

//       return isAlreadySelected
//         ? prevDates.filter(
//             (selectedDate) => !moment(selectedDate).isSame(slotInfo.start, "day")
//           )
//         : [...prevDates, slotInfo.start];
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setProfilePhoto(e.target.files[0]);
//     }
//   };

//   const services = [
//     'Corporate Security',
//     'Retail Security',
//     'Event Security',
//     'Door Supervisor',
//     'Mobile Patrol',
//     'Loss Prevention',
//     'Construction Site Security',
//     'Close Protection',
//     'Maritime Security',
//     'High-Value Goods Escort',
//     'Residential Security Team (RST)',
//     'K9 Security Handler',
//     'Armed Security Professional',
//     'VIP Chauffeur & Security Driver',
//     'CCTV Operator',
//     'Security Control Room Operator',
//     'Covert Surveillance Specialist'
//   ];

//   const handleServiceToggle = (service: string) => {
//     setSelectedServices((prev) =>
//       prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
//     );
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({
//       screenName,
//       postcode,
//       profileHeadline,
//       services: selectedServices,
//       otherService,
//       gender,
//       aboutMe,
//       experience,
//       availability,
//       selectedDates,
//       qualifications,
//       hourlyRate,
//       profilePhoto,
//       homeTelephone,
//       mobileTelephone,
//       website
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8 my-20 bg-white rounded-lg shadow-lg border border-gray-200">
//       <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">My Public Profile</h1>
//       <p className="text-center text-red-600 text-sm font-medium mb-4">Congratulations! You have successfully registered with FindMySecurity. To begin your exceptional journey with us, please complete your profile to become visible to potential employers. While you can update your profile at any time, it will only be published on the platform once all required details are completed.</p>
//       <p className="text-gray-700 text-left mb-4">Your profile is your public advert for the services you offer. Please read our Safety Centre for guidance. Any changes made to your profile must be approved by our human moderation team before being published.</p>
//       <p className="text-left"><span className='font-semibold'><a href="" className='text-blue-600 underline'>Profile</a> Status:</span> You have not yet completed your profile</p>

//       <form onSubmit={handleSubmit} className="space-y-6 mt-6">
//         {/* Existing fields */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Screen Name* (Maximum 8 characters)</label>
//           <input
//             type="text"
//             value={screenName}
//             onChange={(e) => setScreenName(e.target.value)}
//             maxLength={8}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Postcode*</label>
//           <input
//             type="text"
//             value={postcode}
//             onChange={(e) => setPostcode(e.target.value)}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Profile Headline</label>
//           <input
//             type="text"
//             value={profileHeadline}
//             onChange={(e) => setProfileHeadline(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//           />
//         </div>

//         {/* Gender Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Gender</h2>
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Choose an option*</label>
//             <div className="flex gap-4">
//               <button
//                 type="button"
//                 onClick={() => setGender("Male")}
//                 className={`px-4 py-2 border rounded-lg transition-all ${
//                   gender === "Male"
//                     ? "bg-black text-white border-black"
//                     : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
//                 }`}
//               >
//                 Male
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setGender("Female")}
//                 className={`px-4 py-2 border rounded-lg transition-all ${
//                   gender === "Female"
//                     ? "bg-black text-white border-black"
//                     : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
//                 }`}
//               >
//                 Female
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Services Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Services Offered*</label>
//           <p className="text-sm text-gray-600 mb-4">Select all relevant security services:</p>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {services.map((service) => (
//               <div key={service} className="flex items-center bg-gray-100 p-3 rounded-md shadow-md hover:bg-gray-200 transition">
//                 <input
//                   type="checkbox"
//                   id={service}
//                   checked={selectedServices.includes(service)}
//                   onChange={() => handleServiceToggle(service)}
//                   className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
//                 />
//                 <label htmlFor={service} className="ml-3 flex items-center text-gray-700 font-medium">
//                   <FaCheckCircle className={selectedServices.includes(service) ? "text-blue-500 mr-2" : "text-gray-400 mr-2"} />
//                   {service}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Other Services:</label>
//           <input
//             type="text"
//             value={otherService}
//             onChange={(e) => setOtherService(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//             placeholder="Enter any additional service"
//           />
//         </div>

//         {/* About Me Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">About me*</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your service* (Minimum 50 characters)</label>
//             <textarea
//               value={aboutMe}
//               onChange={(e) => setAboutMe(e.target.value)}
//               minLength={50}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe the services you offer..."
//             />
//           </div>
//         </div>

//         {/* Experience Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Experience*</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your experience* (Minimum 50 characters)</label>
//             <textarea
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//               minLength={50}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your professional experience..."
//             />
//           </div>
//         </div>

//         {/* Availability Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Availability</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your availability</label>
//             <textarea
//               value={availability}
//               onChange={(e) => setAvailability(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your general availability..."
//             />
//           </div>

//           {/* Calendar Table */}
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Availability</h3>
//             <Calendar
//               localizer={localizer}
//               selectable
//               events={selectedDates.map((date) => ({
//                 start: date,
//                 end: moment(date).add(1, "hours").toDate(),
//                 title: "Available",
//               }))}
//               startAccessor="start"
//               endAccessor="end"
//               style={{ height: 500 }}
//               onSelectSlot={handleSelectSlot}
//             />
//           </div>
//         </div>

// {/* Qualifications Section */}
// <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Qualifications*</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your qualifications* (Minimum 50 characters)</label>
//             <textarea
//               value={qualifications}
//               onChange={(e) => setQualifications(e.target.value)}
//               minLength={50}
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your qualifications..."
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               To Check Required Qualification <Link href="/guidance" className="text-blue-600 underline">Click here</Link>
//             </p>
//             <p className="text-xs text-gray-500 mt-1">
//               Note for Developer: Click will take user to next window and there should be return bar on guidance page so user can return to this page
//             </p>
//           </div>
//         </div>

//         {/* Fees Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">My Fees</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Describe your fees</label>
//             <textarea
//               value={availability}
//               onChange={(e) => setAvailability(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border h-32"
//               placeholder="Describe your fees..."
//             />
//           </div>
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Rates*</label>
//             <div className="flex items-center">
//               <span className="mr-2">From £</span>
//               <input
//                 type="number"
//                 value={hourlyRate}
//                 onChange={(e) => setHourlyRate(e.target.value)}
//                 className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//                 placeholder="0.00"
//               />
//               <span className="ml-2">per hour</span>
//             </div>
//           </div>
//         </div>

//         {/* Profile Photo Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Photo</h2>
//           <p className="text-sm text-gray-600 mb-4">
//             Your photo must be of yourself or your setting only. No children or logos.
//           </p>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Upload a new Profile Photo*</label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               accept="image/*"
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//             />
//           </div>
//         </div>

//         {/* Direct Contact Details Section */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Direct Contact Details</h2>
//           <p className="text-sm text-gray-600 mb-4">
//             You can optionally add your direct contact details to your profile. This can be viewed by premium members. You can see which other members have viewed your contact details on the Who's Looked At Me? page.
//           </p>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Home Telephone</label>
//               <input
//                 type="tel"
//                 value={homeTelephone}
//                 onChange={(e) => setHomeTelephone(e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Telephone</label>
//               <input
//                 type="tel"
//                 value={mobileTelephone}
//                 onChange={(e) => setMobileTelephone(e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
//               <p className="text-xs text-gray-500 mb-2">Premium Members Only: You can enter your website address here, but you'll need to upgrade to Gold Membership for it to be visible to other members.</p>
//               <input
//                 type="url"
//                 value={website}
//                 onChange={(e) => setWebsite(e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
//                 placeholder="https://example.com"
//               />
//             </div>
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Save Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default JobPosting;



