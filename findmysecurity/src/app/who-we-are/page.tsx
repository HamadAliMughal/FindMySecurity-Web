'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Users, Target, Lock } from 'lucide-react';

export default function WhoWeAre() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[#101828] overflow-hidden mt-[10px] sm:mt-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Who We Are</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            FindMySecurity is a dedicated platform designed to connect individuals, businesses, and security professionals, making security services more accessible, efficient, and reliable.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[10px] sm:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              As a growing company, we are committed to simplifying the security industry, ensuring that those who need security services can easily connect with those who provide them. Our approach is built on trust, efficiency, and innovation, helping businesses focus on what matters most while supporting professionals in building successful careers.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              With security needs evolving every day, FindMySecurity is here to bridge the gap, providing a trusted and efficient platform that strengthens communities, empowers professionals, and enhances safety for all.
            </p>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/who-we-are-1.png"
              alt="Strategic approach to security"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-[#101828] text-white mt-[10px] sm:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
            <p className="text-xl leading-relaxed">
              We provide a streamlined space where professionals can explore job opportunities, businesses can find security solutions, and service providers can expand their reach—all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[10px] sm:mt-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Sets Us Apart</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our platform is built on four key pillars that define our approach to security services</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group hover:-translate-y-1 transform transition-transform">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
              <Shield className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Trusted Platform</h3>
            <p className="text-gray-600">Building confidence through verified professionals and reliable service providers</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group hover:-translate-y-1 transform transition-transform">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
              <Users className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Focus</h3>
            <p className="text-gray-600">Creating meaningful connections between security professionals and businesses</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group hover:-translate-y-1 transform transition-transform">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
              <Target className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Efficiency First</h3>
            <p className="text-gray-600">Streamlining the process of finding and providing security services</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group hover:-translate-y-1 transform transition-transform">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
              <Lock className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation Driven</h3>
            <p className="text-gray-600">Continuously evolving our platform to meet changing security needs</p>
          </div>
        </div>
      </section>
    </div>
  );
}