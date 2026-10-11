"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import { experiences } from "../../data/experiences";
import { handleSpotlightMove } from "../../lib/spotlight";
import styles from "./Experiences.module.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

const Experiences = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.experiencesMain}>
      <motion.h1
        className={styles.heading}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Experiences
      </motion.h1>

      <div className={styles.timelineContainer}>
        <div className={styles.timelineLine}></div>

        <motion.div
          className={styles.experiencesGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className={`${styles.experienceCard} ${index % 2 === 0 ? styles.left : styles.right}`}
              variants={itemVariants}
              onMouseMove={handleSpotlightMove}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              style={{ "--gradient": experience.gradient }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.positionInfo}>
                    <h3 className={styles.position}>{experience.position}</h3>
                    <div className={styles.companyRow}>
                      <h4 className={styles.company}>
                        {experience.company}
                        <a
                          href={experience.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.externalLink}
                          aria-label={`Visit ${experience.company} website`}
                        >
                          <FiExternalLink />
                        </a>
                      </h4>
                    </div>
                  </div>
                  {experience.status && (
                    <span className={`${styles.statusBadge} ${styles[experience.status]}`}>
                      {experience.status === "incoming" ? "Incoming" : "Current"}
                    </span>
                  )}
                </div>

                <div className={styles.locationPeriod}>
                  <span className={styles.location}>{experience.location}</span>
                  <span className={styles.period}>{experience.period}</span>
                </div>

                <p className={styles.description}>{experience.description}</p>

                {experience.skills.length > 0 && (
                  <div className={styles.skillsSection}>
                    <div className={styles.skillsTags}>
                      {experience.skills.map((skill) => (
                        <span key={skill} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.spotlight} aria-hidden="true" />
              <div className={styles.timelineNode}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default Experiences;
