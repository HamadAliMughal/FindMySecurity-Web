import Image from "next/image";

const SecurityAppSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start px-4 sm:px-6 md:px-10 py-10 mx-auto max-w-screen-xl bg-white w-full gap-x-10 md:gap-x-36">
      {/* Left Side - Image */}
      <div className="relative flex items-center justify-center w-full max-w-xs sm:max-w-md md:max-w-lg mb-10 md:mb-0">
        <Image 
          src="/images/desktop-dashboard.jpg" 
          alt="Dashboard" 
          width={450} 
          height={370} 
          className="object-contain w-full h-auto"
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 flex-grow-0 md:flex-grow text-left max-w-full md:max-w-lg ml-4 sm:ml-6 md:ml-0">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Ensure Effortless Security Guard Team Management On-The-Go
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-4">
          An intuitive, feature-rich solution built for you.
        </p>
        <p className="text-gray-500 mb-6">
          Security Guard App is packed with numerous features that help enhance data sharing and communication within your security team.
        </p>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm sm:text-base">
          <p>➤ Build your security guard team on your terms</p>
          <p>➤ Add new companies and create multiple post sites</p>
          <p>➤ Work for multiple security guard companies</p>
          <p>➤ Invite clients & provide access to crucial on-site data</p>
        </div>

        {/* Signup Button */}
        <button className="mt-6 px-6 py-3 border-2 border-black rounded-full text-black hover:bg-black hover:text-white transition">
          SIGNUP FOR FREE
        </button>
      </div>
    </section>
  );
};

export default SecurityAppSection;
