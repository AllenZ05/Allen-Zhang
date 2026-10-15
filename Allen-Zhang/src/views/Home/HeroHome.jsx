"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { profile, roleLabel } from "../../data/profile";
import styles from "./HeroHome.module.css";

const heroLines = [
  profile.education,
  roleLabel,
  `Open to ${profile.availability} internships`,
  "Would love to talk and connect with you :D",
];

export default function HeroHome() {
  // Render a complete line in the static export; typing starts after hydration.
  const [typedText, setTypedText] = useState(heroLines[0]);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    let lineIndex = 0;
    let characterCount = 0;
    let deleting = false;

    const tick = () => {
      const line = heroLines[lineIndex];
      characterCount += deleting ? -1 : 1;
      setTypedText(line.slice(0, characterCount));

      let delay = deleting ? 25 : 45;
      if (!deleting && characterCount === line.length) {
        deleting = true;
        delay = 2400;
      } else if (deleting && characterCount === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % heroLines.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };

    const updateMotion = () => {
      clearTimeout(timer);
      if (motionPreference.matches) {
        setTypedText(heroLines[0]);
        return;
      }
      lineIndex = 0;
      characterCount = 0;
      deleting = false;
      setTypedText("");
      timer = setTimeout(tick, 400);
    };

    updateMotion();
    motionPreference.addEventListener("change", updateMotion);
    return () => {
      clearTimeout(timer);
      motionPreference.removeEventListener("change", updateMotion);
    };
  }, []);

  // A soft light trails the pointer and brightens the grid beneath it. Critically damped springs
  // follow without overshoot; mouse and pen only, and off for reduced motion.
  const reducedMotion = useReducedMotion();
  const [glowing, setGlowing] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useSpring(pointerX, { stiffness: 100, damping: 20 });
  const glowY = useSpring(pointerY, { stiffness: 100, damping: 20 });
  const glowXPx = useTransform(glowX, (value) => `${value}px`);
  const glowYPx = useTransform(glowY, (value) => `${value}px`);

  const trackPointer = (event) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
    if (!glowing) {
      // Appear at the pointer rather than sliding in from the last position.
      glowX.jump(pointerX.get());
      glowY.jump(pointerY.get());
      setGlowing(true);
    }
  };

  return (
    <section className={styles.heroHome} onPointerMove={trackPointer} onPointerLeave={() => setGlowing(false)}>
      <motion.div
        className={styles.backdrop}
        aria-hidden="true"
        data-glowing={glowing || undefined}
        style={{ "--glow-x": glowXPx, "--glow-y": glowYPx }}
      >
        <div className={styles.glow} />
        <div className={styles.grid} />
        <div className={styles.gridHighlight} />
        <div className={styles.cursorGlow} />
      </motion.div>
      <div className={styles.content}>
        <h1 className={styles.name} data-enter style={{ "--enter-delay": "0.2s" }}>
          {profile.name}
        </h1>
        <div className={styles.roleLine} data-enter style={{ "--enter-delay": "0.35s" }}>
          <span className="sr-only">{heroLines.join(". ")}</span>
          {heroLines.map((line) => (
            <span key={line} className={styles.lineSizer} aria-hidden="true">
              {line}
              <span className={styles.cursor} />
            </span>
          ))}
          <span className={styles.typedLine} aria-hidden="true" data-typewriter>
            {typedText}
            <span className={styles.cursor} />
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
          <Link href="/projects/" className={styles.secondaryCta}>
            Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
