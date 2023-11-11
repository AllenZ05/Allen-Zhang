import "./HeroProjects.css";
import HeroProjectsbg from "../../assets/heroProjects-bg.jpg";

const HeroProjects = () => {
  return (
    <div className="hero-projects">
      <div className="images">
        <img className="background-img" src={HeroProjectsbg} alt="Background Image" />
      </div>
      <div className="projects-content">
        <h2>Projects</h2>
        <p>My Projects</p>
      </div>
    </div>
  );
};

export default HeroProjects;
