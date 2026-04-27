'use client';
import { FormEvent, useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import styles from './Contact.module.css';

const MAX_MESSAGE_LENGTH = 25000;

export default function Contact() {
  const [result, setResult] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult('Sending...');
    
    const formData = new FormData(event.currentTarget);
    formData.append('access_key', '5d018e2e-cced-4c42-bab7-95d70810bd0a');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult('Form Submitted Successfully');
      event.currentTarget.reset();
    } else {
      setResult('Error: ' + (data.message || 'Submission failed.'));
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.header}>
        <h2>Get in Touch</h2>
      </div>

      <div className={styles.content}>
        <p className={styles.intro}>
          Have a project in mind? Let's collaborate. I'm open to new project collaborations, commissions, and job opportunities. Feel free to reach out to discuss how we can work together.
        </p>

        <div className={styles.socialContainer}>
          <a href="https://linkedin.com/in/kenneth-osorio-4b0a042b1" target="_blank" rel="noopener" className={styles.socialItem}>
            <FaLinkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/kriezer12" target="_blank" rel="noopener" className={styles.socialItem}>
            <FaGithub size={18} />
            <span>GitHub</span>
          </a>
          <a href="https://www.instagram.com/thirsty_samurai/" target="_blank" rel="noopener" className={styles.socialItem}>
            <FaInstagram size={18} />
            <span>Instagram</span>
          </a>
          <a href="mailto:osoriokenneth91@gmail.com" className={styles.socialItem}>
            <FaEnvelope size={18} />
            <span>Email</span>
          </a>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className={styles.input}
              placeholder="Your name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input type="email" name="email" id="email" required className={styles.input} placeholder="your@email.com" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              name="message"
              id="message"
              required
              className={styles.textarea}
              placeholder="Tell me about your project..."
              rows={6}
              maxLength={MAX_MESSAGE_LENGTH}
            />
          </div>

          <button type="submit" className={styles.submit}>
            Send Message
          </button>
          
          <span className={styles.result}>{result}</span>
        </form>
      </div>
    </section>
  );
}
