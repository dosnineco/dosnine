import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useRouter } from 'next/router';

function ContactForm() {
  const [state, handleSubmit] = useForm("xgeggljb");
  const [isFormVisible, setIsFormVisible] = useState(true);
  const router = useRouter();

  const handleFormSubmit = async (event) => {
    handleSubmit(event);
    if (state.succeeded) {
      setIsFormVisible(false);
    }
  };

  const goToHomePage = () => {
    router.push('/');
  };

  if (!isFormVisible && state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Thank you for your submission!</h2>
        <p className="text-center mb-6">We’ll review your information and get back to you shortly.</p>
        <button
          onClick={goToHomePage}
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-10 p-6 bg-white rounded-md shadow-md">
      <form id="contact" onSubmit={handleFormSubmit}>
        <h2 className="text-2xl font-semibold text-center mb-6">Get Your Service Business Online</h2>

        <label htmlFor="name" className="block font-medium mb-2">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-600 text-sm mb-4" />

        <label htmlFor="email" className="block font-medium mb-2">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-600 text-sm mb-4" />

        <label htmlFor="phone" className="block font-medium mb-2">Phone Number</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-600 text-sm mb-4" />

        <label htmlFor="business" className="block font-medium mb-2">Business Name</label>
        <input
          id="business"
          type="text"
          name="business"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <ValidationError prefix="Business" field="business" errors={state.errors} className="text-red-600 text-sm mb-4" />

        <label htmlFor="industry" className="block font-medium mb-2">Industry</label>
        <select
          id="industry"
          name="industry"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        >
          <option value="">Select an industry</option>
          <option value="retail">Retail</option>
          <option value="healthcare">Healthcare</option>
          <option value="technology">Technology</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="features" className="block font-medium mb-2">Desired Features</label>
        <textarea
          id="features"
          name="features"
          placeholder="E.g., online store, booking system, portfolio gallery."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <label htmlFor="message" className="block font-medium mb-2">Additional Information</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us more about your business and specific needs."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-600 text-sm mb-4" />

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;