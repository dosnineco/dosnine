import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xgeggljb");
  if (state.succeeded) {
    return <p className="text-center text-green-600 font-semibold">Thanks for joining!</p>;
  }
  return (
    <form
      id="contact"
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Create, customize, and launch effortlessly.
      </h2>

      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        name="email"
        className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
        className="text-red-600 text-sm mb-4"
      />

      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
        Message
      </label>
      <textarea
        placeholder="Your Name and Phone Number"
        id="message"
        name="message"
        className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
        className="text-red-600 text-sm mb-4"
      />

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full flex justify-center items-center gap-2 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          aria-hidden="true"
          focusable="false"
          role="img"
          width="20"
          height="20"
          className="fill-current text-white"
        >
          <path
            d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
          />
        </svg>
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
