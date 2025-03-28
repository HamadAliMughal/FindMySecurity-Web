import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Category {
  title: string;
  id: string;
  roles: string[]; // Updated key from "subcategories" to "roles"
}

interface DropdownProps {
  jsonFile: string; // JSON file name (e.g., "security_services.json")
  title: string; // Dropdown title (e.g., "Security Services")
  basePath: string; // Base path for links (e.g., "/services/")
}

const DynamicDropdown: React.FC<DropdownProps> = ({ jsonFile, title, basePath }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [submenuStyle, setSubmenuStyle] = useState<{ top?: string; bottom?: string }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Load categories from JSON dynamically
  useEffect(() => {
    import(`../data/${jsonFile}`)
      .then((module) => setCategories(module.default))
      .catch((error) => console.error("Error loading JSON:", error));
  }, [jsonFile]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
        setOpenSubDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Adjust submenu position dynamically
    setSubmenuStyle(spaceBelow < 200 && spaceAbove > 200 ? { bottom: "100%", top: "auto" } : { top: "0", bottom: "auto" });

    // Toggle submenu
    setOpenSubDropdown(openSubDropdown === categoryId ? null : categoryId);
  };

  return (
    <div className="relative text-md font-semibold">
      <button
        className="flex items-center hover:text-gray-400"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {title} <ChevronDown className="h-5 w-5 ml-1" />
      </button>

      {openDropdown && (
        <div ref={dropdownRef} className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg border w-80 z-50">
          {categories.map((category) => (
            <div key={category.id} className="relative">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
                onClick={(e) => handleCategoryClick(category.id, e)}
              >
                {category.title} <ChevronRight className="h-5 w-5 ml-1" />
              </button>

              {openSubDropdown === category.id && (
                <div
                  className="absolute left-full top-0 ml-2 bg-white text-black rounded shadow-lg border w-80 z-50 max-h-60 overflow-y-auto"
                  style={submenuStyle}
                >
                  {category.roles.map((role, index) => ( // Updated from "subcategories" to "roles"
                    <Link
                      key={index}
                      href={`${basePath}${role.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      {role}
                    </Link>
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

export default DynamicDropdown;
