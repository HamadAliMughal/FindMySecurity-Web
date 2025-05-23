import React, { useState } from "react";
import Section from "./Section";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "@/utils/path";

type Props = {
  profile: any;
  userId: number;
};

const BasicInfo: React.FC<Props> = ({ profile, userId }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    companyName: profile?.companyName || "",
    contactPerson: profile?.contactPerson || "",
    jobTitle: profile?.jobTitle || "",
    registrationNumber: profile?.registrationNumber || "",
  });

  const [updatedData, setUpdatedData] = useState({ ...formData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          ...formData,
        },
      };

      await axios.put(
        `${API_URL}/profile/${userId}`, // You can adjust the path to match your company/course/security profile route
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUpdatedData({ ...formData });
      setIsEditing(false);
      toast.success("Basic info updated successfully");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "An error occurred while saving.";
      toast.error(message);
    }
  };

  const handleCancel = () => {
    setFormData({ ...updatedData });
    setIsEditing(false);
  };

  return (
    profile && (
      <Section
        title={
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Basic Information</h2>
          </div>
        }
      >
        <div className="space-y-4 text-gray-700">
          {isEditing ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Person</label>
                  <input
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Registration Number</label>
                  <input
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded text-gray-700"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                <p>
                  <strong>Company:</strong> {updatedData.companyName || "N/A"}
                </p>
                <p>
                  <strong>Contact Person:</strong> {updatedData.contactPerson || "N/A"}
                </p>
                <p>
                  <strong>Job Title:</strong> {updatedData.jobTitle || "N/A"}
                </p>
                <p>
                  <strong>Registration Number:</strong> {updatedData.registrationNumber || "N/A"}
                </p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm px-5 py-2 mt-5 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </Section>
    )
  );
};

export default BasicInfo;






// type Props = {
//   profile: any;
//   userId: number;
// };

// const BasicInfo: React.FC<Props> = ({ profile }) => {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-2">Basic Info</h2>
//       <p><strong>Company:</strong> {profile.companyName}</p>
//       <p><strong>Contact Person:</strong> {profile.contactPerson}</p>
//       <p><strong>Job Title:</strong> {profile.jobTitle}</p>
//       <p><strong>Registration Number:</strong> {profile.registrationNumber}</p>
//     </div>
//   );
// };

// export default BasicInfo;
