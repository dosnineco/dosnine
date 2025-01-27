import React from 'react';

const servicesData = [
  {
    title: 'Web Development',
    description: 'Build modern and responsive websites and web applications.',
  },
  {
    title: 'Digital Marketing',
    description: 'Increase your online presence with our marketing strategies.',
  },
  {
    title: 'Mobile App Development',
    description: 'Create user-friendly mobile applications for both iOS and Android.',
  },
  {
    title: 'Graphic Design',
    description: 'Design visually appealing graphics and branding materials.',
  },
];

const Services = () => {
  return (
    <section className="py-12   ">
      <h2 className="text-4xl font-bold text-center mb-8">Our Services</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {servicesData.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border-t-4 border-blue-500 transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold text-inherit mb-4">{service.title}</h3>
            <p className="text-sm text-inherit">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

