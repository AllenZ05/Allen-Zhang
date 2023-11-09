import "./Hero.css";
import Herobg from "../assets/hero-bg.jpeg";

const Hero = () => {
  return (
    <div className="hero">
      <div className="images">
        <img className="background-img" src={Herobg} alt="Background Image" />
      </div>
      <div className="content">
        <p>Hi there, I am</p>
        <h1>Allen Zhang</h1>
      </div>
    </div>
  );
};

export default Hero;
