import React from "react";
import Section from "./Section";

const ServicesSection = ({ services , id}: { services: any , id :any}) => {
  if (!services) return null;

  return (
    <Section title="Services">
      {services.selectedServices?.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Specializations</h4>
          <div className="flex flex-wrap gap-2">
            {services.selectedServices.map((service: string, index: number) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {service}
              </span>
            ))}
          </div>
        </div>
      )}
      {services.otherService && (
        <div>
          <h4 className="font-medium text-gray-800">Other Services</h4>
          <p className="text-gray-700">{services.otherService}</p>
        </div>
      )}
    </Section>
  );
};

export default ServicesSection;
