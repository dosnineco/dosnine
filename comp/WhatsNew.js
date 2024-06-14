import React from 'react';
import styles from './styles/WhatsNew.module.css';

const WhatsNew = () => {
  return (
    <div  className={styles.container}>
      <h2 className={styles.title}>Whats New in Flaticon</h2>
      <p className={styles.description}>
        See the latest website updates, new features, and tools, and get the most out of your Flaticon experience.
      </p>
      <button className={styles.button}><a href='https://7617327545561.gumroad.com/l/Servicelaunch' >Get Service launch</a></button>
    </div>
  );
};

export default WhatsNew;
