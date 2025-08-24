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
    document.title = "Experiences | AZ05";
  }, []);

  const experiences = [
    {
      id: 0,
      position: "Software Engineer",
      company: "Shopify",
      location: "Toronto, ON",
      period: "Incoming Sep 2025 - Dec 2025",
      description: "Upcoming software engineering internship at one of Canada's leading e-commerce platforms.",
      skills: [],
      url: "https://www.shopify.com/",
      gradient: "linear-gradient(135deg, #96bf48 0%, #5eac46 100%)",
      status: "upcoming",
    },
    {
      id: 1,
      position: "Software Developer",
      company: "Hanov Solutions",
      location: "Waterloo, ON",
      period: "Jan 2025 - Apr 2025",
      description:
        "Full-stack development using modern technologies including TypeScript, Go, Python, and Vue.js for enterprise solutions.",
      skills: ["TypeScript", "Go", "Python", "SQL", "Vue.js"],
      url: "https://www.linkedin.com/company/hanov-solutions-inc./",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      status: "current",
    },
    {
      id: 2,
      position: "Software Developer",
      company: "Dandelion Networks",
      location: "Toronto, ON",
      period: "May 2024 - Aug 2024",
      description:
        "Developed web applications using Nuxt.js and Vue.js framework, integrated backend services with Go and SQL databases.",
      skills: ["Nuxt.js", "Vue.js", "TypeScript", "Go", "SQL"],
      url: "https://www.dandelionnet.com/",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      position: "Firmware Developer",
      company: "University of Waterloo Formula Electric",
      location: "Waterloo, ON",
      period: "Sep 2023 - Apr 2024",
      description:
        "Developed embedded firmware for electric race car systems using C and Python for data acquisition and control systems.",
      skills: ["C", "Python", "Embedded Systems", "Firmware Development"],
      url: "https://www.uwfsae.ca/",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      position: "Lifeguard and Swim Instructor",
      company: "City of Toronto",
      location: "Toronto, ON",
      period: "Mar 2022 - Sep 2023",
      description:
        "Ensured pool safety, taught swimming lessons, and developed leadership skills while working with diverse community members.",
      skills: ["Leadership", "Teamwork", "Communication", "First Aid", "Lifesaving", "Teaching"],
      url: "https://www.toronto.ca/",
      gradient: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
    },
    {
      id: 5,
      position: "Data Analyst and Logistics Operator",
      company: "Somerville Merchandising",
      location: "Toronto, ON",
      period: "Sep 2021 - Feb 2022",
      description:
        "Analyzed business data and managed logistics operations, gaining experience in data processing and supply chain management.",
      skills: ["Microsoft Office", "Data Entry", "Data Analysis", "Logistics Management"],
      url: "https://somerville.ca/",
      gradient: "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
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
    <main className={styles.experiencesMain}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Experiences
      </motion.h2>

      <div className={styles.timelineContainer}>
        <div className={styles.timelineLine}></div>

        <motion.div className={styles.experiencesGrid} initial="hidden" animate="visible" variants={containerVariants}>
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className={`${styles.experienceCard} ${index % 2 === 0 ? styles.left : styles.right} ${
                isMobile ? styles.mobile : ""
              }`}
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              style={{ "--gradient": experience.gradient }}
            >
              <div className={styles.cardBackground}></div>
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
                      {experience.status === "upcoming" ? "Upcoming" : "Current"}
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
                    <span className={styles.skillsLabel}>Skills:</span>
                    <div className={styles.skillsTags}>
                      {experience.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.timelineNode}></div>
            </motion.div>
          ))}
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
