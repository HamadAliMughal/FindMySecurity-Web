import React, { useState } from "react";
import Section from "./Section";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "@/utils/path";

const ContactSection = ({ contact , id}: { contact: any , id : any}) => {
  if (!contact) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    homeTelephone: contact?.homeTelephone || "",
    mobileTelephone: contact?.mobileTelephone || "",
    website: contact?.website || "",
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
        profileData: {
          homeTelephone: formData.homeTelephone,
          mobileTelephone: formData.mobileTelephone,
          website: formData.website,
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
      toast.success("Contact information updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update contact info.";
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
          <h2 className="text-lg font-semibold">Contact</h2>
        </div>
      }
    >
      {isEditing ? (
        <>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Telephone</label>
              <input
                type="text"
                name="homeTelephone"
                value={formData.homeTelephone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Telephone</label>
              <input
                type="text"
                name="mobileTelephone"
                value={formData.mobileTelephone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-700"
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
          {(updatedData.homeTelephone || updatedData.mobileTelephone) && (
            <div>
              <h4 className="font-medium">Phone Numbers</h4>
              {updatedData.homeTelephone && <p>Home: {updatedData.homeTelephone}</p>}
              {updatedData.mobileTelephone && <p>Mobile: {updatedData.mobileTelephone}</p>}
            </div>
          )}
          {updatedData.website && (
            <div>
              <h4 className="font-medium">Website</h4>
              <a
                href={updatedData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {updatedData.website}
              </a>
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

export default ContactSection;
