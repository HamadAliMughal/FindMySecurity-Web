"use client";

import React from "react";
import BasicInfo from "./components/other-profiles-details/BasicInfo";
import AboutSection from "./components/other-profiles-details/AboutSection";
import ServicesSection from "./components/other-profiles-details/ServicesSection";
import ContactSection from "./components/other-profiles-details/ContactSection";

const ProfileOverview = ({ profileData, roleId, userId }: { profileData: any; roleId: number; userId: number }) => {
  if (!profileData)
    return <div className="p-6 text-center text-gray-500">No profile data available</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gray-50 rounded-xl">
      <BasicInfo profile={profileData} roleId={roleId} userId={userId} />
      <AboutSection profile={profileData} roleId={roleId} userId={userId}/>
      <ServicesSection profile={profileData} roleId={roleId} userId={userId}/>
      <ContactSection profile={profileData} roleId={roleId} userId={userId}/>
    </div>
  );
};

export default ProfileOverview;
