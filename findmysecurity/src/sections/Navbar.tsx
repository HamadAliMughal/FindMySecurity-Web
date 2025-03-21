"use client";
import { useState } from "react";
import Link from "next/link";
import Icons from '../constants/icons/icons'

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
    // <nav className="bg-black bg-opacity-90 backdrop-blur-md px-38 text-white fixed top-0 left-0 shadow-md z-50 w-full ">
    //   <div className="container mx-auto px-6 py-5 flex items-center justify-between">
    <nav className="bg-black bg-opacity-90 backdrop-blur-md px-0 sm:px-0 md:px-12 lg:px-20 xl:px-38 text-white fixed top-0 left-0 shadow-md z-50 w-full">
    <div className="container mx-auto px-6 py-5 flex items-center justify-between">
    
      {/* Logo */}
      
      <Link href="/" className="flex items-center gap-3 text-3xl font-bold">
        <img
          src="/icons/logo.jpg" // Update this path to your logo image
          alt="Logo"
          width={40} // Adjust size as needed
          height={40}
          className="rounded-md" // Optional styling
        />
        <span>FindMySecurity</span>
      </Link>
        {/* <Link href="/" className="text-3xl font-bold">
        
          FindMySecurity
        </Link> */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {/* Platform Dropdown */}
          <div className="relative text-md font-semibold">
            <button
              className="flex items-center hover:text-gray-400"
              onClick={() => toggleDropdown("platform")}
            >
              Platform <Icons.ChevronDown className="h-6 w-6 ml-1" />
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
              Solution <Icons.ChevronDown className="h-6 w-6 ml-1" />
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
                    <Icons.ChevronRight className="h-5 w-5" />
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

                <div className="relative">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
                    onClick={() => toggleSubDropdown("physical-security")}
                  >
                    Physical Security & Manned Guarding
                    <Icons.ChevronRight className="h-5 w-5" />
                  </button>
                  {openSubDropdown === "physical-security" && (
                    <div className="absolute left-full top-0 ml-2 bg-white text-black rounded shadow-lg border w-72 z-50">
                      <Link href="/solution/security-officer" className="block px-4 py-2 hover:bg-gray-200">
                        Security Officer
                      </Link>
                      <Link href="/solution/retail-security-officer" className="block px-4 py-2 hover:bg-gray-200">
                        Retail Security Officer
                      </Link>
                      <Link href="/solution/corporate-security-officer" className="block px-4 py-2 hover:bg-gray-200">
                        Corporate Security Officer
                      </Link>
                      <Link href="/solution/door-supervisor" className="block px-4 py-2 hover:bg-gray-200">
                        Door Supervisor
                      </Link>
                      <Link href="/solution/event-security-officer" className="block px-4 py-2 hover:bg-gray-200">
                        Event Security Officer
                      </Link>
                      <Link href="/solution/mobile-patrol-officer" className="block px-4 py-2 hover:bg-gray-200">
                        Mobile Patrol Officer
                      </Link>
                      <Link href="/solution/loss-prevention-officer" className="block px-4 py-2 hover:bg-gray-200">
                        Loss Prevention Officer
                      </Link>
                      <Link href="/solution/access-control-officer" className="block px-4 py-2 hover:bg-gray-200">
                        Access Control Officer
                      </Link>
                    </div>
                  )}
                </div>
                <div className="relative"> 
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
          onClick={() => toggleSubDropdown("specialist-security")}
        >
          Specialist Security Roles
          <Icons.ChevronRight className="h-5 w-5" />
        </button>
        {openSubDropdown === "specialist-security" && (
          <div className="absolute left-full top-0 ml-2 bg-white text-black rounded shadow-lg border w-72 z-50">
            <Link href="/solution/close-protection-officer" className="block px-4 py-2 hover:bg-gray-200">
              Close Protection Officer (CPO)
            </Link>
            <Link href="/solution/maritime-security-officer" className="block px-4 py-2 hover:bg-gray-200">
              Maritime Security Officer (MSO)
            </Link>
            <Link href="/solution/aviation-security-officer" className="block px-4 py-2 hover:bg-gray-200">
              Aviation Security Officer
            </Link>
            <Link href="/solution/high-value-goods-escort" className="block px-4 py-2 hover:bg-gray-200">
              High-Value Goods Escort Officer
            </Link>
            <Link href="/solution/residential-security-team" className="block px-4 py-2 hover:bg-gray-200">
              Residential Security Team (RST) Member
            </Link>
            <Link href="/solution/k9-security-handler" className="block px-4 py-2 hover:bg-gray-200">
              K9 Security Handler
            </Link>
            <Link href="/solution/hostile-environment-security-advisor" className="block px-4 py-2 hover:bg-gray-200">
              Hostile Environment Security Advisor
            </Link>
            <Link href="/solution/asset-protection-officer" className="block px-4 py-2 hover:bg-gray-200">
              Asset Protection Officer
            </Link>
          </div>
        )}
      </div>
                
      <div className="relative"> 
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
          onClick={() => toggleSubDropdown("surveillance-monitoring")}
        >
          Surveillance & Monitoring
          <Icons.ChevronRight className="h-5 w-5" />
        </button>
        {openSubDropdown === "surveillance-monitoring" && (
          <div className="absolute left-full top-0 ml-2 bg-white text-black rounded shadow-lg border w-72 z-50">
            <Link href="/solution/cctv-operator" className="block px-4 py-2 hover:bg-gray-200">
              CCTV Operator
            </Link>
            <Link href="/solution/security-control-room-operator" className="block px-4 py-2 hover:bg-gray-200">
              Security Control Room Operator
            </Link>
            <Link href="/solution/covert-surveillance-operative" className="block px-4 py-2 hover:bg-gray-200">
              Covert Surveillance Operative
            </Link>
            <Link href="/solution/counter-surveillance-specialist" className="block px-4 py-2 hover:bg-gray-200">
              Counter-Surveillance Specialist
            </Link>
            <Link href="/solution/technical-surveillance-countermeasures" className="block px-4 py-2 hover:bg-gray-200">
              Technical Surveillance Countermeasures (TSCM) Specialist
            </Link>
            <Link href="/solution/intelligence-analyst-security" className="block px-4 py-2 hover:bg-gray-200">
              Intelligence Analyst (Security)
            </Link>
            <Link href="/solution/forensic-security-investigator" className="block px-4 py-2 hover:bg-gray-200">
              Forensic Security Investigator
            </Link>
             </div>
             )}
            </div>
                <Link href="/solution/cyber-security-information-security" className="block px-4 py-2 hover:bg-gray-200">
                  Cyber Security & Information Security <i>(Coming Soon)</i>
                </Link>
                <Link href="/solution/risk-management-consultancy" className="block px-4 py-2 hover:bg-gray-200">
                  Risk Management & Consultancy <i>(Coming Soon)</i>
                </Link>
                <Link href="/solution/private-investigation-specialist-roles" className="block px-4 py-2 hover:bg-gray-200">
                  Private Investigation & Specialist Roles <i>(Coming Soon)</i>
                </Link>
                <Link href="/solution/transport-logistics-security" className="block px-4 py-2 hover:bg-gray-200">
                  Transport & Logistics Security <i>(Coming Soon)</i>
                </Link>
                <Link href="/solution/access-technology-system-specialist" className="block px-4 py-2 hover:bg-gray-200">
                  Access Technology & System Specialist <i>(Coming Soon)</i>
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
              Resources <Icons.ChevronDown className="h-6 w-6 ml-1" />
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
            <Icons.Lock className="h-4 w-4" />
            <span className="font-bold">Web Login</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
  <div className="md:hidden bg-black text-white p-4">
    
    {/* Platform Dropdown */}
    <div className="relative">
      <button
        className="w-full text-left py-2 hover:text-gray-400 flex justify-between items-center"
        onClick={() => toggleDropdown("platform")}
      >
        Platform <Icons.ChevronDown className="h-5 w-5" />
      </button>
      {openDropdown === "platform" && (
        <div className="ml-4 border-l border-gray-600 pl-4">
          <Link href="/platform/feature1" className="block py-2 hover:text-gray-300">
            Feature 1
          </Link>
          <Link href="/platform/feature2" className="block py-2 hover:text-gray-300">
            Feature 2
          </Link>
        </div>
      )}
    </div>

    {/* Solution Dropdown */}
    <div className="relative">
      <button
        className="w-full text-left py-2 hover:text-gray-400 flex justify-between items-center"
        onClick={() => toggleDropdown("solution")}
      >
        Solution <Icons.ChevronDown className="h-5 w-5" />
      </button>
      {openDropdown === "solution" && (
        <div className="ml-4 border-l border-gray-600 pl-4">

          {/* Corporate & Executive Security */}
          <div className="relative">
            <button
              className="w-full text-left py-2 hover:text-gray-300 flex justify-between items-center"
              onClick={() => toggleSubDropdown("corporate-security")}
            >
              Corporate & Executive Security <Icons.ChevronRight className="h-5 w-5" />
            </button>
            {openSubDropdown === "corporate-security" && (
               <div className="ml-4 border-l border-gray-600 pl-4">
               <Link href="/solution/executive-protection-officer" className="block py-2 hover:text-gray-300">
                 Executive Protection Officer
               </Link>
               <Link href="/solution/travel-risk-manager" className="block py-2 hover:text-gray-300">
                 Travel Risk Manager
               </Link>
               <Link href="/solution/hotel-security-manager" className="block py-2 hover:text-gray-300">
                 Hotel Security Manager
               </Link>
               <Link href="/solution/bank-security-manager" className="block py-2 hover:text-gray-300">
                 Bank & Financial Institution Security Manager
               </Link>
               <Link href="/solution/data-centre-security-manager" className="block py-2 hover:text-gray-300">
                 Data Centre Security Manager
               </Link>
             </div>
            )}
          </div>

          {/* Physical Security & Manned Guarding */}
          <div className="relative">
            <button
              className="w-full text-left py-2 hover:text-gray-300 flex justify-between items-center"
              onClick={() => toggleSubDropdown("physical-security")}
            >
              Physical Security & Manned Guarding <Icons.ChevronRight className="h-5 w-5" />
            </button>
            {openSubDropdown === "physical-security" && (
               <div className="ml-4 border-l border-gray-600 pl-4">
               <Link href="/solution/security-officer" className="block py-2 hover:text-gray-300">
                 Security Officer
               </Link>
               <Link href="/solution/retail-security-officer" className="block py-2 hover:text-gray-300">
                 Retail Security Officer
               </Link>
               <Link href="/solution/corporate-security-officer" className="block py-2 hover:text-gray-300">
                 Corporate Security Officer
               </Link>
               <Link href="/solution/door-supervisor" className="block py-2 hover:text-gray-300">
                 Door Supervisor
               </Link>
               <Link href="/solution/event-security-officer" className="block py-2 hover:text-gray-300">
                 Event Security Officer
               </Link>
               <Link href="/solution/mobile-patrol-officer" className="block py-2 hover:text-gray-300">
                 Mobile Patrol Officer
               </Link>
               <Link href="/solution/loss-prevention-officer" className="block py-2 hover:text-gray-300">
                 Loss Prevention Officer
               </Link>
               <Link href="/solution/access-control-officer" className="block py-2 hover:text-gray-300">
                 Access Control Officer
               </Link>
             </div>
            )}
          </div>

          {/* Specialist Security Roles */}
          <div className="relative"> 
        <button
          className="w-full text-left py-2 hover:text-gray-300 flex justify-between items-center"
          onClick={() => toggleSubDropdown("specialist-security")}
        >
          Specialist Security Roles
          <Icons.ChevronRight className="h-5 w-5" />
        </button>
        {openSubDropdown === "specialist-security" && (
          <div className="ml-4 border-l border-gray-600 pl-4">
            <Link href="/solution/close-protection-officer" className="block py-2 hover:text-gray-300">
              Close Protection Officer (CPO)
            </Link>
            <Link href="/solution/maritime-security-officer" className="block py-2 hover:text-gray-300">
              Maritime Security Officer (MSO)
            </Link>
            <Link href="/solution/aviation-security-officer" className="block py-2 hover:text-gray-300">
              Aviation Security Officer
            </Link>
            <Link href="/solution/high-value-goods-escort" className="block py-2 hover:text-gray-300">
              High-Value Goods Escort Officer
            </Link>
            <Link href="/solution/residential-security-team" className="block py-2 hover:text-gray-300">
              Residential Security Team (RST) Member
            </Link>
            <Link href="/solution/k9-security-handler" className="block py-2 hover:text-gray-300">
              K9 Security Handler
            </Link>
            <Link href="/solution/hostile-environment-security-advisor" className="block py-2 hover:text-gray-300">
              Hostile Environment Security Advisor
            </Link>
            <Link href="/solution/asset-protection-officer" className="block py-2 hover:text-gray-300">
              Asset Protection Officer
            </Link>
          </div>
        )}
      </div>

          {/* Surveillance & Monitoring */}
          <div className="relative"> 
        <button
          className="w-full text-left py-2 hover:text-gray-300 flex justify-between items-center"
          onClick={() => toggleSubDropdown("surveillance-monitoring")}
        >
          Surveillance & Monitoring
          <Icons.ChevronRight className="h-5 w-5" />
        </button>
        {openSubDropdown === "surveillance-monitoring" && (
          <div className="ml-4 border-l border-gray-600 pl-4">
            <Link href="/solution/cctv-operator" className="block py-2 hover:text-gray-300">
              CCTV Operator
            </Link>
            <Link href="/solution/security-control-room-operator" className="block py-2 hover:text-gray-300">
              Security Control Room Operator
            </Link>
            <Link href="/solution/covert-surveillance-operative" className="block py-2 hover:text-gray-300">
              Covert Surveillance Operative
            </Link>
            <Link href="/solution/counter-surveillance-specialist" className="block py-2 hover:text-gray-300">
              Counter-Surveillance Specialist
            </Link>
            <Link href="/solution/technical-surveillance-countermeasures" className="block py-2 hover:text-gray-300">
              Technical Surveillance Countermeasures (TSCM) Specialist
            </Link>
            <Link href="/solution/intelligence-analyst-security" className="block py-2 hover:text-gray-300">
              Intelligence Analyst (Security)
            </Link>
            <Link href="/solution/forensic-security-investigator" className="block py-2 hover:text-gray-300">
              Forensic Security Investigator
            </Link>
             </div>
             )}
            </div>
          {/* Other Links */}
          <Link href="/solution/cyber-security-information-security" className="block py-2 hover:text-gray-300">
                  Cyber Security & Information Security <i>(Coming Soon)</i>
                </Link>
                <Link href="/solution/risk-management-consultancy" className="block py-2 hover:text-gray-300">
                  Risk Management & Consultancy <i>(Coming Soon)</i>
                </Link>
                <Link href="/solution/private-investigation-specialist-roles" className="block py-2 hover:text-gray-300">
                  Private Investigation & Specialist Roles <i>(Coming Soon)</i>
                </Link>
                <Link href="/solution/transport-logistics-security" className="block py-2 hover:text-gray-300">
                  Transport & Logistics Security <i>(Coming Soon)</i>
                </Link>
                <Link href="/solution/access-technology-system-specialist" className="block py-2 hover:text-gray-300">
                  Access Technology & System Specialist <i>(Coming Soon)</i>
                </Link>

        </div>
      )}
    </div>

    {/* Pricing */}
    <Link href="/pricing" className="block py-2 hover:text-gray-300">
      Pricing
    </Link>

    {/* Resources Dropdown */}
    <div className="relative">
      <button
        className="w-full text-left py-2 hover:text-gray-400 flex justify-between items-center"
        onClick={() => toggleDropdown("resources")}
      >
        Resources <Icons.ChevronDown className="h-5 w-5" />
      </button>
      {openDropdown === "resources" && (
          <div className="ml-4 border-l border-gray-600 pl-4">
          <Link href="/resources/about" className="block py-2 hover:text-gray-300">
            About
          </Link>
          <Link href="/resources/contact" className="block py-2 hover:text-gray-300">
            Contact us
          </Link>
          <Link href="/resources/customers" className="block py-2 hover:text-gray-300">
            Customer success
          </Link>
          <Link href="/resources/support" className="block py-2 hover:text-gray-300">
            Support center
          </Link>
        </div>
      )}
    </div>

    {/* Sign Up and Login */}
    <Link href="/signup" className="block py-2 bg-white text-black text-center rounded">
      Sign Up
    </Link>
    <Link href="/signin" className="block py-2 text-center hover:text-gray-300">
      Web Login
    </Link>

  </div>
)}
    </nav>
  );
}
