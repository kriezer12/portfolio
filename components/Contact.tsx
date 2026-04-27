'use client';
import { useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import styles from './Contact.module.css';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      honeypot: formData.get('honeypot'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        e.currentTarget.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
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

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Honeypot field */}
          <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input type="text" name="name" id="name" required className={styles.input} placeholder="Your name" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input type="email" name="email" id="email" required className={styles.input} placeholder="your@email.com" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea name="message" id="message" required className={styles.textarea} placeholder="Tell me about your project..." rows={6} />
          </div>

          <button type="submit" className={styles.submit} disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
          
          {status === 'success' && <p className={styles.success}>Message sent successfully!</p>}
          {status === 'error' && <p className={styles.error}>Failed to send message. Please try again.</p>}
        </form>
      </div>
    </section>
  );
}
