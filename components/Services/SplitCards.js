import React from 'react';
import { FaHiking, FaPlane, FaHotel, FaRoute } from 'react-icons/fa';

const servicesData = [
  {
    title: 'Adventure Tours',
    description: 'Embark on thrilling journeys into the wild.',
    icon: <FaHiking />,
  },
  {
    title: 'Travel Packages',
    description: 'Affordable travel plans for everyone.',
    icon: <FaPlane />,
  },
  {
    title: 'Luxury Stays',
    description: 'Experience world-class accommodations.',
    icon: <FaHotel />,
  },
  {
    title: 'Guided Trails',
    description: 'Explore stunning trails with local guides.',
    icon: <FaRoute />,
  },
];

const SplitCards = () => {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <div className="space-y-8 max-w-6xl mx-auto px-4">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="flex items-center bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-blue-500 text-white text-4xl p-8 flex items-center justify-center">
              {service.icon}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SplitCards;
