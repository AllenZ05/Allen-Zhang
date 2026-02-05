"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./HeroHome.module.css";
import Typewriter from "typewriter-effect";

const HeroHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.heroHome}>
      <div className={styles.images}>
        <Image
          className={`${styles.backgroundImg} ${styles.darkBg}`}
          src="/heroHome-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
        />
        <Image
          className={`${styles.backgroundImg} ${styles.lightBg}`}
          src="/heroHome-bg-light.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
        />
      </div>
      <div className={styles.description}>
        <h1>Allen Zhang</h1>
        <div className={styles.typewriterContainer}>
          <Typewriter
            options={{
              strings: [
                "Computer Engineering Student at the University of Waterloo",
                "Incoming Software Engineer Intern at Apple for Summer 2026!",
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
