import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from './styles/ContactForm.module.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("xgeggljb");
  if (state.succeeded) {
      return <p className={styles.successMessage}>Thanks for joining!</p>;
  }
  return (
    <form id= 'contact' onSubmit={handleSubmit} className={styles.formContainer}>
    <h2 className={styles.h2}>Create, customize, and launch effortlessly.</h2>

      <label htmlFor="email" className={styles.label}>
        Email Address
      </label>
      <input
        id="email"
        type="email"
        name="email"
        className={styles.input}
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label htmlFor="message" className={styles.label}>
        Message
      </label>
      <textarea
        placeholder='Your Name and Phone Number'
        id="message"
        name="message"
        className={styles.textarea}
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting} className={styles.button}>
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
