'use client';

import React from 'react';
import { FaUserFriends, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function VisitorsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 pt-20 pb-8 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        <span>Back</span>
      </button>
      
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-full animate-pulse"></div>
          <FaUserFriends className="text-blue-500 w-24 h-24 relative z-10" />
        </div>

        <div className="text-center max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            No Visitors Yet
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Your profile hasn't received any visitors yet. Enhance your profile and engage with the community to increase your visibility.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-8">
            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="font-semibold text-gray-800">Profile Views</div>
              <div className="text-3xl font-bold text-blue-500 mt-2">0</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="font-semibold text-gray-800">Last 7 Days</div>
              <div className="text-3xl font-bold text-blue-500 mt-2">0</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="font-semibold text-gray-800">Total Time</div>
              <div className="text-3xl font-bold text-blue-500 mt-2">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}