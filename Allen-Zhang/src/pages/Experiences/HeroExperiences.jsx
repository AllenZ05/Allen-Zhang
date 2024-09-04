import "./HeroExperiences.css";
import HeroExperiencesbg from "../../assets/heroExperiences-bg.jpg";

const HeroExperiences = () => {
  return (
    <div className="hero-experiences">
      <div className="images">
        <img className="background-img" src={HeroExperiencesbg} alt="Background Image" />
      </div>
      <div className="description">
        <h2>Experiences</h2>
      </div>
    </div>
  );
};

export default HeroExperiences;