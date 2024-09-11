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
						d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
					/>
					</svg>
      </button>
    </form>
  );
}

export default ContactForm;



