"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  FaMobileAlt,
  FaHome,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";

interface ActionButtonsProps {
  loginData: any;
  roleId: number;
  updateProfile: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  loginData,
  roleId,
  updateProfile,
}) => {
  const router = useRouter();

  return (
    <>
    <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6">
              <div
                className="w-28 h-28 rounded-full shadow-lg shadow-gray-400 hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage: `url(${loginData?.individualProfessional?.profilePhoto || "/images/profile.png"})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {loginData?.firstName && loginData?.lastName
                    ? `${loginData.firstName} ${loginData.lastName}`
                    : "Mr. Y"}
                </h2>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {loginData?.screenName ?? "Mr."}
                </h2>
                <p className="text-gray-500">
                  {loginData?.role?.name ?? "Security Officer"}
                </p>
                <span className="text-sm text-yellow-500">
                  ✅ Usually responds within 1 hour
                </span>
              </div>
            </div>
    
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
              {["Industry", "Member since Jan 2016", "Last Updated Jan 2025", "Last Login 28 Jan 2025"].map(
                (info, index) => (
                  <span key={index} className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    {info}
                  </span>
                )
              )}
            </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">
          <FaMobileAlt className="mr-2" /> {loginData?.phoneNumber ?? "Mobile"}
        </button>
        <div className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
          <FaHome className="mr-2" />
          <span className="truncate">
            {loginData?.address ?? loginData?.role?.address ?? "Home"}
          </span>
        </div>
        <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
          <FaEnvelope className="mr-2" />
          <span className="truncate">{loginData?.email ?? "Email"}</span>
        </button>
        {roleId === 3 && !loginData?.individualProfessional && (
          <button
            className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
            onClick={() => router.push("/public-profile")}
          >
            <FaBriefcase className="mr-2" /> Create Public Profile
          </button>
        )}

        {roleId === 4 || roleId === 6 || roleId === 5 || roleId === 7 ? (
          <button
            className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
            onClick={() => router.push("/job-posting")}
          >
            <FaBriefcase className="mr-2" /> Post a Job
          </button>
        ) : (
          <>
            {roleId !== 3 ? (
              <button
                className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
                onClick={() => router.push("/view-job")}
              >
                <FaBriefcase className="mr-2" /> Hire Professional
              </button>
            ) : (
              <button
                className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
                onClick={() => router.push("/view-ads")}
              >
                <FaBriefcase className="mr-2" /> View Job Ads
              </button>
            )}
          </>
        )}
        <button
          className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
          onClick={updateProfile}
        >
          <FaBriefcase className="mr-2" /> Update Profile
        </button>
      </div>

      <button className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600">
        Upgrade My Membership
      </button>
    </>
  );
};

export default ActionButtons;