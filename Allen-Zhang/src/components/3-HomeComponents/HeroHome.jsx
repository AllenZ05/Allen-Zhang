import "./HeroHome.css";
import HeroHomebg from "../../assets/heroHome-bg.jpg";

const HeroHome = () => {
  return (
    <div className="hero-home">
      <div className="images">
        <img className="background-img" src={HeroHomebg} alt="Background Image" />
      </div>
      <div className="description">
        <h1>Allen Zhang</h1>
        <p className="desktop-view">View on Desktop for best experience, mobile-friendly updates coming soon!</p>
      </div>
    </div>
  );
};

export default HeroHome;
