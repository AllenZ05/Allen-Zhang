"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/useTheme";
import { SPRING } from "../lib/motion";
import { useHydrated } from "../lib/useHydrated";
import { useSlidingIndicator } from "../lib/useSlidingIndicator";
import Modal from "./Modal";
import styles from "./Navbar.module.css";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about/", label: "About" },
  { path: "/experiences/", label: "Experiences" },
  { path: "/projects/", label: "Projects" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopList, setDesktopList] = useState(null);
  const pathname = usePathname();
  const hydrated = useHydrated();
  const reducedMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const closeMenu = () => setIsOpen(false);
  const normalize = (path) => path.replace(/\/$/, "") || "/";

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1025px)");
    const closeOnDesktop = (event) => {
      if (event.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: navigation closes the menu, including browser Back.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // The desktop list gets a single highlight that glides to the current page's link.
  const indicator = useSlidingIndicator(desktopList, '[aria-current="page"]', pathname);

  const links = navLinks.map(({ path, label }, index) => {
    const active = normalize(pathname) === normalize(path);
    return (
      <li key={path} data-enter style={{ "--enter-delay": `${index * 0.08}s`, "--enter-distance": "-12px" }}>
        <Link
          href={path}
          onClick={closeMenu}
          className={active ? styles.activeLink : undefined}
          aria-current={active ? "page" : undefined}
        >
          {label}
        </Link>
      </li>
    );
  });

  return (
    <>
      {/* Its own view-transition layer above the sliding pages (globals.css). Set inline: CSS Modules
          would rename it, and the global rules for "navbar" would no longer match. */}
      <nav
        className={styles.header}
        style={{ viewTransitionName: "navbar" }}
        data-scrolled={scrolled || undefined}
        aria-label="Main navigation"
      >
        <Link href="/" className={styles.logo}>
          <span>AllenZ05</span>
        </Link>
        <ul ref={setDesktopList} className={styles.desktopNav} data-indicator={indicator ? "" : undefined}>
          {indicator && (
            <motion.li
              className={styles.indicator}
              data-enter
              initial={false}
              animate={indicator}
              transition={reducedMotion ? { duration: 0 } : SPRING}
              aria-hidden="true"
            />
          )}
          {links}
        </ul>
        {hydrated && (
          <div className={styles.navActions}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <motion.span
                key={theme}
                className={styles.themeSymbol}
                initial={reducedMotion ? false : { rotate: -90, scale: 0.6 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
                aria-hidden="true"
              >
                {theme === "dark" ? <FiSun className={styles.themeIcon} /> : <FiMoon className={styles.themeIcon} />}
              </motion.span>
            </button>
            <button
              type="button"
              className={styles.hamburgerMenu}
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <FiMenu className={styles.hamburgerIcon} aria-hidden="true" />
            </button>
          </div>
        )}
        {!hydrated && <ul className={styles.fallbackNav}>{links}</ul>}
      </nav>
      <Modal open={isOpen} onClose={closeMenu} title="Navigation" id="mobile-navigation" className={styles.menuDialog}>
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNav}>{links}</ul>
        </nav>
      </Modal>
    </>
  );
}
