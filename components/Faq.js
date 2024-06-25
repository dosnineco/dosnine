import React, { useState } from 'react';
import styles from './styles/faq.module.css'




const FAQ = () => {
  
const faqs = [



  { question:'What is the cost of your website creation service?', answer:'Cost for a boilerplate is $79 USD.'
  },
  
  {
  question:'Are there any hidden fees or additional charges?', answer:'No additional fees; all domain names are renewed every 2 years. which you have to pay for.'
  },
  
  {
      question: "What can the websites that we create do?",   answer: "The website offers a variety of functionalities, including showcasing your business, advertising your services, adding workflow, booking appointments, capturing leads, providing information, and facilitating contact with potential clients."
  },
  {
      question: "How long does it take to create and launch the website?", answer: "All our sites are deployed in 1–2 business days."
    },
    {
      question:'What kind of support do you offer after the website is live?',  answer:'We maintain all sites, extra maintenance is for $8 USD a year.'
    },
    {
  question:'Can I update the content on my website myself?',    answer:'No, changes are done by our team. Just state what you need.'
    },
    {
  question:'Do you provide domain registration and hosting services? ',  answer:'No, this is external to us.'
    },
    {
      question:'How customizable are the templates?', answer:'The boilerplate is as is. You can only add your business information and change the theme.'
    },
    {
      question:'Will my website be mobile-friendly?',  answer:'All sites are made for all devices by default.'
    },
  
  
  
];
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