"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
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
import { API_URL } from "@/utils/path";
import toast from "react-hot-toast";
import Link from "next/link";

interface Notification {
  [x: string]: ReactNode;
  id: number;
  profileImage: string;
  text: string;
  jobTitle: string;
  message?: string;
  relatedUserId?: number;
}

interface ProfileMenuProps {
  roleId: number;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ roleId }) => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isClearing, setIsClearing] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("loginData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLoginData(parsedData);

      const fetchNotifications = async () => {
        try {
          const token2 = localStorage.getItem("authToken")?.replace(/^"|"$/g, '');
          const userId = parsedData.id;

          const response = await axios.get(
            `${API_URL}/notifications/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token2}`,
              },
            }
          );

          const notificationsArray = response.data?.data;
          if (Array.isArray(notificationsArray) && notificationsArray.length > 0) {
            setNotifications(notificationsArray);
          } else {
            setNotifications([]);
          }
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

  const handleClearAll = async () => {
    setIsClearing(true);
    const token2 = localStorage.getItem("authToken")?.replace(/^"|"$/g, '');

    try {
      await Promise.all(
        notifications.map((notif) =>
          axios.delete(`${API_URL}/notifications/${notif.id}`, {
            headers: { Authorization: `Bearer ${token2}` },
          })
        )
      );
      toast.success("All notifications cleared");
      setNotifications([]);
    } catch (err) {
      toast.error("Failed to clear notifications");
      console.error(err);
    } finally {
      setIsClearing(false);
    }
  };

  const shouldShowCreateProfile =
    roleId === 3 && !loginData?.individualProfessional?.profileData?.availability;

  const menuItems = [
    { icon: <FaSearch />, label: "My Searches" },
    { icon: <FaHeart />, label: "My Favourites" },
    {
      icon: <FaUserShield />,
      label: roleId !== 3 ? "My Job Applicants" : "Visitors",
      route: roleId !== 3 ? "/my-job-applicants" : "/visitors",
    },
    { icon: <FaSearch />, label: "Advance Search" },
    { icon: <FaCogs />, label: "Customer Support" },
    { icon: <FaBell />, label: "Notifications", isNotification: true },
    ...(roleId !== 3
      ? [{ icon: <FaAd />, label: "Post Free Ad", route: "/post-ad" }]
      : [{ icon: <FaAd />, label: "View JObs", route: "/view-ads" }]),
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

  const handleMenuClick = (item: any) => {
    if (item.isNotification) {
      setShowNotifications((prev) => !prev);
    } else if (item.route) {
      router.push(item.route);
    }
  };

  return (
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
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-lg">Notifications</h4>
            {notifications.length > 0 && (
              <button
                className="text-sm text-red-600 hover:underline"
                onClick={handleClearAll}
                disabled={isClearing}
              >
                {isClearing ? "Clearing..." : "Clear All"}
              </button>
            )}
          </div>

          {isClearing ? (
            <p className="text-center text-gray-500">Clearing notifications...</p>
          ) : notifications.length === 0 || notifications === null ? (
            <p className="text-gray-500 text-center">No new notifications</p>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 p-2 border-b">
                <div className="flex-1">
                  <p className="text-sm">
                    {typeof notif?.message === "string"
                      ? notif.message.split(":")[1]?.trim()
                      : ""}
                  </p>
                  <Link href={`public-profile/${notif?.relatedUserId}`}>
                    <p className="text-xs text-gray-500">
                      {typeof notif?.message === "string"
                        ? notif.message.split(":")[0]?.trim()
                        : ""}
                    </p>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
