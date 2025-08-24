import { motion } from "framer-motion";
import { useEffect } from "react";
import { FiExternalLink, FiGithub, FiVideo } from "react-icons/fi";
import styles from "./Projects.module.css";

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "Projects | AZ05";
  }, []);

  const projects = [
    {
      id: 0,
      title: "Mobile Game",
      techStack: "C#, Unity",
      status: "In development",
      description:
        "3D mobile game built in Unity with C# scripting, featuring immersive gameplay and dynamic environments.",
      gradient: "linear-gradient(135deg, #4b1e82 0%, #994897ff 100%)",
      links: [],
    },
    {
      id: 1,
      title: "Time-CoPilot",
      techStack: "AWS, Next.js, TypeScript, Tailwind CSS, SQL",
      description:
        "Cross-platform productivity app combining calendar, tasks, notes, goals, and AI tools. Powered by AWS and Next.js.",
      gradient: "linear-gradient(135deg, #7f7fd5 0%, #86a8e7 50%, #91eae4 100%)",
      links: [
        {
          type: "website",
          url: "https://www.time-copilot.com/",
          icon: <FiExternalLink />,
          label: "Website",
        },
      ],
    },
    {
      id: 2,
      title: "Personal Website",
      techStack: "React.js, JavaScript, Vite.js, HTML, CSS",
      description:
        "A responsive personal website showcasing a bit about me, my experiences, and projects I've worked on. You're on it right now!",
      gradient: "linear-gradient(135deg, #0a5af9ff 0%, #3b82f6 50%, #60a5fa 100%)",
      links: [
        {
          type: "repository",
          url: "https://github.com/AllenZ05/Personal-Website",
          icon: <FiGithub />,
          label: "Repository",
        },
      ],
    },
    {
      id: 3,
      title: "Fall Detection Device",
      techStack: "C, C++, STM32, Accelerometer, GSM Module",
      description:
        "Wearable IoT device using STM32 + accelerometer to detect falls and send GSM alerts to emergency contacts.",
      gradient: "linear-gradient(135deg, #f53346ff 0%, #f68f7dff 100%)",
      links: [
        {
          type: "repository",
          url: "https://github.com/AllenZ05/Fall-Detection-Device",
          icon: <FiGithub />,
          label: "Repository",
        },
      ],
    },
    {
      id: 4,
      title: "Minesweeper",
      techStack: "C++",
      description:
        "A Waterloo-themed twist on Minesweeper; avoid the geese while clearing the board in this classic game remake.",
      gradient: "linear-gradient(135deg, #232323ff 0%, #e52d27 100%)",
      links: [
        {
          type: "demo",
          url: "https://github.com/AllenZ05/Minesweeper/assets/124856383/08858cc9-1799-4653-a58b-e5750406ee09",
          icon: <FiVideo />,
          label: "Demo",
        },
        {
          type: "repository",
          url: "https://github.com/AllenZ05/Minesweeper",
          icon: <FiGithub />,
          label: "Repository",
        },
      ],
    },
    {
      id: 5,
      title: "Snake",
      techStack: "Python, Pygame",
      description: "Classical Snake in Pygame with smooth controls, animations, sound effects, and score tracking.",
      gradient: "linear-gradient(135deg, #0b6439ff 0%, #40ee6eff 100%)",
      links: [
        {
          type: "demo",
          url: "https://github.com/AllenZ05/Python-Games/assets/124856383/2bca3b01-fde5-4ffe-9b3e-ca0c30c525be",
          icon: <FiVideo />,
          label: "Demo",
        },
        {
          type: "repository",
          url: "https://github.com/AllenZ05/Python-Games",
          icon: <FiGithub />,
          label: "Repository",
        },
      ],
    },
    {
      id: 6,
      title: "Movie Website",
      techStack: "Vue.js, JavaScript, CSS, HTML, Firebase, Postman, TMDb API",
      description:
        "Movie discovery site with TMDB API search, detailed movie info, user auth, watchlists, and favourites using Vue.js and Firebase.",
      gradient: "linear-gradient(135deg, #2f3d4dff 0%, #42b883 100%)",
      links: [
        {
          type: "website",
          url: "https://cs12-summative.web.app/",
          icon: <FiExternalLink />,
          label: "Website",
        },
        {
          type: "repository",
          url: "https://github.com/AllenZ05/Movie-Project",
          icon: <FiGithub />,
          label: "Repository",
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <main className={styles.projectsMain}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Projects
      </motion.h2>

      <motion.div className={styles.projectsGrid} initial="hidden" animate="visible" variants={containerVariants}>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className={styles.projectCard}
            variants={itemVariants}
            whileHover={{
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            style={{ "--gradient": project.gradient }}
          >
            <div className={styles.cardBackground}></div>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                {project.status && <span className={styles.statusBadge}>{project.status}</span>}
              </div>

              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.techStack}>
                <span className={styles.techLabel}>Tech Stack:</span>
                <span className={styles.techText}>{project.techStack}</span>
              </div>

              {project.links.length > 0 && (
                <div className={styles.projectLinks}>
                  {project.links.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.projectButton} ${styles[link.type]}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`${link.label} for ${project.title}`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
};

export default Projects;
