import React from 'react';
import { FaHiking, FaPlane, FaHotel, FaMap } from 'react-icons/fa';

const servicesData = [
  {
    title: 'Adventure Tours',
    description: 'Exciting and guided outdoor activities.',
    icon: <FaHiking />,
  },
  {
    title: 'Travel Packages',
    description: 'Customizable packages for every traveler.',
    icon: <FaPlane />,
  },
  {
    title: 'Luxury Stays',
    description: 'Stay in premium, comfortable hotels.',
    icon: <FaHotel />,
  },
  {
    title: 'Local Exploration',
    description: 'Discover hidden gems with expert guides.',
    icon: <FaMap />,
  },
];

const FeatureCards = () => {
  return (
    <section className="p-16  w-full bg-secondary-color">
      <h2 className="text-3xl font-semibold text-center mb-12 text-white">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="bg-white text-center rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col items-center"
          >
            <div className="text-inherit text-4xl mb-4">{service.icon}</div>
            <h3 className="text-lg font-medium mb-2 text-inherit">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
