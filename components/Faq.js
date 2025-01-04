import React, { useState } from 'react';
import styles from './styles/faq.module.css'




const FAQ = () => {
  
const faqs = [



  { question:'What is the cost of your website creation service?', answer:'our boilerplate is for $178USD/1yr    '
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
                <span className={styles.faqIcon}>{activeIndex === index ? 
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                        width="25"
                        height="25"
                      >
                      <path
                        fill="#000"
                  d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                      />
                      </svg>
                
                : 
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                      width="25"
                      height="25"
                    >
                    <path
                      fill="#000"
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
                    />
                    </svg>
                  
                  }</span>
              </div>
              {activeIndex === index && <div className={styles.faqAnswer}><p>{faq.answer}</p></div>}
            </div>
          ))}
        </div>
      </section>
    );
  };

export default FAQ;
