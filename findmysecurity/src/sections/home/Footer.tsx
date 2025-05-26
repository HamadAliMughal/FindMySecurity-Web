import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto md:mx-[9.5rem] px-8">
        {/* Logo */}
        <div className="flex justify-left mt-10 mb-15">
          <Link href="/">
            <h2 className="text-2xl font-bold flex items-center cursor-pointer">
              <img
                src="/pro-icons/FindMySecurity-New-Logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-md"
              />
              <span className="ml-2">FindMySecurity</span>
            </h2>
          </Link>
        </div>

        {/* Extra Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
          {/* Help & Advice */}
          <div>
            <h3 className="text-lg font-semibold mb-5">HELP & ADVICE</h3>
            <ul className="space-y-4">
              <li><Link href="/help/safety-centre">Safety Centre</Link></li>
              <li><Link href="/help/avoiding-scams">Avoiding Scams</Link></li>
              <li><Link href="/help/safety-policy">Safety and Anti Discrimination Policy</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-5">INFORMATION</h3>
            <ul className="space-y-4">
              <li><Link href="/info/emergency-security-cover">Find Emergency Security Cover</Link></li>
              <li><Link href="/info/right-private-security">Finding the Right Private Security</Link></li>
              <li><Link href="/info/interviewing-professionals">Interviewing a Security Professional</Link></li>
              <li><Link href="/info/paying-professionals">Paying - Security Professional</Link></li>
              <li><Link href="/info/contracts">Security Professional Contracts</Link></li>
              <li><Link href="/info/success-tips">Security Professional Tips – How to Maximise Your Success</Link></li>
              <li><Link href="/info/verifying-professionals">Verifying Security Professionals</Link></li>
              <li><Link href="/info/writing-profile">Writing Your Profile</Link></li>
            </ul>
          </div>

          {/* Memberships */}
          <div>
            <h3 className="text-lg font-semibold mb-5">MEMBERSHIPS</h3>
            <ul className="space-y-4">
              <li><Link href="/membership/security-professionals">Security Professionals: Tiered Access Guidelines</Link></li>
              <li><Link href="/membership/security-companies">Security Companies: Tiered Access Guidelines</Link></li>
              <li><Link href="/membership/training-providers">Training Providers: Tiered Access Guidelines</Link></li>
              <li><Link href="/membership/business-individuals">Businesses / Individuals: Tiered Access Guidelines</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal Bottom Text */}
        <div className="mt-10 text-sm text-gray-400 space-y-2">
          <p>
            <Link href="/legal/terms">Terms and Conditions</Link> |{" "}
            <Link href="/legal/privacy">Privacy and Cookies Policy</Link> |{" "}
            <Link href="/legal/cookie-settings">Cookie Settings</Link> |{" "}
            Data Protection Registration Number ZB897965
          </p>
          <p>
            © 2025 FindMySecurity.co.uk – FindMySecurity Ltd - Company Number 16232101 - All rights reserved.
          </p>
          <p>
            Registered Office: Suite 5763, Unit 3A, 34-35 Hatton Garden Holborn, London, EC1N 8DX
          </p>
        </div>
      </div>
    </footer>
  );
}
