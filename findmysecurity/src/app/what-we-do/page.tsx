'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Users, Target, Lock, Briefcase, Globe } from 'lucide-react';

export default function WhatWeDo() {
  const services = [
    {
      icon: Shield,
      title: 'Professional Networking',
      description: 'Connecting security professionals with opportunities and organizations seeking their expertise.'
    },
    {
      icon: Briefcase,
      title: 'Business Solutions',
      description: 'Providing businesses with access to qualified security personnel and services.'
    },
    {
      icon: Globe,
      title: 'Industry Resources',
      description: 'Offering comprehensive resources and insights for the security industry.'
    },
    {
      icon: Target,
      title: 'Training & Development',
      description: 'Facilitating connections with training providers to enhance professional growth.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[#101828] overflow-hidden mt-[10px] sm:mt-0">
        <div className="absolute inset-0">
          <Image
            src="/images/what-we-do-1.png"
            alt="Security professionals"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl font-bold mb-6">What We Do</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We create meaningful connections between security professionals, businesses, and training providers, fostering a more secure and efficient industry ecosystem.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[10px] sm:mt-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions designed to meet the evolving needs of the security industry
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group hover:-translate-y-1 transform transition-transform">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
                <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section with Side Image */}
      <section className="py-20 bg-[#101828] text-white mt-[10px] sm:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Our Approach</h2>
              <p className="text-xl leading-relaxed">
                We believe in creating lasting connections that contribute to a safer world. Our platform streamlines the process of finding and providing security services, ensuring quality and reliability at every step.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <span>Quality Assurance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-blue-400" />
                  <span>Expert Network</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-blue-400" />
                  <span>Targeted Solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="w-6 h-6 text-blue-400" />
                  <span>Secure Platform</span>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/what-we-do-2.png"
                alt="Our approach to security"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}