import React, { useState } from "react";
import Section from "./Section";
import { CheckCircle, Cancel } from "@mui/icons-material";
import toast from "react-hot-toast";

const AvailabilitySection = ({ availability }: { availability: any }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(availability?.description || "");
  const [weeklySchedule, setWeeklySchedule] = useState(availability?.weeklySchedule || {});
  const [updatedSchedule, setUpdatedSchedule] = useState(availability?.weeklySchedule || {});
  const [updatedDescription, setUpdatedDescription] = useState(availability?.description || "");

  if (!availability) return null;

  const handleCheckboxChange = (time: string, day: string) => {
    setWeeklySchedule((prev: any) => ({
      ...prev,
      [time]: {
        ...prev[time],
        [day]: !prev[time]?.[day],
      },
    }));
  };

  const handleSave = () => {
    setUpdatedSchedule({ ...weeklySchedule });
    setUpdatedDescription(description);
    toast.success("Availability updated successfully");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setWeeklySchedule({ ...updatedSchedule });
    setDescription(updatedDescription);
    setIsEditing(false);
  };

  return (
    <Section
    title={
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Availability</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm px-3 py-1 ml-115 bg-black text-white rounded hover:bg-gray-800 "
            >
              Edit
            </button>
          )}
        </div>
      }
    >
      {isEditing ? (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded text-gray-700"
              rows={2}
            />
          </div>
          <div className="overflow-x-auto rounded-lg shadow-lg border bg-white">
            <table className="w-full text-sm text-gray-700 border-separate border-spacing-0">
              <thead className="bg-gradient-to-r from-gray-500 via-black to-gray-500 text-white">
                <tr>
                  <th className="p-4 border-b text-left">Time</th>
                  {days.map((day) => (
                    <th key={day} className="p-4 text-center border-b">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(weeklySchedule).map(([time, dayMap]: any) => (
                  <tr key={time} className="hover:bg-gray-50 transition duration-300">
                    <td className="p-4 border-b font-semibold">{time}</td>
                    {days.map((day) => (
                      <td key={day} className="p-4 border-b text-center">
                        <input
                          type="checkbox"
                          checked={dayMap[day] || false}
                          onChange={() => handleCheckboxChange(time, day)}
                          className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 mt-4">
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
          {updatedDescription && <p className="text-gray-700 mb-4">{updatedDescription}</p>}
          {updatedSchedule && (
            <div className="overflow-x-auto rounded-lg shadow-lg border bg-white">
              <table className="w-full text-sm text-gray-700 border-separate border-spacing-0">
                <thead className="bg-gradient-to-r from-gray-500 via-black to-gray-500 text-white">
                  <tr>
                    <th className="p-4 border-b text-left">Time</th>
                    {days.map((day) => (
                      <th key={day} className="p-4 text-center border-b">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(updatedSchedule).map(([time, dayMap]: any) => (
                    <tr key={time} className="hover:bg-gray-50 transition duration-300">
                      <td className="p-4 border-b font-semibold">{time}</td>
                      {days.map((day) => (
                        <td key={day} className="p-4 border-b text-center">
                          {dayMap[day] ? (
                            <CheckCircle className="w-6 h-6 text-green-700 mx-auto" />
                          ) : (
                            <Cancel className="w-6 h-6 text-red-700 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </Section>
  );
};

export default AvailabilitySection;
