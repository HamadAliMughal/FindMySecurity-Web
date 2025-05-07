'use client';
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import "./page-globals.css";
import WhoAreWe from "@/sections/components/registration/WhoAreWe";

export default function SignupPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const handleSubmit = () => {
  
    console.log("Form submitted:");
    router.push("/registration");
  };
  return (
    // <div className="flex flex-col h-screen justify-center items-center bg-white">
    //   {/* Top Navigation Bar */}
    //   <div className="fixed top-0 left-0 w-full bg-black text-white flex items-center px-4 py-3">
    //     <button onClick={() => router.back()} className="text-2xl mr-auto">
    //       <FaArrowLeft/>
    //     </button>
    //     <h1 className="text-2xl -ml-4 mr-auto">Create New Account</h1>
    //   </div>

    //   {/* Signup Form */}
    //   <div className="bg-white shadow-lg p-8 rounded-lg w-96">
    //     {/* Name Input */}
    //     <div className="relative mb-4">
    //       <FaUser className="absolute left-3 top-3 text-gray-500" />
    //       <input
    //         type="text"
    //         placeholder="Name"
    //         className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-200 focus:outline-none"
    //       />
    //     </div>

    //     {/* Email Input */}
    //     <div className="relative mb-4">
    //       <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-200 focus:outline-none"
    //       />
    //     </div>

    //     {/* Password Input */}
    //     <div className="relative mb-4">
    //       <FaLock className="absolute left-3 top-3 text-gray-500" />
    //       <input
    //         type={passwordVisible ? "text" : "password"}
    //         placeholder="Password"
    //         className="w-full pl-10 pr-10 py-2 border rounded-md bg-gray-200 focus:outline-none"
    //       />
    //       <button
    //         className="absolute right-3 top-3 text-gray-500"
    //         onClick={() => setPasswordVisible(!passwordVisible)}
    //       >
    //         {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
    //       </button>
    //     </div>

    //     {/* Register Button */}
    //     <button  onClick={handleSubmit} className="w-full bg-black text-white py-2 rounded-md font-semibold hover:opacity-80">
    //       Register
    //     </button>
    //   </div>
    // </div>
    <WhoAreWe />
  
  );
}
