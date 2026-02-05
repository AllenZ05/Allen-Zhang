"use client";

import PropTypes from "prop-types";
import { ThemeProvider } from "../context/ThemeContext";

const Providers = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
