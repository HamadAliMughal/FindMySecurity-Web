"use client";

import React from "react";

type Tier = "Basic" | "Standard" | "Premium";

type FeatureKey =
  | "Search Visibility"
  | "Profile Badge"
  | "New internal Job Alerts"
  | "New internal Course Alerts"
  | "Internal Notifications"
  | "Ads Displayed"
  | "AI Matching (coming soon)"
  | "Dedicated Support"
  | "Apply/ receive jobs & courses"
  | "Messaging (coming soon)"
  | "Verification badge (DBS & SIA Licence)"
  | "Job Board"
  | "Course Board";

const tableData: Record<FeatureKey, string[]> = {
  "Search Visibility": ["Standard", "Enhanced", "Top Priority"],
  "Profile Badge": ["None", "Silver + “Standard”", "Gold + “Premium”"],
  "New internal Job Alerts": ["❌", "✅", "✅ First Access + Alerts"],
  "New internal Course Alerts": ["❌", "✅", "✅"],
  "Internal Notifications": ["❌", "✅", "✅"],
  "Ads Displayed": ["✅", "❌", "❌"],
  "AI Matching (coming soon)": ["❌", "❌", "✅"],
  "Dedicated Support": ["❌", "❌", "✅"],
  "Apply/ receive jobs & courses": ["✅", "✅", "✅"],
  "Messaging (coming soon)": ["❌", "✅", "✅"],
  "Verification badge (DBS & SIA Licence)": ["❌", "❌", "✅"],
  "Job Board": ["✅", "✅", "✅"],
  "Course Board": ["✅", "✅", "✅"],
};

const tierDescriptions = [
  {
    title: "Basic (Free)",
    color: "border-gray-300",
    features: [
      "Appears in standard search results",
      "Can apply for and receive job and course offers",
      "No alerts for new job or course listings",
      "Advertisements displayed",
      "No AI features",
      "No access to direct messaging",
      "Notifications: Not available",
      "Cost: Free of charge",
    ],
  },
  {
    title: "Standard (£9.99/mo)",
    color: "border-blue-400",
    features: [
      "Enhanced visibility with silver badge",
      "Dashboard alerts for job and course matches",
      "Internal notifications when users search for you",
      "Alerts for newly added jobs and courses",
      "Direct messaging (coming soon)",
      "No advertisements",
      "AI Matching: Not included",
      "All relevant notifications included",
      "Cost: £9.99/month or £107.89/year",
    ],
  },
  {
    title: "Premium (£14.99/mo)",
    color: "border-yellow-500",
    features: [
      "Top priority in search results with gold badge",
      "First access to job and course alerts",
      "Internal notifications",
      "Full access to all features",
      "Dedicated customer support",
      "Verification badge for DBS & SIA",
      "Full AI matching (coming soon)",
      "No advertisements",
      "Direct messaging access (coming soon)",
      "Cost: £14.99/month or £161.89/year",
    ],
  },
];

const featuresList = Object.keys(tableData) as FeatureKey[];

export default function SecurityAccessGuidelines() {
  return (
    <section className="bg-white text-gray-900 px-6 py-16 mt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#0f766e] mb-4">
          Security Professionals: Tiered Access Guidelines
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Choose the plan that fits your goals, visibility, and access.
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
