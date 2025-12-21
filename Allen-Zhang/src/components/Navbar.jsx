import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/useTheme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/experiences", label: "Experiences" },
    { path: "/projects", label: "Projects" },
  ];

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

      {/* Desktop Navigation */}
      <ul className={styles.desktopNav}>
        {navLinks.map((link, index) => (
          <motion.li
            key={link.path}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <Link to={link.path} className={isActive(link.path) ? styles.activeLink : ""}>
              {link.label}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul className={styles.mobileNav} variants={menuVariants} initial="closed" animate="open" exit="closed">
            {navLinks.map((link, index) => (
              <motion.li key={link.path} custom={index} variants={linkVariants} initial="closed" animate="open">
                <Link to={link.path} onClick={closeMenu} className={isActive(link.path) ? styles.activeLink : ""}>
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

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

        <button className={styles.hamburgerMenu} onClick={toggleMenu} aria-label="Toggle navigation menu">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? (
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
