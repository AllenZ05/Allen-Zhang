"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiExternalLink, FiGithub, FiVideo } from "react-icons/fi";
import Modal from "../../components/Modal";
import { projects } from "../../data/projects";
import { handleSpotlightMove } from "../../lib/spotlight";
import styles from "./Projects.module.css";

const linkIcons = {
  website: <FiExternalLink />,
  repository: <FiGithub />,
  demo: <FiVideo />,
};

const Projects = () => {
  const [preview, setPreview] = useState(null);
  const reducedMotion = useReducedMotion();

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <h1 className="page-heading" data-enter style={{ "--enter-distance": "-30px", "--enter-delay": "0.2s" }}>
        Projects
      </h1>

      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className={styles.projectCard}
            data-enter
            onMouseMove={handleSpotlightMove}
            whileHover={reducedMotion ? undefined : { y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
            style={{ "--gradient": project.gradient, "--enter-delay": `${index * 0.08}s`, "--enter-distance": "32px" }}
          >
            <a
              href={project.preview || project.image}
              className={styles.cover}
              aria-label={`Enlarge ${project.title} preview`}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                event.preventDefault();
                setPreview(project);
              }}
            >
              <Image
                src={project.image}
                alt={project.imageAlt || `${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1131px) 50vw, 33vw"
                className={styles.coverImage}
              />
            </a>

            <div className={styles.cardContent}>
              <h2 className={styles.projectTitle}>{project.title}</h2>

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
      </div>
      <Modal
        open={Boolean(preview)}
        onClose={() => setPreview(null)}
        title={preview ? `${preview.title} preview` : "Project preview"}
        id="project-preview"
      >
        {preview && (
          <Image
            src={preview.preview || preview.image}
            alt={preview.imageAlt || `${preview.title} preview`}
            width={1600}
            height={1200}
            className={styles.fullPreview}
          />
        )}
      </Modal>
    </main>
  );
};

export default Projects;
