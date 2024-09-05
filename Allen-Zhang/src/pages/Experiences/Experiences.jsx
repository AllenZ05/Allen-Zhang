import { motion } from "framer-motion";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Experiences.module.css";

const Experiences = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <h2 className={styles.heading}>Experiences</h2>
      <div className={styles.myExperiences}>
        <div className={styles.experiencesContainer}>
          <motion.div
            className={`${styles.experience} ${styles.experience1}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
            variants={{
              hidden: { opacity: 0, x: -100, rotate: -10 },
              visible: { opacity: 1, x: 0, rotate: 0 },
            }}
          >
            <div className={styles.experienceInfo}>
              <h3 className={styles.jobTitle}>Software Developer</h3>
              <h5>Dandelion Networks</h5>
              <h6>Toronto, ON</h6>
              <h6>May 2024 - Aug 2024</h6>
            </div>
            <div className={styles.experienceDescription}>
              <p>Tech stack: Nuxt.js, Vue.js, TypeScript, Go, SQL</p>
              <p>
                <a href="https://www.dandelionnet.com/" target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </p>
            </div>
          </motion.div>

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

          <motion.div
            className={`${styles.experience} ${styles.experience2}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
            variants={{
              hidden: { opacity: 0, x: -100, rotate: -10 },
              visible: { opacity: 1, x: 0, rotate: 0 },
            }}
          >
            <div className={styles.experienceInfo}>
              <h3 className={styles.jobTitle}>Firmware Developer</h3>
              <h5>University of Waterloo Formula Electric</h5>
              <h6>Waterloo, ON</h6>
              <h6>Sep 2023 - Apr 2024</h6>
            </div>
            <div className={styles.experienceDescription}>
              <p>Tech stack: C, Python</p>
              <p>
                <a href="https://www.uwfsae.ca/" target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </p>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.experience} ${styles.experience3}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
            variants={{
              hidden: { opacity: 0, x: -100, rotate: -10 },
              visible: { opacity: 1, x: 0, rotate: 0 },
            }}
          >
            <div className={styles.experienceInfo}>
              <h3 className={styles.jobTitle}>Lifeguard and Swim Instructor</h3>
              <h5>City of Toronto</h5>
              <h6>Toronto, ON</h6>
              <h6>Mar 2022 - Sep 2023</h6>
            </div>
            <div className={styles.experienceDescription}>
              <p>Skills: Leadership, Teamwork, Communication, First Aid, Lifesaving, Teaching, Public Relations</p>
              <p>
                <a href="https://www.toronto.ca/" target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </p>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.experience} ${styles.experience4}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
            variants={{
              hidden: { opacity: 0, x: -100, rotate: -10 },
              visible: { opacity: 1, x: 0, rotate: 0 },
            }}
          >
            <div className={styles.experienceInfo}>
              <h3 className={styles.jobTitle}>Data Analyst And Logistics Operator</h3>
              <h5>Somerville Merchandising</h5>
              <h6>Toronto, ON</h6>
              <h6>Sep 2021 - Feb 2022</h6>
            </div>
            <div className={styles.experienceDescription}>
              <p>Skills: Microsoft Office, Data Entry, Data Analyst, Logistics Management</p>
              <p>
                <a href="https://somerville.ca/" target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Experiences;
