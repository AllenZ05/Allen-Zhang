import "./Footer.css";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { FaCanadianMapleLeaf } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sections">
        <div className="left-side">
          <div className="initials">
            <FaCanadianMapleLeaf size="1.1em" style={{ color: "red", margin: "0 1rem 0 0.2rem" }} />
            <p>AZ</p>
          </div>
          <div className="copyright">
            <AiOutlineCopyrightCircle size="1.1em" style={{ color: "white", margin: "0 1rem 0 0.2rem" }} />
            <p>2023 Allen Zhang</p>
          </div>
        </div>
        <div className="right-side">
          <div className="quote">
            <p>You only live once.</p>
            <p>How will you change the world?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
