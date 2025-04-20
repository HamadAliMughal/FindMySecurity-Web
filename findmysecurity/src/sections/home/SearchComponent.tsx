import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaFilter, FaSearch } from "react-icons/fa";
import useMobileView from "@/sections/hooks/useMobileView";
import Link from "next/link";

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
  onSearchModeChange?: (mode: "basic" | "advanced") => void; // 👈 NEW prop
}

export default function SearchComponent({
  lookingForData,
  searchData,
  title,
  onSearchSubmit,
  searchMode,
  onSearchModeChange,
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
    onSearchModeChange?.(newMode); // 👈 Notify parent component
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
      className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl"
    >
      <h2 className="text-lg font-bold text-center text-gray-800 -mb-2">
        FindMySecurity
      </h2>
      <h2 className="text-lg font-bold text-center text-gray-800 mb-2">
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
          </>
        )}

        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg text-black border border-black w-full focus:outline-none focus:ring-2 focus:ring-black"
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
                searchValues.experience &&
                searchValues.postcode
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
              : searchValues.lookingFor &&
                searchValues.subCategory &&
                searchValues.postcode
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
          onClick={(e) => {
            const validBasic =
              searchValues.lookingFor &&
              searchValues.subCategory &&
              searchValues.postcode;
            const validAdvanced =
              validBasic &&
              searchValues.distance &&
              searchValues.experience;

            if ((showAdvanced && !validAdvanced) || (!showAdvanced && !validBasic)) {
              return;
            } else {
              localStorage.setItem("searchValues", JSON.stringify(searchValues));
              localStorage.setItem("searchMode", showAdvanced ? "advanced" : "basic");
              localStorage.setItem("title", JSON.stringify(title));
              window.location.href = "/connecting-business";
            }
          }}
        >
          <FaSearch className="mr-2" />
          Go
        </button>
      </div>

      <button
        className="flex items-center px-4 py-2 mt-4 bg-black text-white rounded-lg hover:bg-gray-800"
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









// import { useState, useEffect, useRef } from "react";
// import { FaChevronDown, FaFilter, FaSearch } from "react-icons/fa";
// import useMobileView from "@/sections/hooks/useMobileView";
// import Link from "next/link";

// interface SearchValues {
//   lookingFor: string;
//   subCategory: string;
//   distance: string;
//   experience: string;
//   postcode: string;
// }

// interface CategoryData {
//   id: string;
//   title: string;
//   roles: string[];
// }

// interface SearchComponentProps {
//   lookingForData: CategoryData[];
//   searchData: { distance: string[]; experience: string[] };
//   title?: string;
//   onSearchSubmit: (searchValues: SearchValues) => void; // Callback for search submission
//   searchMode: 'basic' | 'advanced'; // Accept searchMode as a prop
// }

// export default function SearchComponent({
//   lookingForData,
//   searchData,
//   title,
//   onSearchSubmit,
//   searchMode, // Accept searchMode as a prop
// }: SearchComponentProps) {
//   const [loginData, setLoginData] = useState<string | null>(null);
//   const [searchValues, setSearchValues] = useState<SearchValues>({
//     lookingFor: "",
//     subCategory: "",
//     distance: "",
//     experience: "",
//     postcode: "",
//   });

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
//   const [showAdvanced, setShowAdvanced] = useState(searchMode === 'advanced'); // Set initial state based on the prop
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const isMobile = useMobileView();

//   useEffect(() => {
//     const storedLoginData = localStorage.getItem("loginData");
//     setLoginData(storedLoginData);
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleToggleAdvancedSearch = () => {
//     if (!loginData) {
//       window.location.href = "/signin";
//       return;
//     }
//     setShowAdvanced(!showAdvanced);
//   };

//   const handleSelect = (field: keyof SearchValues, value: string) => {
//     setSearchValues((prev) => ({ ...prev, [field]: value }));
//     setOpenDropdown(null);
//   };

//   const renderDropdown = (field: keyof SearchValues) => {
//     let options: string[] = [];

//     if (field === "lookingFor") {
//       return (
//         <div
//           ref={dropdownRef}
//           className="absolute top-12 left-0 bg-white text-black text-left rounded shadow-lg z-50 border border-gray-300 w-full"
//         >
//           {lookingForData.map((category) => (
//             <div
//               key={category.id}
//               className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
//               onClick={() => {
//                 setSearchValues((prev) => ({
//                   ...prev,
//                   lookingFor: category.title,
//                   subCategory: "",
//                 }));
//                 setSelectedMainCategory(category.title);
//                 setOpenDropdown(null);
//               }}
//             >
//               {category.title}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     if (field === "subCategory") {
//       const selectedCategory = lookingForData.find((c) => c.title === selectedMainCategory);
//       options = selectedCategory?.roles || [];
//     }

//     if (field === "distance") options = searchData.distance;
//     if (field === "experience") options = searchData.experience;
//     if (!options.length) return null;

//     return (
//       <div
//         ref={dropdownRef}
//         className="absolute top-12 left-0 bg-white text-left text-black rounded shadow-lg z-50 border border-gray-300 w-full"
//       >
//         {options.map((option) => (
//           <div
//             key={option}
//             className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
//             onClick={() => handleSelect(field, option)}
//           >
//             {option}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearchSubmit(searchValues); // Call the passed callback function
//   };

//   return (
//     <form onSubmit={handleSubmit} className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
//       <h2 className="text-lg font-bold text-center text-gray-800 -mb-2">FindMySecurity</h2>
//       <h2 className="text-lg font-bold text-center text-gray-800 mb-2">{title}</h2>

//       <div
//         className={`${
//           isMobile ? "flex flex-col w-full gap-4" : "flex flex-wrap w-full gap-4 items-center"
//         }`}
//       >
//         <div className="relative flex-2 w-full">
//           <div
//             className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//             onClick={() => setOpenDropdown("lookingFor")}
//           >
//             {searchValues.lookingFor || "Looking For"}
//             <FaChevronDown className="ml-auto" />
//           </div>
//           {openDropdown === "lookingFor" && renderDropdown("lookingFor")}
//         </div>

//         <div className="relative flex-2 w-full">
//           <div
//             className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//             onClick={() => setOpenDropdown("subCategory")}
//           >
//             {searchValues.subCategory || "Subcategory"}
//             <FaChevronDown className="ml-auto" />
//           </div>
//           {openDropdown === "subCategory" && renderDropdown("subCategory")}
//         </div>

//         {showAdvanced && (
//           <>
//             <div className="relative flex-2 w-full">
//               <div
//                 className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//                 onClick={() => setOpenDropdown("distance")}
//               >
//                 {searchValues.distance || "Distance"}
//                 <FaChevronDown className="ml-auto" />
//               </div>
//               {openDropdown === "distance" && renderDropdown("distance")}
//             </div>

//             <div className="relative flex-2 w-full">
//               <div
//                 className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//                 onClick={() => setOpenDropdown("experience")}
//               >
//                 {searchValues.experience || "Experience"}
//                 <FaChevronDown className="ml-auto" />
//               </div>
//               {openDropdown === "experience" && renderDropdown("experience")}
//             </div>
//           </>
//         )}

//         <input
//           type="text"
//           className="flex-1 px-4 py-2 rounded-lg text-black border border-black w-full focus:outline-none focus:ring-2 focus:ring-black"
//           placeholder="Postcode"
//           value={searchValues.postcode}
//           onChange={(e) => setSearchValues({ ...searchValues, postcode: e.target.value })}
//         />

//         <button
//           type="button"
//           className={`flex items-center px-4 py-2 rounded-lg ${
//             showAdvanced
//               ? searchValues.lookingFor &&
//                 searchValues.subCategory &&
//                 searchValues.distance &&
//                 searchValues.experience &&
//                 searchValues.postcode
//                 ? "bg-black text-white hover:bg-gray-800"
//                 : "bg-gray-400 text-gray-600 cursor-not-allowed"
//               : searchValues.lookingFor &&
//                 searchValues.subCategory &&
//                 searchValues.postcode
//               ? "bg-black text-white hover:bg-gray-800"
//               : "bg-gray-400 text-gray-600 cursor-not-allowed"
//           }`}
//           onClick={(e) => {
//             const validBasic =
//               searchValues.lookingFor && searchValues.subCategory && searchValues.postcode;
//             const validAdvanced =
//               validBasic && searchValues.distance && searchValues.experience;

//             // Check if the form is valid
//             if ((showAdvanced && !validAdvanced) || (!showAdvanced && !validBasic)) {
//               // Invalid form, do nothing or you can alert the user
//               return;
//             } else {
//               // Valid form, store values in localStorage
//               localStorage.setItem("searchValues", JSON.stringify(searchValues));
//               localStorage.setItem("searchMode", showAdvanced ? "advanced" : "basic");
//               localStorage.setItem("title", JSON.stringify(title));

//               // Redirect to the next page after storing the values
//               window.location.href = "/connecting-business";
//             }
//           }}
//         >
//           <FaSearch className="mr-2" />
//           Go
//         </button>
//       </div>

//       <button
//         className="flex items-center px-4 py-2 mt-4 bg-black text-white rounded-lg hover:bg-gray-800"
//         onClick={handleToggleAdvancedSearch}
//       >
//         <FaFilter className="mr-2" />
//         {showAdvanced ? "Basic Search" : "Advanced Search"}
//       </button>
//     </form>
//   );
// }








// 20-4 commented when job ads applied
// import { useState, useEffect, useRef } from "react";
// import { FaChevronDown, FaFilter, FaSearch } from "react-icons/fa";
// import useMobileView from "@/sections/hooks/useMobileView";
// import Link from "next/link";

// interface SearchValues {
//   lookingFor: string;
//   subCategory: string;
//   distance: string;
//   experience: string;
//   postcode: string;
// }

// interface CategoryData {
//   id: string;
//   title: string;
//   roles: string[];
// }

// interface SearchComponentProps {
//   lookingForData: CategoryData[];
//   searchData: { distance: string[]; experience: string[] };
//   title?: string;
//   onSearchSubmit: (searchValues: SearchValues) => void; // Callback for search submission
// }

// export default function SearchComponent({
//   lookingForData,
//   searchData,
//   title,
//   onSearchSubmit, // Accept the callback
// }: SearchComponentProps) {
//   const [loginData, setLoginData] = useState<string | null>(null);
//   const [searchValues, setSearchValues] = useState<SearchValues>({
//     lookingFor: "",
//     subCategory: "",
//     distance: "",
//     experience: "",
//     postcode: "",
//   });

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const isMobile = useMobileView();

//   useEffect(() => {
//     const storedLoginData = localStorage.getItem("loginData");
//     setLoginData(storedLoginData);
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleToggleAdvancedSearch = () => {
//     if (!loginData) {
//       window.location.href = "/signin";
//       return;
//     }
//     setShowAdvanced(!showAdvanced);
//   };

//   const handleSelect = (field: keyof SearchValues, value: string) => {
//     setSearchValues((prev) => ({ ...prev, [field]: value }));
//     setOpenDropdown(null);
//   };

//   const renderDropdown = (field: keyof SearchValues) => {
//     let options: string[] = [];

//     if (field === "lookingFor") {
//       return (
//         <div
//           ref={dropdownRef}
//           className="absolute top-12 left-0 bg-white text-black text-left rounded shadow-lg z-50 border border-gray-300 w-full"
//         >
//           {lookingForData.map((category) => (
//             <div
//               key={category.id}
//               className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
//               onClick={() => {
//                 setSearchValues((prev) => ({
//                   ...prev,
//                   lookingFor: category.title,
//                   subCategory: "",
//                 }));
//                 setSelectedMainCategory(category.title);
//                 setOpenDropdown(null);
//               }}
//             >
//               {category.title}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     if (field === "subCategory") {
//       const selectedCategory = lookingForData.find((c) => c.title === selectedMainCategory);
//       options = selectedCategory?.roles || [];
//     }

//     if (field === "distance") options = searchData.distance;
//     if (field === "experience") options = searchData.experience;
//     if (!options.length) return null;

//     return (
//       <div
//         ref={dropdownRef}
//         className="absolute top-12 left-0 bg-white text-left text-black rounded shadow-lg z-50 border border-gray-300 w-full"
//       >
//         {options.map((option) => (
//           <div
//             key={option}
//             className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
//             onClick={() => handleSelect(field, option)}
//           >
//             {option}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearchSubmit(searchValues); // Call the passed callback function
//   };

//   return (
//     <form onSubmit={handleSubmit} className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
//       <h2 className="text-lg font-bold text-center text-gray-800 -mb-2">FindMySecurity</h2>
//       <h2 className="text-lg font-bold text-center text-gray-800 mb-2">{title}</h2>

//       <div
//         className={`${
//           isMobile ? "flex flex-col w-full gap-4" : "flex flex-wrap w-full gap-4 items-center"
//         }`}
//       >
//         <div className="relative flex-2 w-full">
//           <div
//             className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//             onClick={() => setOpenDropdown("lookingFor")}
//           >
//             {searchValues.lookingFor || "Looking For"}
//             <FaChevronDown className="ml-auto" />
//           </div>
//           {openDropdown === "lookingFor" && renderDropdown("lookingFor")}
//         </div>

//         <div className="relative flex-2 w-full">
//           <div
//             className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//             onClick={() => setOpenDropdown("subCategory")}
//           >
//             {searchValues.subCategory || "Subcategory"}
//             <FaChevronDown className="ml-auto" />
//           </div>
//           {openDropdown === "subCategory" && renderDropdown("subCategory")}
//         </div>

//         {showAdvanced && (
//           <div className="relative flex-2 w-full">
//             <div
//               className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//               onClick={() => setOpenDropdown("distance")}
//             >
//               {searchValues.distance || "Distance"}
//               <FaChevronDown className="ml-auto" />
//             </div>
//             {openDropdown === "distance" && renderDropdown("distance")}
//           </div>
//         )}

//         {showAdvanced && (
//           <div className="relative flex-2 w-full">
//             <div
//               className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//               onClick={() => setOpenDropdown("experience")}
//             >
//               {searchValues.experience || "Experience"}
//               <FaChevronDown className="ml-auto" />
//             </div>
//             {openDropdown === "experience" && renderDropdown("experience")}
//           </div>
//         )}

//         <input
//           type="text"
//           className="flex-1 px-4 py-2 rounded-lg text-black border border-black w-full focus:outline-none focus:ring-2 focus:ring-black"
//           placeholder="Postcode"
//           value={searchValues.postcode}
//           onChange={(e) => setSearchValues({ ...searchValues, postcode: e.target.value })}
//         />

// <button
//   type="button"
//   className={`flex items-center px-4 py-2 rounded-lg ${
//     showAdvanced
//       ? searchValues.lookingFor &&
//         searchValues.subCategory &&
//         searchValues.distance &&
//         searchValues.experience &&
//         searchValues.postcode
//         ? "bg-black text-white hover:bg-gray-800"
//         : "bg-gray-400 text-gray-600 cursor-not-allowed"
//       : searchValues.lookingFor &&
//         searchValues.subCategory &&
//         searchValues.postcode
//       ? "bg-black text-white hover:bg-gray-800"
//       : "bg-gray-400 text-gray-600 cursor-not-allowed"
//   }`}
//   onClick={(e) => {
//     const validBasic =
//       searchValues.lookingFor && searchValues.subCategory && searchValues.postcode;
//     const validAdvanced =
//       validBasic && searchValues.distance && searchValues.experience;

//     // Check if the form is valid
//     if ((showAdvanced && !validAdvanced) || (!showAdvanced && !validBasic)) {
//       // Invalid form, do nothing or you can alert the user
//       return;
//     } else {
//       // Valid form, store values in localStorage
//       localStorage.setItem("searchValues", JSON.stringify(searchValues));
//       localStorage.setItem("searchMode", showAdvanced ? "advanced" : "basic");
//       localStorage.setItem("title", JSON.stringify(title));

//       // Redirect to the next page after storing the values
//       window.location.href = "/connecting-business";
//     }
//   }}
// >
//   <FaSearch className="mr-2" />
//   Go
// </button>

//       </div>

//       <button
//         className="flex items-center px-4 py-2 mt-4 bg-black text-white rounded-lg hover:bg-gray-800"
//         onClick={handleToggleAdvancedSearch}
//       >
//         <FaFilter className="mr-2" />
//         {showAdvanced ? "Basic Search" : "Advanced Search"}
//       </button>
//     </form>
//   );
// }









// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaChevronDown, FaFilter, FaSearch } from "react-icons/fa";
// import useMobileView from "@/sections/hooks/useMobileView";
// import Link from "next/link";

// interface SearchValues {
//   lookingFor: string;
//   subCategory: string;
//   distance: string;
//   experience: string;
//   postcode: string;
// }

// interface CategoryData {
//   id: string;
//   title: string;
//   roles: string[];
// }

// interface SearchComponentProps {
//   lookingForData: CategoryData[];
//   searchData: { distance: string[]; experience: string[] };
//   title?: string;
// }

// export default function SearchComponent({
//   lookingForData,
//   searchData,
//   title,
// }: SearchComponentProps) {
//   const [loginData, setLoginData] = useState<string | null>(null);
//   const [searchValues, setSearchValues] = useState<SearchValues>({
//     lookingFor: "",
//     subCategory: "",
//     distance: "",
//     experience: "",
//     postcode: "",
//   });

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const isMobile = useMobileView();

//   useEffect(() => {
//     const storedLoginData = localStorage.getItem("loginData");
//     setLoginData(storedLoginData);
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleToggleAdvancedSearch = () => {
//     if (!loginData) {
//       window.location.href = "/signin";
//       return;
//     }
//     setShowAdvanced(!showAdvanced);
//   };

//   const handleSelect = (field: keyof SearchValues, value: string) => {
//     setSearchValues((prev) => ({ ...prev, [field]: value }));
//     setOpenDropdown(null);
//   };

//   const renderDropdown = (field: keyof SearchValues) => {
//     let options: string[] = [];

//     if (field === "lookingFor") {
//       return (
//         <div
//           ref={dropdownRef}
//           className="absolute top-12 left-0 bg-white text-black text-left rounded shadow-lg z-50 border border-gray-300 w-full"
//         >
//           {lookingForData.map((category) => (
//             <div
//               key={category.id}
//               className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
//               onClick={() => {
//                 setSearchValues((prev) => ({
//                   ...prev,
//                   lookingFor: category.title,
//                   subCategory: "",
//                 }));
//                 setSelectedMainCategory(category.title);
//                 setOpenDropdown(null);
//               }}
//             >
//               {category.title}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     if (field === "subCategory") {
//       const selectedCategory = lookingForData.find((c) => c.title === selectedMainCategory);
//       options = selectedCategory?.roles || [];
//     }

//     if (field === "distance") options = searchData.distance;
//     if (field === "experience") options = searchData.experience;
//     if (!options.length) return null;

//     return (
//       <div
//         ref={dropdownRef}
//         className="absolute top-12 left-0 bg-white text-left text-black rounded shadow-lg z-50 border border-gray-300 w-full"
//       >
//         {options.map((option) => (
//           <div
//             key={option}
//             className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
//             onClick={() => handleSelect(field, option)}
//           >
//             {option}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
//       <h2 className="text-lg font-bold text-center text-gray-800 -mb-2">FindMySecurity</h2>
//       <h2 className="text-lg font-bold text-center text-gray-800 mb-2">{title}</h2>

//       <div
//         className={`${
//           isMobile ? "flex flex-col w-full gap-4" : "flex flex-wrap w-full gap-4 items-center"
//         }`}
//       >
//         <div className="relative flex-2 w-full">
//           <div
//             className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//             onClick={() => setOpenDropdown("lookingFor")}
//           >
//             {searchValues.lookingFor || "Looking For"}
//             <FaChevronDown className="ml-auto" />
//           </div>
//           {openDropdown === "lookingFor" && renderDropdown("lookingFor")}
//         </div>

//         <div className="relative flex-2 w-full">
//           <div
//             className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//             onClick={() => setOpenDropdown("subCategory")}
//           >
//             {searchValues.subCategory || "Subcategory"}
//             <FaChevronDown className="ml-auto" />
//           </div>
//           {openDropdown === "subCategory" && renderDropdown("subCategory")}
//         </div>

//         {showAdvanced && (
//           <div className="relative flex-2 w-full">
//             <div
//               className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//               onClick={() => setOpenDropdown("distance")}
//             >
//               {searchValues.distance || "Distance"}
//               <FaChevronDown className="ml-auto" />
//             </div>
//             {openDropdown === "distance" && renderDropdown("distance")}
//           </div>
//         )}

//         {showAdvanced && (
//           <div className="relative flex-2 w-full">
//             <div
//               className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//               onClick={() => setOpenDropdown("experience")}
//             >
//               {searchValues.experience || "Experience"}
//               <FaChevronDown className="ml-auto" />
//             </div>
//             {openDropdown === "experience" && renderDropdown("experience")}
//           </div>
//         )}

//         <input
//           type="text"
//           className="flex-1 px-4 py-2 rounded-lg text-black border border-black w-full focus:outline-none focus:ring-2 focus:ring-black"
//           placeholder="Postcode"
//           value={searchValues.postcode}
//           onChange={(e) => setSearchValues({ ...searchValues, postcode: e.target.value })}
//         />

//         <Link
//           href={
//             showAdvanced
//               ? searchValues.lookingFor &&
//                 searchValues.subCategory &&
//                 searchValues.distance &&
//                 searchValues.experience &&
//                 searchValues.postcode
//                 ? "/connecting-business"
//                 : "#"
//               : searchValues.lookingFor &&
//                 searchValues.subCategory &&
//                 searchValues.postcode
//               ? "/connecting-business"
//               : "#"
//           }
//           className={`flex items-center px-4 py-2 rounded-lg ${
//             showAdvanced
//               ? searchValues.lookingFor &&
//                 searchValues.subCategory &&
//                 searchValues.distance &&
//                 searchValues.experience &&
//                 searchValues.postcode
//                 ? "bg-black text-white hover:bg-gray-800"
//                 : "bg-gray-400 text-gray-600 cursor-not-allowed"
//               : searchValues.lookingFor &&
//                 searchValues.subCategory &&
//                 searchValues.postcode
//               ? "bg-black text-white hover:bg-gray-800"
//               : "bg-gray-400 text-gray-600 cursor-not-allowed"
//           }`}
//           onClick={(e) => {
//             const validBasic =
//               searchValues.lookingFor && searchValues.subCategory && searchValues.postcode;
//             const validAdvanced =
//               validBasic &&
//               searchValues.distance &&
//               searchValues.experience;

//             if ((showAdvanced && !validAdvanced) || (!showAdvanced && !validBasic)) {
//               e.preventDefault();
//             } else {
//               localStorage.setItem("searchValues", JSON.stringify(searchValues));
//               localStorage.setItem("searchMode", showAdvanced ? "advanced" : "basic");
//               localStorage.setItem("title",JSON.stringify(title))
//             }
//           }}
//         >
//           <FaSearch className="mr-2" />
//           Go
//         </Link>
//       </div>

//       <button
//         className="flex items-center px-4 py-2 mt-4 bg-black text-white rounded-lg hover:bg-gray-800"
//         onClick={handleToggleAdvancedSearch}
//       >
//         <FaFilter className="mr-2" />
//         {showAdvanced ? "Basic Search" : "Advanced Search"}
//       </button>
//     </div>
//   );
// }









// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaChevronDown, FaFilter, FaSearch } from "react-icons/fa";
// import useMobileView from "@/sections/hooks/useMobileView";
// import Link from "next/link";
// interface SearchValues {
//   lookingFor: string;
//   subCategory: string;
//   distance: string;
//   experience: string;
//   postcode: string;
// }

// interface CategoryData {
//     id: string;  // Change 'number' to 'string' since your JSON uses string IDs
//     title: string;
//     roles: string[];
//   }
  

// interface SearchComponentProps {
//   lookingForData: CategoryData[];
//   searchData: { distance: string[]; experience: string[] };
//   title?: string; 
// }

// export default function SearchComponent({ lookingForData, searchData,title }: SearchComponentProps)  {
//   const [loginData, setLoginData] = useState<string | null>(null);
//   const [searchValues, setSearchValues] = useState<SearchValues>({
//     lookingFor: "",
//     subCategory: "",
//     distance: "",
//     experience: "",
//     postcode: "",
//   });

 
//   // ✅ Use useEffect to safely access localStorage in the browser
//   useEffect(() => {
//     const storedLoginData = localStorage.getItem("loginData");
//     setLoginData(storedLoginData);
//   }, []);

//   const handleToggleAdvancedSearch = () => {
//     if (!loginData) {
//       window.location.href = "/signin"; // Redirect to sign-in page
//       return;
//     }
//     setShowAdvanced(!showAdvanced);
//   };
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const isMobile = useMobileView();

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpenDropdown(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (field: keyof SearchValues, value: string) => {
//     setSearchValues((prev) => ({ ...prev, [field]: value }));
//     setOpenDropdown(null);
//   };

//   const renderDropdown = (field: keyof SearchValues) => {
//     let options: string[] = [];

//     if (field === "lookingFor") {
//       return (
//         <div ref={dropdownRef} className="absolute top-12 bg-white text-black text-left rounded shadow-lg z-50 border border-gray-300 w-64">
//           {lookingForData.map((category) => (
//             <div
//               key={category.id}
//               className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
//               onClick={() => {
//                 setSearchValues((prev) => ({ ...prev, lookingFor: category.title, subCategory: "" }));
//                 setSelectedMainCategory(category.title);
//                 setOpenDropdown(null);
//               }}
//             >
//               {category.title}
//             </div>
//           ))}
//         </div>
//       );
//     }

//     if (field === "subCategory") {
//       const selectedCategory = lookingForData.find((c) => c.title === selectedMainCategory);
//       options = selectedCategory?.roles || [];
//     }

//     if (field === "distance") options = searchData.distance;
//     if (field === "experience") options = searchData.experience;
//     if (!options.length) return null;

//     return (
//       <div ref={dropdownRef} className="absolute top-12 bg-white text-left text-black rounded shadow-lg z-50 border border-gray-300 w-64">
//         {options.map((option) => (
//           <div
//             key={option}
//             className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer text-sm"
//             onClick={() => handleSelect(field, option)}
//           >
//             {option}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="relative bg-gray-300 z-10 p-6 rounded-lg w-full max-w-5xl shadow-xl">
//       <h2 className="text-lg font-bold text-center text-gray-800 -mb-2">FindMySecurity</h2>
//       <h2 className="text-lg font-bold text-center text-gray-800 mb-2">{title}</h2>

//       <div className={`${isMobile ? "flex flex-col w-full gap-4" : "flex flex-wrap w-full gap-4 items-center"}`}>
//         <div className="relative flex-2">
//           <div
//             className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//             onClick={() => setOpenDropdown("lookingFor")}
//           >
//             {searchValues.lookingFor || "Looking For"}
//             <FaChevronDown className="ml-auto" />
//           </div>
//           {openDropdown === "lookingFor" && renderDropdown("lookingFor")}
//         </div>

//         <div className="relative flex-2">
//           <div
//             className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//             onClick={() => setOpenDropdown("subCategory")}
//           >
//             {searchValues.subCategory || "Subcategory"}
//             <FaChevronDown className="ml-auto" />
//           </div>
//           {openDropdown === "subCategory" && renderDropdown("subCategory")}
//         </div>

//         {showAdvanced && (
//           <div className="relative flex-2">
//             <div
//               className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//               onClick={() => setOpenDropdown("distance")}
//             >
//               {searchValues.distance || "Distance"}
//               <FaChevronDown className="ml-auto" />
//             </div>
//             {openDropdown === "distance" && renderDropdown("distance")}
//           </div>
//         )}

//         {showAdvanced && (
//           <div className="relative flex-2">
//             <div
//               className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg w-full"
//               onClick={() => setOpenDropdown("experience")}
//             >
//               {searchValues.experience || "Experience"}
//               <FaChevronDown className="ml-auto" />
//             </div>
//             {openDropdown === "experience" && renderDropdown("experience")}
//           </div>
//         )}

//         <input
//           type="text"
//           className="flex-1 px-4 py-2 rounded-lg text-black border border-black w-full focus:outline-none focus:ring-2 focus:ring-black"
//           placeholder="Postcode"
//           value={searchValues.postcode}
//           onChange={(e) => setSearchValues({ ...searchValues, postcode: e.target.value })}
//         />

//         {/* <button > */}
//        {/* Disable the link when required fields are empty */}
       
//        <Link
//   href={
//     (showAdvanced
//       ? searchValues.lookingFor && searchValues.subCategory && searchValues.distance && searchValues.experience && searchValues.postcode
//       : searchValues.lookingFor && searchValues.subCategory && searchValues.postcode)
//       ? "/connecting-business"
//       : "#"
//   }
//   className={`flex items-center px-4 py-2 rounded-lg ${
//     (showAdvanced
//       ? searchValues.lookingFor && searchValues.subCategory && searchValues.distance && searchValues.experience && searchValues.postcode
//       : searchValues.lookingFor && searchValues.subCategory && searchValues.postcode)
//       ? "bg-black text-white hover:bg-gray-800"
//       : "bg-gray-400 text-gray-600 cursor-not-allowed"
//   }`}
//   onClick={(e) => {
//     if (
//       (showAdvanced
//         ? !searchValues.lookingFor || !searchValues.subCategory || !searchValues.distance || !searchValues.experience || !searchValues.postcode
//         : !searchValues.lookingFor || !searchValues.postcode)
//     ) {
//       e.preventDefault();
//     } else {
//       // Save to localStorage when valid and navigating
//       localStorage.setItem('searchValues', JSON.stringify(searchValues));
//       localStorage.setItem('searchMode', showAdvanced ? 'advanced' : 'basic');
//     }
//   }}
// >
//   <FaSearch className="mr-2" />
//   Go
// </Link>
       
//       </div>

//       <button
//       className="flex items-center px-4 py-2 mt-4 bg-black text-white rounded-lg hover:bg-gray-800"
//       onClick={handleToggleAdvancedSearch}
//     >
//       <FaFilter className="mr-2" />
//       {showAdvanced ? "Basic Search" : "Advanced Search"}
//     </button>
//     </div>
//   );
// }



{/* <Link
  href={
    // Check if either Basic or Advanced search fields are filled
    (showAdvanced
      ? searchValues.lookingFor && searchValues.subCategory && searchValues.distance && searchValues.experience && searchValues.postcode
      : searchValues.lookingFor && searchValues.subCategory && searchValues.postcode) // For Basic Search: Only lookingFor and postcode
      ? "/connecting-business"
      : "#"
  }
  className={`flex items-center px-4 py-2 rounded-lg ${
    (showAdvanced
      ? searchValues.lookingFor && searchValues.subCategory && searchValues.distance && searchValues.experience && searchValues.postcode
      : searchValues.lookingFor && searchValues.subCategory && searchValues.postcode) // Apply condition based on the mode
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-gray-400 text-gray-600 cursor-not-allowed"
  }`}
  onClick={(e) => {
    // Prevent navigation if required fields for the current search mode are not filled
    if (
      (showAdvanced
        ? !searchValues.lookingFor || !searchValues.subCategory || !searchValues.distance || !searchValues.experience || !searchValues.postcode
        : !searchValues.lookingFor || !searchValues.postcode) // Basic search checks only lookingFor and postcode
    ) {
      e.preventDefault(); // Prevent navigation when fields are empty
    }
  }}
>
  <FaSearch className="mr-2" />
  Go
</Link> */}

       
          {/* <Link href='/connecting-business' className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          <FaSearch className="mr-2" />
          Go
          </Link> */}
        {/* </button> */}