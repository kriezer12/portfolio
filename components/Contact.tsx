import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import styles from './Contact.module.css';

export default function Contact() {
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

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              className={styles.input}
              placeholder="Your name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="your@email.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              className={styles.textarea}
              placeholder="Tell me about your project..."
              rows={6}
            />
          </div>

          <button type="submit" className={styles.submit}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
