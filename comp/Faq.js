import React, { useState } from 'react';
import styles from './styles/faq.module.css'

const FAQ = ({faq}) => {
    const faqs =faq
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleAccordion = (index) => {
      if (index === activeIndex) {
        setActiveIndex(null);
      } else {
        setActiveIndex(index);
      }
    };
  
   
    return (
      <section className={styles.faqSection}>
        <h2>Frequently asked questions</h2>
        <p>Have no worries, we got you.</p>
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div className={styles.faqQuestion} onClick={() => toggleAccordion(index)}>
                <h3>{faq.question}</h3>
                <span className={styles.faqIcon}>{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && <div className={styles.faqAnswer}><p>{faq.answer}</p></div>}
            </div>
          ))}
        </div>
      </section>
    );
  };

export default FAQ;