"use client";

import Image from "next/image";
import Icons from "../constants/icons/icons";
import { useRouter } from "next/navigation";


const StepsSection = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center text-center py-16 px-6 text-black bg-gray-100">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
        It’s Easy And Free To Get Started With Security Guard App!
      </h2>
      <div className="w-16 h-1 bg-gray-500 mb-8"></div>

      {/* Steps Container */}
      <div className="relative flex flex-col items-center space-y-8">
        {/* Step 1 */}
        <div className="bg-white rounded-lg p-6 flex items-center shadow-md w-full max-w-2xl relative">
          <div className="flex-grow text-left max-w-xs md:max-w-sm text-justify break-words leading-snug">
            <p className="text-gray-600 font-semibold">Step 1</p>
            <h3 className="text-lg font-bold text-black">Download and Sign Up</h3>
            <p className="text-gray-700">
              Security guard mobile app for guards is available on both the Apple Store and Play Store.
            </p>
          </div>
          <Icons.Download className="text-black w-8 h-8" />
        </div>

        {/* Arrow (Only visible in Desktop) */}
        <div className="hidden md:block absolute z-10 left-[-60px] top-[100px]">
          <Image src="/icons/arrow-left.png" alt="Arrow" width={120} height={120} />
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-lg p-6 flex items-center shadow-md w-full max-w-2xl relative">
          <div className="flex-grow text-left max-w-xs md:max-w-sm text-justify break-words leading-snug">
            <p className="text-gray-600 font-semibold">Step 2</p>
            <h3 className="text-lg font-bold text-black">Add Post Sites</h3>
            <p className="text-gray-700">
              Turn on the GPS of your smartphone to select the location and start adding multiple sites.
            </p>
          </div>
          <Icons.Post className="text-black w-8 h-8" />
        </div>

        {/* Arrow (Only visible in Desktop) */}
        <div className="hidden md:block absolute right-[-60px] top-[290px]">
          <Image src="/icons/arrow-right.png" alt="Arrow" width={120} height={120} />
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-lg p-6 flex items-center shadow-md w-full max-w-2xl">
          <div className="flex-grow text-left max-w-xs md:max-w-sm text-justify break-words leading-snug">
            <p className="text-gray-600 font-semibold">Step 3</p>
            <h3 className="text-lg font-bold text-black">Invite Your Team</h3>
            <p className="text-gray-700">
              Start inviting security guards to start collaborating and monitoring them seamlessly.
            </p>
          </div>
          <Icons.Mail className="text-black w-8 h-8" />
        </div>
      </div>

      {/* Signup Button */}
      <button onClick={()=>{router.push("/signup")}} className="mt-10 px-6 py-3 border-2 border-black rounded-full text-black hover:bg-black hover:text-white transition">
        SIGNUP FOR FREE
      </button>
    </section>
  );
};

export default StepsSection;