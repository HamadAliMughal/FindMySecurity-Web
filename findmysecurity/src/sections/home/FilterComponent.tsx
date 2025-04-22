"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaFilter, FaSearch } from "react-icons/fa";
import useMobileView from "@/sections/hooks/useMobileView";
import Link from "next/link";

// ------------------ Interfaces ------------------

interface FilterValues {
  lookingFor: string;
  subCategory: string;
  distance: string;
  experience: string;
  postcode: string;
}

interface CategoryData {
  id: string;
  title: string;
  roles: string[];
}

interface FilterComponentProps {
  lookingForData: CategoryData[];
  filterData: { distance: string[]; experience: string[] };
  title?: string;
}

// ------------------ Component ------------------

export default function FilterComponent({
  lookingForData,
  filterData,
  title,
}: FilterComponentProps) {
  const [loginData, setLoginData] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    lookingFor: "",
    subCategory: "",
    distance: "",
    experience: "",
    postcode: "",
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileView();

  // ------------------ Effects ------------------

  useEffect(() => {
    const storedLoginData = localStorage.getItem("loginData");
    setLoginData(storedLoginData);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ------------------ Handlers ------------------

  const handleToggleAdvancedFilter = () => {
    if (!loginData) {
      window.location.href = "/signin";
      return;
    }
    setShowAdvanced(!showAdvanced);
  };

  const handleSelect = (field: keyof FilterValues, value: string) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }));
    setOpenDropdown(null);
  };

  const renderDropdown = (field: keyof FilterValues) => {
    let options: string[] = [];

    if (field === "lookingFor") {
      return (
        <div
          ref={dropdownRef}
          className="absolute top-12 left-0 bg-white text-black text-left rounded shadow-lg z-50 border border-gray-300 w-full"
        >
          {lookingForData.map((category) => (
            <div
              key={category.id}
              className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
              onClick={() => {
                setFilterValues((prev) => ({
                  ...prev,
                  lookingFor: category.title,
                  subCategory: "",
                }));
                setSelectedMainCategory(category.title);
                setOpenDropdown(null);
              }}
            >
              {category.title}
            </div>
          ))}
        </div>
      );
    }

    if (field === "subCategory") {
      const selectedCategory = lookingForData.find((c) => c.title === selectedMainCategory);
      options = selectedCategory?.roles || [];
    }

    if (field === "distance") options = filterData.distance;
    if (field === "experience") options = filterData.experience;
    if (!options.length) return null;

    return (
      <div
        ref={dropdownRef}
        className="absolute top-12 left-0 bg-white text-left text-black rounded shadow-lg z-50 border border-gray-300 w-full"
      >
        {options.map((option) => (
          <div
            key={option}
            className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
            onClick={() => handleSelect(field, option)}
          >
            {option}
          </div>
        ))}
      </div>
    );
  };

  // ------------------ Render ------------------

  return (
    <div className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
      <h2 className="text-lg font-bold text-center text-gray-800 -mb-2">FindMySecurity</h2>
      <h2 className="text-lg font-bold text-center text-gray-800 mb-2">{title}</h2>

      <div
        className={`${
          isMobile ? "flex flex-col w-full gap-4" : "flex flex-wrap w-full gap-4 items-center"
        }`}
      >
        {/* Looking For Dropdown */}
        <div className="relative flex-2 w-full">
          <div
            className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
            onClick={() => setOpenDropdown("lookingFor")}
          >
            {filterValues.lookingFor || "Looking For"}
            <FaChevronDown className="ml-auto" />
          </div>
          {openDropdown === "lookingFor" && renderDropdown("lookingFor")}
        </div>

        {/* Subcategory Dropdown */}
        <div className="relative flex-2 w-full">
          <div
            className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
            onClick={() => setOpenDropdown("subCategory")}
          >
            {filterValues.subCategory || "Subcategory"}
            <FaChevronDown className="ml-auto" />
          </div>
          {openDropdown === "subCategory" && renderDropdown("subCategory")}
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <>
            {/* Distance Dropdown */}
            <div className="relative flex-2 w-full">
              <div
                className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
                onClick={() => setOpenDropdown("distance")}
              >
                {filterValues.distance || "Distance"}
                <FaChevronDown className="ml-auto" />
              </div>
              {openDropdown === "distance" && renderDropdown("distance")}
            </div>

            {/* Experience Dropdown */}
            <div className="relative flex-2 w-full">
              <div
                className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
                onClick={() => setOpenDropdown("experience")}
              >
                {filterValues.experience || "Experience"}
                <FaChevronDown className="ml-auto" />
              </div>
              {openDropdown === "experience" && renderDropdown("experience")}
            </div>
          </>
        )}

        {/* Postcode Input */}
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg text-black border border-black w-full focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Postcode"
          value={filterValues.postcode}
          onChange={(e) => setFilterValues({ ...filterValues, postcode: e.target.value })}
        />

        {/* Search Button */}
        <Link
          href={
            showAdvanced
              ? filterValues.lookingFor &&
                filterValues.subCategory &&
                filterValues.distance &&
                filterValues.experience &&
                filterValues.postcode
                ? "/connecting-business"
                : "#"
              : filterValues.lookingFor &&
                filterValues.subCategory &&
                filterValues.postcode
              ? "/connecting-business"
              : "#"
          }
          className={`flex items-center px-4 py-2 rounded-lg ${
            showAdvanced
              ? filterValues.lookingFor &&
                filterValues.subCategory &&
                filterValues.distance &&
                filterValues.experience &&
                filterValues.postcode
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
              : filterValues.lookingFor &&
                filterValues.subCategory &&
                filterValues.postcode
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
          onClick={(e) => {
            const validBasic =
              filterValues.lookingFor && filterValues.subCategory && filterValues.postcode;
            const validAdvanced =
              validBasic &&
              filterValues.distance &&
              filterValues.experience;

            if ((showAdvanced && !validAdvanced) || (!showAdvanced && !validBasic)) {
              e.preventDefault();
            } else {
              localStorage.setItem("filterValues", JSON.stringify(filterValues));
              localStorage.setItem("filterMode", showAdvanced ? "advanced" : "basic");
              localStorage.setItem("title", JSON.stringify(title));
            }
          }}
        >
          <FaSearch className="mr-2" />
          Go
        </Link>
      </div>

      {/* Toggle Advanced Filters */}
      <button
        className="flex items-center px-4 py-2 mt-4 bg-black text-white rounded-lg hover:bg-gray-800"
        onClick={handleToggleAdvancedFilter}
      >
        <FaFilter className="mr-2" />
        {showAdvanced ? "Basic Filter" : "Advanced Filter"}
      </button>
    </div>
  );
}
