"use client";

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft} from "lucide-react";
const localizer = momentLocalizer(moment);

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
  selectedDates: Date[];
  qualifications: string;
  hourlyRate: string;
  profilePhoto: File | null;
  homeTelephone: string;
  mobileTelephone: string;
  website: string;
}

const JobPosting: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize state with localStorage data or defaults
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
      selectedDates: [],
      qualifications: "",
      hourlyRate: "",
      profilePhoto: null,
      homeTelephone: "",
      mobileTelephone: "",
      website: ""
    };

    if (typeof window === 'undefined') return defaultData;

    try {
      const savedData = localStorage.getItem('jobPostingFormData');
      if (!savedData) return defaultData;

      const parsedData = JSON.parse(savedData);
      return {
        ...defaultData,
        ...parsedData,
        selectedDates: parsedData.selectedDates?.map((date: string) => new Date(date)) || []
      };
    } catch (error) {
      console.error("Error parsing saved form data:", error);
      return defaultData;
    }
  });

  // Update localStorage whenever formData changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const dataToStore = {
        ...formData,
        selectedDates: formData.selectedDates.map(date => date.toISOString()),
        profilePhoto: null // Don't store File object in localStorage
      };
      localStorage.setItem('jobPostingFormData', JSON.stringify(dataToStore));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  }, [formData]);

  const handleInputChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectSlot = (slotInfo: { start: Date }) => {
    setFormData(prev => {
      const isAlreadySelected = prev.selectedDates.some(selectedDate => 
        moment(selectedDate).isSame(slotInfo.start, "day")
      );

      const newDates = isAlreadySelected
        ? prev.selectedDates.filter(selectedDate => 
            !moment(selectedDate).isSame(slotInfo.start, "day")
          )
        : [...prev.selectedDates, slotInfo.start];

      return {
        ...prev,
        selectedDates: newDates
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleInputChange('profilePhoto', e.target.files[0]);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Submitting form data:", formData);
      // Here you would typically send the data to your backend
      // await submitFormData(formData);
      // router.push('/success');
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
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
            value={formData.postcode}
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

          {/* Calendar Table */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Availability</h3>
            <Calendar
              localizer={localizer}
              selectable
              events={formData.selectedDates.map((date: Date) => ({
                start: date,
                end: moment(date).add(1, "hours").toDate(),
                title: "Available",
              }))}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectSlot={handleSelectSlot}
            />
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
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Photo</h2>
          <p className="text-sm text-gray-600 mb-4">
            Your photo must be of yourself or your setting only. No children or logos.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload a new Profile Photo*</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
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
    </div>
  );
};

export default JobPosting;







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



