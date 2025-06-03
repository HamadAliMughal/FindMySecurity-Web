"use client";

import React from "react";

type Tier = "Basic" | "Standard" | "Premium";

type FeatureKey =
  | "Search Visibility"
  | "Profile Badge"
  | "Internal Notifications"
  | "Advertisements Displayed"
  | "AI Matching (Coming Soon)"
  | "Dedicated Support"
  | "Apply / Receive Jobs & Courses"
  | "Messaging (Coming Soon)"
  | "Verification Badge (DBS & SIA Licence)"
  | "Job Board Access"
  | "Course Board Access"
  | "Security Company Profiles"
  | "Training Provider Profiles";

const tableData: Record<FeatureKey, string[]> = {
  "Search Visibility": ["Standard", "Enhanced", "Top Priority"],
  "Profile Badge": ["None", "Silver + “Standard”", "Gold + “Premium”"],
  "Internal Notifications": [
    "❌ 3 free per month; further access via Credit Bundles or upgrade",
    "✅ Included",
    "✅ Included",
  ],
  "Advertisements Displayed": ["✅ Yes", "❌ No", "❌ No"],
  "AI Matching (Coming Soon)": ["❌ Not available", "✅ Limited", "✅ Full access"],
  "Dedicated Support": ["❌ Not available", "❌ Not available", "✅ Included"],
  "Apply / Receive Jobs & Courses": ["✅ Included", "✅ Included", "✅ Included"],
  "Messaging (Coming Soon)": [
    "❌ Inbound only; replies via Credit Bundle or upgrade",
    "✅ Included",
    "✅ Included",
  ],
  "Verification Badge (DBS & SIA Licence)": [
    "❌ Not included",
    "✅ Included",
    "✅ Included",
  ],
  "Job Board Access": ["✅ Included", "✅ Included", "✅ Included"],
  "Course Board Access": ["✅ Included", "✅ Included", "✅ Included"],
  "Security Company Profiles": [
    "❌ 5 free views per month; further access via Credit Bundles or upgrade",
    "✅ Unlimited",
    "✅ Unlimited",
  ],
  "Training Provider Profiles": ["✅ Unlimited", "✅ Unlimited", "✅ Unlimited"],
};

const tierDescriptions = [
  {
    title: "Basic (Free)",
    color: "border-gray-300",
    features: [
      "Visibility:",
      " Appears in standard search results",
      "Features:",
      " Receive 5 free credits (worth £11) upon successful completion of their public profile",
      " Ability to apply for and receive job and course offers",
      " No alerts for newly listed jobs or courses",
      " Advertisements will be displayed",
      " AI features not included",
      " Access to 3 free notifications per month for successful job applications and other updates",
      " Further notifications viewable via Credit Bundles or by upgrading the subscription tier",
      " View training provider profiles and apply for courses",
      " Access to 5 security company profile views per month; additional views available via Credit Bundles or by upgrading tier",
      "General Notifications:",
      " Accessible through Credit Bundles or upgraded subscription",
      "Direct Messaging:",
      " Inbound messages only; replying requires Credit Bundles or an upgraded subscription",
      "AI Features:",
      " Not available",
      "Cost:",
      " Free of charge",
    ],
  },
  {
    title: "Standard (£9.99/mo)",
    color: "border-blue-400",
    features: [
      "Visibility:",
      " Enhanced visibility, marked with a silver circle and “Standard” badge",
      "Features:",
      " Receive dashboard alerts for relevant job and course matches",
      " Internal notifications when users search for your profile or services",
      " Alerts for newly added job roles and training courses",
      " Access to direct messaging (coming soon)",
      " No third-party advertisements",
      " Verification badge (DBS and SIA Licence) to enhance professional credibility",
      "AI Matching:",
      " Limited functionality",
      "Notifications:",
      " All relevant alerts and updates included",
      "Cost:",
      " £9.99 per month or £107.89 per year",
    ],
  },
  {
    title: "Premium (£14.99/mo)",
    color: "border-yellow-500",
    features: [
      "Visibility:",
      " Highest priority in search results, displayed with a gold circle and “Premium” badge",
      "Features:",
      " Early access to job and course alerts",
      " Internal platform notifications",
      " Full access to all platform tools and features",
      " Priority customer support",
      " Verification badge (DBS and SIA Licence) to strengthen credibility",
      " Full AI matching capabilities (coming soon)",
      " No advertisements",
      " Access to direct messaging (coming soon)",
      "Cost:",
      " £14.99 per month or £161.89 per year",
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
