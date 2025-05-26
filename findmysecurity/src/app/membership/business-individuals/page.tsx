"use client";

import React from "react";

const tableData:{
    [key: string]: string[]
} = {
  "Post Jobs": ["✅ Unlimited", "✅ Unlimited"],
  "Post Tenders": ["✅ Unlimited", "✅ Unlimited"],
  "View & Contact": ["✅ Unlimited", "✅ Unlimited"],
  "Receive Suggestions": ["✅", "✅ Priority-Based"],
  "Profile Visibility": ["Hidden", "Hidden"],
  "Ads Displayed": ["❌", "❌"],
  "AI Matching (coming soon)": ["❌", "✅"],
  "Dedicated Support": ["❌", "✅"],
  "Special Assistance for bespoke security Solution (Contact for further details)": ["❌", "✅"],
  "Messaging (coming soon)": ["✅", "✅"],
  "Job board": ["✅", "✅"],
  "Tender Board": ["✅", "✅"],
  "Course Board": ["✅", "✅"],
};

const tiers = [
  {
    title: "Standard (£24.99/mo)",
    color: "border-blue-400",
    features: [
      "Profile hidden from public view",
      "Unlimited job and tender postings",
      "Full access to professionals, companies, and training providers",
      "Access to job board, course board, and tender board (businesses only)",
      "All relevant notifications & alerts",
      "Direct messaging (coming soon)",
      "No advertisements",
      "No AI features (coming soon)",
      "Cost: £24.99/month or £269.89/year",
    ],
  },
  {
    title: "Premium (£49.99/mo)",
    color: "border-yellow-500",
    features: [
      "All Standard plan features included",
      "AI-powered matching for enhanced service recommendations",
      "Priority visibility and tailored provider suggestions",
      "Dedicated customer support",
      "Full access to all platform features",
      "Special assistance for bespoke security solutions",
      "No advertisements",
      "Cost: £49.99/month or £539.89/year",
    ],
  },
];

const featuresList = Object.keys(tableData);

export default function BusinessAccessGuidelines() {
  return (
    <section className="bg-white text-gray-900 px-6 py-16 mt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#0f766e] mb-4">
          Businesses / Individuals: Tiered Access Guidelines
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Choose the right plan for job or tender posting and professional access.
        </p>

        {/* Tiers */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 mb-20">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border-2 ${tier.color} shadow-lg p-6 bg-white hover:shadow-xl transition duration-300`}
            >
              <h2 className="text-xl font-bold text-center text-[#0f766e] mb-4">
                {tier.title}
              </h2>
              <ul className="list-disc text-sm text-gray-700 pl-5 space-y-2">
                {tier.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Table */}
        <div>
          <h2 className="text-2xl font-bold text-center text-[#0f766e] mb-6">
            Feature Comparison Table
          </h2>
          <div className="overflow-auto rounded-lg shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-3">Feature</th>
                  <th className="px-4 py-3 text-center">Standard</th>
                  <th className="px-4 py-3 text-center">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {featuresList.map((feature, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{feature}</td>
                    {tableData[feature].map((val, colIdx) => (
                      <td key={colIdx} className="px-4 py-3 text-center">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
