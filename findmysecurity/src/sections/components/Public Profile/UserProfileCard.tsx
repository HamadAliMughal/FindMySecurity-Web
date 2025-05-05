import React from "react";

const Section = ({ label, value }:any) => (
  <div className="mb-3">
    <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
    <p className="text-base font-semibold break-words">{value || "N/A"}</p>
  </div>
);

const ProfileGroup = ({ title, data }:any) => {
  if (!data || Object.keys(data).length === 0) return null;
  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, val]) =>
          typeof val === "object" && !Array.isArray(val) ? (
            <ProfileGroup key={key} title={formatKey(key)} data={val} />
          ) : (
            <Section
              key={key}
              label={formatKey(key)}
              value={Array.isArray(val) ? val.join(", ") : val}
            />
          )
        )}
      </div>
    </div>
  );
};

const formatKey = (key:any) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str:any) => str.toUpperCase())
    .replace(/_/g, " ");

const AvailabilityTable = ({ schedule }:any) => {
  const timeSlots = ["Morning", "Afternoon", "Evening", "Overnight"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="overflow-auto mt-6">
      <table className="min-w-full border-collapse border border-gray-300 text-sm text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-2 text-left">Time Slot</th>
            {days.map(day => (
              <th key={day} className="border px-2 py-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(slot => (
            <tr key={slot}>
              <td className="border px-2 py-1 font-medium text-left">{slot}</td>
              {days.map(day => (
                <td
                  key={day}
                  className={`border px-2 py-1 ${
                    schedule?.[slot]?.[day] ? "bg-green-100 text-green-700" : "text-gray-400"
                  }`}
                >
                  {schedule?.[slot]?.[day] ? "✓" : "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserProfileCard = ({ user }:any) => {
  const {
    email,
    firstName,
    lastName,
    screenName,
    phoneNumber,
    dateOfBirth,
    address,
    postcode,
    role,
    createdAt,
    updatedAt
  } = user;

  const profileData =
    user?.individualProfessional?.profileData || user?.additionalData?.profileData || user?.profile || {};

  const profilePhoto = profileData?.basicInfo?.profilePhoto;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white rounded-lg shadow p-6">
        <img
          src={profilePhoto || "/placeholder-profile.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{firstName} {lastName}</h2>
          <p className="text-gray-600 text-sm">{role}</p>
          <p className="text-gray-500 text-sm mt-2">{profileData?.basicInfo?.profileHeadline}</p>
        </div>
      </div>

      {/* Contact + Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <Section label="Email" value={email} />
        <Section label="Phone Number" value={phoneNumber} />
        <Section label="Date of Birth" value={dateOfBirth} />
        <Section label="Address" value={address} />
        <Section label="Postcode" value={postcode} />
        <Section label="Screen Name" value={screenName} />
        <Section label="Account Created" value={new Date(createdAt).toLocaleString()} />
        <Section label="Last Updated" value={new Date(updatedAt).toLocaleString()} />
      </div>

      {/* Profile Sections */}
      <ProfileGroup title="Basic Info" data={profileData?.basicInfo} />
      <ProfileGroup title="About" data={profileData?.about} />
      <ProfileGroup title="Fees" data={profileData?.fees} />
      <ProfileGroup title="Contact Info" data={profileData?.contact} />
      <ProfileGroup title="Services" data={profileData?.services} />

      {profileData?.availability?.weeklySchedule && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Availability</h3>
          <p className="text-sm text-gray-600 mb-4">
            {profileData?.availability?.description || "Availability details below:"}
          </p>
          <AvailabilityTable schedule={profileData.availability.weeklySchedule} />
        </div>
      )}

      <ProfileGroup title="Permissions" data={user?.individualProfessional?.permissions || user?.permissions} />
    </div>
  );
};

export default UserProfileCard;
