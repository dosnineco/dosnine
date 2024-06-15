import React from 'react';
import styles from './styles/WhatsNew.module.css';
import CountdownTimer from './CountdownTimer';
import ImagePopup from './ImagePopup'


const WhatsNew = () => {
  return (
    <div  className={styles.container}>
      <h2 className={styles.title}>Whats New in Dosnine Boilderplate site!</h2>
      <ImagePopup src="./themes.png" alt="Sample Image" />
      <p className={styles.description}>
      When you get a site from us, you are sold this exact design. You are provided with 18+ theme colors. And! you not only get a website in a day, but you also get a workflow that filters new clients into your inbox. Also, you can request a few other features at an extra cost. This boilerplate is for only $79, and there are only 3610 spaces left.
      </p>

      <button className={styles.button}><a href='https://7617327545561.gumroad.com/l/yrccb' >Buy Boilerplate</a></button>
    </div>
  );
};

export default WhatsNew;
