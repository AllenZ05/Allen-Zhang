"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCode, FaGraduationCap, FaRocket } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { MdHourglassBottom } from "react-icons/md";
import { educationYears, skillCategories } from "../../data/about";
import styles from "./About.module.css";

const About = () => {
  const [selectedSection, setSelectedSection] = useState("Introduction");
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isTiltEnabled, setIsTiltEnabled] = useState(false);
  const cardRef = useRef(null);

  const tiltMultipliers = {
    Introduction: 3,
    Education: 1,
    Skills: 2,
  };

  const handleMouseMove = (e) => {
    if (!isTiltEnabled) return;
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const multiplier = tiltMultipliers[selectedSection] || 1;
    const rotateX = ((y - centerY) / centerY) * -multiplier;
    const rotateY = ((x - centerX) / centerX) * multiplier;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    if (!isTiltEnabled) return;
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1201px)");

    const updateTiltState = (event) => {
      setIsTiltEnabled(event.matches);
      if (!event.matches) {
        setTilt({ rotateX: 0, rotateY: 0 });
      }
    };

    updateTiltState(mediaQuery);
    mediaQuery.addEventListener("change", updateTiltState);

    return () => mediaQuery.removeEventListener("change", updateTiltState);
  }, []);

  const skillsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        opacity: { duration: 0.4, ease: "easeOut" },
        scale: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
        y: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
      },
    },
  };

  const handleSectionChange = (section) => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setSelectedSection(section);
  };

  const cardMotionProps = {
    ref: cardRef,
    className: styles.sectionCard,
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: isTiltEnabled ? tilt.rotateX : 0,
      rotateY: isTiltEnabled ? tilt.rotateY : 0,
    },
    transition: { duration: 0.4, rotateX: { duration: 0.1 }, rotateY: { duration: 0.1 } },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "Introduction":
        return (
          <motion.div key="introduction" {...cardMotionProps}>
            <div className={styles.cardIcon}>
              <FaRocket aria-hidden="true" />
            </div>
            <div className={styles.cardContent}>
              <h3>Introduction</h3>
              <div className={styles.introText}>
                <p>
                  Heyyy, it&apos;s Allen. I am a third-year Computer Engineering student at the{" "}
                  <a
                    href="https://uwaterloo.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.introLink}
                  >
                    University of Waterloo
                  </a>
                  , pursuing a BASc in{" "}
                  <a
                    href="https://uwaterloo.ca/engineering/future-students/computer-engineering"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.introLink}
                  >
                    Computer Engineering
                  </a>
                  . Incoming Software Engineer Intern at{" "}
                  <a
                    href="https://www.rippling.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.introLink}
                  >
                    Rippling
                  </a>
                  , and previously a Software Engineer Intern at{" "}
                  <a
                    href="https://www.apple.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.introLink}
                  >
                    Apple
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.shopify.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.introLink}
                  >
                    Shopify
                  </a>
                  .
                </p>
                <p>I am an ambitious individual with a mission to make a positive impact on the world.</p>
                <p>Usually the Bay Area, New York City, Toronto, or Waterloo.</p>

                <div className={styles.highlightBox}>
                  <strong>Seeking Summer or Fall 2027 Tech Internships</strong>
                  <span>
                    Preferably in NYC or the Bay Area. Excited about Big Tech, high-growth startups, and anywhere
                    building cool things.
                  </span>
                </div>

                <p>Feel free to connect with me using my social links in the footer!</p>
              </div>
            </div>
          </motion.div>
        );
      case "Education":
        return (
          <motion.div key="education" {...cardMotionProps}>
            <div className={styles.cardIcon}>
              <FaGraduationCap aria-hidden="true" />
            </div>
            <div className={styles.cardContent}>
              <h3>Education</h3>
              <div className={styles.universityHeader}>
                <h4>University of Waterloo</h4>
                <span className={styles.location}>Waterloo, ON</span>
                <span className={styles.program}>Computer Engineering</span>
              </div>

              <div className={styles.academicYears}>
                {educationYears.map((year) => (
                  <div key={year.year} className={styles.yearSection}>
                    <h5>{year.year}</h5>
                    <div className={styles.termsGrid}>
                      {year.terms.map((term) => (
                        <div key={term.name} className={styles.termCard}>
                          <h6>{term.name}</h6>
                          <ul>
                            {term.courses.map((course) => (
                              <li key={course}>
                                {term.upcoming ? (
                                  <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                                ) : (
                                  <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                                )}
                                {course}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case "Skills":
        return (
          <motion.div key="skills" {...cardMotionProps}>
            <div className={styles.cardIcon}>
              <FaCode aria-hidden="true" />
            </div>
            <div className={styles.cardContent}>
              <h3>Skills</h3>

              <div className={styles.skillsContainer}>
                <motion.div
                  className={styles.skillCategoriesGrid}
                  initial="hidden"
                  animate="visible"
                  variants={skillsContainerVariants}
                >
                  {skillCategories.map((category) => (
                    <motion.div
                      key={category.title}
                      className={styles.skillCategory}
                      style={{ "--gradient": category.gradient }}
                      variants={skillItemVariants}
                    >
                      <h5>{category.title}</h5>
                      <div className={styles.skillTags}>
                        {category.skills.map((skill) => (
                          <span key={skill} className={styles.skillTag}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <main className={styles.aboutMain}>
      <motion.h1
        className={styles.heading}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        About Me
      </motion.h1>

      <div className={styles.tabNavigation}>
        {["Introduction", "Education", "Skills"].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => handleSectionChange(tab)}
            className={`${styles.tabButton} ${selectedSection === tab ? styles.activeTab : ""}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      <div className={styles.contentContainer} style={{ perspective: isTiltEnabled ? 1000 : "none" }}>
        {renderSection()}
      </div>
    </main>
  );
};

export default About;
