"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { FiExternalLink, FiGithub, FiVideo } from "react-icons/fi";
import { projects } from "../../data/projects";
import { handleSpotlightMove } from "../../lib/spotlight";
import styles from "./Projects.module.css";

const linkIcons = {
  website: <FiExternalLink />,
  repository: <FiGithub />,
  demo: <FiVideo />,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
  },
};

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.projectsMain}>
      <motion.h1
        className={styles.heading}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Projects
      </motion.h1>

      <motion.div
        className={styles.projectsGrid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {projects.map((project) => (
          <motion.article
            key={project.id}
            className={styles.projectCard}
            variants={itemVariants}
            onMouseMove={handleSpotlightMove}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
            style={{ "--gradient": project.gradient }}
          >
            <div className={styles.cover}>
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.coverImage}
                />
              ) : (
                <div className={styles.coverFallback} />
              )}
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                {project.status && <span className={styles.statusBadge}>{project.status}</span>}
              </div>

              <p className={styles.projectDescription}>{project.description}</p>

              <p className={styles.techStack}>{project.techStack}</p>

              {project.links.length > 0 && (
                <div className={styles.projectLinks}>
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectButton}
                      aria-label={`${link.label} for ${project.title}`}
                    >
                      {linkIcons[link.type]}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.spotlight} aria-hidden="true" />
          </motion.article>
        ))}
      </motion.div>
    </main>
  );
};

export default Projects;
