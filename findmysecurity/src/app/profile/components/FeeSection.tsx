import React, { useState } from "react";
import Section from "./Section";
import toast from "react-hot-toast";
import axios from "axios";
const FeesSection = ({ fees, id }: { fees: any , id: any}) => {
  if (!fees) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    hourlyRate: fees?.hourlyRate || "",
    description: fees?.feesDescription || "",
  });

  const [updatedData, setUpdatedData] = useState({ ...formData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
        profileData:{
        hourlyRate: formData.hourlyRate,
        feesDescription: formData.description,
        },
      };
  
      await axios.put(
        `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/profile/individual/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setUpdatedData({ ...formData });
      toast.success("Fees updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update fees.";
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
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Fees</h2>
          
        </div>
      }
    >
      
      {isEditing ? (
        <>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($/hr)</label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-700"
                rows={4}
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
          {updatedData.hourlyRate && (
            <div className="text-lg font-semibold text-gray-800 mb-2">
              Hourly Rate: ${updatedData.hourlyRate}
            </div>
          )}
          {updatedData.description && <p className="text-gray-700">{updatedData.description}</p>}
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

export default FeesSection;
