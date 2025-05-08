import React from "react";
import { FileText, BadgeCheck, ShieldCheck } from "lucide-react";

const iconData = [
  {
    title: "Document",
    Icon: FileText,
    description: "Formal files, reports, or legal text-based records.",
  },
  {
    title: "Certificate",
    Icon: BadgeCheck,
    description: "Proof of achievement, license, or completion.",
  },
  {
    title: "Verified",
    Icon: ShieldCheck,
    description: "Identity or data that’s been authenticated.",
  },
];

const ProfessionalIcons = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 gap-y-2 px-4 max-w-md sm:max-w-3xl mx-auto">
      {iconData.map(({ title, Icon, description }) => (
        <div key={title} className="flex justify-center">
          <div className="relative group">
            {/* Icon with adjusted responsive size */}
            <Icon
              className="text-gray-800 w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
              strokeWidth={2.2}
            />

            {/* Tooltip on top of icon */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)] w-52 bg-gray-800 text-white text-xs sm:text-sm text-center px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
  {description}
  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
</div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalIcons;
