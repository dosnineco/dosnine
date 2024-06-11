import React from 'react';
import styles from './styles/WhatsNew.module.css';

const WhatsNew = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>What's New in Flaticon</h2>
      <p className={styles.description}>
        See the latest website updates, new features, and tools, and get the most out of your Flaticon experience.
      </p>
      <button className={styles.button}>Browse all</button>
    </div>
  );
};

export default WhatsNew;
