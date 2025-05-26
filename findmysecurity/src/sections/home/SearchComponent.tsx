import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaFilter, FaSearch } from "react-icons/fa";
import useMobileView from "@/sections/hooks/useMobileView";
import Link from "next/link";
import toast from "react-hot-toast";

interface SearchValues {
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

interface SearchComponentProps {
  lookingForData: CategoryData[];
  searchData: { distance: string[]; experience: string[] };
  title?: string;
  onSearchSubmit: (searchValues: SearchValues) => void;
  searchMode: "basic" | "advanced";
  onSearchModeChange?: (mode: "basic" | "advanced") => void;
  hideExperienceField?: boolean; // 👈 New prop
}

export default function SearchComponent({
  lookingForData,
  searchData,
  title,
  onSearchSubmit,
  searchMode,
  onSearchModeChange,
  hideExperienceField = false, // 👈 Default to false
}: SearchComponentProps) {
  const [loginData, setLoginData] = useState<string | null>(null);
  const [searchValues, setSearchValues] = useState<SearchValues>({
    lookingFor: "",
    subCategory: "",
    distance: "",
    experience: "",
    postcode: "",
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(searchMode === "advanced");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileView();

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

  const handleToggleAdvancedSearch = () => {
    if (!loginData) {
      window.location.href = "/signin";
      return;
    }

    const newMode = showAdvanced ? "basic" : "advanced";
    setShowAdvanced(!showAdvanced);
    onSearchModeChange?.(newMode);
  };
 const validatePostcode = async (postcode: string): Promise<boolean> => {
    const formatted = postcode.trim().replace(/\s+/g, "");
    try {
      const res = await fetch(`https://api.postcodes.io/postcodes/${formatted}/validate`);
      const data = await res.json();
      return data.result === true;
    } catch (error) {
      console.error("Postcode validation error:", error);
      return false;
    }
  };

  const handleSearchClick = async () => {
    const validBasic =
      searchValues.lookingFor && searchValues.subCategory && searchValues.postcode;
    const validAdvanced =
      validBasic &&
      searchValues.distance &&
      (hideExperienceField || searchValues.experience);

    if ((showAdvanced && !validAdvanced) || (!showAdvanced && !validBasic)) {
      return;
    }

    const isValidPostcode = await validatePostcode(searchValues.postcode);
    if (!isValidPostcode) {
      toast.error("Please enter a valid UK postcode.");
      return;
    }

    const params = new URLSearchParams();
    if (title === "Professionals") {
      params.set("role", searchValues.lookingFor);
      searchValues.subCategory.split(",").forEach((sub) => {
        if (sub.trim()) params.append("subcategory", sub.trim());
      });
      params.set("pc", searchValues.postcode);
      params.set("page", "1");
      params.set("pageSize", "10");
    } else {
      params.set("sr", searchValues.lookingFor);
      params.set("so", searchValues.subCategory);
      params.set("pc", searchValues.postcode);
      if (searchValues.distance) params.set("ds", searchValues.distance);
      if (searchValues.experience && !hideExperienceField)
        params.set("ex", searchValues.experience);
      params.set("page", "1");
    }

    let targetPath = "/connecting-business";
    if (title === "Security Companies") targetPath = "/security-companies";
    else if (title === "Professionals") targetPath = "/professionals";
    else if (title === "Training Providers") targetPath = "/course-provider";

    localStorage.setItem("searchValues", JSON.stringify(searchValues));
    localStorage.setItem("searchMode", showAdvanced ? "advanced" : "basic");
    localStorage.setItem("title", JSON.stringify(title));

    window.location.href = `${targetPath}?${params.toString()}`;
  };
  const handleSelect = (field: keyof SearchValues, value: string) => {
    setSearchValues((prev) => ({ ...prev, [field]: value }));
    setOpenDropdown(null);
  };

  const renderDropdown = (field: keyof SearchValues) => {
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
                setSearchValues((prev) => ({
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
      const selectedCategory = lookingForData.find(
        (c) => c.title === selectedMainCategory
      );
      options = selectedCategory?.roles || [];
    }

    if (field === "distance") options = searchData.distance;
    if (field === "experience") options = searchData.experience;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      // className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl"
      className="relative z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
    >
      <h2 className="text-lg font-bold text-center text-white -mb-2">
        FindMySecurity
      </h2>
      <h2 className="text-lg font-bold text-center text-white mb-2">
        {title}
      </h2>

      <div
        className={`${
          isMobile
            ? "flex flex-col w-full gap-4"
            : "flex flex-wrap w-full gap-4 items-center"
        }`}
      >
        <div className="relative flex-2 w-full">
          <div
            className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
            onClick={() => setOpenDropdown("lookingFor")}
          >
            {searchValues.lookingFor || "Looking For"}
            <FaChevronDown className="ml-auto" />
          </div>
          {openDropdown === "lookingFor" && renderDropdown("lookingFor")}
        </div>

        <div className="relative flex-2 w-full">
          <div
            className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
            onClick={() => setOpenDropdown("subCategory")}
          >
            {searchValues.subCategory || "Subcategory"}
            <FaChevronDown className="ml-auto" />
          </div>
          {openDropdown === "subCategory" && renderDropdown("subCategory")}
        </div>

        {showAdvanced && (
          <>
            <div className="relative flex-2 w-full">
              <div
                className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
                onClick={() => setOpenDropdown("distance")}
              >
                {searchValues.distance || "Distance"}
                <FaChevronDown className="ml-auto" />
              </div>
              {openDropdown === "distance" && renderDropdown("distance")}
            </div>

            {!hideExperienceField && (
              <div className="relative flex-2 w-full">
                <div
                  className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
                  onClick={() => setOpenDropdown("experience")}
                >
                  {searchValues.experience || "Experience"}
                  <FaChevronDown className="ml-auto" />
                </div>
                {openDropdown === "experience" && renderDropdown("experience")}
              </div>
            )}
          </>
        )}

        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg text-white border border-white w-full focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Postcode"
          value={searchValues.postcode}
          onChange={(e) =>
            setSearchValues({ ...searchValues, postcode: e.target.value })
          }
        />

        <button
          type="button"
          className={`flex items-center px-4 py-2 rounded-lg ${
            showAdvanced
              ? searchValues.lookingFor &&
                searchValues.subCategory &&
                searchValues.distance &&
                (hideExperienceField || searchValues.experience) &&
                searchValues.postcode
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-gray-800 text-white cursor-not-allowed"
              : searchValues.lookingFor &&
                searchValues.subCategory &&
                searchValues.postcode
              ? "bg-black text-white hover:bg-gray-900"
              : "bg-gray-800 text-white cursor-not-allowed"
          }`}
          onClick={(e) => {
          handleSearchClick();
          e.preventDefault();
          }}
          
        >
          <FaSearch className="mr-2" />
          Go
        </button>
      </div>

      <button
        className="flex items-center px-4 py-2 mt-4 bg-black text-white rounded-lg hover:bg-gray-900"
        onClick={(e) => {
          e.preventDefault();
          handleToggleAdvancedSearch();
        }}
      >
        <FaFilter className="mr-2" />
        {showAdvanced ? "Basic Search" : "Advanced Search"}
      </button>
    </form>
  );
}



