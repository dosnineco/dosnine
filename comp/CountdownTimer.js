// components/CountdownTimer.js
import styles from './styles/CountdownTimer.module.css'
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const deadline = new Date('2024-06-15T23:59:59').toISOString();

  const calculateTimeLeft = () => {
    const difference = +new Date(deadline) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (Object.values(timeLeft).every(value => value === 0)) {
      setIsTimeUp(true);
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <span key={interval}>
      {timeLeft[interval]} {interval}{" "}
    </span>
  ));

  return (
    <div className={styles.timer}>
      <h2>Limited Time Offer!</h2>
      {isTimeUp ? <p>Times Up!</p> : <p>{timerComponents}</p>}
    </div>
  );
};

export default CountdownTimer;
