"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCode, FaGraduationCap, FaRocket } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { MdHourglassBottom } from "react-icons/md";
import { educationYears, skillCategories } from "../../data/about";
import { emailHref, profile } from "../../data/profile";
import { useHydrated } from "../../lib/useHydrated";
import styles from "./About.module.css";

const About = () => {
  const [selectedSection, setSelectedSection] = useState("Introduction");
  const hydrated = useHydrated();
  const [verticalTabs, setVerticalTabs] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 250, damping: 28 });
  const springY = useSpring(rotateY, { stiffness: 250, damping: 28 });
  const tabRefs = useRef([]);
  const tabs = ["Introduction", "Education", "Skills"];

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const update = () => setVerticalTabs(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 1201px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setTiltEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const selectSection = (section) => {
    resetTilt();
    setSelectedSection(section);
  };

  const cardMotionProps = {
    className: styles.sectionCard,
    "data-enter": true,
    style: {
      "--enter-scale": 0.95,
      transformPerspective: 1000,
      rotateX: tiltEnabled && !reducedMotion ? springX : 0,
      rotateY: tiltEnabled && !reducedMotion ? springY : 0,
    },
    onMouseMove: (event) => {
      if (!tiltEnabled || reducedMotion) return;
      // Measure the stationary panel, so the card's own tilt cannot move its target.
      const rect = event.currentTarget.parentElement.getBoundingClientRect();
      const strength = { Introduction: 3, Education: 1, Skills: 2 }[selectedSection];
      rotateX.set(((event.clientY - rect.top) / rect.height - 0.5) * -2 * strength);
      rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 2 * strength);
    },
    onMouseLeave: resetTilt,
  };

  const handleTabKey = (event, index) => {
    let next;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else if (event.key === (verticalTabs ? "ArrowDown" : "ArrowRight")) next = (index + 1) % tabs.length;
    else if (event.key === (verticalTabs ? "ArrowUp" : "ArrowLeft")) next = (index + tabs.length - 1) % tabs.length;
    if (next === undefined) return;
    event.preventDefault();
    selectSection(tabs[next]);
    tabRefs.current[next]?.focus();
  };

  const renderSection = (section) => {
    switch (section) {
      case "Introduction":
        return (
          <motion.div {...cardMotionProps}>
            <div className={styles.cardIcon}>
              <FaRocket aria-hidden="true" />
            </div>
            <div className={styles.cardContent}>
              <h2>Introduction</h2>
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
                  . {profile.role.status === "incoming" ? "Incoming " : ""}
                  {profile.role.title} at{" "}
                  <a
                    href={profile.role.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.introLink}
                  >
                    {profile.role.company}
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
                <p>Usually in the Bay Area, New York City, Toronto, or Waterloo.</p>

                <div className={styles.highlightBox}>
                  <strong>Seeking {profile.availability} Tech Internships</strong>
                  <span>
                    Preferably in New York City or the Bay Area. Excited about high-growth startups, top tech companies,
                    and anywhere building cool things.
                  </span>
                </div>

                <p>
                  Feel free to{" "}
                  <a href={emailHref} className={styles.introLink}>
                    email me
                  </a>{" "}
                  or connect on{" "}
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.introLink}
                  >
                    LinkedIn
                  </a>
                  !
                </p>
              </div>
            </div>
          </motion.div>
        );
      case "Education":
        return (
          <motion.div {...cardMotionProps}>
            <div className={styles.cardIcon}>
              <FaGraduationCap aria-hidden="true" />
            </div>
            <div className={styles.cardContent}>
              <h2>Education</h2>
              <div className={styles.universityHeader}>
                <h3>University of Waterloo</h3>
                <span className={styles.location}>Waterloo, ON</span>
                <span className={styles.program}>Computer Engineering</span>
              </div>

              <div className={styles.academicYears}>
                {educationYears.map((year) => (
                  <div key={year.year} className={styles.yearSection}>
                    <h4>{year.year}</h4>
                    <div className={styles.termsGrid}>
                      {year.terms.map((term) => (
                        <div key={term.name} className={styles.termCard}>
                          <h5>{term.name}</h5>
                          {term.status && (
                            <span className={styles.termBadge}>
                              {term.status === "in-progress" ? "In progress" : "Upcoming"}
                            </span>
                          )}
                          <ul>
                            {term.courses.map((course) => (
                              <li key={course}>
                                {term.status ? (
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
          <motion.div {...cardMotionProps}>
            <div className={styles.cardIcon}>
              <FaCode aria-hidden="true" />
            </div>
            <div className={styles.cardContent}>
              <h2>Skills</h2>

              <div className={styles.skillsContainer}>
                <div className={styles.skillCategoriesGrid}>
                  {skillCategories.map((category, index) => (
                    <div
                      key={category.title}
                      className={styles.skillCategory}
                      data-enter
                      style={{
                        "--gradient": category.gradient,
                        "--enter-delay": `${0.1 + index * 0.1}s`,
                        "--enter-scale": 0.95,
                      }}
                    >
                      <h3>{category.title}</h3>
                      <div className={styles.skillTags}>
                        {category.skills.map((skill) => (
                          <span key={skill} className={styles.skillTag}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <main id="main-content" tabIndex={-1} className={`page-main ${styles.aboutMain}`}>
      <h1 className="page-heading" data-enter style={{ "--enter-distance": "-30px", "--enter-delay": "0.2s" }}>
        About Me
      </h1>
      {hydrated ? (
        <div
          className={styles.tabNavigation}
          role="tablist"
          aria-label="About sections"
          aria-orientation={verticalTabs ? "vertical" : "horizontal"}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab}
              type="button"
              role="tab"
              id={`tab-${tab.toLowerCase()}`}
              aria-selected={selectedSection === tab}
              aria-controls={`panel-${tab.toLowerCase()}`}
              tabIndex={selectedSection === tab ? 0 : -1}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              onClick={() => selectSection(tab)}
              onKeyDown={(event) => handleTabKey(event, index)}
              className={`${styles.tabButton} ${selectedSection === tab ? styles.activeTab : ""}`}
              whileHover={reducedMotion ? undefined : { scale: 1.05 }}
              whileTap={reducedMotion ? undefined : { scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      ) : (
        <nav className={styles.tabNavigation} aria-label="About sections">
          {tabs.map((tab) => (
            <a key={tab} href={`#panel-${tab.toLowerCase()}`} className={styles.tabButton}>
              {tab}
            </a>
          ))}
        </nav>
      )}
      <div className={styles.contentContainer}>
        {tabs.map((tab) => (
          <section
            key={tab}
            id={`panel-${tab.toLowerCase()}`}
            role={hydrated ? "tabpanel" : undefined}
            aria-labelledby={hydrated ? `tab-${tab.toLowerCase()}` : undefined}
            tabIndex={hydrated ? 0 : undefined}
            hidden={hydrated && selectedSection !== tab}
          >
            {renderSection(tab)}
          </section>
        ))}
      </div>
    </main>
  );
};

export default About;
