import React from "react";
import img from '../../../../public/images/profile.png';
const Section = ({ label, value }: any) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800 break-words">{value || "N/A"}</p>
  </div>
);

const ProfileGroup = ({ title, data }: any) => {
  if (!data || Object.keys(data).length === 0) return null;
  return (
    <div className="mt-8 bg-gray-50 rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{title}</h3>
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

const formatKey = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, str => str.toUpperCase())
    .replace(/_/g, " ");

const AvailabilityTable = ({ schedule }: any) => {
  const timeSlots = ["Morning", "Afternoon", "Evening", "Overnight"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="overflow-auto mt-4 rounded-lg border border-gray-200">
      <table className="min-w-full text-sm text-center">
        <thead className="bg-gray-100 text-gray-700 font-medium">
          <tr>
            <th className="px-4 py-2 text-left">Time Slot</th>
            {days.map(day => (
              <th key={day} className="px-3 py-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(slot => (
            <tr key={slot} className="border-t">
              <td className="px-4 py-2 text-left font-medium text-gray-700">{slot}</td>
              {days.map(day => (
                <td
                  key={day}
                  className={`px-3 py-2 ${
                    schedule?.[slot]?.[day]
                      ? "bg-green-100 text-green-700"
                      : "text-gray-400"
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

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (!ext) return "📁";

  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "🖼️";
  if (["pdf"].includes(ext)) return "📄";
  if (["doc", "docx"].includes(ext)) return "📝";
  if (["xls", "xlsx"].includes(ext)) return "📊";
  if (["ppt", "pptx"].includes(ext)) return "📽️";
  return "📁";
};

const DocumentsSection = ({ documents }: { documents: string[] }) => {
  if (!documents || documents.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documents.map((docUrl, index) => {
          const fileName = docUrl.split("/").pop() || `Document ${index + 1}`;
          const docName = fileName
            .split("-")
            .slice(1)
            .join(" ")
            .replace(/\.[^/.]+$/, "");

          const icon = getFileIcon(fileName);
          const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(fileName);

          return (
            <div
              key={index}
              className="p-4 rounded-md bg-gray-50 shadow-sm hover:shadow-md transition"
            >

              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-black font-medium"
              >
                {icon} {docName}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const UserProfileCard = ({ user }: any) => {
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
    user?.individualProfessional?.profileData ||
    user?.additionalData?.profileData ||
    user?.profile ||
    {};

  const profilePhoto = profileData?.profilePhoto;
  const documents = profileData?.documents;

  return (
    <div className="max-w-5xl mx-auto my-10 px-6  bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center  bg-white rounded-lg shadow p-6">
        <img
          src={profilePhoto || img.src}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">{firstName} {lastName}</h2>
        <p className="text-gray-600">{role}</p>
        {profileData?.basicInfo?.profileHeadline && (
          <p className="text-gray-500 text-sm mt-1">
            {profileData.basicInfo.profileHeadline}
          </p>
        )}
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 mt-10  bg-white rounded-lg shadow p-6">
        <Section label="Email" value={email} />
        <Section label="Phone Number" value={phoneNumber} />
        <Section label="Date of Birth" value={dateOfBirth} />
        <Section label="Address" value={address} />
        <Section label="Postcode" value={postcode} />
        <Section label="Screen Name" value={screenName} />
        <Section label="Account Created" value={new Date(createdAt).toLocaleString()} />
        <Section label="Last Updated" value={new Date(updatedAt).toLocaleString()} />
      </div>

      {/* Profile Groups */}
   
      <ProfileGroup title="Basic Info" data={profileData?.basicInfo} />
      <ProfileGroup title="About" data={profileData?.about} />
      <ProfileGroup title="Fees" data={profileData?.fees} />
      <ProfileGroup title="Contact Info" data={profileData?.contact} />
      <ProfileGroup title="Services" data={profileData?.services} />
    

      {/* Availability */}
      {profileData?.availability?.weeklySchedule && (
        <div className="mt-10  bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Availability</h3>
          <p className="text-sm text-gray-600 mb-2">
            {profileData.availability.description || "Weekly schedule:"}
          </p>
          <AvailabilityTable schedule={profileData.availability.weeklySchedule} />
        </div>
      )}

      {/* Documents */}
      <DocumentsSection documents={documents} />

      {/* Permissions */}
      <ProfileGroup
        title="Permissions"
        data={user?.individualProfessional?.permissions || user?.permissions}
      />
    </div>
  );
};

export default UserProfileCard;
