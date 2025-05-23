import React, { useState } from "react";
import Section from "./Section";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "@/utils/path";

const ContactSection = ({ profile, id }: { profile: any; id: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    address: profile?.address || "",
    postCode: profile?.postCode || "",
    phoneNumber: profile?.phoneNumber || "",
    website: profile?.website || "",
  });

  const [updatedData, setUpdatedData] = useState({ ...formData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
      if (!token) return toast.error("Authorization token not found.");

      const payload = {
        profileData: { ...formData },
      };

      await axios.put(`${API_URL}/profile/individual/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUpdatedData({ ...formData });
      toast.success("Contact information updated successfully");
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update contact info.");
    }
  };

  const handleCancel = () => {
    setFormData({ ...updatedData });
    setIsEditing(false);
  };

  return (
    <Section title={<h2 className="text-lg font-semibold">Contact</h2>}>
      {isEditing ? (
        <>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Post Code</label>
              <input
                type="text"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
            <button onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </>
      ) : (
        <>
          {updatedData.address && (
            <p><strong>Address:</strong> {updatedData.address}</p>
          )}
          {updatedData.postCode && (
            <p><strong>Post Code:</strong> {updatedData.postCode}</p>
          )}
          {updatedData.phoneNumber && (
            <p><strong>Phone Number:</strong> {updatedData.phoneNumber}</p>
          )}
          {updatedData.website && (
            <p>
              <strong>Website:</strong>{" "}
              <a href={updatedData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-words">
                {updatedData.website}
              </a>
            </p>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="bg-black text-white px-4 py-2 rounded mt-4 hover:bg-gray-800"
          >
            Edit
          </button>
        </>
      )}
    </Section>
  );
};

export default ContactSection;






// const ContactSection = ({ profile }: { profile: any }) => (
//     <div>
//       <h2 className="text-lg font-semibold mb-2">Contact</h2>
//       <p><strong>Address:</strong> {profile.address}</p>
//       <p><strong>Post Code:</strong> {profile.postCode}</p>
//       <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
//       <p><strong>Website:</strong> {profile.website}</p>
//     </div>
//   );
  
//   export default ContactSection;
  