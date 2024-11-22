import { useEffect } from "react";
import "./HeroHome.css";
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
    <div className="hero-home">
      <div className="images">
        <img className="background-img" src={HeroHomebg} alt="Background Image" />
      </div>
      <div className="description">
        <h1>Allen Zhang</h1>
        <div className="typewriter-container">
          <Typewriter
            options={{
              strings: [
                "Computer Engineering Student at the University of Waterloo",
                "Seeking Fall 2025 Internships!",
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
