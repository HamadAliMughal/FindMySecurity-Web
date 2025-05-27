import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";


const whatWeDo = [
  { title: "Our Purpose", id: "our-purpose", link: "/our-purpose" },
  { title: "Our Values", id: "our-values", link: "/our-values" },
  { title: "Who We Are", id: "who-we-are", link: "/who-we-are" },
  { title: "What we do", id: "what-we-do", link: "/what-we-do" },
  { title: "Contact US ", id: "contact-us ", link: "/contact-us" },
  { title: "AI Chatbot", id: "chatbot", link: "/chatbot-ui" },
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

