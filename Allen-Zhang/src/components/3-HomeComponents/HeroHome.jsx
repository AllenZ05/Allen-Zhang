import { useEffect } from "react";
import "./HeroHome.css";
import HeroHomebg from "../../assets/heroHome-bg.jpg";

import Typewriter from "typewriter-effect";

const HeroHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="hero-home">
      <div className="images">
        <img className="background-img" src={HeroHomebg} alt="Background Image" />
      </div>
      <div className="description">
        <h1>Allen Zhang</h1>
        <p>
          <Typewriter
            options={{
              strings: [
                "Seeking Summer 2024 Co-ops/Internships!",
                "Interested in Software Roles!",
                "Can work anywhere in Canada or US!",
                "Website is fully responsive on all devices :)",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 25,
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default HeroHome;
