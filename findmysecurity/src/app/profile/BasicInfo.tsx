import React, { useState } from "react";
import Section from "./Section";
import toast from "react-hot-toast";


const BasicInfo = ({ profileData }: { profileData: any }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    profileHeadline: profileData.basicInfo?.profileHeadline || "",
    gender: profileData.basicInfo?.gender || "",
    postcode: profileData.basicInfo?.postcode || "",
    hourlyRate: profileData.fees?.hourlyRate || "",
  });

  const [updatedData, setUpdatedData] = useState({ ...formData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUpdatedData({ ...formData });
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...updatedData });
    setIsEditing(false);
  };

  const profilePhoto = profileData.profilePhoto;

  return (
    (profileData.basicInfo || profilePhoto) && (
      <Section
        title={
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm px-3 py-1 ml-100 bg-black text-white rounded hover:bg-gray-800"
              >
                Edit
              </button>
            )}
          </div>
        }
      >
        <div className="flex items-start gap-6 mt-2">
          {profilePhoto && (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border shadow-sm"
            />
          )}

          <div className="flex-1 space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Headline
                    </label>
                    <input
                      type="text"
                      name="profileHeadline"
                      value={formData.profileHeadline}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded text-gray-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hourly Rate ($/hr)
                      </label>
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded text-gray-700"
                      />
                    </div>
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
                {updatedData.profileHeadline && (
                  <p className="text-gray-700 italic">{updatedData.profileHeadline}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  {updatedData.gender && (
                    <p>
                      <span className="font-medium">Gender:</span> {updatedData.gender}
                    </p>
                  )}
                  {updatedData.postcode && (
                    <p>
                      <span className="font-medium">Location:</span> {updatedData.postcode}
                    </p>
                  )}
                  {updatedData.hourlyRate && (
                    <p>
                      <span className="font-medium">Rate:</span> ${updatedData.hourlyRate}/hr
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Section>
    )
  );
};

export default BasicInfo;
