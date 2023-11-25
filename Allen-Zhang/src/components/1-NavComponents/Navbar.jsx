import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className="header">
      <Link to="/">
        <h2>AllenZ05</h2>
      </Link>
      <ul className={click ? "nav active" : "nav"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/experiences">Experiences</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/more">More</Link>
        </li>
      </ul>
      <div className="hamburger-menu" onClick={handleClick}>
        {click ? (
          <GiHamburgerMenu size="1.5em" style={{ color: "white", margin: "0.5rem" }} />
        ) : (
          <FaTimes size="1.5em" style={{ color: "white", margin: "0.5rem" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
