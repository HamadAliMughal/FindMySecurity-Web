import Image from "next/image"; 

const BusinessSection = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-center px-4 sm:px-6 md:px-16 py-10 sm:py-16 bg-white mx-4 md:mx-32">
      
      {/* Text Content */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-left gap-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
          Run A More Profitable Business Using The Security Guard App
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">
          Affordable and an easy-to-use solution on-the-go.
        </p>
        <p className="text-gray-600 max-w-lg">
          Security guard mobile and web app is everything your business needs to manage security teams and security guard operations remotely.
        </p>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base md:text-lg max-w-lg">
          <p>➤ The complete platform for time tracking & guard management</p>
          <p>➤ Improve focus and keep your security teams on task</p>
          <p>➤ Digitize manual work processes with zero effort</p>
          <p>➤ Save time and effort running security guard operations</p>
        </div>

        {/* Signup Button */}
        <button className="mt-6 px-6 py-3 border-2 border-black rounded-full text-black hover:bg-black hover:text-white transition">
          SIGNUP FOR FREE
        </button>
      </div>

      {/* Image Section (Above Text in Mobile, Right in Desktop) */}
      <div className="w-full md:w-1/2 flex justify-center relative mb-8 md:mb-0">
        {/* Background Box for Desktop */}
        <div className="absolute top-2 left-2 w-[85%] h-[90%] bg-gray-100 rounded-lg -z-10 hidden md:block"></div>

        {/* Mobile Screen Image (Original Size) */}
        <Image 
          src="/images/mobile.png" 
          alt="Mobile UI" 
          width={500} 
          height={600} 
          className="relative z-10"
        />
      </div>

    </section>
  );
};

export default BusinessSection;
