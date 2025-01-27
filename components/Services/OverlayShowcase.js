import React from 'react';
import { FaHiking, FaPlane, FaHotel, FaRoute } from 'react-icons/fa';

const servicesData = [
  {
    title: 'Adventure Tours',
    description: 'Explore exciting outdoor activities.',
    icon: <FaHiking />,
    image: 'https://source.unsplash.com/400x300/?adventure',
  },
  {
    title: 'Travel Packages',
    description: 'Affordable packages for every traveler.',
    icon: <FaPlane />,
    image: 'https://source.unsplash.com/400x300/?travel',
  },
  {
    title: 'Luxury Stays',
    description: 'Indulge in premium accommodations.',
    icon: <FaHotel />,
    image: 'https://source.unsplash.com/400x300/?luxury',
  },
  {
    title: 'Guided Trails',
    description: 'Discover new places with expert guides.',
    icon: <FaRoute />,
    image: 'https://source.unsplash.com/400x300/?trail',
  },
];

const OverlayShowcase = () => {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover transition-transform transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-3xl mb-2">{service.icon}</div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OverlayShowcase;
