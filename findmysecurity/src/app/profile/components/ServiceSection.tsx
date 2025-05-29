import React, { useState, useEffect } from "react";
import Section from "./Section";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "@/utils/path";
import Select from 'react-select';
import securityServices from '@/sections/data/secuirty_services.json';
import trainingProviders from '@/sections/data/training_providers.json';
import securityProfessionals from '@/sections/data/secuirty_professional.json';

interface ServiceOption {
  value: string;
  label: string;
  group: string;
}

const ServicesSection = ({ services, id }: { services: any; id: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [roleId, setRoleId] = useState<number>(0);

  useEffect(() => {
    const storedData = localStorage.getItem("loginData");
    const parsedData = storedData ? JSON.parse(storedData) : null;
    const currentRoleId = parsedData?.role?.id || parsedData?.roleId || 0;
    setRoleId(currentRoleId);
  }, []);

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
  }, [roleId]);

  if (!services) return null;

  const selectedValues = services?.selectedServices?.map((service: string) => {
    const option = serviceOptions.find(opt => opt.value === service);
    return {
      value: service,
      label: service,
      group: option?.group || ''
    };
  }) || [];

  const [formData, setFormData] = useState({
    selectedServices: selectedValues,
    otherService: services?.otherService || "",
  });

  const [updatedData, setUpdatedData] = useState({ ...formData });

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
      if (!token) {
        toast.error("Authorization token not found.");
        return;
      }

      const payload = {
        profileData: {
          selectedServices: formData.selectedServices.map((service: ServiceOption) => service.value),
          otherService: formData.otherService,
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
      toast.success("Services updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update services.";
      toast.error(message);
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
                Specializations (comma-separated)
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
              <h4 className="font-medium text-gray-800 mb-2">Specializations</h4>
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
              <p className="text-gray-700">{updatedData.otherService}</p>
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
