"use client"

import React, { useState } from 'react';

const CookieSettings: React.FC = () => {
  // State for managing cookie settings
  const [analyticalCookies, setAnalyticalCookies] = useState<boolean>(false);
  const [targetingCookies, setTargetingCookies] = useState<boolean>(false);

  // Function to enable all cookies
  const enableAllCookies = () => {
    setAnalyticalCookies(true);
    setTargetingCookies(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Settings for FindMySecurity</h1>

      <section className="mb-8">
        <p className="text-gray-700 mb-2">
          Cookies are commonly used to make websites operate effectively, enhance user experience, and supply valuable information to the site owner and their partners. Session cookies are temporary and remain in your browser’s cookie file only until it is closed. Persistent cookies remain longer duration depends on the cookie’s configured expiry. For more information, including how to block or delete cookies, please visit{' '}
          <a href="http://www.allaboutcookies.org" className="text-blue-600 hover:underline">www.allaboutcookies.org</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enable All Cookies (Recommended)</h2>
        <button
          onClick={enableAllCookies}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Enable All
        </button>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookie Categories</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Required Cookies</h3>
          <p className="text-gray-700 mb-2">
            <strong>Status:</strong> Always Enabled
          </p>
          <p className="text-gray-700">
            These cookies are necessary for FindMySecurity to operate properly. They include functionality for secure logins, session management, fraud prevention, and platform navigation. These cannot be disabled.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytical Cookies</h3>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="analytical-cookies"
              checked={analyticalCookies}
              onChange={() => setAnalyticalCookies(!analyticalCookies)}
              className="mr-2"
            />
            <label htmlFor="analytical-cookies" className="text-gray-700">
              {analyticalCookies ? 'Enabled' : 'Disabled'}
            </label>
          </div>
          <p className="text-gray-700">
            These cookies help us analyse how visitors use the FindMySecurity platform. They allow us to measure performance and improve features based on anonymous aggregated data (e.g. Google Analytics).
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Targeting Cookies</h3>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="targeting-cookies"
              checked={targetingCookies}
              onChange={() => setTargetingCookies(!targetingCookies)}
              className="mr-2"
            />
            <label htmlFor="targeting-cookies" className="text-gray-700">
              {targetingCookies ? 'Enabled' : 'Disabled'}
            </label>
          </div>
          <p className="text-gray-700">
            These cookies may be set by advertising partners. They help personalise ads shown to you across other sites and limit repetition. They also assist in measuring advertising effectiveness.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CookieSettings;