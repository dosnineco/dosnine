import React from 'react';
import styles from './styles/services.module.css';
import SubscriptionForm from './SubscriptionForm';

const Services = ({ title, services }) => {
  return (
    <section className={styles.services}>
      <h2>{title}</h2>
        <SubscriptionForm/>
    </section>
  );
};

export default Services;


