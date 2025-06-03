"use client";

import React from "react";

type FeatureKey =
  | "Search Visibility"
  | "Profile Badge"
  | "Notifications"
  | "Contact Access to Security Professionals"
  | "Post Jobs"
  | "Advertisements Displayed"
  | "AI Matching (Coming soon)"
  | "Dedicated Support"
  | "Messaging (Coming soon)"
  | "Tender Board Access"
  | "Course Board Access"
  | "Job Board Access"
  | "Promotional Feature for Security Services";

const tableData: Record<FeatureKey, string[]> = {
  "Search Visibility": ["Standard", "Enhanced", "Top Priority"],
  "Profile Badge": ["None", "Silver + “Standard”", "Gold + “Premium”"],
  "Notifications": [
    "❌ 3 free per month; additional access via Credit Bundles or tier upgrade",
    "✅ Included",
    "✅ Included",
  ],
  "Contact Access to Security Professionals": [
    "❌ 5 free profile views; further access via Credit Bundles or upgrade",
    "✅ Unlimited",
    "✅ Unlimited",
  ],
  "Post Jobs": ["✅ Unlimited", "✅ Unlimited", "✅ Unlimited"],
  "Advertisements Displayed": ["✅ Yes", "❌ No", "❌ No"],
  "AI Matching (Coming soon)": ["❌ Not available", "✅ Limited", "✅ Full access"],
  "Dedicated Support": ["❌ Not available", "❌ Not available", "✅ Included"],
  "Messaging (Coming soon)": [
    "❌ Free inbound only; outbound via Credit Bundles or upgrade",
    "✅ Included",
    "✅ Included",
  ],
  "Tender Board Access": [
    "❌ 1 free per month; additional access via Credit Bundles or tier upgrade",
    "✅ Included",
    "✅ Included",
  ],
  "Course Board Access": ["✅ Included", "✅ Included", "✅ Included"],
  "Job Board Access": ["✅ Included", "✅ Included", "✅ Included"],
  "Promotional Feature for Security Services": [
    "❌ Not available",
    "❌ Available via Credit Bundles or upgrade",
    "✅ Included",
  ],
};

const tierDescriptions = [
  {
    title: "Basic (Free)",
    color: "border-gray-300",
    features: [
      "Visibility:",
      " Listed in search results with standard marketing exposure",
      "Features:",
      " Unlimited job postings",
      " 5 free profile views of security professionals per month — more via Credit Bundles or upgrade",
      " 1 free tender view per month — more via Credit Bundles or upgrade",
      " Unlimited access to contact training providers",
      " Full access to the course board and course details",
      " 3 free notifications/month — more via Credit Bundles or upgrade",
      " No access to AI functionality",
      " Free to receive messages — replies require credits or upgrade",
      " Advertising:",
      " External ads will be displayed",
      "Cost:",
      " Free of charge",
    ],
  },
  {
    title: "Standard (£24.99/mo)",
    color: "border-blue-400",
    features: [
      "Visibility:",
      " Enhanced visibility marked by a silver circle and “Standard” badge",
      "Features:",
      " Unlimited job postings",
      " Full access to contact details of security professionals and training providers",
      " Access to all alerts and internal notifications",
      " Full access to the job board, tender board, and course board",
      " Direct messaging functionality (coming soon)",
      " Limited access to AI features",
      " No external advertisements",
      " Special promotional feature for security services — via Credit Bundles or upgrade",
      " Notifications:",
      " All alerts and updates included",
      "Cost:",
      " £24.99/month or £269.89/year",
    ],
  },
  {
    title: "Premium (£49.99/mo)",
    color: "border-yellow-500",
    features: [
      "Visibility:",
      " Highest priority in search results with gold circle and “Premium” badge",
      "Features:",
      " Includes all features from the Standard plan",
      " Full AI integration (coming soon)",
      " Access to internal alerts and notifications",
      " Priority customer support",
      " Direct messaging functionality (coming soon)",
      " Complete access to all platform tools and features",
      " Full access to promotional feature for security services",
      " No external advertisements",
      "Cost:",
      " £49.99/month or £539.89/year",
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
