import React from 'react';
import styles from './styles/services.module.css';

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
    <section className={styles.servicesSection}>
      <h2 className={styles.title}>Our Services</h2>
      <div className={styles.servicesGrid}>
        {servicesData.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
