import React, { useState } from "react";
import img from '../../../../public/images/company.jpg';
import { FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";
import { FileText, Award, CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import CompanyIcons from "./ProfessionalIcons";
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
  const isCallField = label === "Phone";
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
            isWhatsAppField || isCallField ? "text-white" : "text-gray-500"
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

const getDocumentNameFromUrl = (url: string) => {
  const parts = url.split('/');
  const fileNameWithExt = decodeURIComponent(parts.pop() || "Unnamed Document");
  const namePart = fileNameWithExt.split('-').slice(1).join('-').split('.').slice(0, -1).join('.');
  return namePart || 'Unnamed Document';
};

const DocumentsSection = ({
  documents,
}: {
  documents: string[];
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
          <h3 className="text-xl font-semibold text-gray-800">Company Documents</h3>
          <div className="flex items-center text-sm text-gray-500">
            <FiLock className="mr-1.5" size={14} />
            <span>Secure Documents</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          These are the documents that the company has uploaded. These copies are held on file unless specified as deleted. We recommend you verify the original copies before proceeding.
        </p>

        <div className="space-y-3">
          {displayedDocuments.map((url, index) => {
            const documentName = getDocumentNameFromUrl(url);
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
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {documentName}
                        </a>
                      </span>
                      <FiLock className="ml-2 text-gray-400" size={14} />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">added</span>
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

const CompanyProfileCard = ({ company }: any) => {
  const {
    companyName,
    phoneNumber,
    email,
    companyDescription,
    address,
    registrationNumber,
    servicesRequirements,
    securityServicesOfferings,
    website,
    createdAt,
    updatedAt,
    user,
  } = company;

  const profileData = company?.profile || {};
  const profilePhoto = profileData?.profilePhoto;
  // const documents = profileData?.documents;

  return (
    <div className="max-w-5xl mx-auto my-10 px-6 bg-white rounded-lg shadow p-6">
      <div className="flex flex-col items-left text-left bg-white rounded-lg shadow p-6">
        <div className="flex flex-row">
          <div>
            <img
              src={profilePhoto || img.src}
              alt="Company Logo"
              className="w-32 h-32 rounded-full object-cover border mb-4"
            />
            <CompanyIcons />
          </div>

          <div className="mx-6 my-4">
            <h2 className="text-2xl font-bold text-gray-800">{companyName}</h2>
            <p className="text-gray-600">{companyDescription}</p>
            <div className="flex flex-col sm:flex-row mt-6 gap-3">
              <Section
                label="Chat on Whatsapp"
                value="Contact Available"
                onClick={() => window.open(`https://wa.me/${phoneNumber?.replace(/[^\d]/g, '')}`, '_blank')}
                clickable
                hiddenValue
                showIcon
              />
              <Section
                label="Phone"
                value="Contact Available"
                onClick={() => window.location.href = `tel:${phoneNumber}`}
                clickable
                hiddenValue
                showIcon
              />
              <Section
                label="Message"
                value="Contact Available"
                onClick={() => window.location.href = `mailto:${email}`}
                clickable
                hiddenValue
                showIcon
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 mt-10 bg-white rounded-lg shadow p-6">
        <Section label="Company Name" value={companyName} />
        <Section label="Address" value={address} />
        <Section label="Website" value={website} />
        <Section label="Registration Number" value={registrationNumber} />
        <Section label="Contact Person" value={company.contactPerson} />
        <Section label="Job Title" value={company.jobTitle} />
        <Section label="Post Code" value={company.postCode} />
        <Section label="Account Created" value={new Date(createdAt).toLocaleString()} />
        <Section label="Last Updated" value={new Date(updatedAt).toLocaleString()} />
      </div>

      <ProfileGroup 
        title="Services Requirements" 
        data={{ services: servicesRequirements }} 
      />
      
      <ProfileGroup 
        title="Security Services Offerings" 
        data={{ offerings: securityServicesOfferings }} 
      />

      <ProfileGroup title="Permissions" data={company.permissions} />

      {user && (
        <ProfileGroup title="Primary Contact" data={user} />
      )}

      
    </div>
  );
};

export default CompanyProfileCard;