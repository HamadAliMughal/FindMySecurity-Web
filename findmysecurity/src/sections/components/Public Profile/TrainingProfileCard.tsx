import React, { useState } from "react";
import Image from "next/image";
import img from "../../../../public/images/training.jpg"; // Placeholder for training provider logo
import { FiMail, FiPhone, FiChevronDown, FiChevronUp, FiLock, FiGlobe } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  AiFillFilePdf,
  AiFillFileImage,
  AiFillFileWord,
  AiFillFileExcel,
  AiFillFilePpt,
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
  const isEmailField = label === "Email";
  const isWebsiteField = label === "Website";
  const isSpecialField = isWhatsAppField || isCallField || isEmailField || isWebsiteField;

  // Different background colors for clickable fields
  const bgColor = isWhatsAppField
    ? "bg-green-500 hover:bg-green-600"
    : isCallField
    ? "bg-indigo-500 hover:bg-indigo-600"
    : isEmailField
    ? "bg-blue-500 hover:bg-blue-600"
    : isWebsiteField
    ? "bg-gray-500 hover:bg-gray-600"
    : "";

  return (
    <div
      className={`group flex items-start gap-3 ${
        clickable ? `cursor-pointer ${bgColor}` : ""
      } p-3 rounded-lg transition-all`}
      onClick={onClick}
    >
      {showIcon && (
        <div className={`${clickable ? "text-white" : isSpecialField ? "text-white" : "text-gray-800"} mt-0.5`}>
          {isWhatsAppField ? (
            <FaWhatsapp size={18} />
          ) : isCallField ? (
            <FiPhone size={18} />
          ) : isEmailField ? (
            <FiMail size={18} />
          ) : isWebsiteField ? (
            <FiGlobe size={18} />
          ) : (
            <FiMail size={18} />
          )}
        </div>
      )}
      <div>
        <p className={`text-sm font-medium uppercase tracking-wider ${isSpecialField ? "text-white" : "text-gray-500"}`}>
          {label}
        </p>
        {!isSpecialField && (
          <p className={`text-base font-medium break-words ${clickable ? "text-white" : "text-gray-800"}`}>
            {hiddenValue ? "Hidden" : formatValue(value)}
          </p>
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
            <Section key={key} label={formatKey(key)} value={Array.isArray(val) ? val : val?.toString()} />
          )
        )}
      </div>
    </div>
  );
};

const TrainingProfileCard = ({ provider }: { provider: any }) => {
  const {
    companyName,
    contactPerson,
    jobTitle,
    phoneNumber,
    website,
    address,
    servicesRequirements,
    securityServicesOfferings,
    permissions,
    createdAt,
    user,
  } = provider;


  return (
    <div className="max-w-5xl mx-auto my-10 px-6 bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={img.src}
          alt="Providers Logo"
          className="w-32 h-32 rounded-full object-cover border mb-4"
          style={{ width: '120px', height: '120px' }}  // Adjust dimensions as needed
        />

        <h2 className="text-2xl font-semibold text-gray-900">{companyName}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Section label="Contact Person" value={contactPerson} />
        <Section label="Job Title" value={jobTitle} />
        <Section label="Phone" value={phoneNumber} showIcon clickable onClick={() => window.open(`tel:${phoneNumber}`)} />
        <Section label="Chat on Whatsapp" value={phoneNumber} showIcon clickable onClick={() => window.open(`https://wa.me/${phoneNumber}`)} />
        <Section label="Website" value={website} clickable onClick={() => window.open(website, "_blank")} />
        <Section label="Email" value={user?.email} showIcon clickable onClick={() => window.open(`mailto:${user?.email}`)} />
        <Section label="Address" value={address} />
        <Section label="Created At" value={new Date(createdAt)} />
      </div>

      <ProfileGroup title="Training Services Offered" data={{ servicesRequirements }} />
      <ProfileGroup title="Security Services Offered" data={{ securityServicesOfferings }} />
      <ProfileGroup title="Permissions" data={permissions} />

      {/* {documents.length > 0 && <DocumentsSection documents={documents} />} */}
    </div>
  );
};

export default TrainingProfileCard;
