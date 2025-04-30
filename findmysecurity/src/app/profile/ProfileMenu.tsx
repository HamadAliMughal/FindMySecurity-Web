"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaHeart,
  FaUserShield,
  FaCogs,
  FaAd,
  FaUserPlus,
  FaBell,
} from "react-icons/fa";
import axios from "axios";

interface Notification {
  id: number;
  profileImage: string;
  text: string;
  jobTitle: string;
}

interface ProfileMenuProps {
  roleId: number;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ roleId }) => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("loginData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLoginData(parsedData);

      const fetchNotifications = async () => {
        try {
          const token2 = localStorage.getItem("authToken")?.replace(/^"|"$/g, '')
          const userId = parsedData.id;

          const response = await axios.get(
            `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/notifications/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token2}`,
              },
            }
          );

          // Adjust this line if the data shape differs
          setNotifications(response.data || []);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      };

      fetchNotifications();
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const shouldShowCreateProfile =
    roleId === 3 && !loginData?.individualProfessional?.profileData?.availability;

  const menuItems = [
    { icon: <FaSearch />, label: "My Searches" },
    { icon: <FaHeart />, label: "My Favourites" },
    { icon: <FaUserShield />, label: "Visitors" },
    { icon: <FaSearch />, label: "Advance Search" },
    { icon: <FaCogs />, label: "Customer Support" },
    { icon: <FaBell />, label: "Notifications", isNotification: true },
    ...(roleId !== 3
      ? [{ icon: <FaAd />, label: "Post Free Ad", route: "/post-ad" }]
      : []),
    ...(shouldShowCreateProfile
      ? [
          {
            icon: <FaUserPlus />,
            label: "Create Public Profile",
            route: "/public-profile",
          },
        ]
      : []),
  ];

  const handleAccept = (id: number) => {
    alert(`Accepted notification ${id}`);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleReject = (id: number) => {
    alert(`Rejected notification ${id}`);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMenuClick = (item: any) => {
    if (item.isNotification) {
      setShowNotifications((prev) => !prev);
    } else if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold my-6 text-gray-800 text-center md:text-left">
        My Profile
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMenuClick(item)}
            className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition text-center relative"
          >
            <div className="text-2xl relative inline-block">
              {item.icon}
              {item.isNotification && notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
                  {notifications.length}
                </span>
              )}
            </div>
            <p className="text-sm mt-1">{item.label}</p>
          </div>
        ))}

        {showNotifications && (
          <div
            ref={popupRef}
            className="absolute right-0 top-24 bg-white shadow-lg rounded-lg w-80 z-50 p-4 max-h-96 overflow-y-auto"
          >
            <h4 className="font-semibold mb-3 text-lg">Notifications</h4>
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center">No new notifications</p>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className="flex items-start gap-3 p-2 border-b">
                  <img
                    src={notif.profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm">{notif.text}</p>
                    <p className="text-xs text-gray-500">{notif.jobTitle}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="text-white bg-green-600 hover:bg-green-700 text-xs px-3 py-1 rounded"
                        onClick={() => handleAccept(notif.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="text-white bg-red-500 hover:bg-red-600 text-xs px-3 py-1 rounded"
                        onClick={() => handleReject(notif.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileMenu;
