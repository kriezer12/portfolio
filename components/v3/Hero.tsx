'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import DotField from './DotField';
import { profile } from '@/content/v3';
import styles from './Hero.module.css';

const [firstName, lastName] = profile.name.split(' ');
const [roleMain, roleRest] = profile.role.split(' - ');

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const kickerInnerRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const roleInnerRef = useRef<HTMLSpanElement>(null);
  const blurbInnerRef = useRef<HTMLSpanElement>(null);
  const stemRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = root.querySelector('canvas');
    const nameRows = [line1Ref.current, line2Ref.current].filter(
      (el): el is HTMLSpanElement => el !== null
    );

    const ctx = gsap.context(() => {
      gsap.set(canvas, { opacity: 0 });
      gsap.set(kickerInnerRef.current, { yPercent: 110 });
      gsap.set(nameRows, { yPercent: 112 });
      gsap.set([roleInnerRef.current, blurbInnerRef.current], { yPercent: 110 });
      gsap.set(stemRef.current, { scaleY: 0 });

      gsap
        .timeline({ delay: 0.15 })
        .to(canvas, { opacity: 1, duration: 1.4, ease: 'power2.out' }, 0.1)
        .to(kickerInnerRef.current, { yPercent: 0, duration: 0.7, ease: 'power3.out' }, 0.15)
        .to(nameRows, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 }, 0.25)
        .to(roleInnerRef.current, { yPercent: 0, duration: 0.7, ease: 'power3.out' }, '-=0.7')
        .to(blurbInnerRef.current, { yPercent: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
        .to(stemRef.current, { scaleY: 1, duration: 0.8, ease: 'power2.inOut' }, '-=0.5');

      gsap.to(stemRef.current, {
        scaleY: 0.4,
        transformOrigin: 'bottom',
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 4,
      });

      gsap.to(nameRef.current, {
        yPercent: -8,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} id="hero" className={`${styles.hero} v3-root`}>
      <span className={`${styles.plus} ${styles.secCorner}`} aria-hidden="true" />
      <span className={`${styles.plus} ${styles.secCornerTr}`} aria-hidden="true" />
      <DotField className={styles.dotfield} />
      <div className={styles.content}>
        <div className={`${styles.mask} ${styles.kicker}`}>
          <span ref={kickerInnerRef} className={styles.kickerInner}>
            <span className={styles.dash} />
            {profile.location} &mdash; Est. folio, third edition
          </span>
        </div>
        <h1 ref={nameRef} className={styles.name}>
          <span className={styles.mask}>
            <span ref={line1Ref}>{firstName}</span>
          </span>
          <span className={`${styles.mask} ${styles.indent}`}>
            <span ref={line2Ref} className={styles.outline}>
              {lastName}
              <span className={styles.accentDot}>.</span>
            </span>
          </span>
        </h1>
        <div className={styles.foot}>
          <div>
            <p className={`${styles.mask} ${styles.role}`}>
              <span ref={roleInnerRef}>
                <em>{roleMain}</em> &mdash; {roleRest}
              </span>
            </p>
            <p className={`${styles.mask} ${styles.blurb}`}>
              <span ref={blurbInnerRef}>{profile.blurb}</span>
            </p>
          </div>
          <div className={styles.scrollCue}>
            <span>(Scroll)</span>
            <span ref={stemRef} className={styles.stem} />
          </div>
        </div>
      </div>
    </section>
  );
}
