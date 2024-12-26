import supabase from '../lib/supabase';
import { useUser } from '@clerk/nextjs';
import ClassDropdown from 'components/ClassDropdown';
import React, { useState, useEffect } from 'react';

const classNames = ['theme-maroon', 'theme-mint','theme-rose','theme-silver','theme-gold ','theme-olive','theme-indigo','theme-lime','theme-cyan','theme-brown','theme-teal','theme-pink','theme-orange','theme-purple','theme-green','theme-blue','theme-dark-green','theme-yellow-deep','theme-gray-peach','theme-gray-light','theme-red'];

export default function FormPage() {

  const [selectedClass, setSelectedClass] = useState('');
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (typeof window !== 'undefined' && selectedClass) {
      document.body.className = selectedClass;
    }
  }, [selectedClass]);

  const [formData, setFormData] = useState({
    phone: '',
    business_name: '',
    industry: '',
    description: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // Keep track of the current step

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone, business_name, industry, description } = formData;
    const user_id = user.id;
    const name = user.fullName;
    const color_preferences = selectedClass;



    const { data, error } = await supabase
      .from('client_websites')
      .insert([{ user_id, name, phone, business_name, industry, color_preferences, description }]);

    if (error) {
      setError(error.message);
      setSuccess(null);
    } else {
      setSuccess('Your information was saved successfully!');
      setError(null);
      setCurrentStep(currentStep + 1); // Move to the next step
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Get Your Website</h1>
      {user.fullName}
      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Information */}
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
            pattern="^(876)\d{7}$" // Regex pattern for Jamaican phone numbers
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
    <option value="Cleaning Services">Cleaning Services</option>
    <option value="Construction">Construction</option>
    <option value="Consulting">Consulting</option>
    <option value="Education">Education</option>
    <option value="Engineering">Engineering</option>
    <option value="Event Planning">Event Planning</option>
    <option value="Fitness">Fitness</option>
    <option value="Food Services">Food Services</option>
    <option value="Health Care">Health Care</option>
    <option value="Home Services">Home Services</option>
    <option value="Hospitality">Hospitality</option>
    <option value="Insurance">Insurance</option>
    <option value="IT Services">IT Services</option>
    <option value="Landscaping">Landscaping</option>
    <option value="Law">Law</option>
    <option value="Marketing">Marketing</option>
    <option value="Media">Media</option>
    <option value="Nursing">Nursing</option>
    <option value="Real Estate">Real Estate</option>
    <option value="Recruitment">Recruitment</option>
    <option value="Repair Services">Repair Services</option>
    <option value="Retail">Retail</option>
    <option value="Security">Security</option>
    <option value="Shipping">Shipping</option>
    <option value="Social Media">Social Media</option>
    <option value="Software Development">Software Development</option>
    <option value="Telecommunications">Telecommunications</option>
    <option value="Tourism">Tourism</option>
    <option value="Transportation">Transportation</option>
    <option value="Waste Management">Waste Management</option>
    <option value="Web Design">Web Design</option>
    <option value="Writing & Content Creation">Writing & Content Creation</option>
    <option value="Accounting Services">Accounting Services</option>
    <option value="Architectural Services">Architectural Services</option>
    <option value="Beauty Services">Beauty Services</option>
    <option value="Business Consulting">Business Consulting</option>
    <option value="Childcare Services">Childcare Services</option>
    <option value="Cleaning & Janitorial">Cleaning & Janitorial</option>
    <option value="Construction & Renovation">Construction & Renovation</option>
    <option value="Digital Marketing">Digital Marketing</option>
    <option value="Event Management">Event Management</option>
    <option value="Fitness & Wellness">Fitness & Wellness</option>
    <option value="Graphic Design">Graphic Design</option>
    <option value="Health & Wellness">Health & Wellness</option>
    <option value="Home Improvement">Home Improvement</option>
    <option value="Housekeeping">Housekeeping</option>
    <option value="IT Consulting">IT Consulting</option>
    <option value="Landscaping & Gardening">Landscaping & Gardening</option>
    <option value="Laundry Services">Laundry Services</option>
    <option value="Legal Services">Legal Services</option>
    <option value="Logistics">Logistics</option>
    <option value="Marketing & Advertising">Marketing & Advertising</option>
    <option value="Moving Services">Moving Services</option>
    <option value="Painting & Decorating">Painting & Decorating</option>
    <option value="Personal Training">Personal Training</option>
    <option value="Pet Services">Pet Services</option>
    <option value="Photography">Photography</option>
    <option value="Real Estate Services">Real Estate Services</option>
    <option value="Repair & Maintenance">Repair & Maintenance</option>
    <option value="Security Services">Security Services</option>
    <option value="Tutoring Services">Tutoring Services</option>
    <option value="Transportation Services">Transportation Services</option>
    <option value="Waste Disposal">Waste Disposal</option>
    <option value="Web Development">Web Development</option>
    <option value="Wedding Planning">Wedding Planning</option>
    <option value="Writing & Editing">Writing & Editing</option>
    <option value="Construction Supplies">Construction Supplies</option>
    <option value="Event Equipment Rentals">Event Equipment Rentals</option>
    <option value="Furniture Rentals">Furniture Rentals</option>
    <option value="Hearing Services">Hearing Services</option>
    <option value="Interior Design">Interior Design</option>
    <option value="Job Placement">Job Placement</option>
    <option value="Life Coaching">Life Coaching</option>
    <option value="Mobile App Development">Mobile App Development</option>
    <option value="Nutrition & Dietetics">Nutrition & Dietetics</option>
    <option value="Office Supplies">Office Supplies</option>
    <option value="Online Retail">Online Retail</option>
    <option value="Pest Control">Pest Control</option>
    <option value="Property Management">Property Management</option>
    <option value="Public Relations">Public Relations</option>
    <option value="Recruitment Agency">Recruitment Agency</option>
    <option value="Remodeling Services">Remodeling Services</option>
    <option value="Shipping & Delivery">Shipping & Delivery</option>
    <option value="Tax Consulting">Tax Consulting</option>
    <option value="Translation Services">Translation Services</option>
    <option value="Travel Agency">Travel Agency</option>
    <option value="Voice Over">Voice Over</option>
  </select>
</div>


            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)} // Move to next step
              className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
            >
              Next
            </button>
          </>
        )}

        {/* Step 2: Additional Information */}
        {currentStep === 2 && (
          <>
            <div className="mb-4">
  <label htmlFor="color_preferences" className="block text-sm font-medium text-gray-700">
    Color Preferences
  </label>
  <ClassDropdown classNames={classNames} onSelect={setSelectedClass} />

  </div>



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

        {/* Error and Success Messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
      </form>
    </div>
  );
}
