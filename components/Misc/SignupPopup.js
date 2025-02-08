import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactPopup = () => {
  const [state, handleSubmit] = useForm("xgeggljb");
  const [showPopup, setShowPopup] = useState(false);
  const [isNewVisitor, setIsNewVisitor] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem('hasVisited', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleFormSubmit = async (event) => {
    await handleSubmit(event);
    if (state.succeeded) {
      setTimeout(handleClose, 3000); // Close popup 3 seconds after success
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto backdrop-blur-sm z-[9999] flex items-center justify-center p-3">
      <div className="relative max-w-2xl w-full mx-4">
        <button
          onClick={handleClose}
          className="absolute -top-8 right-0 text-white hover:text-gray-200 transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative bg-white rounded-2xl shadow-2xl p-8 sm:p-10 lg:p-12 border-4 border-orange-100/20">
          {/* Keep original contact form content */}
          {state.succeeded ? (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Thank you!
              </h2>
              <p className="text-gray-600">
                We'll be in touch shortly to discuss your project.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-secondary-color mb-3 ">
                  Launch Your Online Presence
                </h2>
                <p className="text-lg text-gray-600">
                  Get your FREE website consultation in 24 hours
                </p>
              </div>

              {/* Rest of your original form fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all"
                  />
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                    className="text-red-600 text-sm"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-600 text-sm"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all"
                  />
                  <ValidationError 
                    prefix="Phone" 
                    field="phone"
                    errors={state.errors}
                    className="text-red-600 text-sm"
                  />
                </div>

                {/* Business Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Business Name
                  </label>
                  <input
                    id="business"
                    type="text"
                    name="business"
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all"
                  />
                  <ValidationError 
                    prefix="Business" 
                    field="business"
                    errors={state.errors}
                    className="text-red-600 text-sm"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  How can we help you? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Describe your business goals and target audience"
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all"
                />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                  className="text-red-600 text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full flex justify-center items-center gap-3 bg-primary-color hover:bg-gray-400 text-white font-bold py-4 px-8 rounded-xl transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-gray-400"
                >
                  {state.submitting ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                      Get My Free Consultation
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  We respect your privacy. No spam, ever.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;