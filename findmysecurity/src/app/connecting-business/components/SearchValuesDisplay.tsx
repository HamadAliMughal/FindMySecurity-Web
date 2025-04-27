import React from "react";
import { SearchValues } from "../types";

interface SearchValuesDisplayProps {
  searchValues: SearchValues;
  searchMode: string;
  isCompanyOrTraining?: boolean;
  onRefineSearch: () => void;
}

export default function SearchValuesDisplay({
  searchValues,
  searchMode,
  isCompanyOrTraining,
  onRefineSearch
}: SearchValuesDisplayProps) {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto mb-10 bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(searchValues).map(([key, value]) => {
          if (key === "experience" && isCompanyOrTraining) return null;
          if (searchMode === "basic" && !["lookingFor", "subCategory", "postcode"].includes(key)) return null;

          return (
            <div key={key} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
              <input
                type="text"
                readOnly
                value={value}
                className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-black focus:outline-none cursor-not-allowed transition"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-left mt-6">
        <button
          className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 hover:scale-105 transition-all duration-300"
          onClick={onRefineSearch}
        >
          🔍 Refine Search
        </button>
      </div>
    </div>
  );
}