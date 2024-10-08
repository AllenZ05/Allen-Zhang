import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const closeMenu = () => setClick(false);

  return (
    <div className="header">
      <Link to="/" onClick={closeMenu}>
        <h2>AllenZ05</h2>
      </Link>
      <ul className={click ? "nav active" : "nav"}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
        </li>
        <li>
          <Link to="/experiences" onClick={closeMenu}>
            Experiences
          </Link>
        </li>
        <li>
          <Link to="/projects" onClick={closeMenu}>
            Projects
          </Link>
        </li>
      </ul>
      <div className="hamburger-menu" onClick={handleClick}>
        {click ? (
          <FaTimes size="1.5em" style={{ color: "white", margin: "0.5rem" }} />
        ) : (
          <GiHamburgerMenu size="1.5em" style={{ color: "white", margin: "0.5rem" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
