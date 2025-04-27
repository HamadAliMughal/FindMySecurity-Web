"use client";

import React from "react";

interface WeeklyScheduleProps {
  roleId: number;
  loginData: any;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ roleId, loginData }) => {
  if (roleId !== 3 || !loginData?.individualProfessional) return null;

  return (
    <div className="mt-6">
      <h4 className="font-semibold text-gray-800 mb-2">Weekly Schedule</h4>
      {loginData?.individualProfessional?.profileData?.availability && (
        <div className="overflow-x-auto text-sm">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Time</th>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <th key={day} className="p-2 border">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>

              {Object.entries(
                loginData?.individualProfessional?.profileData?.availability
                  ?.weeklySchedule
              ).map(([time, days]: any) => (
                <tr key={time}>
                  <td className="p-2 border font-medium">{time}</td>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <td key={day} className="p-2 border text-center">
                        {days[day] ? "✅" : "❌"}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule;