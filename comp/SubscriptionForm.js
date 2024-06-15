// components/SubscriptionForm.js
import { useState } from 'react';
import styles from './styles/SubscriptionForm.module.css';

const SubscriptionForm = () => {
  const [selectedPlan, setSelectedPlan] = useState(200);
  const [payYearly, setPayYearly] = useState(false);

  const plans = [
    {  price: 79,  },

  ];

  const handlePlanChange = (credits) => {
    setSelectedPlan(credits);
  };

  const handlePaymentCycleChange = () => {
    setPayYearly(!payYearly);
  };

  return (
    <div className={styles.subscriptionForm}>
      <h2>Subscription Plan</h2>
  

      <div className={styles.paymentCycle}>
  
      </div>
      <button className={styles.subscribeButton}>Subscribe now</button>
     
    </div>
  );
};

export default SubscriptionForm;
