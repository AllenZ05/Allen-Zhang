import "./HeroAbout.css";
import HeroAboutbg from "../../assets/heroAbout-bg.jpg";

const HeroAbout = () => {
  return (
    <div className="hero-about">
      <div className="images">
        <img className="background-img" src={HeroAboutbg} alt="Background Image" />
      </div>
      <div className="about-content">
        <h2>About me</h2>
        <p>Hello! :)</p>
      </div>
    </div>
  );
};

export default HeroAbout;
