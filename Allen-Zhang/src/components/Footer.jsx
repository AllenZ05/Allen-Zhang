"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import styles from "./Footer.module.css";

const EMAIL = "allen.zhang.y05@gmail.com";

const Footer = () => {
  const [copyState, setCopyState] = useState(null); // null | "copied" | "error"
  const resetTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(resetTimer.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyState("copied");
    } catch (err) {
      console.error("Could not copy email: ", err);
      setCopyState("error");
    }
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyState(null), 1600);
  };

  const socialLinks = [
    {
      icon: <HiOutlineMail className={styles.footerIcon} />,
      action: copyEmail,
      label: "Copy email to clipboard",
      type: "button",
      platform: "email",
    },
    {
      icon: <FaLinkedinIn className={styles.footerIcon} />,
      href: "https://www.linkedin.com/in/allenzhang-05-/",
      label: "Visit LinkedIn profile",
      type: "link",
      platform: "linkedin",
    },
    {
      icon: <FaInstagram className={styles.footerIcon} />,
      href: "https://www.instagram.com/allenz05/",
      label: "Visit Instagram profile",
      type: "link",
      platform: "instagram",
    },
    {
      icon: <FaGithub className={styles.footerIcon} />,
      href: "https://github.com/AllenZ05",
      label: "Visit GitHub profile",
      type: "link",
      platform: "github",
    },
  ];

  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.socials}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {socialLinks.map((social, index) => (
          <motion.div
            key={social.platform}
            className={styles.socialWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          >
            {social.type === "button" ? (
              <button
                type="button"
                onClick={social.action}
                className={`${styles.socialButton} ${styles[social.platform]}`}
                aria-label={social.label}
              >
                {social.icon}
              </button>
            ) : (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialButton} ${styles[social.platform]}`}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            )}

            {social.platform === "email" && (
              <AnimatePresence>
                {copyState && (
                  <motion.span
                    className={`${styles.copyTooltip} ${copyState === "error" ? styles.copyTooltipError : ""}`}
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    role="status"
                  >
                    {copyState === "copied" ? "Copied!" : "Copy failed"}
                  </motion.span>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        ))}
      </motion.div>

      <p className={styles.copyright}>© {new Date().getFullYear()} Allen Zhang</p>
    </footer>
  );
};

export default Footer;
