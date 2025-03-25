import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const whatWeDo = [
  { title: "Our Company", id: "our-company", link: "/our-company" },
  { title: "Sustainability", id: "sustainability", link: "/sustainability" },
  { title: "News & Events", id: "news-events", link: "/news-events" },
  { title: "Careers", id: "careers", link: "/careers" },
  { title: "Investors", id: "investors", link: "/investors" },
];

const ResourcesDropdown = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-md font-semibold">
      <button
        className="flex items-center hover:text-gray-400"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        Resources <ChevronDown className="h-5 w-5 ml-1" />
      </button>

      {openDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg border w-64 z-50"
        >
          {whatWeDo.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="block px-4 py-2 hover:bg-gray-200"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesDropdown;

