"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, X } from "@deemlol/next-icons";
import { FaLock } from "react-icons/fa";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
    setOpenSubDropdown(null); // Reset sub-dropdown when toggling main dropdown
  };

  const toggleSubDropdown = (submenu: string) => {
    setOpenSubDropdown(openSubDropdown === submenu ? null : submenu);
  };

  return (
    <nav className="bg-black bg-opacity-90 backdrop-blur-md px-38 text-white fixed top-0 left-0 shadow-md z-50 w-full ">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold">
          FindMySecurity
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {/* Platform Dropdown */}
          <div className="relative text-md font-semibold">
            <button
              className="flex items-center hover:text-gray-400"
              onClick={() => toggleDropdown("platform")}
            >
              Platform <ChevronDown className="h-6 w-6 ml-1" />
            </button>
            {openDropdown === "platform" && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg border w-56 z-50">
                <Link href="/platform/feature1" className="block px-4 py-2 hover:bg-gray-200">
                  Feature 1
                </Link>
                <Link href="/platform/feature2" className="block px-4 py-2 hover:bg-gray-200">
                  Feature 2
                </Link>
              </div>
            )}
          </div>

          {/* Solution Dropdown */}
          <div className="relative text-md font-semibold">
            <button
              className="flex items-center hover:text-gray-400"
              onClick={() => toggleDropdown("solution")}
            >
              Solution <ChevronDown className="h-6 w-6 ml-1" />
            </button>
            {openDropdown === "solution" && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg border w-72 z-50">
                {/* Corporate & Executive Security with Submenu */}
                <div className="relative">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
                    onClick={() => toggleSubDropdown("corporate-security")}
                  >
                    Corporate & Executive Security
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {openSubDropdown === "corporate-security" && (
                    <div className="absolute left-full top-0 ml-2 bg-white text-black rounded shadow-lg border w-72 z-50">
                      <Link href="/solution/executive-protection-officer" className="block px-4 py-2 hover:bg-gray-200">
                        Executive Protection Officer
                      </Link>
                      <Link href="/solution/travel-risk-manager" className="block px-4 py-2 hover:bg-gray-200">
                        Travel Risk Manager
                      </Link>
                      <Link href="/solution/hotel-security-manager" className="block px-4 py-2 hover:bg-gray-200">
                        Hotel Security Manager
                      </Link>
                      <Link href="/solution/bank-security-manager" className="block px-4 py-2 hover:bg-gray-200">
                        Bank & Financial Institution Security Manager
                      </Link>
                      <Link href="/solution/data-centre-security-manager" className="block px-4 py-2 hover:bg-gray-200">
                        Data Centre Security Manager
                      </Link>
                    </div>
                  )}
                </div>

                <Link href="/solution/physical-security-manned-guarding" className="block px-4 py-2 hover:bg-gray-200">
                  Physical Security & Manned Guarding
                </Link>
                <Link href="/solution/specialist-security-roles" className="block px-4 py-2 hover:bg-gray-200">
                  Specialist Security Roles
                </Link>
                <Link href="/solution/surveillance-monitoring" className="block px-4 py-2 hover:bg-gray-200">
                  Surveillance & Monitoring
                </Link>
                <Link href="/solution/cyber-security-information-security" className="block px-4 py-2 hover:bg-gray-200">
                  Cyber Security & Information Security
                </Link>
              </div>
            )}
          </div>

          <Link href="/pricing" className="text-md font-semibold hover:text-gray-400">
            Pricing
          </Link>

          {/* Resources Dropdown */}
          <div className="relative text-md font-semibold">
            <button
              className="flex items-center hover:text-gray-400"
              onClick={() => toggleDropdown("resources")}
            >
              Resources <ChevronDown className="h-6 w-6 ml-1" />
            </button>
            {openDropdown === "resources" && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg border w-48 z-50">
                <Link href="/resources/about" className="block px-4 py-2 hover:bg-gray-200">
                  About
                </Link>
                <Link href="/resources/contact" className="block px-4 py-2 hover:bg-gray-200">
                  Contact us
                </Link>
                <Link href="/resources/customers" className="block px-4 py-2 hover:bg-gray-200">
                  Customer success
                </Link>
                <Link href="/resources/support" className="block px-4 py-2 hover:bg-gray-200">
                  Support center
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Login / Signup */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/signup" className="bg-white text-black px-4 py-1 font-bold rounded-full text-center ease-in-out hover:bg-gray-200">
            Sign Up
          </Link>

          <Link href="/signin" className="text-white flex items-center space-x-2 ease-in-out hover:text-gray-200">
            <FaLock className="h-4 w-4" />
            <span className="font-bold">Web Login</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white p-4">
          <Link href="/platform" className="block py-2">Platform</Link>
          <Link href="/solution" className="block py-2">Solution</Link>
          <Link href="/pricing" className="block py-2">Pricing</Link>
          <Link href="/resources" className="block py-2">Resources</Link>
          <Link href="/signup" className="block py-2 bg-white text-black text-center rounded">Sign Up</Link>
          <Link href="/signin" className="block py-2 text-center">Web Login</Link>
        </div>
      )}
    </nav>
  );
}
