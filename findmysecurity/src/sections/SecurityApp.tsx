import Image from "next/image";

const SecurityAppSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start px-4 sm:px-6 md:px-10 py-10 mx-auto max-w-screen-xl bg-white w-full gap-x-10 md:gap-x-36">
      {/* Left Side - Image */}
      {/* <div className="relative flex items-center justify-center w-full max-w-xs sm:max-w-md md:max-w-lg -mt-24 md:mb-0">
     <Image 
  src="/images/desktop-dashboard.jpg" 
  alt="Dashboard" 
  width={800}  
  height={600} 
  className="object-contain max-w-none w-[800px] h-[600px]" 
/>


      </div> */}
<div className="relative flex items-center justify-center w-full max-w-xs sm:max-w-md md:max-w-lg md:mb-0">
  <Image 
    src="/images/desktop-dashboard.jpg" 
    alt="Dashboard" 
    width={800}  
    height={600} 
    className="object-contain w-full h-auto max-w-lg sm:max-w-xl md:max-w-3xl"
  />
</div>

      {/* Right Side - Content */}
     {/* Right Side - Content */}
<div className="w-full md:w-1/2 flex flex-col items-start text-left gap-y-6">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
    Ensure Effortless Security Guard Team Management On-The-Go
  </h2>
  <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">
    An intuitive, feature-rich solution built for you.
  </p>
  <p className="text-gray-600 max-w-lg">
    Security Guard App is packed with numerous features that help enhance data sharing and communication within your security team.
  </p>

  {/* Feature List */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base md:text-lg max-w-lg">
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
