import { useEffect } from "react";
import styles from "./HeroHome.module.css";
import HeroHomebg from "../../assets/heroHome-bg.jpg";
import Typewriter from "typewriter-effect";

const HeroHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "Allen Zhang";
  }, []);

  return (
    <div className={styles.heroHome}>
      <div className={styles.images}>
        <img className={styles.backgroundImg} src={HeroHomebg} alt="Background Image" />
      </div>
      <div className={styles.description}>
        <h1>Allen Zhang</h1>
        <div className={styles.typewriterContainer}>
          <Typewriter
            options={{
              strings: [
                "Computer Engineering Student at the University of Waterloo",
                "Software Engineer Intern at Shopify",
                "Seeking Summer 2026 Internships!",
                "Would love to talk and connect with you :D",
              ],
              autoStart: true,
              loop: true,
              delay: 30,
              deleteSpeed: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroHome;
