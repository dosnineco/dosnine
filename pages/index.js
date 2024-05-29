import Head from 'next/head';
import styles from '../styles/index.module.css';
import Image  from 'next/image';
import React, { useState } from 'react';
import Header_1 from 'Components/Headers/header_1';


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqs = [
    {
      question:'What is the cost of your website creation service?',
      answer:'Cost for any one of or sites are $150. Or pay ONLY for the Domain name and get the site for free but you have to do a video testimonial.'
    },
    {
      question:'Do you offer e-commerce options if I decide to sell products in the future?  ',
      answer:'We do not make e-commerce sites.'
    },
    {
      question:'Are there any hidden fees or additional charges?',
      answer:'No addition fees, all domains name are renewed every 2 years.'
    },

    {
      question: "What can the websites that we create do?",
      answer: "The website offers a variety of functionalities including showcasing your business, advertise your services, add Workflow, booking appointments, capturing leads, providing information, and facilitating contact with potential clients."
    },
    {
      question: "How long does it take to create and launch the website?",
      answer: "All our sites are deployed in 1 - 2 business day."
    },
    {
      question:'What kind of support do you offer after the website is live?',
      answer:'We maintain all sites for free.'
    },
    {
      question:'Can I update the content on my website myself?',
      answer:'No, changes are done by our team. Just state what you need.'
    },
    {
      question:'Do you provide domain registration and hosting services?      ',
      answer:'No, this is external to us.'
    },
    {
      question:'How customizable are the templates?',
      answer:'We can change the template to your desired outcome.'
    },
    {
      question:'Will my website be mobile-friendly?',
      answer:'All sites are made for all devices by default.'
    },
    {
      question: "what are you going to do differently that I can’t get for free?",
      answer: "As a software engineer, I code all my sites from scratch. You won't incur monthly or yearly fees like those other codeless sites. We also maintain your site at no additional cost. So focus on you business and reduce friction."
    },
 
    {
      question: "What is included in the simple site?",
      answer: "Options include a custom-built website tailored to your needs, a landing page for your business,  SEO optimization, responsive design, and ongoing support and maintenance. We do all the work for you."
    }
  ];

  return (
    <section className={styles.faqSection}>
      <h2>Frequently asked questions</h2>
      <p>Have no worries, we got you.</p>
      <div className={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div className={styles.faqQuestion} onClick={() => toggleAccordion(index)}>
              <h3>{faq.question}</h3>
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && <div className={styles.faqAnswer}><p>{faq.answer}</p></div>}
          </div>
        ))}
      </div>
    </section>
  );
};


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    /**This code is templates for headers */
    <header className={styles.header}>
      <div className={styles.container_h}>
        <div className={styles.logo}>
        <Image src="/logo.png" layout='intrinsic' width={40} height={33} placeholder='blur' blurDataURL priority/>
        </div>
        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div>{isOpen ? 'X' : '='}</div>
        </div>
      </div>
    </header>
  );
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dosnine Media</title>
        <meta name="description" content="Website creation service for service businesses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <Header/>



      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.tagline}>3 Day Service Delivery.</span>
            <h1 className={styles.title}>Premium Website Templates for Service Business?</h1>
            
            <div className={styles.buttons}>
            <a href='https://wa.me/message/5LXYP7EBAUHMD1' className={styles.button}>Book a Call</a>

            </div>
          </div>
          {/* <img src="/construction-site.jpg" alt="Construction site" /> 
          <div className={styles.heroImage_con} >
          <Image className={styles.heroImage}  src="/cta_bg.jpg" layout='intrinsic' width={1920} height={1280} placeholder='blur' blurDataURL priority/>
          </div>*/}
        </section>

        <section className={styles.whyChooseUs}>
          <h2>Why Choose Us</h2>
          <p>
            Our website creation service will elevate your construction business and overcome common challenges.
            Without a website, you miss out on credibility, visibility, and client opportunities. Our service showcases your business,
            attracts local clients, and keeps you competitive in the digital age.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <Image  src="/template.png" layout='intrinsic' width={114} height={114} placeholder='blur' blurDataURL priority/>
              <h3>Templates</h3>
            </div>
            <div className={styles.feature}>
              <Image  src="/technical-support.png" layout='intrinsic' width={114} height={114} placeholder='blur' blurDataURL priority/>
              <h3>Yearly Maintenance</h3>
            </div>
          </div>
        </section>


        <section className={styles.howItWorks}>
          <h2 className={styles.worksTitle}>How to get a website in a day?</h2>
          <p className={styles.worksSubtitle}>WORKING PROCESS</p>
          <div className={styles.worksContent}>
            
            {/* <img className={styles.worksImage} src="/ai-writer.png" alt="AI Writer Process" /> */}
            <div className={styles.worksSteps}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <div className={styles.stepText}>
                  <h3>You have to be a service business that does not sell products online.</h3>
                  <p>Online stores are time consuming to implement, which would make our websites more expensive to develop.</p>
                  {/* <a href="#" className={styles.getStarted}>Get Started →</a> */}
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <div className={styles.stepText}>
                  <h3>Select a template that works with your brand, from our list of Templates</h3>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <div className={styles.stepText}>
                  <h3>Book a appointment </h3>
                  <p>Once step 1 to 2 is ok, on call we will collect info on your business to tailor the template to your business and Publish to your domain. </p>

                  <a href='https://wa.me/message/5LXYP7EBAUHMD1'  className={styles.howItWorksButton}>Book here</a>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>4</span>
                <div className={styles.stepText}>
                  <h3>Your Website Is now live! </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      <FAQ/>
        
      </main>

      <footer className={styles.footer}>
        <p>Powered By Dosnine™</p>
        
      </footer>
    </div>
  );
}
