"use client";

import { AppWindow, Mail, Users } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { MdReport } from "react-icons/md";
import { TbReportAnalytics,TbGps } from "react-icons/tb";
import { FaFirstOrder } from "react-icons/fa6";
import { MdOutlineMessage,MdOutlineNotificationsActive,MdStreetview} from "react-icons/md";
import { SiWondersharefilmora,SiPushbullet } from "react-icons/si";

import { CiTimer } from "react-icons/ci";


const features = [
  { title: "Invite guards & clients", icon: Mail },
  { title: "Manage guard & client profiles", icon: CgProfile },
  { title: "Create multiple teams", icon: Users },
  { title: "In-app check-in & out", icon: AppWindow },
  { title: "Create custom reports", icon: MdReport },
  { title: "Submit multiple reports", icon: TbReportAnalytics},
  { title: "Share post orders live", icon: FaFirstOrder },
  { title: "In-app messenger", icon: MdOutlineMessage },
  { title: "GPS track security guards", icon: TbGps },
  { title: "Access live notifications", icon: MdOutlineNotificationsActive },
  { title: "Add & View post orders", icon: MdStreetview },
  { title: "Manage time logs easily", icon: CiTimer },
  { title: "Share passdown logs", icon: SiWondersharefilmora },
  { title: "Activate panic button", icon: SiPushbullet },
];

export default function SecurityFeatures() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Multiple Solutions on a Single Platform
        </h2>
        <p className="text-lg text-gray-600 mt-3">
          Optimize your security guard operations with a seamless mobile and web platform.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-8xl mx-auto px-10 md:px-20 lg:px-26">
        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                style={{ backgroundImage: "url('/images/pattern-1.png')" }}
                className="w-54 h-46 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center justify-center 
             transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Icon */}
                <IconComponent className="w-16 h-16 text-black-600 mb-3" />

                {/* Feature Title */}
                <h3 className="text-md font-semibold text-gray-900">{feature.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
