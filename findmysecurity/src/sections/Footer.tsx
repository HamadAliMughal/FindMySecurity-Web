import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto md:mx-[9.5rem] px-8">
        {/* Logo */}
        <div className="flex justify-left mt-10 mb-15">
          <h2 className="text-2xl font-bold flex items-center">
            <img
              src="/icons/logo.jpg" // Update this path to your logo image
              alt="Logo"
              width={40} // Adjust size as needed
              height={40}
              className="rounded-md" // Optional styling
            />
            <span className='ml-2'>FindMySecurity</span>
          </h2>
        </div>

        {/* Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold mb-5">PLATFORM</h3>
            <ul className="space-y-4">
              <li>Security Team</li>
              <li>Reporting</li>
              <li>Time Clock</li>
              <li>GPS Tracking</li>
              <li>Messenger</li>
              <li>Post Orders</li>
              <li>Passdown Logs</li>
              <li>Panic Alert</li>
            </ul>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-lg font-semibold mb-5">SOLUTION</h3>
            <ul className="space-y-4">
              <li>SG Companies</li>
              <li>Corporate Security</li>
              <li>Hospitality Security</li>
              <li>Campus Security</li>
              <li>Healthcare Security</li>
              <li>Event Security</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-5">RESOURCES</h3>
            <ul className="space-y-4">
              <li>About Us</li>
              <li>Blog</li>
              <li>Contact Us</li>
              <li>Customer Success</li>
              <li>Case Studies</li>
              <li>Support Center</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-5">LEGAL</h3>
            <ul className="space-y-4">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-left space-x-6 mt-15">
          <FaFacebook className="text-xl mr-8 sm:mr-6 md:mr-8 lg:mr-15 hover:text-gray-400 cursor-pointer" />
          <FaTwitter className="text-xl mr-8 sm:mr-6 md:mr-8 lg:mr-15 hover:text-gray-400 cursor-pointer" />
          <FaInstagram className="text-xl mr-8 sm:mr-6 md:mr-8 lg:mr-15 hover:text-gray-400 cursor-pointer" />
          <FaLinkedin className="text-xl mr-8 sm:mr-6 md:mr-8 lg:mr-15 hover:text-gray-400 cursor-pointer" />
          <FaYoutube className="text-xl mr-8 sm:mr-6 md:mr-8 lg:mr-15 hover:text-gray-400 cursor-pointer" />
        </div>

      </div>
    </footer>
  );
}
