"use client";

import { createContext, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext();

const SYSTEM_LIGHT = "(prefers-color-scheme: light)";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [isInitialized, setIsInitialized] = useState(false);
  // Follow the system theme until the visitor picks one with the toggle.
  const followSystem = useRef(true);

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
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    followSystem.current = false;
    // Cross-fade the whole page at once rather than letting each part change colour at its own speed.
    // flushSync applies the theme inside the transition so the new snapshot is captured in the new theme.
    if (document.startViewTransition) document.startViewTransition(() => flushSync(() => setTheme(nextTheme)));
    else setTheme(nextTheme);
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
