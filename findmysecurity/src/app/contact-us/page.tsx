'use client';

import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ContactUs() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@findmysecurity.com';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white mt-[15px] sm:mt-0">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[#101828] overflow-hidden mt-[10px] sm:mt-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We're here to help. Reach out to us through any of the following channels.
          </p>
        </div>
      </div>

      {/* Contact Cards Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Card */}
          <div 
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            onClick={handleEmailClick}
          >
            <div className="flex items-center mb-6">
              <Mail className="h-8 w-8 text-black mr-4" />
              <h3 className="text-2xl font-semibold text-gray-900">Email Us</h3>
            </div>
            <p className="text-lg text-gray-600 mb-4">
              For any inquiries, feel free to drop us an email. We typically respond within 24 hours.
            </p>
            <p className="text-lg font-medium text-black">
            info@findmysecurity.co.uk
            </p>
          </div>

          {/* Postal Address Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <MapPin className="h-8 w-8 text-black mr-4" />
              <h3 className="text-2xl font-semibold text-gray-900">Visit Us</h3>
            </div>
            <p className="text-lg text-gray-600 mb-4">
              Our main office is located in the heart of London.
            </p>
            <address className="text-lg font-medium text-black not-italic">
            FindMySecurity Ltd <br />
            Suite 5763, Unit 3A, 34-35 <br />
            Hatton Garden Holborn, <br />
            London, <br />
            EC1N 8DX
            </address>
          </div>
        </div>
      </section>
    </div>
  );
}