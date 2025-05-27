import React, { useState } from "react";
import Section from "./Section";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "@/utils/path";

const AboutSection = ({ about, id }: { about: any; id: any }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    aboutMe: about?.aboutMe || "",
    experience: about?.experience || "",
    qualifications: about?.qualifications || "",
  });

  const [updatedData, setUpdatedData] = useState({ ...formData });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        profileData:{
        ...updatedData,
        ...formData,
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
      setIsEditing(false);
      toast.success("About section updated successfully");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update about section.";
      toast.error(message);
    }
  };

  const handleCancel = () => {
    setFormData({ ...updatedData });
    setIsEditing(false);
  };

  return (
    (about?.aboutMe || about?.experience || about?.qualifications) && (
      <Section
        title={
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">About</h2>
          </div>
        }
      >
        <div className="space-y-4 text-gray-700">
          {isEditing ? (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About Me
                  </label>
                  <textarea
                    name="aboutMe"
                    value={formData.aboutMe}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded text-gray-700"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded text-gray-700"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qualifications
                  </label>
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded text-gray-700"
                    rows={3}
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
              {updatedData.aboutMe && (
                <div>
                  <h4 className="font-medium text-gray-800">About Me</h4>
                  <p>{updatedData.aboutMe}</p>
                </div>
              )}
              {updatedData.experience && (
                <div>
                  <h4 className="font-medium text-gray-800">Experience</h4>
                  <p>{updatedData.experience}</p>
                </div>
              )}
              {updatedData.qualifications && (
                <div>
                  <h4 className="font-medium text-gray-800">Qualifications</h4>
                  <p>{updatedData.qualifications}</p>
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
        </div>
      </Section>
    )
  );
};

export default AboutSection;
