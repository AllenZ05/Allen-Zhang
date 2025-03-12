import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { FiExternalLink } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Experiences.module.css";

const Experiences = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.title = "AZ05 | Experiences";
  }, []);

  // Stagger animation for pairs
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  // Individual item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, type: "spring", stiffness: 100 },
    },
  };

  return (
    <main className={styles.experiencesMain}>
      <h2 className={styles.heading}>Experiences</h2>

      {/* Timeline */}
      <div className={styles.timeline}>
        {/* Section 1 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: isMobile ? 0.4 : 0.5 }}
        >
          {/* Experience 1 */}
          <motion.div
            className={`${styles.container} ${styles.left}`}
            variants={itemVariants}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className={styles.content}>
              <h3>Software Developer</h3>
              <h4>
                Hanov Solutions
                <a
                  href="https://www.linkedin.com/company/hanov-solutions-inc./"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  <FiExternalLink />
                </a>
              </h4>
              <h5>Waterloo, ON</h5>
              <h5>Jan 2025 - Apr 2025</h5>
              <p>Tech stack: TypeScript, Go, Python, SQL, Vue.js</p>
            </div>
          </motion.div>

          {/* Experience 2 */}
          <motion.div
            className={`${styles.container} ${styles.right}`}
            variants={itemVariants}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className={styles.content}>
              <h3>Software Developer</h3>
              <h4>
                Dandelion Networks
                <a
                  href="https://www.dandelionnet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  <FiExternalLink />
                </a>
              </h4>
              <h5>Toronto, ON</h5>
              <h5>May 2024 - Aug 2024</h5>
              <p>Tech stack: Nuxt.js, Vue.js, TypeScript, Go, SQL</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: isMobile ? 0.4 : 0.5 }}
        >
          {/* Experience 3 */}
          <motion.div
            className={`${styles.container} ${styles.left}`}
            variants={itemVariants}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className={styles.content}>
              <h3>Firmware Developer</h3>
              <h4>
                University of Waterloo Formula Electric
                <a
                  href="https://www.uwfsae.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  <FiExternalLink />
                </a>
              </h4>
              <h5>Waterloo, ON</h5>
              <h5>Sep 2023 - Apr 2024</h5>
              <p>Tech stack: C, Python</p>
            </div>
          </motion.div>

          {/* Experience 4 */}
          <motion.div
            className={`${styles.container} ${styles.right}`}
            variants={itemVariants}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className={styles.content}>
              <h3>Lifeguard and Swim Instructor</h3>
              <h4>
                City of Toronto
                <a
                  href="https://www.toronto.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  <FiExternalLink />
                </a>
              </h4>
              <h5>Toronto, ON</h5>
              <h5>Mar 2022 - Sep 2023</h5>
              <p>Skills: Leadership, Teamwork, Communication, First Aid, Lifesaving, Teaching</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: isMobile ? 0.4 : 0.5 }}
        >
          {/* Experience 5 */}
          <motion.div
            className={`${styles.container} ${styles.left}`}
            variants={itemVariants}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className={styles.content}>
              <h3>Data Analyst And Logistics Operator</h3>
              <h4>
                Somerville Merchandising
                <a
                  href="https://somerville.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  <FiExternalLink />
                </a>
              </h4>
              <h5>Toronto, ON</h5>
              <h5>Sep 2021 - Feb 2022</h5>
              <p>Skills: Microsoft Office, Data Entry, Data Analysis, Logistics Management</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className={styles.myToastContainer}
      />
    </main>
  );
};

export default Experiences;
