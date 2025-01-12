import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
  const faqs = [
    { question: 'What is the cost of your website creation service?', answer: 'Our boilerplate is for $178USD/1yr.' },
    { question: 'Are there any hidden fees or additional charges?', answer: 'No additional fees; all domain names are renewed every 2 years, which you have to pay for.' },
    {
      question: 'What can the websites that we create do?',
      answer: 'The website offers a variety of functionalities, including showcasing your business, advertising your services, adding workflow, booking appointments, capturing leads, providing information, and facilitating contact with potential clients.',
    },
    { question: 'How long does it take to create and launch the website?', answer: 'All our sites are deployed in 1–2 business days.' },
    { question: 'Can I update the content on my website myself?', answer: 'No, changes are done by our team. Just state what you need.' },
    { question: 'Do you provide domain registration and hosting services?', answer: 'No, this is external to us.' },
    { question: 'How customizable are the templates?', answer: 'The boilerplate is as is. You can only add your business information and change the theme.' },
    { question: 'Will my website be mobile-friendly?', answer: 'All sites are made for all devices by default.' },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-gray-100 rounded-lg box-shadow py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl pt-6 font-bold text-gray-800 text-center mb-4">Frequently Asked Questions</h2>
      <p className="text-center text-sm text-gray-600 mb-8">Have no worries, we got you.</p>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg bg-white shadow-sm transition-all"
          >
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="text-gray-800 font-medium">{faq.question}</h3>
              <span className="text-gray-500">
                {activeIndex === index ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
              </span>
            </div>
            {activeIndex === index && (
              <div className="px-4 py-3 text-gray-600 border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
