"use client";

import React from "react";
import img from "../../../../public/images/profile.png";
import { FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import ClientIcons from "./ProfessionalIcons";

// Define TypeScript interfaces based on API response
interface Permissions {
  acceptTerms: boolean;
  acceptEmails: boolean;
  premiumServiceNeed: boolean;
}

interface CorporateClient {
  id: number;
  companyName: string;
  contactPerson: string;
  jobTitle: string;
  address: string;
  phoneNumber: string;
  postCode: string;
  registrationNumber: string;
  website: string;
  industryType: string[];
  serviceNeeds: string[];
  permissions: Permissions;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  validated: boolean;
  isSubscriber: boolean;
  subscriptionTier: string | null;
}

interface Client {
  corporateClient: CorporateClient;
  user: User;
  profile?: {
    profilePhoto?: string;
  };
}

/**
 * Props for the Section component.
 */
interface SectionProps {
  label: string;
  value?: string | number | Date | string[] | null | undefined;
  onClick?: () => void;
  clickable?: boolean;
  hiddenValue?: boolean;
  showIcon?: boolean;
}

/**
 * Displays a labeled field with optional clickable action and icon.
 */
const Section: React.FC<SectionProps> = ({
  label,
  value,
  onClick,
  clickable,
  hiddenValue,
  showIcon,
}) => {
  const formatValue = (val: unknown): string => {
    if (val === null || val === undefined) return "N/A";
    if (Array.isArray(val)) return val.join(", ");
    if (val instanceof Date) return val.toLocaleString();
    return String(val);
  };

  const isWhatsAppField = label === "Chat on Whatsapp";
  const isCallField = label === "Phone";
  const isMessageField = label === "Message";
  const fieldColor = clickable ? "text-white" : "text-gray-800";
  const bgColor = isWhatsAppField
    ? "bg-green-600 hover:bg-green-700"
    : isCallField
    ? "bg-indigo-600 hover:bg-indigo-700"
    : isMessageField
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-gray-100";

  const displayValue = hiddenValue ? "" : formatValue(value);

  return (
    <div
      className={`flex items-start gap-3 ${
        clickable ? `cursor-pointer ${bgColor} p-3 rounded-lg` : ""
      } transition-colors`}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      aria-label={clickable ? `Open ${label}` : undefined}
    >
      {showIcon && (
        <div className={`${fieldColor} mt-0.5`}>
          {isWhatsAppField ? (
            <FaWhatsapp size={18} />
          ) : isCallField ? (
            <FiPhone size={18} />
          ) : (
            <FiMail size={18} />
          )}
        </div>
      )}
      <div>
        <p
          className={`text-sm font-medium uppercase tracking-wider ${
            clickable ? "text-white" : "text-gray-500"
          }`}
        >
          {label}
        </p>
        <p className={`text-base font-medium ${fieldColor} break-words`}>{displayValue}</p>
      </div>
    </div>
  );
};

/**
 * Props for the ProfileGroup component.
 */
interface ProfileGroupProps {
  title: string;
  data: Record<string, unknown> | Permissions;
}

/**
 * Displays a group of profile data with a title.
 */
const ProfileGroup: React.FC<ProfileGroupProps> = ({ title, data }) => {
  if (!data || Object.keys(data).length === 0) return null;
  return (
    <div className="mt-8 bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, val]) =>
          val && typeof val === "object" && !Array.isArray(val) ? (
            <ProfileGroup key={key} title={formatKey(key)} data={val as Record<string, unknown>} />
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

/**
 * Formats a camelCase or snake_case key into a human-readable string.
 */
const formatKey = (key: string): string =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/_/g, " ")
    .trim();

/**
 * Displays a corporate client profile card with details and contact options.
 * @param props - The client data from the API.
 */
const CorporateClientProfileCard: React.FC<{ client: Client }> = ({ client }) => {
  const { corporateClient, user, profile } = client;
  const {
    companyName,
    contactPerson,
    jobTitle,
    address,
    phoneNumber,
    postCode,
    registrationNumber,
    website,
    industryType,
    serviceNeeds,
    permissions,
    createdAt,
    updatedAt,
  } = corporateClient;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6 bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row items-start gap-6 bg-white rounded-lg p-6">
        <div className="flex-shrink-0">
          <img
            src={profile?.profilePhoto || img.src}
            alt={`${companyName} logo`}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border border-gray-200"
          />
          <ClientIcons />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">{companyName}</h2>
          <p className="text-gray-600 mt-2">{jobTitle || "Corporate Client"}</p>
          <div className="flex flex-col sm:flex-row mt-6 gap-3">
            <Section
              label="Chat on Whatsapp"
              value={phoneNumber}
              onClick={() =>
                phoneNumber &&
                window.open(`https://wa.me/${phoneNumber.replace(/[^\d]/g, "")}`, "_blank")
              }
              clickable
              hiddenValue
              showIcon
            />
            <Section
              label="Phone"
              value={phoneNumber}
              onClick={() => phoneNumber && (window.location.href = `tel:${phoneNumber}`)}
              clickable
              hiddenValue
              showIcon
            />
            <Section
              label="Message"
              value={user?.email || "N/A"}
              onClick={() => user?.email && (window.location.href = `mailto:${user.email}`)}
              clickable
              hiddenValue
              showIcon
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 bg-white rounded-lg p-6 shadow-sm">
        <Section label="Company Name" value={companyName} />
        <Section label="Contact Person" value={contactPerson} />
        <Section label="Job Title" value={jobTitle} />
        <Section label="Address" value={address} />
        <Section label="Post Code" value={postCode} />
        <Section label="Registration Number" value={registrationNumber} />
        <Section label="Website" value={website || "N/A"} />
        <Section label="Account Created" value={new Date(createdAt).toLocaleString()} />
        <Section label="Last Updated" value={new Date(updatedAt).toLocaleString()} />
      </div>

      <ProfileGroup title="Industry Type" data={{ industries: industryType }} />
      <ProfileGroup title="Service Needs" data={{ needs: serviceNeeds }} />
      <ProfileGroup title="Permissions" data={permissions} />
      <ProfileGroup
        title="Primary Contact"
        data={{
          firstName: user?.firstName || "N/A",
          lastName: user?.lastName || "N/A",
          email: user?.email || "N/A",
          phoneNumber: user?.phoneNumber || "N/A",
        }}
      />
    </div>
  );
};

export default CorporateClientProfileCard;