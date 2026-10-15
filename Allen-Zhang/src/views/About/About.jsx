"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCode, FaGraduationCap, FaRocket } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { MdHourglassBottom } from "react-icons/md";
import { educationYears, skillCategories } from "../../data/about";
import { emailHref, profile } from "../../data/profile";
import { SPRING } from "../../lib/motion";
import { handleSpotlightMove } from "../../lib/spotlight";
import { useHydrated } from "../../lib/useHydrated";
import { useSlidingIndicator } from "../../lib/useSlidingIndicator";
import styles from "./About.module.css";

const tabs = ["Introduction", "Education", "Skills"];

const About = () => {
  const [selectedSection, setSelectedSection] = useState("Introduction");
  const hydrated = useHydrated();
  const [verticalTabs, setVerticalTabs] = useState(false);
  const reducedMotion = useReducedMotion();
  const tabRefs = useRef([]);
  const [tablist, setTablist] = useState(null);
  // One highlight slides behind the tabs to the selected one, across and down alike.
  const thumb = useSlidingIndicator(tablist, '[aria-selected="true"]', selectedSection);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const update = () => setVerticalTabs(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const selectSection = (section) => setSelectedSection(section);

  // The large reading cards stay still; the small cards inside them respond to the cursor.
  const sectionCardProps = {
    className: styles.sectionCard,
    "data-enter": true,
    style: { "--enter-scale": 0.95 },
  };

  // Small cards lift on a spring and glow under the cursor, like the Projects and Experiences cards.
  const smallCardMotion = {
    "data-reveal": true,
    onMouseMove: handleSpotlightMove,
    whileHover: reducedMotion ? undefined : { y: -4 },
    transition: SPRING,
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
          <div {...sectionCardProps}>
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
          </div>
        );
      case "Education":
        return (
          <div {...sectionCardProps}>
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
                        <motion.div key={term.name} className={styles.termCard} {...smallCardMotion}>
                          <div className={styles.spotlight} aria-hidden="true" />
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
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Skills":
        return (
          <div {...sectionCardProps}>
            <div className={styles.cardIcon}>
              <FaCode aria-hidden="true" />
            </div>
            <div className={styles.cardContent}>
              <h2>Skills</h2>

              <div className={styles.skillsContainer}>
                <div className={styles.skillCategoriesGrid}>
                  {skillCategories.map((category) => (
                    <motion.div
                      key={category.title}
                      className={styles.skillCategory}
                      {...smallCardMotion}
                      style={{ "--gradient": category.gradient, "--enter-scale": 0.95 }}
                    >
                      <div className={styles.spotlight} aria-hidden="true" />
                      <h3>{category.title}</h3>
                      <div className={styles.skillTags}>
                        {category.skills.map((skill) => (
                          <span key={skill} className={styles.skillTag}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
          ref={setTablist}
          className={styles.tabNavigation}
          role="tablist"
          aria-label="About sections"
          aria-orientation={verticalTabs ? "vertical" : "horizontal"}
        >
          {thumb && (
            <motion.span
              className={styles.tabThumb}
              initial={false}
              animate={thumb}
              transition={reducedMotion ? { duration: 0 } : SPRING}
              aria-hidden="true"
            />
          )}
          {tabs.map((tab, index) => (
            <button
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
            >
              {tab}
            </button>
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
