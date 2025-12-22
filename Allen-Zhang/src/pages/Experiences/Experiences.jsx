import { motion } from "framer-motion";
import { useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import styles from "./Experiences.module.css";

const Experiences = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    document.title = "Experiences | AZ05";
  }, []);

  const experiences = [
    {
      id: 0,
      position: "Software Engineer Intern",
      company: "Apple",
      location: "Cupertino, CA",
      period: "May 2026 - Aug 2026",
      description: "Device Compute Team",
      skills: [],
      url: "https://www.apple.com/",
      gradient: "linear-gradient(135deg, #a1a1aa 0%, #27272a 100%)",
      status: "incoming",
    },
    {
      id: 1,
      position: "Software Engineer Intern",
      company: "Shopify",
      location: "Toronto, ON",
      period: "Sep 2025 - Dec 2025",
      description: (
        <>
          Shipped products and features for millions of merchants and shoppers worldwide on Shopify&apos;s{" "}
          <a href="https://shop.app/" target="_blank" rel="noopener noreferrer" className={styles.descriptionLink}>
            Shop Team
          </a>
          .
        </>
      ),
      skills: ["Ruby", "Ruby on Rails", "React Native", "GraphQL", "Google Cloud Platform", "Apache Kafka", "Grafana"],
      url: "https://www.shopify.com/",
      gradient: "linear-gradient(135deg, #5bf02eff 0%, #024c28ff 100%)",
    },
    {
      id: 2,
      position: "Software Developer Intern",
      company: "Hanov Solutions",
      location: "Waterloo, ON",
      period: "Jan 2025 - Apr 2025",
      description:
        "Delivered full-stack solutions by modernizing systems while developing new features, including AI-driven tools.",
      skills: ["TypeScript", "Go", "Python", "Vue.js", "SQL"],
      url: "https://www.linkedin.com/company/hanov-solutions-inc./",
      gradient: "linear-gradient(135deg, #937decff 0%, #6a11cb 100%)",
    },
    {
      id: 3,
      position: "Software Developer Intern",
      company: "Dandelion Networks",
      location: "Toronto, ON",
      period: "May 2024 - Aug 2024",
      description:
        "Led end-to-end blockchain app development across frontend, backend, and database, streamlining workflows and improving reliability.",
      skills: ["Go", "Nuxt.js", "Vue.js", "TypeScript", "SQL"],
      url: "https://www.dandelionnet.com/",
      gradient: "linear-gradient(180deg, #de975aff 0%, #121f80ff 100%)",
    },
    {
      id: 4,
      position: "Software Developer",
      company: "University of Waterloo Formula Electric",
      location: "Waterloo, ON",
      period: "Sep 2023 - Apr 2024",
      description:
        "Built embedded C firmware, reengineered the dashboard, and validated electric race car systems with Python HIL testing.",
      skills: ["C", "Python", "Git", "Hardware Testing", "Embedded Systems"],
      url: "https://www.uwfsae.ca/",
      gradient: "linear-gradient(180deg, #f6d567ff 0%, #79580cff 100%)",
    },
    {
      id: 5,
      position: "Lifeguard and Swim Instructor",
      company: "City of Toronto",
      location: "Toronto, ON",
      period: "Mar 2022 - Sep 2023",
      description: "Lifeguarded pools and waterparks across Toronto and taught swimming lessons to children ages 5-14.",
      skills: ["Leadership", "Teamwork", "Communication", "First Aid + CPR", "Public Relations"],
      url: "https://www.toronto.ca/",
      gradient: "linear-gradient(135deg, #d8b0b0ff 0%, #e95a5dff 100%)",
    },
    {
      id: 6,
      position: "Data Analyst and Logistics Operator",
      company: "Somerville Merchandising",
      location: "Toronto, ON",
      period: "Sep 2021 - Feb 2022",
      description:
        "Analyzed company and business data while coordinating logistics operations, including shipment planning and delivery handling.",
      skills: ["Microsoft Office", "Data Analysis", "Data Entry", "Logistics Management", "Inventory Control"],
      url: "https://somerville.ca/",
      gradient: "linear-gradient(135deg, #708dc0ff 0%, #16346aff 100%)",
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 60,
        damping: 25,
        opacity: { duration: 0.6, ease: "easeOut" },
        scale: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
        y: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
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
              whileHover={{
                y: -8,
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
    </main>
  );
};

export default Experiences;
