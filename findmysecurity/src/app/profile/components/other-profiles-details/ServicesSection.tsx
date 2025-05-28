import React, { useState, useEffect } from "react";
import Section from "./Section";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "@/utils/path";
import Select from 'react-select';
import securityServices from '@/sections/data/secuirty_services.json';
import trainingProviders from '@/sections/data/training_providers.json';
import securityProfessionals from '@/sections/data/secuirty_professional.json';

type ProfileType = {
  id: number;
  userId: number;
  companyName: string;
  serviceRequirements?: string[];
  securityServicesOfferings?: string[];
  otherService?: string;
};

interface ServiceOption {
  value: string;
  label: string;
  group: string;
}

interface Props {
  profile: ProfileType | null;
  roleId: number;
  userId: number;
}

const ServicesSection = ({ profile, userId, roleId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [formData, setFormData] = useState({
    selectedServices: [] as ServiceOption[],
    otherService: ""
  });
  const [updatedData, setUpdatedData] = useState({
    selectedServices: [] as ServiceOption[],
    otherService: ""
  });

  useEffect(() => {
    let options: ServiceOption[] = [];
    let data: { title: string; roles: string[] }[] = [];

    switch(roleId) {
      case 3: // Security Professional
        data = securityProfessionals;
        break;
      case 5: // Security Company
        data = securityServices;
        break;
      case 6: // Training Provider
        data = trainingProviders;
        break;
      default:
        data = [];
    }

    data.forEach(category => {
      category.roles.forEach(role => {
        options.push({
          value: role,
          label: role,
          group: category.title
        });
      });
    });

    setServiceOptions(options);

    if (profile) {
      const sr = profile.serviceRequirements ?? [];
      const sso = profile.securityServicesOfferings ?? [];
      const combinedServices = Array.from(new Set([...sr, ...sso]));
      
      const selectedValues = combinedServices.map((service: string) => {
        const option = options.find(opt => opt.value === service);
        return {
          value: service,
          label: service,
          group: option?.group || ''
        };
      });

      setFormData({
        selectedServices: selectedValues,
        otherService: profile.otherService || "",
      });
      setUpdatedData({
        selectedServices: selectedValues,
        otherService: profile.otherService || "",
      });
    }
  }, [roleId, profile]);

  if (!profile) return null;

  const isSecurityCompany = roleId === 5;
  const isCourseProvider = roleId === 6;
  const isCorporateClient = roleId === 7;

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken")?.replace(/^"|"/g, "");
      if (!token) return toast.error("Authorization token not found.");

      const selectedServicesArr = formData.selectedServices.map((service: ServiceOption) => service.value);

      const payloadData: any = {
        id: profile?.id,
        userId: userId,
        companyName: profile?.companyName || "",
        otherService: formData.otherService
      };

      if (isSecurityCompany || isCourseProvider) {
        payloadData.securityServicesOfferings = selectedServicesArr;
      }

      if (isCorporateClient || isCourseProvider) {
        payloadData.serviceRequirements = selectedServicesArr;
      }

      let endpoint = "";
      switch (roleId) {
        case 5:
          endpoint = `${API_URL}/users/security-companies/${userId}`;
          break;
        case 6:
          endpoint = `${API_URL}/users/course-providers/${userId}`;
          break;
        case 7:
          endpoint = `${API_URL}/users/corporate-clients/${userId}`;
          break;
        default:
          toast.error("Unknown role type.");
          return;
      }

      await axios.put(endpoint, payloadData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUpdatedData({ ...formData });
      toast.success("Services updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update services.");
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
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Services / Specializations
              </label>
              <Select
                isMulti
                name="selectedServices"
                value={formData.selectedServices}
                onChange={(newValue) => handleChange('selectedServices', newValue)}
                options={serviceOptions}
                className="text-gray-700"
                classNamePrefix="select"
                placeholder="Select services..."
                formatGroupLabel={(group) => (
                  <div className="font-semibold">{group.label}</div>
                )}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other Services
              </label>
              <textarea
                name="otherService"
                value={formData.otherService}
                onChange={(e) => handleChange('otherService', e.target.value)}
                className="w-full border px-3 py-2 rounded text-gray-700"
                rows={4}
                placeholder="Describe other services you offer"
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
          {updatedData.selectedServices && updatedData.selectedServices.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Services / Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {updatedData.selectedServices.map((service: ServiceOption, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {service.value}
                  </span>
                ))}
              </div>
            </div>
          )}
          {updatedData.otherService && (
            <div>
              <h4 className="font-medium text-gray-800">Other Services</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{updatedData.otherService}</p>
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









// const ServicesSection = ({ profile }: { profile: any }) => {
//     return (
//       <div>
//         <h2 className="text-lg font-semibold mb-2">Services</h2>
//         {profile.serviceRequirements?.length > 0 && (
//           <>
//             <h4 className="font-medium">Service Requirements:</h4>
//             <ul className="list-disc list-inside mb-2">
//               {profile.serviceRequirements.map((service: string, i: number) => (
//                 <li key={i}>{service}</li>
//               ))}
//             </ul>
//           </>
//         )}
//         {profile.securityServicesOfferings?.length > 0 && (
//           <>
//             <h4 className="font-medium">Security Services Offerings:</h4>
//             <ul className="list-disc list-inside">
//               {profile.securityServicesOfferings.map((offering: string, i: number) => (
//                 <li key={i}>{offering}</li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//     );
//   };
  
//   export default ServicesSection;
  