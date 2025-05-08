import React,{useState} from "react";
import img from '../../../../public/images/profile.png';
import { FiMail, FiPhone, FiMessageSquare} from "react-icons/fi";
import { FileText, Award, CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ProfessionalIcons from "./ProfessionalIcons";
import { FiChevronDown, FiChevronUp, FiDownload, FiSend, FiLock } from "react-icons/fi";
import {
  AiFillFilePdf,
  AiFillFileImage,
  AiFillFileWord,
  AiFillFileExcel,
  AiFillFilePpt,
  AiFillFileText,
} from "react-icons/ai";

interface SectionProps {
  label: string;
  value?: string | number | Date | any[] | null | undefined;
  onClick?: () => void;
  clickable?: boolean;
  hiddenValue?: boolean;
  showIcon?: boolean;
}

const Section = ({
  label,
  value,
  onClick,
  clickable,
  hiddenValue,
  showIcon,
}: SectionProps) => {
  const formatValue = (val: any): string => {
    if (val === null || val === undefined) return "N/A";
    if (Array.isArray(val)) return val.join(", ");
    if (val instanceof Date) return val.toLocaleString();
    return String(val);
  };

  const isWhatsAppField = label === "Chat on Whatsapp";
  const isCallField = label === "Mobile";
  const fieldColor = isWhatsAppField || isCallField ? "text-white" : "text-white";
  const bgColor = isWhatsAppField
    ? "bg-green-500 hover:bg-green-600"
    : isCallField
    ? "bg-indigo-500 hover:bg-indigo-600"
    : "bg-blue-500 hover:bg-blue-600";

  const displayValue = hiddenValue ? "" : formatValue(value);

  return (
    <div
      className={`group flex items-start gap-3 ${
        clickable ? `cursor-pointer ${bgColor}` : ""
      } p-3 rounded-lg transition-all`}
      onClick={onClick}
    >
      {showIcon && (
        <div className={`${fieldColor} mt-0.5`}>
          {isWhatsAppField ? (
            <FaWhatsapp size={18} style={{ color: "#fff" }} />
          ) : isCallField ? (
            <FiPhone size={18} style={{ color: "#fff" }} />
          ) : (
            <FiMail size={18} style={{ color: "#fff" }} />
          )}
        </div>
      )}
      <div>
        <p
          className={`text-sm font-medium uppercase tracking-wider ${
            isWhatsAppField || label === "Message" || isCallField
              ? "text-white"
              : "text-gray-500"
          }`}
        >
          {label}
        </p>

        <p
          className={`text-base font-medium ${
            clickable ? fieldColor : "text-gray-800"
          } break-words`}
        >
          {displayValue}
        </p>
      </div>
    </div>
  );
};


// const Section = ({ label, value }: any) => (
//   <div>
//     <p className="text-sm text-gray-500">{label}</p>
//     <p className="text-base font-medium text-gray-800 break-words">{value || "N/A"}</p>
//   </div>
// );

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
              value={Array.isArray(val) ? val : val?.toString()}
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
const getFileIcon = (filename?: string) => {
  if (!filename || typeof filename !== "string") return <AiFillFileText className="text-gray-400" size={28} />;
  const ext = filename.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext!)) return <AiFillFileImage className="text-pink-500" size={28} />;
  if (["pdf"].includes(ext!)) return <AiFillFilePdf className="text-red-500" size={28} />;
  if (["doc", "docx"].includes(ext!)) return <AiFillFileWord className="text-blue-500" size={28} />;
  if (["xls", "xlsx"].includes(ext!)) return <AiFillFileExcel className="text-green-600" size={28} />;
  if (["ppt", "pptx"].includes(ext!)) return <AiFillFilePpt className="text-orange-500" size={28} />;
  return <AiFillFileText className="text-gray-400" size={28} />;
};
// Function to extract document name after the "-" sign
const getDocumentNameFromUrl = (url: string) => {
  const parts = url.split('/');
  const fileNameWithExt = decodeURIComponent(parts.pop() || "Unnamed Document");
  
  // Split the file name by "-" and take the part after the first "-"
  const namePart = fileNameWithExt.split('-').slice(1).join('-').split('.').slice(0, -1).join('.');
  return namePart || 'Unnamed Document';
};

// const getFileIcon = (filename: string) => {
//   const ext = filename.split('.').pop()?.toLowerCase();
//   if (!ext) return "📁";

