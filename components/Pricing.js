import React from "react";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-700 text-white">
      {/* Header */}
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Pricing</h1>
        <p className="text-lg font-light">
          Take advantage of the introductory pricing
        </p>
      </div>

      {/* Pricing Options */}
      <div className="flex flex-col md:flex-row mt-10 space-y-8 md:space-y-0 md:space-x-8">
        {/* Subscription Plan */}
        <div className="bg-white text-gray-900 rounded-lg shadow-lg w-80 md:w-96 p-8 text-center flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">Subscription</h2>
          <p className="text-5xl font-bold text-purple-700 mb-4">$2.50</p>
          <p className="text-sm text-gray-600 mb-6">/mo billed annually</p>
          <button className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition">
            Choose Plan
          </button>
        </div>

        {/* Lifetime Plan */}
        <div className="bg-white text-gray-900 rounded-lg shadow-lg w-80 md:w-96 p-8 text-center flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">Lifetime</h2>
          <p className="text-5xl font-bold text-purple-700 mb-4">$99</p>
          <p className="text-sm text-gray-600 mb-6">billed once</p>
          <button className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition">
            Choose Plan
          </button>
        </div>
      </div>

      {/* Call-to-Action */}
      <button className="mt-12 px-8 py-3 bg-purple-900 text-white text-lg font-medium rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-500 transition">
        Get for Chrome
      </button>
    </div>
  );
};

export default PricingPage;
