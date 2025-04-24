"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaMobileAlt,
  FaHome,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface ActionButtonsProps {
  loginData: any;
  roleId: number;
  updateProfile: (updatedData: any) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  loginData,
  roleId,
  updateProfile,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...loginData });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePhoto(imageUrl);
    }
  };

  const handleSubmit = () => {
    updateProfile(formData); // Pass form data to the parent function
    setIsEditing(false); // Optionally disable editing mode after saving
  };

  const handleCancel = () => {
    setFormData({ ...loginData });
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Profile & Header */}
      <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6">
        <div
          className="w-28 h-28 rounded-full shadow-lg shadow-gray-400 hover:scale-105 transition-transform duration-300 relative"
          style={{
            backgroundImage: `url(${
              profilePhoto ||
              loginData?.individualProfessional?.profilePhoto ||
              "/images/profile.png"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {isEditing && (
             <>
             <input
               id="profilePhoto"
               type="file"
               accept="image/*"
               onChange={handleImageChange}
               className="hidden"
             />
             <label
               htmlFor="profilePhoto"
               className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-70 text-white text-xs py-1 cursor-pointer rounded-b-lg hover:bg-opacity-90 transition"
             >
               Upload Image
             </label>
           </>
          )}
        </div>
        <div className="text-center md:text-left mt-4 md:mt-0 space-y-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            {formData?.firstName && formData?.lastName
              ? `${formData.firstName} ${formData.lastName}`
              : "Mr. Y"}
          </h2>
          <h2 className="text-xl text-gray-600">
            {formData?.screenName ?? "Mr."}
          </h2>
          <p className="text-gray-500">
            {loginData?.role?.name ?? loginData?.role ?? "Security Officer"}
          </p>
          <span className="text-sm text-yellow-500">
            ✅ Usually responds within 1 hour
          </span>
        </div>
      </div>

      {/* 2-1-2-1 layout */}
      <div className="flex flex-wrap mt-6 gap-4">
        {/* Row 1: 2 fields */}
        <div className="w-full md:w-[48%]">
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            size="small"
          />
        </div>
        <div className="w-full md:w-[48%]">
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            size="small"
          />
        </div>

        {/* Row 2: 1 field */}
        <div className="w-full">
          <TextField
            label="Screen Name"
            name="screenName"
            value={formData.screenName || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            size="small"
          />
        </div>

        {/* Row 3: 2 fields */}
        <div className="w-full md:w-[48%]">
          <TextField
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            size="small"
          />
        </div>
        <div className="w-full md:w-[48%]">
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            size="small"
          />
        </div>

        {/* Row 4: 1 field */}
        <div className="w-full">
          <TextField
            label="Address"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            size="small"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col md:flex-row gap-3">
        {isEditing ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              sx={{ bgcolor: "black", ":hover": { bgcolor: "#333" } }}
            >
              Save Profile
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              fullWidth
              sx={{ color: "black", borderColor: "black" }}
            >
              Back
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            fullWidth
            variant="contained"
            sx={{ bgcolor: "black", ":hover": { bgcolor: "#333" } }}
          >
            Update Profile
          </Button>
        )}
      </div>

      {!isEditing && (
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: "#f97316", ":hover": { bgcolor: "#ea580c" } }}
        >
          Upgrade My Membership
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
