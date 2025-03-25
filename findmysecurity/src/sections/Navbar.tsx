"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Cross, Lock, Menu, LogOut } from "lucide-react";
import { useRouter } from 'next/navigation'
import ResourcesDropdown from "./Navbar_Menus/ResourcesDropdown";
import DynamicDropdown from "./Navbar_Menus/DynamicDropdown";
import MobileDynamicDropdown from "./Navbar_Menus/MobileDropdown";
import MobileResourcesDropdown from "./Navbar_Menus/MobileResourcesDropdown";
export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("loginData");
    if (storedData) {
      setProfileData(JSON.parse(storedData)); // Parse JSON data
    }
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);
  const handleLogout = () => {
    localStorage.removeItem("loginData"); // Remove user session
    // localStorage.clear();
    setProfileData(null); // Update state to reflect logout
    router.push('/')
  };


  return (
      <nav className="bg-black bg-opacity-90 backdrop-blur-md px-0 sm:px-0 md:px-12 lg:px-20 xl:px-26 text-white fixed top-0 left-0 shadow-md z-50 w-full">
      <div className="container mx-auto px-3 py-5 flex items-center justify-between">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
          <img
            src="/icons/logo.jpg"
            alt="Logo"
            width={35}
            height={35}
            className="rounded-md"
          />
          <span>FindMySecurity</span>
        </Link>
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <Cross /> : <Menu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {/* Solution Dropdown */}
          <DynamicDropdown jsonFile="secuirty_professional.json" title="Security Professionals" basePath="/professionals/" />
          <DynamicDropdown jsonFile="secuirty_services.json" title="Security Services" basePath="/services/" />
          <DynamicDropdown jsonFile="training_providers.json" title="Training Providers" basePath="/providers/" />

          <Link href="/insurance" className="text-md font-semibold hover:text-gray-400">
            Insurance Cover
          </Link>
          <ResourcesDropdown />

        </div>
        {profileData ? (
          <>
            <div className="hidden md:flex items-center space-x-4">

              <button onClick={handleLogout} className="text-white flex items-center space-x-2 ease-in-out hover:text-gray-200">
                <LogOut className="h-4 w-4" />
                <span className="font-bold">Logout</span>
              </button>
              <Link href="/profile" className="bg-white text-black px-4 py-1 font-bold rounded-full text-center ease-in-out hover:bg-gray-200">
                My Profile
              </Link>
            </div>
          </>

        )
          : (
            <>
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/signup" className="bg-white text-black px-4 py-1 font-bold rounded-full text-center ease-in-out hover:bg-gray-200">
                  Sign Up
                </Link>

                <Link href="/signin" className="text-white flex items-center space-x-2 ease-in-out hover:text-gray-200">
                  <Lock className="h-4 w-4" />
                  <span className="font-bold">Web Login</span>
                </Link>
              </div>

            </>
          )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white p-4">

          {/* Solution Dropdown */}
          <MobileDynamicDropdown jsonFile="secuirty_professional.json" title="Security Professionals" basePath="/professionals/" />
          <MobileDynamicDropdown jsonFile="secuirty_services.json" title="Security Services" basePath="/services/" />
          <MobileDynamicDropdown jsonFile="training_providers.json" title="Training Providers" basePath="/providers/" />
          <Link href="/insurance" className="block ml-4 py-2 hover:text-gray-300">
            Insurance Cover
          </Link>
          <MobileResourcesDropdown />
          {profileData ? (
            <>

              <button onClick={handleLogout} className="block py-2 text-center hover:text-gray-300">
                Logout
              </button>
              <Link href="/profile" className="block py-2 bg-white text-black text-center rounded">
                My Profile
              </Link>
            </>

          )
            : (
              <>
                <Link href="/signup" className="block py-2 bg-white text-black text-center rounded">
                  Sign Up
                </Link>
                <Link href="/signin" className="block py-2 text-center hover:text-gray-300">
                  Web Login
                </Link>
              </>
            )}


        </div>
      )}
    </nav>
  );
}
