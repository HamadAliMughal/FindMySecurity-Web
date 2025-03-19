import Icons from '../constants/icons/icons'
export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto md:mx-[9.5rem] px-8">
        {/* Logo */}
        <div className="flex justify-left mt-10 mb-15">
          <h2 className="text-2xl font-bold flex items-center">
            FindMySecurity
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
          <Icons.Facebook className="text-xl mr-15 hover:text-gray-400 cursor-pointer" />
          <Icons.Twitter className="text-xl mr-15 hover:text-gray-400 cursor-pointer" />
          <Icons.Instagram className="text-xl mr-15 hover:text-gray-400 cursor-pointer" />
          <Icons.Linkedin className="text-xl mr-15 hover:text-gray-400 cursor-pointer" />
          <Icons.Youtube className="text-xl mr-15 hover:text-gray-400 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
