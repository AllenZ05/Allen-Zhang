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
      scale: 0.95,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        opacity: { duration: 0.6, ease: "easeOut" },
        scale: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
        y: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
        filter: { duration: 0.7, ease: "easeOut" },
      },
    },
  };

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

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        "Python",
        "C++",
        "C#",
        "C",
        "Go",
        "Ruby",
        "Swift",
        "SQL/NoSQL",
        "TypeScript",
        "JavaScript",
        "CSS",
        "HTML",
      ],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        "Next.js",
        "React.js",
        "React Native",
        "Nuxt.js",
        "Vue.js",
        "Ruby on Rails",
        "GraphQL",
        "Tailwind CSS",
        "PyTorch",
      ],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      title: "Developer Tools",
      skills: ["Git", "GitHub", "Node.js", "Grafana", "Vite"],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      title: "Cloud & Services",
      skills: ["Amazon Web Services", "Google Cloud Platform", "Apache Kafka", "Firebase", "Cloudflare", "Stripe"],
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
                  Heyyy, it&apos;s Allen. I am currently a Software Engineer Intern at{" "}
                  <a
                    href="https://www.shopify.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.introLink}
                  >
                    Shopify
                  </a>{" "}
                  and a second-year student at the{" "}
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
                  .
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
                {/* First Year */}
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
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Tactics for Workplace Success
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Second Year */}
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
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Strategies for Career Success
                        </li>
                      </ul>
                    </div>

                    <div className={styles.termCard}>
                      <h6>Term 2 (May 2025 - Aug 2025)</h6>
                      <ul>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Probability Theory and Statistics 1
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Signals and Systems
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Discrete Mathematics and Logic 2
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Embedded Microprocessor Systems
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Systems Programming and Concurrency
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Instrumentation and Prototyping Laboratory
                        </li>
                        <li>
                          <IoCheckmark className={styles.checkIcon} aria-hidden="true" />
                          Professionalism and Ethics in Engineering
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Third Year */}
                <div className={styles.yearSection}>
                  <h5>Third Year</h5>
                  <div className={styles.termsGrid}>
                    <div className={styles.termCard}>
                      <h6>Term 1 (Jan 2026 - Apr 2026)</h6>
                      <ul>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Communication Systems
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Digital Hardware Systems
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Real-Time Operating Systems
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Analog Control Systems
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Customer Experience Design
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Conflict Resolution
                        </li>
                      </ul>
                    </div>

                    <div className={styles.termCard}>
                      <h6>Term 2 (Sep 2026 - Dec 2026)</h6>
                      <ul>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Probability Theory and Statistics 2
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Elective 1
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Elective 2
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Elective 3
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Elective 4
                        </li>
                        <li>
                          <MdHourglassBottom className={styles.hourglassIcon} aria-hidden="true" />
                          Elective 5
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
