import React from 'react';
import { FaHiking, FaPlane, FaHotel, FaRoute } from 'react-icons/fa';

const servicesData = [
  {
    title: 'Adventure Tours',
    description: 'Exciting outdoor adventures with expert guides.',
    icon: <FaHiking />,
  },
  {
    title: 'Travel Packages',
    description: 'Affordable and personalized travel deals.',
    icon: <FaPlane />,
  },
  {
    title: 'Luxury Hotels',
    description: 'Stay in the most comfortable and luxurious hotels.',
    icon: <FaHotel />,
  },
  {
    title: 'Guided Trails',
    description: 'Experience expertly guided tours in stunning locations.',
    icon: <FaRoute />,
  },
];

const IconCards = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-500 to-teal-400 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white text-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="bg-blue-500 text-white rounded-full p-4 text-3xl mb-4">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IconCards;
