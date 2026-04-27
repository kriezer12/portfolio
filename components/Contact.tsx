'use client';
import { FormEvent, useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import styles from './Contact.module.css';

export default function Contact() {
  const [result, setResult] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const hCaptchaSiteKey =
    process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '50b2fe65-b00b-4b9e-ad62-3ba471098be2';
  const isCaptchaEnabled = Boolean(hCaptchaSiteKey);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCaptchaEnabled && !captchaToken) {
      setResult('Please complete the captcha.');
      return;
    }

    setResult('Sending...');
    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
      honeypot: String(formData.get('honeypot') || ''),
      hCaptchaToken: isCaptchaEnabled ? captchaToken : null,
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      setResult('Form Submitted Successfully');
      event.currentTarget.reset();
      setCaptchaToken(null);
    } else {
      setResult('Error: ' + (data.error || data.message || 'Submission failed.'));
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

          <input
            type="text"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            style={{ display: 'none' }}
            aria-hidden="true"
          />

          <div className={styles.formGroup}>
            {hCaptchaSiteKey ? (
              <HCaptcha
                sitekey={hCaptchaSiteKey}
                reCaptchaCompat={false}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
              />
            ) : (
              <span className={styles.result}>Captcha unavailable. You can still submit the form.</span>
            )}
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
