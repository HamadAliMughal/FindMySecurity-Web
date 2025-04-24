"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaHeart,
  FaUserShield,
  FaCogs,
  FaAd,
} from "react-icons/fa";

interface ProfileMenuProps {
  roleId: number;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ roleId }) => {
  const router = useRouter();

  return (
    <>
      <h3 className="text-lg font-semibold my-6 text-gray-800 text-center md:text-left">
        My Profile
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { icon: <FaSearch />, label: "My Searches" },
          { icon: <FaHeart />, label: "My Favourites" },
          { icon: <FaUserShield />, label: "Visitors" },
          { icon: <FaSearch />, label: "Advance Search" },
          { icon: <FaCogs />, label: "Customer Support" },
          ...(roleId !== 3
            ? [{ icon: <FaAd />, label: "Post Free Ad", route: "/post-ad" }]
            : []),
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => item.route && router.push(item.route)}
            className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition text-center"
          >
            <div className="text-2xl">{item.icon}</div>
            <p className="text-sm mt-1 text-center">{item.label}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileMenu;