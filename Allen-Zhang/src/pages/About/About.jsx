import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { MdHourglassBottom } from "react-icons/md";
import { FaRocket } from "react-icons/fa6";
import { RiShining2Fill } from "react-icons/ri";
import styles from "./About.module.css";

const About = () => {
  const [selectedSection, setSelectedSection] = useState("Introduction");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "AZ05 | About";
  }, []);

  const sectionVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, delay: 0.1 },
    },
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "Introduction":
        return (
          <motion.article
            key="introduction"
            className={styles.sectionContent}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sectionVariants}
          >
            <h3>Introduction</h3>
            <p>
              <FaRocket className={styles["rocket-icon"]} />
              Heyyy, it&apos;s Allen. I am currently a second-year student at the University of Waterloo, pursuing a
              BASc in Computer Engineering.
              <FaRocket className={styles["rocket-icon"]} />
            </p>
            <p>
              <RiShining2Fill className={styles["star-icon"]} />
              I am an ambitious individual with a mission to make a positive impact on the world.
              <RiShining2Fill className={styles["star-icon"]} />
            </p>
            <p>I currently live in Toronto, Canada.</p>
            <br />
            <p>
              <b>Seeking Winter 2025 Internships (Jan - Apr)</b>
            </p>
            <br />
            <p>Feel free to connect with me using my social links in the footer!</p>
          </motion.article>
        );
      case "Education":
        return (
          <motion.article
            key="education"
            className={styles.sectionContent}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sectionVariants}
          >
            <h3>Education</h3>
            <div className={styles.uni}>
              <h4>University of Waterloo</h4>
              <h6>Waterloo, ON</h6>
              <h5>Computer Engineering</h5>
              <div className={styles.terms}>
                <br />
                <br />
                <p>First Year</p>
                <section className={styles.term}>
                  <p>Term 1 (Sep 2023 - Dec 2023)</p>
                  <ul>
                    <li>
                      Linear Algebra <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Calculus 1 & 2 <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Classical Mechanics <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Programming <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Project Studio <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Engineering Profession and Practice <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Communication in Engineering <IoCheckmark className={styles["check-icon"]} />
                    </li>
                  </ul>
                </section>
                <section className={styles.term}>
                  <p>Term 2 (Jan 2024 - Apr 2024)</p>
                  <ul>
                    <li>
                      Calculus 3 <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Electricity and Magnetism <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Discrete Math and Logic <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Digital Circuits and Systems <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Linear Circuits <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Engineering Economics <IoCheckmark className={styles["check-icon"]} />
                    </li>
                  </ul>
                </section>
                <br />
                <br />
                <p>Second Year</p>
                <section className={styles.term}>
                  <p>Term 1 (Sep 2024 - Dec 2024)</p>
                  <ul>
                    <li>
                      Algorithms and Data Structures <MdHourglassBottom className={styles["hourglass-icon"]} />
                    </li>
                    <li>
                      Advanced Calculus 1 <MdHourglassBottom className={styles["hourglass-icon"]} />
                    </li>
                    <li>
                      Digital Computers <MdHourglassBottom className={styles["hourglass-icon"]} />
                    </li>
                    <li>
                      Numerical Methods <MdHourglassBottom className={styles["hourglass-icon"]} />
                    </li>
                    <li>
                      Electronic Circuits <MdHourglassBottom className={styles["hourglass-icon"]} />
                    </li>
                    <li>
                      Materials Chemistry <MdHourglassBottom className={styles["hourglass-icon"]} />
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </motion.article>
        );
      case "Skills":
        return (
          <motion.article
            key="skills"
            className={styles.sectionContent}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sectionVariants}
          >
            <h3>Skills</h3>
            <div className={styles["technical-skills"]}>
              <h4>Technical Skills</h4>
              <p>
                <b>Languages:</b> Python, C++, C#, C, Go, Swift, SQL/NoSQL, TypeScript, JavaScript, CSS, HTML
              </p>
              <p>
                <b>Frameworks & Libraries:</b> React.js, Next.js, Vue.js, Nuxt.js, PyTorch, Tailwind
              </p>
              <p>
                <b>Development Tools & Services:</b> AWS, Node.js, Vite.js, Firebase, Postman
              </p>
              <p>
                <b>Developer Tools:</b> Git, Github, VSCode, Unity
              </p>
              <p>
                <b>Misc:</b> STM32, MPU6050, Microsoft Office, Google Workspace, Adobe Suite, Figma
              </p>
            </div>
            <div className={styles["soft-skills"]}>
              <h4>Soft Skills</h4>
              <p>Leadership, Teamwork, Communication, Creativity, Problem-Solving</p>
            </div>
          </motion.article>
        );
      default:
        return null;
    }
  };

  return (
    <main className={styles.aboutMain}>
      <h2 className={styles.heading}>About Me</h2>
      <div className={styles.menubar}>
        <button
          onClick={() => handleSectionChange("Introduction")}
          className={selectedSection === "Introduction" ? styles.activeTab : styles.tabButton}
        >
          Introduction
        </button>
        <button
          onClick={() => handleSectionChange("Education")}
          className={selectedSection === "Education" ? styles.activeTab : styles.tabButton}
        >
          Education
        </button>
        <button
          onClick={() => handleSectionChange("Skills")}
          className={selectedSection === "Skills" ? styles.activeTab : styles.tabButton}
        >
          Skills
        </button>
      </div>
      {renderSection()}
    </main>
  );
};

export default About;
