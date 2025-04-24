"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import "../globals.css";
import ActionButtons from "./ActionButtons";
import ProfileMenu from "./ProfileMenu";
import WeeklySchedule from "./WeeklySchedule";

const UserProfile: React.FC = () => {
  const [loginData, setLoginData] = useState<any>(null);
  const router = useRouter();
  const [roleId, setRoleId] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData1 = localStorage.getItem("loginData") || localStorage.getItem("profileData");
      const data1 = storedData1 ? JSON.parse(storedData1) : null; 
      const currentId = data1?.id;
      try {
        const response = await fetch(
          `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/auth/get-user/${currentId}`
        );
  
        if (!response.ok) throw new Error("User not authenticated");
  
        const data = await response.json();
  
        const roleId = data?.role?.id || data?.roleId;
        setRoleId(roleId);
        localStorage.setItem("loginData", JSON.stringify(data));
        setLoginData(data);
  
        // Public profile check for roleId 3
        if (
          roleId === 3 &&
          !(data?.user?.individualProfessional || data?.individualProfessional)
        ) {
          const interval = setInterval(() => {
            if (window.confirm("Make your public profile?")) {
              router.push("/public-profile");
            }
          }, 5000);
  
          return () => clearInterval(interval);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/"); // Redirect if not logged in
      }
    };
  
    fetchUserData();
  }, [router]);
  
  const updateProfile = async (updatedData: any) => {
    try {
      const storedData1 = localStorage.getItem("loginData") || localStorage.getItem("profileData");
      const data = storedData1 ? JSON.parse(storedData1) : null;
  
      const currentRoleId = data?.role?.id || data?.roleId;
  
      // Ensure we include updated values in the request body
      const updatedProfileData = {
        ...data,
        ...updatedData, // Merge updated values from the form
      };
  
      const response = await fetch(
        `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/profile/individual/${currentRoleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profileData: updatedProfileData, // Send updated data
          }),
        }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          alert("Profile updated successfully!");
          localStorage.setItem("loginData", JSON.stringify(updatedProfileData)); // Save updated data
        } else {
          alert("Failed to update profile.");
        }
      } else {
        throw new Error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };
  

  if (!loginData) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <button
        className="absolute top-4 left-4 mt-20 z-2 flex items-center text-gray-600 hover:text-black"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
      </button>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 relative mt-12 md:mt-16">
        <ActionButtons 
          loginData={loginData} 
          roleId={roleId} 
          updateProfile={updateProfile} 
        />

        <ProfileMenu roleId={roleId} />

        <WeeklySchedule roleId={roleId} loginData={loginData} />
       
      </div>
    </div>
  );
};

export default UserProfile;




