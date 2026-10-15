"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./HeroBackdrop.module.css";

// Glow and grid behind a hero section (place it first inside the section). A soft light trails the
// pointer across the section and brightens the grid beneath it; critically damped springs follow
// without overshoot. Mouse and pen only, and off for reduced motion.
export default function HeroBackdrop() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [glowing, setGlowing] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useSpring(pointerX, { stiffness: 100, damping: 20 });
  const glowY = useSpring(pointerY, { stiffness: 100, damping: 20 });
  const glowXPx = useTransform(glowX, (value) => `${value}px`);
  const glowYPx = useTransform(glowY, (value) => `${value}px`);

  useEffect(() => {
    if (reducedMotion) {
      setGlowing(false);
      return;
    }
    const section = ref.current.parentElement;
    let active = false;
    const move = (event) => {
      if (event.pointerType === "touch") return;
      const rect = section.getBoundingClientRect();
      pointerX.set(event.clientX - rect.left);
      pointerY.set(event.clientY - rect.top);
      if (!active) {
        // Appear at the pointer rather than sliding in from the last position.
        glowX.jump(pointerX.get());
        glowY.jump(pointerY.get());
        active = true;
        setGlowing(true);
      }
    };
    const leave = () => {
      active = false;
      setGlowing(false);
    };
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, [reducedMotion, pointerX, pointerY, glowX, glowY]);

  return (
    <motion.div
      ref={ref}
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
  );
}
