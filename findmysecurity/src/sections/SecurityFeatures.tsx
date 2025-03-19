"use client";

import { motion } from "framer-motion";
import Icons from "../constants/icons/icons";

const features = [
  { title: "Invite guards & clients", icon: Icons.Mail },
  { title: "Manage guard & client profiles", icon: Icons.Profile },
  { title: "Create multiple teams", icon: Icons.MultipleUsers },
  { title: "In-app check-in & out", icon: Icons.App },
  { title: "Create custom reports", icon: Icons.Report },
  { title: "Submit multiple reports", icon: Icons.SubmitReport },
  { title: "Share post orders live", icon: Icons.Order },
  { title: "In-app messenger", icon: Icons.Messenger },
  { title: "GPS track security guards", icon: Icons.Gps },
  { title: "Access live notifications", icon: Icons.Notification },
  { title: "Add & View post orders", icon: Icons.ViewOrder },
  { title: "Manage time logs easily", icon: Icons.Timer },
  { title: "Share passdown logs", icon: Icons.Share },
  { title: "Activate panic button", icon: Icons.PushButton },
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
      <div className="max-w-8xl mx-auto px-10 md:px-20 lg:px-32">
        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                style={{backgroundImage:"url('/images/pattern-1.png')"}}
                // className="w-54 h-46 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center justify-center transition-all"
                className="w-54 h-46 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center justify-center 
             transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
                // whileHover={{ y: -10, opacity: 1 }}
                // initial={{ y: 0, opacity: 0 }}
                // animate={{ opacity: 1 }}
                // transition={{ duration: 0.5, ease: "easeInOut" }}
                // whileTap={{ scale: 0.95 }}
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
