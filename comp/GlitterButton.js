import React from 'react';
import confetti from 'canvas-confetti';
import styles from './styles/glitterbtn.module.css'

const GlitterButton = ({text}) => {
  const handleClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <a  onClick={handleClick} className={styles.button}>
      {text}
    </a>
  );
};


export default GlitterButton;
