import React, { useState } from "react";
import Section from "./Section";
import toast from "react-hot-toast";
import axios from "axios";

const ServicesSection = ({ services, id }: { services: any; id: any }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!services) return null;

  const [formData, setFormData] = useState({
    selectedServices: services?.selectedServices?.join(", ") || "",
    otherService: services?.otherService || "",
  });

  const [updatedData, setUpdatedData] = useState({ ...formData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");
      if (!token) {
        toast.error("Authorization token not found.");
        return;
      }

      const payload = {
        profileData: {
          selectedServices: formData.selectedServices
            .split(",")
            .map((service: string) => service.trim())
            .filter((service: string) => service.length > 0),
          otherService: formData.otherService,
        },
      };

      await axios.put(
        `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/profile/individual/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUpdatedData({ ...formData });
      toast.success("Services updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update services.";
      toast.error(message);
    }
  };

  const handleCancel = () => {
    setFormData({ ...updatedData });
    setIsEditing(false);
  };

  return (
    <Section
      title={
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold">Services</h2>
        </div>
      }
    >
      {isEditing ? (
        <>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specializations (comma-separated)
              </label>
              <input
                type="text"
                name="selectedServices"
                value={formData.selectedServices}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-700"
                placeholder="e.g., Web Development, Graphic Design"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other Services
              </label>
              <textarea
                name="otherService"
                value={formData.otherService}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-gray-700"
                rows={4}
                placeholder="Describe other services you offer"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4 justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {updatedData.selectedServices && updatedData.selectedServices.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {updatedData.selectedServices
                  .split(",")
                  .map((service: string) => service.trim())
                  .filter((service: string) => service.length > 0)
                  .map((service: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
              </div>
            </div>
          )}
          {updatedData.otherService && (
            <div>
              <h4 className="font-medium text-gray-800">Other Services</h4>
              <p className="text-gray-700">{updatedData.otherService}</p>
            </div>
          )}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm px-5 py-2 mt-5 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Edit
            </button>
          )}
        </>
      )}
    </Section>
  );
};

export default ServicesSection;







// import React from "react";
// import Section from "./Section";

// const ServicesSection = ({ services , id}: { services: any , id :any}) => {
//   if (!services) return null;

//   return (
//     <Section title="Services">
//       {services.selectedServices?.length > 0 && (
//         <div className="mb-4">
//           <h4 className="font-medium text-gray-800 mb-2">Specializations</h4>
//           <div className="flex flex-wrap gap-2">
//             {services.selectedServices.map((service: string, index: number) => (
//               <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
//                 {service}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//       {services.otherService && (
//         <div>
//           <h4 className="font-medium text-gray-800">Other Services</h4>
//           <p className="text-gray-700">{services.otherService}</p>
//         </div>
//       )}
//     </Section>
//   );
// };

// export default ServicesSection;
