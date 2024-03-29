import "./HeroAbout.css";
import HeroAboutbg from "../../assets/heroAbout-bg.jpg";

const HeroAbout = () => {
  return (
    <div className="hero-about">
      <div className="images">
        <img className="background-img" src={HeroAboutbg} alt="Background Image" />
      </div>
      <div className="description">
        <h2>About me</h2>
      </div>
    </div>
  );
};

export default HeroAbout;
