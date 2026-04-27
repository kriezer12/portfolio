'use client';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useTheme } from 'next-themes';
import styles from './Contact.module.css';

const MAX_MESSAGE_LENGTH = 25000;
const CAPTCHA_BASE_WIDTH = 303;
const CAPTCHA_BASE_HEIGHT = 78;

function getErrorMessage(data: unknown): string {
  if (!data || typeof data !== 'object') {
    return 'Submission failed.';
  }

  const payload = data as {
    error?: string;
    message?: string;
    issues?: Array<{ message?: string }>;
  };

  if (typeof payload.error === 'string' && payload.error.trim()) {
    return payload.error;
  }

  if (Array.isArray(payload.issues) && payload.issues.length > 0) {
    const issueMessage = payload.issues
      .map((issue) => issue?.message)
      .filter((message): message is string => Boolean(message && message.trim()))
      .join(', ');

    if (issueMessage) {
      return issueMessage;
    }
  }

  if (typeof payload.message === 'string' && payload.message.trim()) {
    return payload.message;
  }

  return 'Submission failed.';
}

export default function Contact() {
  const { resolvedTheme } = useTheme();
  const [result, setResult] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [captchaScale, setCaptchaScale] = useState(1);
  const hCaptchaSiteKey =
    process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
  const isCaptchaEnabled = Boolean(hCaptchaSiteKey);
  const captchaTheme = resolvedTheme === 'dark' ? 'dark' : 'light';
  const captchaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showCaptcha || !isCaptchaEnabled) {
      return;
    }

    const updateScale = () => {
      const containerWidth = captchaContainerRef.current?.clientWidth ?? CAPTCHA_BASE_WIDTH;
      const nextScale = Math.min(1.5, Math.max(1, containerWidth / CAPTCHA_BASE_WIDTH));
      setCaptchaScale(Number(nextScale.toFixed(2)));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, [showCaptcha, isCaptchaEnabled]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCaptchaEnabled && !showCaptcha) {
      setShowCaptcha(true);
      setResult('Click Name field detected. Please complete captcha to continue.');
      return;
    }

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
      setResult('Error: ' + getErrorMessage(data));
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
              onFocus={() => setShowCaptcha(true)}
              onClick={() => setShowCaptcha(true)}
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
              onChange={(event) => setMessageLength(event.target.value.length)}
            />
            <span className={styles.charCount}>{messageLength}/{MAX_MESSAGE_LENGTH} characters</span>
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
            {hCaptchaSiteKey && showCaptcha ? (
              <div
                className={styles.captchaShell}
                ref={captchaContainerRef}
                style={{ height: `${CAPTCHA_BASE_HEIGHT * captchaScale}px` }}
              >
                <div className={styles.captchaScale} style={{ transform: `scale(${captchaScale})` }}>
                  <HCaptcha
                    key={`${hCaptchaSiteKey}-${captchaTheme}`}
                    sitekey={hCaptchaSiteKey}
                    theme={captchaTheme}
                    reCaptchaCompat={false}
                    onVerify={(token) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken(null)}
                    onError={() => setResult('Captcha failed to load. Check site key domain settings.')}
                  />
                </div>
              </div>
            ) : hCaptchaSiteKey ? (
              <span className={styles.result}>Captcha loads when you click the Name field.</span>
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
