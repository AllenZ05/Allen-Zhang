"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
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
      setCopyState("copied");
      resetTimer.current = setTimeout(() => setCopyState(""), 3000);
    } catch {
      setCopyState("error");
    }
  };

  const socials = [
    { name: "Email", key: "email", icon: <HiOutlineMail />, href: emailHref },
    { name: "LinkedIn", key: "linkedin", icon: <FaLinkedinIn />, href: profile.socials.linkedin },
    { name: "Instagram", key: "instagram", icon: <FaInstagram />, href: profile.socials.instagram },
    { name: "GitHub", key: "github", icon: <FaGithub />, href: profile.socials.github },
  ];

  return (
    <footer id="contact" className={styles.footer}>
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
            {social.key === "email" && hydrated ? (
              <button
                type="button"
                onClick={copyEmail}
                className={`${styles.socialButton} ${styles.email}`}
                aria-label="Copy email address"
                title="Copy email address"
              >
                <span className={styles.footerIcon} aria-hidden="true">
                  {social.icon}
                </span>
              </button>
            ) : (
              <a
                href={social.href}
                target={social.key === "email" ? undefined : "_blank"}
                rel={social.key === "email" ? undefined : "noopener noreferrer"}
                className={`${styles.socialButton} ${styles[social.key]}`}
                aria-label={social.key === "email" ? "Email Allen Zhang" : `Visit ${social.name} profile`}
              >
                <span className={styles.footerIcon} aria-hidden="true">
                  {social.icon}
                </span>
                <span className="sr-only">
                  {social.key === "email" ? "Email Allen Zhang" : `Visit ${social.name} profile`}
                </span>
              </a>
            )}
          </motion.div>
        ))}
        <p className={styles.copyStatus} role="status">
          {copyState === "copied" && "Email copied!"}
          {copyState === "error" && (
            <>
              Copy manually: <a href={emailHref}>{profile.email}</a>
            </>
          )}
        </p>
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
