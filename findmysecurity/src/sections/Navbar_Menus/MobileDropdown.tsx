"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Category {
  title: string;
  id: string;
  roles: string[];
}

interface DropdownProps {
  jsonFile: string;
  title: string;
  basePath: string;
}

const MobileDynamicDropdown: React.FC<DropdownProps> = ({ jsonFile, title }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    import(`../data/${jsonFile}`)
      .then((module) => setCategories(module.default))
      .catch((error) => console.error("Error loading JSON:", error));
  }, [jsonFile]);

  const toggleSubDropdown = (categoryId: string) => {
    setOpenSubDropdown(openSubDropdown === categoryId ? null : categoryId);
  };

  const handleRoleClick = (categoryTitle: string, role: string) => {
    const params = new URLSearchParams();
    let targetPath = "";

    switch (title) {
      case "Security Professionals":
        targetPath = "/professionals";
        params.set("role", categoryTitle);
        role.split(",").forEach((sub) => {
          if (sub.trim()) params.append("subcategory", sub.trim());
        });
        params.set("page", "1");
        params.set("pageSize", "10");
        break;

      case "Security Services":
        targetPath = "/security-companies";
        params.set("sr", categoryTitle);
        params.set("so", role);
        params.set("page", "1");
        break;

      case "Training Providers":
        targetPath = "/course-provider";
        params.set("sr", categoryTitle);
        params.set("so", role);
        params.set("page", "1");
        break;

      default:
        targetPath = "/connecting-business";
        params.set("lookingFor", categoryTitle);
        params.set("subCategory", role);
        params.set("page", "1");
        break;
    }

    router.push(`${targetPath}?${params.toString()}`);
    setOpenDropdown(false);
    setOpenSubDropdown(null);
  };

  return (
    <div className="w-full text-white">
      <button
        className="w-full text-left py-2 px-4 flex justify-between items-center border-b border-gray-600"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {title}
        <ChevronDown className={`h-5 w-5 transition-transform ${openDropdown ? "rotate-180" : ""}`} />
      </button>

      {openDropdown && (
        <div className="pl-4 border-l border-gray-600">
          {categories.map((category) => (
            <div key={category.id} className="relative">
              <button
                className="w-full text-left py-2 flex justify-between items-center hover:text-gray-300"
                onClick={() => toggleSubDropdown(category.id)}
              >
                {category.title}
                <ChevronRight className={`h-5 w-5 transition-transform ${openSubDropdown === category.id ? "rotate-90" : ""}`} />
              </button>

              {openSubDropdown === category.id && (
                <div className="ml-4 border-l border-gray-600 pl-4">
                  {category.roles.map((role, index) => (
                    <button
                      key={index}
                      onClick={() => handleRoleClick(category.title, role)}
                      className="block py-2 text-left hover:text-gray-300 w-full"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileDynamicDropdown;







// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { ChevronDown, ChevronRight } from "lucide-react";

// interface Category {
//   title: string;
//   id: string;
//   roles: string[];
// }

// interface DropdownProps {
//   jsonFile: string;
//   title: string;
//   basePath: string;
// }

// const MobileDynamicDropdown: React.FC<DropdownProps> = ({ jsonFile, title, basePath }) => {
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);

//   // Load categories dynamically from JSON
//   useEffect(() => {
//     import(`../data/${jsonFile}`)
//       .then((module) => setCategories(module.default))
//       .catch((error) => console.error("Error loading JSON:", error));
//   }, [jsonFile]);

//   const toggleSubDropdown = (categoryId: string) => {
//     setOpenSubDropdown(openSubDropdown === categoryId ? null : categoryId);
//   };

//   return (
//     <div className="w-full text-white">
//       {/* Main Dropdown Toggle */}
//       <button
//         className="w-full text-left py-2 px-4 flex justify-between items-center border-b border-gray-600"
//         onClick={() => setOpenDropdown(!openDropdown)}
//       >
//         {title}
//         <ChevronDown className={`h-5 w-5 transition-transform ${openDropdown ? "rotate-180" : ""}`} />
//       </button>

//       {/* Dropdown Content */}
//       {openDropdown && (
//         <div className="pl-4 border-l border-gray-600">
//           {categories.map((category) => (
//             <div key={category.id} className="relative">
//               {/* Category Button */}
//               <button
//                 className="w-full text-left py-2 flex justify-between items-center hover:text-gray-300"
//                 onClick={() => toggleSubDropdown(category.id)}
//               >
//                 {category.title}
//                 <ChevronRight className={`h-5 w-5 transition-transform ${openSubDropdown === category.id ? "rotate-90" : ""}`} />
//               </button>

//               {/* Subcategory List */}
//               {openSubDropdown === category.id && (
//                 <div className="ml-4 border-l border-gray-600 pl-4">
//                   {category.roles.map((role, index) => (
//                     <Link
//                       key={index}
//                       href={`${basePath}${role.toLowerCase().replace(/\s+/g, "-")}`}
//                       className="block py-2 hover:text-gray-300"
//                     >
//                       {role}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MobileDynamicDropdown;
