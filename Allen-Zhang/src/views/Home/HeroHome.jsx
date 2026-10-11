"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { emailHref, profile, roleLabel } from "../../data/profile";
import styles from "./HeroHome.module.css";

const secondaryLines = [profile.education, "Would love to talk and connect with you :D"];

export default function HeroHome() {
  const [lineIndex, setLineIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => setLineIndex((index) => (index + 1) % secondaryLines.length), 3500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section className={styles.heroHome}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.glow} />
        <div className={styles.grid} />
      </div>
      <div className={styles.content}>
        <div className={styles.badge} data-enter style={{ "--enter-delay": "0.1s" }}>
          <span className={styles.badgeDot} />
          Open to {profile.availability} internships
        </div>
        <h1 className={styles.name} data-enter style={{ "--enter-delay": "0.2s" }}>
          {profile.name}
        </h1>
        <p className={styles.roleLine} data-enter style={{ "--enter-delay": "0.3s" }}>
          {roleLabel}
        </p>
        <div className={styles.education} data-enter style={{ "--enter-delay": "0.4s" }}>
          <span className="sr-only">{profile.education}</span>
          <span className={styles.rotatingLine} aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={reducedMotion ? 0 : lineIndex}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
              >
                {secondaryLines[reducedMotion ? 0 : lineIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <div className={styles.actions} data-enter style={{ "--enter-delay": "0.5s" }}>
          <Link href="/about/" className={styles.primaryCta}>
            About Me
            <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
          </Link>
          <Link href="/experiences/" className={styles.secondaryCta}>
            Experiences
          </Link>
          <a href={emailHref} className={styles.secondaryCta}>
            <FiMail aria-hidden="true" />
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
