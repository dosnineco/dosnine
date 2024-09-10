import React from 'react';
import styles from './styles/WhatsNew.module.css';
import CountdownTimer from './CountdownTimer';


const WhatsNew = () => {
  return (
    <div  className={styles.container}>
      <h2 className={styles.title}>Whats New in Dosnine Boilderplate site!</h2>
      <p className={styles.description}>
      When you get a site from us, you are sold a website template. You are provided with 18+ theme colors. And! you not only get a website in a day, but you also get a workflow that filters new clients into your email inbox. Also, you can request a few other features at an extra cost. This boilerplate is for only $140/2yrs.
      </p>

      <button className={styles.button}><a href='https://wa.me/message/5LXYP7EBAUHMD1' >Buy Now</a></button>
    </div>
  );
};

export default WhatsNew;
