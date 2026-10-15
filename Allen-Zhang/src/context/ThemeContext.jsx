"use client";

import { createContext, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { fadeWholePage } from "../lib/fadeWholePage";

const ThemeContext = createContext();

const SYSTEM_LIGHT = "(prefers-color-scheme: light)";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [isInitialized, setIsInitialized] = useState(false);
  // Follow the system theme until the visitor picks one with the toggle.
  const followSystem = useRef(true);
  // The theme most recently asked for, the one on screen, and whether a cross-fade is running.
  // Clicks during a fade only move the target; it is applied when the fade ends, so fades never
  // cut each other off (which left the page half-switched for a moment).
  const targetTheme = useRef("dark");
  const appliedTheme = useRef("dark");
  const fading = useRef(false);

  useLayoutEffect(() => {
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem("theme");
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
    const systemLight = window.matchMedia(SYSTEM_LIGHT);
    if (savedTheme === "dark" || savedTheme === "light") {
      followSystem.current = false;
      setTheme(savedTheme);
    } else {
      setTheme(systemLight.matches ? "light" : "dark");
    }
    setIsInitialized(true);

    const updateFromSystem = (event) => {
      if (followSystem.current) setTheme(event.matches ? "light" : "dark");
    };
    systemLight.addEventListener("change", updateFromSystem);
    return () => systemLight.removeEventListener("change", updateFromSystem);
  }, []);

  useLayoutEffect(() => {
    if (!isInitialized) return;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    appliedTheme.current = theme;
    if (!fading.current) targetTheme.current = theme;
  }, [theme, isInitialized]);

  // Cross-fade the whole page at once rather than letting each part change colour at its own speed.
  // flushSync applies the theme inside the transition so the new snapshot is captured in the new theme.
  const fadeToTarget = () => {
    fading.current = true;
    fadeWholePage(() => flushSync(() => setTheme(targetTheme.current))).finished.finally(() => {
      fading.current = false;
      if (appliedTheme.current !== targetTheme.current) fadeToTarget();
    });
  };

  const toggleTheme = () => {
    const nextTheme = targetTheme.current === "dark" ? "light" : "dark";
    targetTheme.current = nextTheme;
    followSystem.current = false;
    if (!document.startViewTransition) setTheme(nextTheme);
    else if (!fading.current) fadeToTarget();
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // Keep the preference in memory for this visit.
    }
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
