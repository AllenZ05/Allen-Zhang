"use client";

import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createNoise, traceContours } from "../lib/terrain";
import styles from "./HeroBackdrop.module.css";

// Glow and contour lines behind a hero section (place it first inside the section). The lines trace a
// random landscape, so every visit gets its own design. A soft light follows the pointer across the
// section and brings out the lines beneath it. It tracks the pointer directly, like the cards'
// spotlights: a trailing spring left the light hundreds of pixels behind a quick mouse.
// Mouse and pen only, and off for reduced motion.
//
// The light and the lit lines are drawn once and slid around with transforms, which the compositor
// moves without repainting: redrawing full-section gradients and masks on every mouse move cost
// frames on big screens without graphics acceleration.
const GLOW_RADIUS = 380;
const LIT_RADIUS = 180;

export default function HeroBackdrop() {
  const ref = useRef(null);
  const terrainRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [glowing, setGlowing] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useTransform(pointerX, (x) => x - GLOW_RADIUS);
  const glowY = useTransform(pointerY, (y) => y - GLOW_RADIUS);
  const windowX = useTransform(pointerX, (x) => x - LIT_RADIUS);
  const windowY = useTransform(pointerY, (y) => y - LIT_RADIUS);
  // The opposite offset keeps the accent copy aligned with the faint lines as its window moves.
  const litX = useTransform(pointerX, (x) => LIT_RADIUS - x);
  const litY = useTransform(pointerY, (y) => LIT_RADIUS - y);

  // One landscape per visit, drawn twice: faint lines, and an accent copy the pointer light reveals.
  // It's retraced only when the section changes size; a theme change just recolours it.
  useEffect(() => {
    const terrain = terrainRef.current;
    const section = ref.current.parentElement;
    const canvases = [...terrain.querySelectorAll("canvas")];
    const noise = createNoise();
    let path = null;
    let range;
    let width = 0;
    let height = 0;
    const paint = () => {
      // The theme is set again on load, before the first drawing.
      if (!path) return;
      const css = getComputedStyle(document.documentElement);
      const colors = [css.getPropertyValue("--border-color"), css.getPropertyValue("--accent-border")];
      canvases.forEach((canvas, index) => {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, width, height);
        context.strokeStyle = colors[index];
        context.stroke(path);
      });
    };
    const draw = () => {
      ({ width, height } = section.getBoundingClientRect());
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      for (const canvas of canvases) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
      }
      // A few broad hills: ten lines read as a design rather than a map. Later traces reuse the first
      // one's height range, so when the hero only grows or shrinks (e.g. a phone's address bar hiding
      // on scroll) the lines stay put instead of all shifting.
      ({ path, range } = traceContours(noise, width, height, { count: 10, scale: 600, range }));
      paint();
      terrain.dataset.ready = "";
    };
    // Also fires once on observe, for the first drawing.
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(section);
    const themeObserver = new MutationObserver(paint);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

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
  }, [reducedMotion, pointerX, pointerY]);

  return (
    <div ref={ref} className={styles.backdrop} aria-hidden="true" data-glowing={glowing || undefined}>
      <div className={styles.glow} />
      <div ref={terrainRef} className={styles.terrain}>
        <canvas className={styles.lines} />
        <motion.div className={styles.litWindow} style={{ x: windowX, y: windowY }}>
          <motion.canvas className={styles.litLines} style={{ x: litX, y: litY }} />
        </motion.div>
      </div>
      <motion.div className={styles.cursorGlow} style={{ x: glowX, y: glowY }} />
    </div>
  );
}
