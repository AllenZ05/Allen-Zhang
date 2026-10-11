"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import styles from "./HeroHome.module.css";

const roles = [
  "Computer Engineering Student at the University of Waterloo",
  "Software Engineer Intern at Apple",
  "Would love to talk and connect with you :D",
];

const ROLE_INTERVAL_MS = 3500;

const HeroHome = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, ROLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.heroHome}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.glow} />
        <div className={styles.grid} />
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className={styles.badgeDot} />
          Open to Winter 2027 internships
        </motion.div>

        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Allen Zhang
        </motion.h1>

        <motion.div
          className={styles.roleLine}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/about" className={styles.primaryCta}>
            About Me
            <FiArrowRight className={styles.ctaIcon} aria-hidden="true" />
          </Link>
          <Link href="/experiences" className={styles.secondaryCta}>
            Experiences
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroHome;
