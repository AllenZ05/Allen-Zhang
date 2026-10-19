"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FiExternalLink } from "react-icons/fi";
import { designTeams, experiences } from "../../data/experiences";
import { SPRING } from "../../lib/motion";
import { handleSpotlightMove } from "../../lib/spotlight";
import styles from "./Experiences.module.css";

const Experiences = () => {
  const reducedMotion = useReducedMotion();
  const lineRef = useRef(null);

  // The timeline's fill (Experiences.module.css) completes at --fill-end: the scroll position where
  // the line's end reaches mid-screen, or the bottom of the page if it never gets that far. Browsers
  // without scroll timelines (Safari before 26) get the fill's progress from here too. Each role's
  // dot lights up (data-lit) once the fill reaches it.
  useEffect(() => {
    const line = lineRef.current;
    const container = line.parentElement;
    const nodes = [...container.querySelectorAll("[data-node]")];
    const native = CSS.supports("animation-timeline: scroll()");
    // Layout position, unaffected by the cards' entrance and hover motion.
    const offsetTop = (element) => {
      let top = 0;
      for (let el = element; el !== container; el = el.offsetParent) top += el.offsetTop;
      return top;
    };
    let frame = 0;
    const update = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const lineEnd = line.getBoundingClientRect().bottom + window.scrollY - window.innerHeight / 2;
      const fillEnd = Math.max(1, Math.min(lineEnd, maxScroll));
      const progress = Math.min(Math.max(window.scrollY / fillEnd, 0), 1);
      const filled = line.offsetTop + progress * line.offsetHeight;
      const lit = nodes.map((node) => filled >= offsetTop(node) + node.offsetHeight / 2);
      line.style.setProperty("--fill-end", `${fillEnd}px`);
      if (!native) line.style.setProperty("--scroll-progress", String(progress));
      nodes.forEach((node, index) => {
        node.toggleAttribute("data-lit", lit[index]);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    // The layout also shifts without a resize, e.g. when fonts load.
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(line);
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <main id="main-content" tabIndex={-1} className="page-main">
      <h1 className="page-heading" data-enter style={{ "--enter-distance": "-30px", "--enter-delay": "0.2s" }}>
        Experiences
      </h1>

      <h2 className={styles.sectionHeading} data-enter style={{ "--enter-delay": "0.25s" }}>
        Work
      </h2>
      <div className={styles.timelineContainer}>
        <div ref={lineRef} className={styles.timelineLine}></div>

        <div className={styles.experiencesGrid}>
          {experiences.map((experience) => (
            // A role's dates (in the rail beside the line) and its card enter together.
            <div
              key={experience.id}
              className={styles.role}
              data-reveal
              style={{
                "--enter-distance": "50px",
                // The timeline unfolds one role at a time.
                "--reveal-step": "0.18s",
              }}
            >
              <div className={styles.when}>
                <span className={styles.period}>{experience.period}</span>
                {experience.location && <span className={styles.location}>{experience.location}</span>}
              </div>
              <motion.div
                className={styles.experienceCard}
                onMouseMove={handleSpotlightMove}
                whileHover={reducedMotion ? undefined : { y: -8 }}
                transition={SPRING}
                style={{ "--gradient": experience.gradient }}
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
                <div className={styles.timelineNode} data-node></div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <h2 className={styles.sectionHeading} data-reveal>
        Design Teams
      </h2>
      <div className={styles.teamsGrid}>
        {designTeams.map((team) => (
          <motion.article
            key={team.id}
            className={styles.teamCard}
            data-reveal
            onMouseMove={handleSpotlightMove}
            whileHover={reducedMotion ? undefined : { y: -6 }}
            transition={SPRING}
            style={{ "--gradient": team.gradient, "--enter-distance": "32px", "--reveal-step": "0.11s" }}
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
