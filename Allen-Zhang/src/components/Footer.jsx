"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { FiCopy, FiMail } from "react-icons/fi";
import { emailHref, profile } from "../data/profile";
import { useHydrated } from "../lib/useHydrated";
import styles from "./Footer.module.css";

export default function Footer() {
  const [copyState, setCopyState] = useState("");
  const resetTimer = useRef(null);
  const hydrated = useHydrated();
  const reducedMotion = useReducedMotion();
  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("Email copied!");
      resetTimer.current = setTimeout(() => setCopyState(""), 3000);
    } catch {
      setCopyState("Select the email address to copy it, or click it to send an email.");
    }
  };

  const socials = [
    { name: "LinkedIn", key: "linkedin", icon: <FaLinkedinIn /> },
    { name: "Instagram", key: "instagram", icon: <FaInstagram /> },
    { name: "GitHub", key: "github", icon: <FaGithub /> },
  ];

  return (
    <footer id="contact" className={styles.footer}>
      <motion.div
        className={styles.contactRow}
        initial={false}
        whileInView={reducedMotion ? { opacity: 1, y: 0 } : { opacity: [0, 1], y: [20, 0] }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
      >
        <a href={emailHref} className={styles.emailLink}>
          <FiMail aria-hidden="true" />
          {profile.email}
        </a>
        {hydrated && (
          <button type="button" className={styles.copyButton} onClick={copyEmail} aria-label="Copy email address">
            <FiCopy aria-hidden="true" />
          </button>
        )}
      </motion.div>
      <p className={styles.copyStatus} role="status">
        {copyState}
      </p>
      <div className={styles.socials}>
        {socials.map((social, index) => (
          <motion.div
            key={social.key}
            className={styles.socialWrapper}
            initial={false}
            whileInView={reducedMotion ? { opacity: 1, y: 0 } : { opacity: [0, 1], y: [20, 0] }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : index * 0.1 }}
          >
            <a
              href={profile.socials[social.key]}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialButton} ${styles[social.key]}`}
              aria-label={`Visit ${social.name} profile`}
            >
              <span className={styles.footerIcon} aria-hidden="true">
                {social.icon}
              </span>
              <span className="sr-only">Visit {social.name} profile</span>
            </a>
          </motion.div>
        ))}
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
