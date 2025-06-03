"use client";

import React from "react";

const tableData: {
  [key: string]: string[];
} = {
  "Post Jobs": ["✅ Unlimited", "✅ Unlimited", "✅ Unlimited"],
  "Post Tenders (For Businesses Only)": ["✅ Unlimited", "✅ Unlimited", "✅ Unlimited"],
  "View & Contact (Security Professionals, Companies, & Training Providers)": [
    "✅ Limited",
    "✅ Unlimited",
    "✅ Unlimited",
  ],
  "Receive Suggestions": ["❌ Not available", "✅ Included", "✅ Priority-based suggestions"],
  "Profile Visibility": [
    "Hidden from Public Access",
    "Hidden from Public Access",
    "Hidden from Public Access",
  ],
  "External Ads Displayed": ["✅ Yes", "❌ No", "❌ No"],
  "AI Matching (coming soon)": ["❌ Not available", "✅ Limited access", "✅ Full access"],
  "Dedicated Support": ["❌ Not available", "❌ Not available", "✅ Included"],
  "Special Assistance for Bespoke Security Solutions": [
    "❌ Not included",
    "❌ Available via Credit Bundles or upgrade",
    "✅ Included",
  ],
  "Messaging (coming soon)": ["✅ Included", "✅ Included", "✅ Included"],
  "Job Board Access": ["✅ Included", "✅ Included", "✅ Included"],
  "Tender Board Access (For Businesses Only)": ["✅ Included", "✅ Included", "✅ Included"],
  "Course Board Access": ["✅ Included", "✅ Included", "✅ Included"],
};

const tiers = [
  {
    title: "Basic (Free)",
    color: "border-gray-300",
    features: [
      "Profile Visibility:",
      " Hidden from public view",
      "Features:",
      " Unlimited job postings",
      " Unlimited tender postings (for businesses only)",
      " Free access to 10 profiles/month across professionals, companies, and trainers",
      " Access to the job board",
      " Access to the course board",
      " Access to the tender board (for businesses only)",
      " All relevant notifications and alerts included",
      " Free messaging",
      " No access to AI features",
      "Advertising: External advertisements will be displayed",
      "Cost: Free of charge",
    ],
  },
  {
    title: "Standard (£24.99/mo)",
    color: "border-blue-400",
    features: [
      "Profile Visibility:",
      " Hidden from public view",
      "Features:",
      " Unlimited job postings",
      " Unlimited tender postings (for businesses only)",
      " Full access to profiles of professionals, companies, and trainers",
      " Access to job, course, and tender boards (for businesses only)",
      " All relevant notifications and alerts included",
      " Direct messaging functionality (coming soon)",
      " Limited AI features (coming soon)",
      " Special assistance for bespoke solutions — via Credit Bundles or upgrade",
      "Advertising:",
      " No external advertisements",
      "Cost:",
      " £24.99/month or £269.89/year",
    ],
  },
  {
    title: "Premium (£49.99/mo)",
    color: "border-yellow-500",
    features: [
      "Profile Visibility:",
      " Hidden from public view",
      "Features:",
      " All features included in the Standard plan",
      " AI-powered matching for enhanced service recommendations",
      " Priority visibility and tailored provider suggestions",
      " Dedicated customer support",
      " Full access to all platform features",
      " Special assistance for bespoke security solutions included",
      "Advertising:",
      " No external advertisements",
      "Cost:",
      " £49.99/month or £539.89/year",
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
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 mb-20">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border-2 ${tier.color} shadow-lg p-6 bg-white hover:shadow-xl transition duration-300`}
            >
              <h2 className="text-xl font-bold text-center text-[#0f766e] mb-4">
                {tier.title}
              </h2>
              <div className="text-sm text-gray-700 space-y-2">
                {tier.features.map((feature, i) => {
                  if (feature.endsWith(":")) {
                    return (
                      <h3 key={i} className="font-bold mt-4">
                        {feature}
                      </h3>
                    );
                  }
                  return (
                    <div key={i} className="pl-5 flex">
                      <span className="mr-2">•</span>
                      {feature}
                    </div>
                  );
                })}
              </div>
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
                  <th className="px-4 py-3 text-center">Basic</th>
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
