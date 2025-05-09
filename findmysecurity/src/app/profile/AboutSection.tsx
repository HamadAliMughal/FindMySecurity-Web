import React, { useState } from "react";
import Section from "./Section";
import toast from "react-hot-toast";

const AboutSection = ({ about }: { about: any }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    aboutMe: about?.aboutMe || "",
    experience: about?.experience || "",
    qualifications: about?.qualifications || "",
  });

  const [updatedData, setUpdatedData] = useState({ ...formData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUpdatedData({ ...formData });
    toast.success("About section updated successfully");
    setIsEditing(false);
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
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm px-3 py-1 ml-125 bg-black text-white rounded hover:bg-gray-800"
              >
                Edit
              </button>
            )}
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
            </>
          )}
        </div>
      </Section>
    )
  );
};

export default AboutSection;
