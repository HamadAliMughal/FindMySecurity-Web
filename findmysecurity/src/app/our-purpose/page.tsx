'use client';

import React from 'react';
import Image from 'next/image';

export default function OurPurpose() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[10px] sm:mt-0">
      {/* Hero Section */}
      <section className="mb-16 mt-[10px] sm:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">Our Purpose</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              At FindMySecurity, we understand a simple but profound principle: Everyone deserves to feel secure and be secure. We believe that connecting the right talent to the right place starts by understanding both sides of the equation - the unique needs of security professionals and the specific requirements of those seeking their services.
            </p>
          </div>
          <div className="relative rounded-lg aspect-video overflow-hidden">
            <Image
              src="/images/our-purpose-1.png"
              alt="Security professionals in a meeting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* London Image Section */}
      <section className="mb-16 mt-[10px] sm:mt-0">
        <div className="relative rounded-lg aspect-[21/9] w-full overflow-hidden">
          <Image
            src="/images/our-purpose-2.png"
            alt="London cityscape"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Purpose Description Section */}
      <section className="mb-16 mt-[10px] sm:mt-0">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Connecting You to a Safer Future</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            We're not just another job board or recruitment platform. Our mission is to create meaningful connections that enhance security across all sectors. Whether you're a seasoned security professional looking for your next opportunity or an organization seeking qualified security personnel, we provide the platform where expertise meets excellence.
          </p>
        </div>
      </section>

      {/* Team Image and Purpose Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-[10px] sm:mt-0">
        <div className="relative rounded-lg aspect-square overflow-hidden">
          <Image
            src="/images/our-purpose-3.png"
            alt="Security team collaboration"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Our Purpose Brings Us Together</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Security isn't just about systems, protocols, or procedures - it's about people. We believe in bringing together the best security professionals with organizations that value their expertise. Our platform is designed to create lasting partnerships that contribute to a safer, more secure world for everyone.
          </p>
        </div>
      </section>
    </div>
  );
}