import { motion } from "framer-motion";
import { useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
// import CanadaFlag from "../../assets/flag-images/Canada_Flag.svg";
// import USAFlag from "../../assets/flag-images/USA_Flag.svg";
import { FaRocket } from "react-icons/fa6";
import { RiShining2Fill } from "react-icons/ri";

import styles from "./About.module.css";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, delay: 0.2 },
    },
  };

  const viewportOptions = {
    amount: 0.1,
    once: true,
  };

  return (
    <main>
      <h2 className={styles.heading}>About Me</h2>
      <section className={styles.sections}>
        <motion.article
          className={styles.introduction}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={sectionVariants}
        >
          <h3>Introduction</h3>
          <p>
            <FaRocket className={styles["rocket-icon"]} />
            Heyyy, it&apos;s Allen. I am currently a second-year student at the University of Waterloo, pursuing a BASc
            in Computer Engineering.
            <FaRocket className={styles["rocket-icon"]} />
          </p>
          <p>
            <RiShining2Fill className={styles["star-icon"]} />
            I am an ambitious individual with a mission to make a positive impact on the world.
            <RiShining2Fill className={styles["star-icon"]} />
          </p>
          <p>
            {/* <img src={CanadaFlag} alt="Canada Flag" className={styles["flag-icon"]} /> */}
            I currently live in Toronto, Canada.
            {/* <img src={USAFlag} alt="USA Flag" className={styles["flag-icon"]} /> */}
          </p>
          <br />
          <p>Feel free to connect with me using my social links in the footer!</p>
          <br />
        </motion.article>
        <section className={styles["education-skills"]}>
          <motion.article
            className={styles.education}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={sectionVariants}
          >
            <h3>Education</h3>
            <div className={styles.uni}>
              <h4>University of Waterloo</h4>
              <h6>Waterloo, ON</h6>
              <h5>Computer Engineering</h5>
              <div className={styles.terms}>
                <section className={styles.term}>
                  <p>Term 1 (Sep 2023 - Dec 2023)</p>
                  <ul>
                    <li>
                      Linear Algebra <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Calculus 1 & 2 <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Classical Mechanics <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Programming <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Project Studio <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Engineering Profession and Practice <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Communication in Engineering <IoCheckmark className={styles["check-icon"]} />
                    </li>
                  </ul>
                </section>
                <br />
                <section className={styles.term}>
                  <p>Term 2 (Jan 2024 - Apr 2024)</p>
                  <ul>
                    <li>
                      Calculus 3 <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Electricity and Magnetism <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Discrete Math and Logic <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Digital Circuits and Systems <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Linear Circuits <IoCheckmark className={styles["check-icon"]} />
                    </li>
                    <li>
                      Engineering Economics <IoCheckmark className={styles["check-icon"]} />
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </motion.article>

          <motion.article
            className={styles.skills}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={sectionVariants}
          >
            <h3>Skills</h3>
            <div className={styles["technical-skills"]}>
              <h4>Technical Skills</h4>
              <p>
                <b>Languages:</b> Python, C++, C#, C, Go, Swift, SQL/NoSQL, TypeScript, JavaScript, CSS, HTML
              </p>
              <p>
                <b>Frameworks & Libraries:</b> React.js, Next.js, Vue.js, Nuxt.js, PyTorch, Tailwind
              </p>
              <p>
                <b>Development Tools & Services:</b> AWS, Node.js, Vite.js, Firebase, Postman
              </p>
              <p>
                <b>Developer Tools:</b> Git, Github, VSCode, Unity
              </p>
              <p>
                <b>Misc:</b> STM32, MPU6050, Microsoft Office, Google Workspace, Adobe Suite, Figma
              </p>
            </div>
            <div className={styles["soft-skills"]}>
              <h4>Soft Skills</h4>
              <p>Leadership, Teamwork, Communication, Creativity, Problem-Solving</p>
            </div>
          </motion.article>
        </section>
      </section>
    </main>
  );
};

export default About;
