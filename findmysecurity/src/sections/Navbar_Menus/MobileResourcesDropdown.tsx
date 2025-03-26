import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const whatWeDo = [
  { title: "What we do", id: "what-we-do", link: "/what-we-do" },
  { title: "Our Company", id: "our-company", link: "/our-company" },
  { title: "Sustainability", id: "sustainability", link: "/sustainability" },
  { title: "News & Events", id: "news-events", link: "/news-events" },
  { title: "Careers", id: "careers", link: "/careers" },
  { title: "Investors", id: "investors", link: "/investors" },
];

const MobileResourcesDropdown = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="w-full text-white">
      {/* Main Dropdown Button */}
      <button
        className="w-full text-left py-2 px-4 flex justify-between items-center border-b border-gray-600"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        Resources
        <ChevronDown className={`h-2 w-2 transition-transform ${openDropdown ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Content */}
      {openDropdown && (
        <div className="pl-4 border-l border-gray-600">
          {whatWeDo.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="block py-2 hover:text-gray-300"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileResourcesDropdown;