//   if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "🖼️";
//   if (["pdf"].includes(ext)) return "📄";
//   if (["doc", "docx"].includes(ext)) return "📝";
//   if (["xls", "xlsx"].includes(ext)) return "📊";
//   if (["ppt", "pptx"].includes(ext)) return "📽️";
//   return "📁";
// };
const DocumentsSection = ({
  documents,
}: {
  documents: string[]; // Change to string array because documents are URLs
}) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAll, setShowAll] = useState(false);

  if (!documents || documents.length === 0) return null;

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setVisibleCount(showAll ? 3 : documents.length);
  };

  const displayedDocuments = documents.slice(0, visibleCount);

  return (
    <div className="mt-10 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-800">My Documents</h3>
          <div className="flex items-center text-sm text-gray-500">
            <FiLock className="mr-1.5" size={14} />
            <span>Secure Documents</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          This member has provided us with electronic copies of the following documents. These copies are held on file unless specified as deleted. The documents have been certified by the member as being true and accurate. We recommend you ask to see original copies of the documents before you hire them in order verify the true accuracy for yourself.
        </p>

        <div className="space-y-3">
          {displayedDocuments.map((url, index) => {
            const documentName = getDocumentNameFromUrl(url); // Get the document name from the URL
            return (
              <div
                key={index}
                className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
              >
                <div className="flex items-center">
                  {getFileIcon(documentName)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-800">
                        {/* {documentName} */}
                        <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* <FiDownload size={14} /> */}
                      {documentName}
                    </a>
                      <FiLock className="ml-2 text-gray-400" size={14} />
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                    added 
                  </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {documents.length > 3 && (
          <button
            onClick={toggleShowAll}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            {showAll ? (
              <>
                <FiChevronUp className="mr-1.5" />
                Show less
              </>
            ) : (
              <>
                <FiChevronDown className="mr-1.5" />
                Show more
              </>
            )}
          </button>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <button className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm">
          <FiLock className="text-blue-100" size={16} />
          <span>Request Document Access</span>
        </button>
      </div>
    </div>
  );
};
// const DocumentsSection = ({ documents }: { documents: string[] }) => {
//   if (!documents || documents.length === 0) return null;

//   return (
//     <div className="mt-10">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {documents.map((docUrl, index) => {
//           const fileName = docUrl.split("/").pop() || `Document ${index + 1}`;
//           const docName = fileName
//             .split("-")
//             .slice(1)
//             .join(" ")
//             .replace(/\.[^/.]+$/, "");

//           const icon = getFileIcon(fileName);
//           const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(fileName);

//           return (
//             <div
//               key={index}
//               className="p-4 rounded-md bg-gray-50 shadow-sm hover:shadow-md transition"
//             >

//               <a
//                 href={docUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-center text-black font-medium"
//               >
//                 {icon} {docName}
//               </a>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };


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
      <div className="flex flex-col items-left text-left  bg-white rounded-lg shadow p-6">
        <div className="flex flex-row">
        <div>
        <img
          src={profilePhoto || img.src}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border mb-4"
        />
        <ProfessionalIcons/>
        </div>

        <div className="mx-6 my-4">
        <h2 className="text-2xl font-bold text-gray-800">{firstName} {lastName}</h2>
        <p className="text-gray-600">{role}</p>
        {profileData?.basicInfo?.profileHeadline && (
          <p className="text-gray-500 text-sm mt-1">
            {profileData.basicInfo.profileHeadline}
          </p>
        )}
              <div className="flex flex-col sm:flex-row mt-6 gap-3">
              <Section 
          label="Chat on Whatsapp" 
          value={phoneNumber}
          onClick={() => window.open(`https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}`, '_blank')}
          clickable
          hiddenValue
          showIcon
        />
      
        <Section 
  label="Mobile"
  value={phoneNumber}
  onClick={() => window.location.href = `tel:${phoneNumber}`}
  clickable
  hiddenValue
  showIcon
/>
<Section 
          label="Message" 
          value={email}
          onClick={() => window.location.href = `mailto:${email}`}
          clickable
          hiddenValue
          showIcon
        />
      </div>
        </div>
       
        </div>
        

        
              {/* Contact Info */}

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 mt-10  bg-white rounded-lg shadow p-6">
        {/* <Section label="Email" value={email} />
        <Section label="Phone Number" value={phoneNumber} /> */}
        
     
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
