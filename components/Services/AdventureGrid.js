import React from 'react';
import { FaHiking, FaCity, FaHotel, FaPlane } from 'react-icons/fa';

const servicesData = [
  {
    title: 'Adventure Tours',
    description: 'Discover thrilling outdoor adventures and breathtaking views.',
    icon: <FaHiking />,
    image: 'https://source.unsplash.com/400x300/?adventure',
  },
  {
    title: 'City Sightseeing',
    description: 'Explore vibrant cities and iconic landmarks.',
    icon: <FaCity />,
    image: 'https://source.unsplash.com/400x300/?city',
  },
  {
    title: 'Luxury Stays',
    description: 'Indulge in premium accommodations and exceptional services.',
    icon: <FaHotel />,
    image: 'https://source.unsplash.com/400x300/?luxury',
  },
  {
    title: 'Travel Packages',
    description: 'Affordable and customizable travel options for any budget.',
    icon: <FaPlane />,
    image: 'https://source.unsplash.com/400x300/?travel',
  },
];

const AdventureGrid = () => {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="group relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-blue-500 text-3xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdventureGrid;
