import React from 'react';
import styles from './styles/WhatsNew.module.css';


const WhatsNew = () => {
  return (
    <div  className={styles.container}>
      <h2 className={styles.title}>Whats New in Dosnine template site!</h2>
      <p className={styles.description}>
      When you get a site from us, you are sold a website template. You are provided with 18+ theme colors. This template now has quarterly,every six months and yearly payments to make owning a website painless.
      </p>

      <button className="box-shadow m-2 relative bg-green-400 text-black text-xl font-bold py-4 px-10 rounded hover:bg-white-100 transition-colors"><a href='https://wa.me/message/5LXYP7EBAUHMD1' >WhatsApp Me</a></button>
    </div>
  );
};

export default WhatsNew;
