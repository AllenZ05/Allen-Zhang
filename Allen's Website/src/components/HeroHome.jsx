import "./HeroHome.css";
import Herobg from "../assets/heroHome-bg.jpeg";

const Hero = () => {
  return (
    <div className="hero-home">
      <div className="images">
        <img className="background-img" src={Herobg} alt="Background Image" />
      </div>
      <div className="hero-content">
        <p>Hi there, I am</p>
        <h1>Allen Zhang</h1>
      </div>
    </div>
  );
};

export default Hero;
