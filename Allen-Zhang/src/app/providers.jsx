"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "../context/ThemeContext";

const Providers = ({ children }) => {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>{children}</ThemeProvider>
    </MotionConfig>
  );
};

export default Providers;
