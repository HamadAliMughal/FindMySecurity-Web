"use client";

import React from "react";

type FeatureKey =
  | "Search Visibility"
  | "Profile Badge"
  | "Notifications"
  | "Contact Access (Security Professionals & Companies)"
  | "Post Courses"
  | "External Ads Displayed"
  | "AI Matching (Coming Soon)"
  | "Dedicated Support"
  | "Messaging (Coming Soon)"
  | "Course Board Access"
  | "Job Board Access"
  | "Course Promotional Feature";

const tableData: Record<FeatureKey, string[]> = {
  "Search Visibility": ["Standard", "Enhanced", "Top Priority"],
  "Profile Badge": ["None", "Silver + “Standard”", "Gold + “Premium”"],
  "Notifications": [
    "❌ 3 free notifications per month; additional available via Credit Bundles or upgrade",
    "✅ Included",
    "✅ Included",
  ],
  "Contact Access (Security Professionals & Companies)": [
    "❌ 5 free profile views per month; additional access via Credit Bundles or upgrade",
    "✅ Unlimited",
    "✅ Unlimited",
  ],
  "Post Courses": [
    "❌ 1 free course post per month; more accessible via Credit Bundles or upgrade",
    "✅ Unlimited",
    "✅ Unlimited",
  ],
  "External Ads Displayed": ["✅ Yes", "❌ No", "❌ No"],
  "AI Matching (Coming Soon)": ["❌ Not included", "✅ Limited access", "✅ Full access"],
  "Dedicated Support": ["❌ Not available", "❌ Not available", "✅ Included"],
  "Messaging (Coming Soon)": [
    "❌ Free to receive; replying requires Credit Bundles or upgrade",
    "✅ Included",
    "✅ Included",
  ],
  "Course Board Access": ["✅ Included", "✅ Included", "✅ Included"],
  "Job Board Access": ["✅ Included", "✅ Included", "✅ Included"],
  "Course Promotional Feature": [
    "❌ Not included",
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
      " 1 free course posting per month; more via Credit Bundles or upgrade",
      " 5 free profile views of security professionals and 5 of security companies per month",
      " Full access to the course board and its listings",
      " 3 free notifications per month; more via Credit Bundles or upgrade",
      " No access to AI functionality",
      " Free inbound messaging; outbound requires Credit Bundles or upgrade",
      "Advertising:",
      " External advertisements will be displayed",
      "Cost:",
      " Free of charge",
    ],
  },
  {
    title: "Standard (£24.99/mo)",
    color: "border-blue-400",
    features: [
      "Visibility:",
      " Enhanced visibility with silver badge and improved exposure",
      "Features:",
      " Unlimited course postings",
      " Full access to contact details of professionals and companies",
      " Internal alerts for user activity and interactions",
      " Direct messaging (coming soon)",
      " Limited access to AI features",
      " No external advertisements displayed",
      " Promotional feature for courses — via Credit Bundles or upgrade",
      "Notifications:",
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
      " Top priority in search results with gold badge",
      "Features:",
      " All features from the Standard plan",
      " Access to AI-powered features (coming soon)",
      " Full access to internal alerts and notifications",
      " Dedicated customer support",
      " Full access to the promotional feature for courses",
      " Complete access to all platform tools and features",
      "Advertising:",
      " No external advertisements displayed",
      "Cost:",
      " £49.99/month or £539.89/year",
    ],
  },
];

const featuresList = Object.keys(tableData) as FeatureKey[];

export default function TrainingAccessGuidelines() {
  return (
    <section className="bg-white text-gray-900 px-6 py-16 mt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#0f766e] mb-4">
          Training Providers: Tiered Access Guidelines
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Choose the plan that helps your training organization connect and grow.
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
