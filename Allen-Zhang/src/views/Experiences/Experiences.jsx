"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { designTeams, experiences } from "../../data/experiences";
import { SPRING } from "../../lib/motion";
import { handleSpotlightMove } from "../../lib/spotlight";
import styles from "./Experiences.module.css";

const Experiences = () => {
  const reducedMotion = useReducedMotion();

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <h1 className="page-heading" data-enter style={{ "--enter-distance": "-30px", "--enter-delay": "0.2s" }}>
        Experiences
      </h1>

      <h2 className={styles.sectionHeading} data-enter style={{ "--enter-delay": "0.25s" }}>
        Work
      </h2>
      <div className={styles.timelineContainer}>
        <div className={styles.timelineLine}></div>

        <div className={styles.experiencesGrid}>
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className={`${styles.experienceCard} ${index % 2 === 0 ? styles.left : styles.right}`}
              data-enter
              onMouseMove={handleSpotlightMove}
              whileHover={reducedMotion ? undefined : { y: -8 }}
              transition={SPRING}
              style={{
                "--gradient": experience.gradient,
                "--enter-delay": `${index * 0.2}s`,
                "--enter-distance": "50px",
              }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <Image src={experience.logo} alt="" width={48} height={48} className={styles.logo} />
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
                  {experience.location && <span className={styles.location}>{experience.location}</span>}
                  <span className={styles.period}>{experience.period}</span>
                </div>

                {experience.description && <p className={styles.description}>{experience.description}</p>}

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
        </div>
      </div>

      <h2 className={styles.sectionHeading} data-enter>
        Design Teams
      </h2>
      <div className={styles.teamsGrid}>
        {designTeams.map((team, index) => (
          <motion.article
            key={team.id}
            className={styles.teamCard}
            data-enter
            onMouseMove={handleSpotlightMove}
            whileHover={reducedMotion ? undefined : { y: -6 }}
            transition={SPRING}
            style={{ "--gradient": team.gradient, "--enter-delay": `${index * 0.1}s`, "--enter-distance": "32px" }}
          >
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <Image src={team.logo} alt="" width={48} height={48} className={styles.logo} />
                <div className={styles.positionInfo}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.position}>{team.position}</h3>
                    {team.status === "current" && (
                      <span className={`${styles.statusBadge} ${styles.current}`}>Current</span>
                    )}
                  </div>
                  <h4 className={styles.company}>
                    {team.name}
                    <a
                      href={team.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.externalLink}
                      aria-label={`Visit ${team.name} website`}
                    >
                      <FiExternalLink />
                    </a>
                  </h4>
                </div>
              </div>
              <p className={styles.description}>{team.description}</p>
            </div>

            <div className={styles.spotlight} aria-hidden="true" />
          </motion.article>
        ))}
      </div>
    </main>
  );
};

export default Experiences;
