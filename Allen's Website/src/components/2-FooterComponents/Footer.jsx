import "./Footer.css";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { FaCanadianMapleLeaf } from "react-icons/fa6";

import { MdEmail } from "react-icons/md";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const copyToClipboard = async (type, text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${type} to clipboard!`, { style: { width: "20rem", fontSize: "0.85rem" } });
    } catch (err) {
      console.error(`Could not copy ${type}: `, err);
      toast.error(`Failed to copy ${type}`);
    }
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
            <button onClick={() => copyToClipboard("Email Address", "a367zhan@uwaterloo.ca")} className="email">
              <MdEmail className="icon email" />
            </button>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/allenzhang-05-/" target="_blank" rel="noopener noreferrer">
              <AiFillLinkedin className="icon linkedIn" />
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/allenz05/" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram className="icon instagram" />
            </a>
            {/* GitHub */}
            <a href="https://github.com/AllenZ05" target="_blank" rel="noopener noreferrer">
              <AiOutlineGithub className="icon github" />
            </a>
            {/* Discord */}
            <button onClick={() => copyToClipboard("Discord Username", "az_05")} className="discord">
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

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Footer;
