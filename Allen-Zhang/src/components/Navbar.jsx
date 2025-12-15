import styles from "./Navbar.module.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "../context/useTheme";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link to="/" onClick={closeMenu} className={styles.logo}>
        <h2>AllenZ05</h2>
      </Link>

      <ul className={click ? `${styles.nav} ${styles.active}` : styles.nav}>
        <motion.li initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Link to="/" onClick={closeMenu} className={isActive("/") ? styles.activeLink : ""}>
            Home
          </Link>
        </motion.li>
        <motion.li initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link to="/about" onClick={closeMenu} className={isActive("/about") ? styles.activeLink : ""}>
            About
          </Link>
        </motion.li>
        <motion.li initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Link to="/experiences" onClick={closeMenu} className={isActive("/experiences") ? styles.activeLink : ""}>
            Experiences
          </Link>
        </motion.li>
        <motion.li initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link to="/projects" onClick={closeMenu} className={isActive("/projects") ? styles.activeLink : ""}>
            Projects
          </Link>
        </motion.li>
      </ul>

      <div className={styles.navActions}>
        <motion.button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? <FiSun className={styles.themeIcon} /> : <FiMoon className={styles.themeIcon} />}
          </motion.div>
        </motion.button>

        <button className={styles.hamburgerMenu} onClick={handleClick} aria-label="Toggle navigation menu">
          <motion.div animate={{ rotate: click ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {click ? (
              <FaTimes className={styles.hamburgerIcon} />
            ) : (
              <GiHamburgerMenu className={styles.hamburgerIcon} />
            )}
          </motion.div>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
