import { motion } from "framer-motion";
import { useEffect } from "react";
import { FiExternalLink, FiGithub, FiVideo } from "react-icons/fi";
import styles from "./Projects.module.css";

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "AZ05 | Projects";
  }, []);

  return (
    <main className={styles.projectsMain}>
      <h2 className={styles.heading}>Projects</h2>
      <div className={styles.myProjects}>
        <div className={styles.projectsContainer}>
          <motion.div
            className={`${styles.project} ${styles.project0}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className={styles.projectContent}>
              <h3>Mobile Game</h3>
              <p>Tech Stack: Unity, C#</p>
              <p>In development</p>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.project} ${styles.project1}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className={styles.projectContent}>
              <h3>Time-CoPilot</h3>
              <p>Tech Stack: AWS, SQL, Next.js, TypeScript, Tailwind CSS</p>
              <div className={styles.projectLinks}>
                <a
                  href="https://www.time-copilot.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectButton}
                  aria-label="Visit website"
                >
                  <FiExternalLink /> <span>Website</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.project} ${styles.project2}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className={styles.projectContent}>
              <h3>Personal Website</h3>
              <p>Tech stack: Vite.js, React.js, JavaScript, HTML/CSS</p>
              <div className={styles.projectLinks}>
                <a
                  href="https://github.com/AllenZ05/Personal-Website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectButton}
                  aria-label="View GitHub repository"
                >
                  <FiGithub /> <span>Repository</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.project} ${styles.project3}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className={styles.projectContent}>
              <h3>Fall Detection Device</h3>
              <p>Tech stack: C, C++, STM32, STM32CubeIDE, Accelerometer, GSM Module</p>
              <div className={styles.projectLinks}>
                <a
                  href="https://github.com/AllenZ05/Fall-Detection-Device"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectButton}
                  aria-label="View GitHub repository"
                >
                  <FiGithub /> <span>Repository</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.project} ${styles.project4}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className={styles.projectContent}>
              <h3>Minesweeper</h3>
              <p>Tech stack: C++</p>
              <div className={styles.projectLinks}>
                <a
                  href="https://github.com/AllenZ05/Minesweeper/assets/124856383/08858cc9-1799-4653-a58b-e5750406ee09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectButton}
                  style={{ marginRight: "16px" }}
                  aria-label="Watch video demonstration"
                >
                  <FiVideo /> <span>Demo</span>
                </a>
                <a
                  href="https://github.com/AllenZ05/Minesweeper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectButton}
                  aria-label="View GitHub repository"
                >
                  <FiGithub /> <span>Repository</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.project} ${styles.project5}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className={styles.projectContent}>
              <h3>Snake</h3>
              <p>Tech stack: Python, Pygame</p>
              <div className={styles.projectLinks}>
                <a
                  href="https://github.com/AllenZ05/Python-Games/assets/124856383/2bca3b01-fde5-4ffe-9b3e-ca0c30c525be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectButton}
                  style={{ marginRight: "16px" }}
                  aria-label="Watch video demonstration"
                >
                  <FiVideo /> <span>Demo</span>
                </a>
                <a
                  href="https://github.com/AllenZ05/Python-Games"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectButton}
                  aria-label="View GitHub repository"
                >
                  <FiGithub /> <span>Repository</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.project} ${styles.project6}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className={styles.projectContent}>
              <h3>Movie Website</h3>
              <p>Tech stack: Vue.js, JavaScript, HTML/CSS, Firebase, Postman, Axios, TMDb API</p>
              <div className={styles.projectLinks}>
                <a
                  href="https://cs12-summative.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectButton}
                  style={{ marginRight: "16px" }}
                  aria-label="Visit website"
                >
                  <FiExternalLink /> <span>Website</span>
                </a>
                <a
                  href="https://github.com/AllenZ05/Movie-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectButton}
                  aria-label="View GitHub repository"
                >
                  <FiGithub /> <span>Repository</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
