import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { MdHourglassBottom } from "react-icons/md";
import { FaRocket, FaGraduationCap, FaCode } from "react-icons/fa6";
import styles from "./About.module.css";

const About = () => {
  const [selectedSection, setSelectedSection] = useState("Introduction");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "About | AZ05";
  }, []);

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "C++", "C#", "C", "Go", "SQL/NoSQL", "Swift", "TypeScript", "JavaScript", "CSS", "HTML"],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Frameworks & Libraries",
      skills: ["Next.js", "React.js", "Nuxt.js", "Vue.js", "PyTorch", "Tailwind CSS"],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      title: "Developer Tools",
      skills: ["Git", "GitHub", "VS Code", "Node.js", "Vite"],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      title: "Cloud Platforms",
      skills: ["AWS", "Firebase"],
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      title: "Misc",
      skills: ["Figma", "Microsoft Office", "Google Workspace", "Adobe Suite", "Unity"],
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      title: "Soft Skills",
      skills: ["Leadership", "Teamwork", "Communication", "Creativity", "Problem-Solving"],
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
  ];

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "Introduction":
        return (
          <motion.div
            key="introduction"
            className={styles.sectionCard}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <div className={styles.cardIcon}>
              <FaRocket aria-hidden="true" />
            </div>
            <div className={styles.cardContent}>
              <h3>Introduction</h3>
              <div className={styles.introText}>
                <p>
                  Heyyy, it&apos;s Allen. I am currently a Software Engineer Intern at Shopify and a second-year student
                  at the University of Waterloo, pursuing a BASc in Computer Engineering.
                </p>
                <p>I am an ambitious individual with a mission to make a positive impact on the world.</p>
                <p>I currently live in Toronto, Canada.</p>

                <div className={styles.highlightBox}>
                  <strong>Seeking Summer 2026 Internships (May - Aug)</strong>
                </div>

                <p>Feel free to connect with me using my social links in the footer!</p>
              </div>
            </div>
          </motion.div>
        );
      case "Education":
        return (
          <motion.div
            key="education"
            className={styles.sectionCard}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
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
                <div className={styles.yearSection}>
                  <h5>First Year</h5>
                  <div className={styles.termsGrid}>
                    <div className={styles.termCard}>
                      <h6>Term 1 (Sep 2023 - Dec 2023)</h6>
                      <ul>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Linear Algebra
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Calculus 1 & 2
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Classical Mechanics
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Programming
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Project Studio
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Engineering Profession and Practice
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Communication in Engineering
                        </li>
                      </ul>
                    </div>

                    <div className={styles.termCard}>
                      <h6>Term 2 (Jan 2024 - Apr 2024)</h6>
                      <ul>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Calculus 3
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Electricity and Magnetism
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Discrete Math and Logic 1
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Digital Circuits and Systems
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Linear Circuits
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Engineering Economics
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={styles.yearSection}>
                  <h5>Second Year</h5>
                  <div className={styles.termsGrid}>
                    <div className={styles.termCard}>
                      <h6>Term 1 (Sep 2024 - Dec 2024)</h6>
                      <ul>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Algorithms and Data Structures
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Advanced Calculus 1
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Digital Computers
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Numerical Methods
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Electronic Circuits
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Materials Chemistry
                        </li>
                      </ul>
                    </div>

                    <div className={styles.termCard}>
                      <h6>Term 2 (May 2025 - Aug 2025)</h6>
                      <ul>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Probability Theory and Statistics 1
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Signals and Systems
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Discrete Mathematics and Logic 2
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Embedded Microprocessor Systems
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Systems Programming and Concurrency
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Instrumentation and Prototyping Laboratory
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case "Skills":
        return (
          <motion.div
            key="skills"
            className={styles.sectionCard}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <div className={styles.cardIcon}>
              <FaCode aria-hidden="true" />
            </div>
            <div className={styles.cardContent}>
              <h3>Skills</h3>

              <div className={styles.skillsContainer}>
                <div className={styles.skillCategoriesGrid}>
                  {skillCategories.map((category, index) => (
                    <motion.div
                      key={category.title}
                      className={styles.skillCategory}
                      style={{ "--gradient": category.gradient }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
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
    <main className={styles.aboutMain}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        About Me
      </motion.h2>

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

      <div className={styles.contentContainer}>{renderSection()}</div>
    </main>
  );
};

export default About;
