import supabase from '../lib/supabase'; // Ensure Supabase client is correctly initialized
import { useUser } from '@clerk/nextjs';
import ClassDropdown from 'components/ClassDropdown'; // Custom component for theme selection
import React, { useState, useEffect } from 'react';

const classNames = [
  'theme-maroon', 'theme-mint', 'theme-rose', 'theme-silver', 'theme-gold',
  'theme-olive', 'theme-indigo', 'theme-lime', 'theme-cyan', 'theme-brown',
  'theme-teal', 'theme-pink', 'theme-orange', 'theme-purple', 'theme-green',
  'theme-blue', 'theme-dark-green', 'theme-yellow-deep', 'theme-gray-peach',
  'theme-gray-light', 'theme-red',
];

export default function FormPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  const [formData, setFormData] = useState({
    phone: '',
    business_name: '',
    industry: '',
    description: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone, business_name, industry, description } = formData;
    const user_id = user.id;
    const name = user.fullName;
    const email = user.emailAddresses[0]?.emailAddress; // Fetch email from Clerk

    try {
      const { data, error } = await supabase
        .from('user_onboarding_info')
        .insert([{ user_id, name, email, phone, business_name, industry, description }]);

      if (error) throw new Error(error.message);

      setSuccess('Your information was saved successfully!');
      setError(null);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen  mt-10 mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center"> Get started on achieving great things! </h1>

      {user?.fullName && <p className="text-center mb-4">Welcome, {user.fullName}!</p>}
     
     
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                aria-required="true"
                placeholder="Enter your phone number"
                pattern="^(876)\\d{7}$"
                title="Phone number must start with '876' followed by 7 digits (e.g., 8761234567)"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="business_name" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                id="business_name"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                required
                aria-required="true"
                placeholder="Enter your business name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                aria-required="true"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select an industry</option>
                <option value="Accounting">Accounting</option>
                <option value="Advertising">Advertising</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Architecture">Architecture</option>
                <option value="Automotive">Automotive</option>
                {/* Add other industries here */}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
            >
              Next
            </button>
          </>
        )}

        {currentStep === 2 && (
          <>
           

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Business Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a short description of your business"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
            >
              Submit
            </button>
          </>
        )}

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
      </form>
    </div>
  );
}
