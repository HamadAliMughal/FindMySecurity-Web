import React from "react";
import AnimateOnScrollProvider from "@/sections/components/animation/AnimateOnScrollProvider";

interface SectionProps {
  title: React.ReactNode; // changed from string to ReactNode
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <AnimateOnScrollProvider>
      <div
        className="bg-white border rounded-xl shadow-sm p-6 mb-6"
        data-aos="fade-up"
      >
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        {children}
      </div>
    </AnimateOnScrollProvider>
  );
};

export default Section;

