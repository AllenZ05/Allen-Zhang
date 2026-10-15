"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { FiExternalLink, FiGithub, FiVideo } from "react-icons/fi";
import Modal from "../../components/Modal";
import { projects } from "../../data/projects";
import { SPRING } from "../../lib/motion";
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
  const activeCover = useRef(null);

  // The preview grows out of its card and shrinks back into it: the thumbnail and the full image share
  // a view-transition name, and only one of them carries it at a time.
  const morph = (update, thumbnailName) => {
    const thumbnail = activeCover.current?.querySelector("img");
    if (!document.startViewTransition || reducedMotion || !thumbnail) {
      update();
      return;
    }
    thumbnail.style.viewTransitionName = thumbnailName.before;
    document
      .startViewTransition(() => {
        thumbnail.style.viewTransitionName = thumbnailName.after;
        flushSync(update);
      })
      .finished.finally(() => {
        thumbnail.style.viewTransitionName = "";
      });
  };
  const openPreview = (project, cover) => {
    activeCover.current = cover;
    morph(() => setPreview(project), { before: "project-preview", after: "" });
  };
  const closePreview = () => morph(() => setPreview(null), { before: "", after: "project-preview" });

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <h1 className="page-heading" data-enter style={{ "--enter-distance": "-30px", "--enter-delay": "0.2s" }}>
        Projects
      </h1>

      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <motion.article
            key={project.id}
            className={styles.projectCard}
            data-reveal
            onMouseMove={handleSpotlightMove}
            whileHover={reducedMotion ? undefined : { y: -6 }}
            transition={SPRING}
            style={{ "--gradient": project.gradient, "--enter-distance": "32px" }}
          >
            <a
              href={project.preview || project.image}
              className={styles.cover}
              aria-label={`Enlarge ${project.title} preview`}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                event.preventDefault();
                openPreview(project, event.currentTarget);
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
        onClose={closePreview}
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
            style={{ viewTransitionName: "project-preview" }}
          />
        )}
      </Modal>
    </main>
  );
};

export default Projects;
