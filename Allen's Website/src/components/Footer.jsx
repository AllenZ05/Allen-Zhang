import "./Footer.css";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { FaCanadianMapleLeaf } from "react-icons/fa6";

import { MdEmail } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";

const Footer = () => {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      displayNotification(`Copied: ${text}`); 
    } catch (err) {
      console.error("Could not copy text: ", err);
      displayNotification("Failed to copy text"); 
    }
  };
  const displayNotification = (message) => {
    alert(message);
  };
  return (
    <div className="footer">
      <div className="sections">
        {/* Left Side */}
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

        {/* Middle */}
        <div className="middle">
          <div className="socials">
            {/* Email */}
            <button onClick={() => copyToClipboard("a367zhan@uwaterloo.ca")} className="email">
              <MdEmail className="icon email" />
            </button>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/allenzhang-05-/" target="_blank" rel="noopener noreferrer">
              <BsLinkedin className="icon linkedIn" />
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/allenz05/" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram className="icon instagram" />
            </a>
            {/* GitHub */}
            <a href="https://github.com/AllenZ05" target="_blank" rel="noopener noreferrer" >
              <AiOutlineGithub className="icon github"/>
            </a>
            {/* Discord */}
            <button onClick={() => copyToClipboard("az_05")} className="discord">
              <BsDiscord className="icon discord" />
            </button>
          </div>
        </div>

        {/* Right Side */}
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
