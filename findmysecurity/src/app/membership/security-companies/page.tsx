"use client";

import React from "react";

type FeatureKey =
  | "Search Visibility"
  | "Profile Badge"
  | "Notifications"
  | "Contact Access"
  | "Post Jobs"
  | "Ads Displayed"
  | "AI Matching (coming soon)"
  | "Dedicated Support"
  | "Messaging (coming soon)"
  | "Tender Board"
  | "Course Board"
  | "Job Board";

const tableData: Record<FeatureKey, string[]> = {
  "Search Visibility": ["Standard", "Enhanced", "Top Priority"],
  "Profile Badge": ["None", "Silver + “Standard”", "Gold + “Premium”"],
  "Notifications": [
    "❌ Only Own Posted Job Applicants",
    "✅",
    "✅",
  ],
  "Contact Access": ["❌", "✅ Unlimited", "✅ Unlimited"],
  "Post Jobs": ["✅10 Jobs PM", "✅ Unlimited", "✅ Unlimited"],
  "Ads Displayed": ["✅", "❌", "❌"],
  "AI Matching (coming soon)": ["❌", "❌", "✅"],
  "Dedicated Support": ["❌", "❌", "✅"],
  "Messaging (coming soon)": ["❌", "✅", "✅"],
  "Tender Board": ["❌", "✅", "✅"],
  "Course Board": ["✅", "✅", "✅"],
  "Job Board": ["✅", "✅", "✅"],
};

const tierDescriptions = [
  {
    title: "Basic (Free)",
    color: "border-gray-300",
    features: [
      "Listed in search results with standard marketing exposure",
      "10 job postings per month",
      "Cannot view contact details of professionals or access tender board",
      "Can contact training companies",
      "Full visibility of course board and course details",
      "Notifications only for applicants to your posted jobs",
      "No AI functionality",
      "No access to direct messaging",
      "Advertisements displayed",
      "Cost: Free of charge",
    ],
  },
  {
    title: "Standard (£24.99/mo)",
    color: "border-blue-400",
    features: [
      "Enhanced visibility with silver badge and better exposure",
      "Unlimited job postings",
      "Full contact access to professionals & training companies",
      "Access to all alerts and internal notifications",
      "Access to job, tender, and course boards",
      "Direct messaging (coming soon)",
      "No advertisements",
      "No AI functionality",
      "All relevant notifications included",
      "Cost: £24.99/month or £269.89/year",
    ],
  },
  {
    title: "Premium (£49.99/mo)",
    color: "border-yellow-500",
    features: [
      "Top priority in search results with gold badge",
      "All Standard features included",
      "Full AI integration (coming soon)",
      "Internal alerts and notifications",
      "Dedicated customer support",
      "Direct messaging (coming soon)",
      "Complete access to all platform features",
      "No advertisements displayed",
      "Cost: £49.99/month or £539.89/year",
    ],
  },
];

const featuresList = Object.keys(tableData) as FeatureKey[];

export default function SecurityCompanyAccessGuidelines() {
  return (
    <section className="bg-white text-gray-900 px-6 py-16 mt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#0f766e] mb-4">
          Security Companies: Tiered Access Guidelines
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Maximize your hiring and platform access based on your company tier.
        </p>

        {/* Tier Cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-20">
          {tierDescriptions.map((tier, idx) => (
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

        {/* Comparison Table */}
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
                    {tableData[feature].map((value, colIdx) => (
                      <td key={colIdx} className="px-4 py-3 text-center">
                        {value}
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
