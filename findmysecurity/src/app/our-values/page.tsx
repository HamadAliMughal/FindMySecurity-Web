'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Users, Target, Lock, Heart, Star, Globe, CheckCircle } from 'lucide-react';

export default function OurValues() {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'We build lasting relationships based on transparency, honesty, and ethical practices. Our commitment to integrity is unwavering in every interaction and service we provide.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'We believe in fostering a strong, supportive community of security professionals and organizations, working together to create safer environments for all.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from the quality of our platform to the connections we facilitate between security professionals and organizations.'
    },
    {
      icon: Lock,
      title: 'Security First',
      description: 'Security is not just our business - it\'s our core value. We prioritize the safety and security of our users in every decision we make.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white mt-[15px] sm:mt-0">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[#101828] overflow-hidden mt-[10px] sm:mt-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Our Values</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            At FindMySecurity, we believe security is more than a service - it's about trust, responsibility, and empowerment. Our values define how we operate, ensuring that security professionals, businesses, and individuals find the right solutions with ease and confidence.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[10px] sm:mt-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our core values shape every interaction and decision we make</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group hover:-translate-y-1 transform transition-transform">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
                <value.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-[#101828] text-white mt-[10px] sm:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed">
              To create a trusted platform that connects security professionals with organizations, fostering a safer and more secure future for all through excellence, integrity, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Team Values Image Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/our-values-1.png"
              alt="Team living our values"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Living Our Values Every Day</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our values aren't just words on a page - they're the principles that drive us forward every day. We're committed to creating meaningful connections and fostering a community where security professionals can thrive and organizations can find the expertise they need.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">Professional Excellence</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-red-500" />
                <span className="text-gray-700">Customer Focus</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-yellow-500" />
                <span className="text-gray-700">Quality Service</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-6 h-6 text-blue-500" />
                <span className="text-gray-700">Global Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}