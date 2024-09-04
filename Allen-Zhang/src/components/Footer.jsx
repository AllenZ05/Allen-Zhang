import "./Footer.css";
import { AiFillLinkedin, AiFillInstagram, AiOutlineGithub } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { BsDiscord } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const copyToClipboard = async (type, text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${type} to clipboard!`);
    } catch (err) {
      console.error(`Could not copy ${type}: `, err);
      toast.error(`Failed to copy ${type}`);
    }
  };

  return (
    <div className="footer">
      <div className="socials">
        {/* Email */}
        <button onClick={() => copyToClipboard("Email Address", "allen.zhang.y05@gmail.com")} className="social-button">
          <MdEmail className="footer-icon2" />
        </button>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/allenzhang-05-/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button"
        >
          <AiFillLinkedin className="footer-icon" />
        </a>
        {/* Instagram */}
        <a
          href="https://www.instagram.com/allenz05/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button"
        >
          <AiFillInstagram className="footer-icon" />
        </a>
        {/* GitHub */}
        <a href="https://github.com/AllenZ05" target="_blank" rel="noopener noreferrer" className="social-button">
          <AiOutlineGithub className="footer-icon" />
        </a>
        {/* Discord */}
        <button onClick={() => copyToClipboard("Discord Username", "az_05")} className="social-button">
          <BsDiscord className="footer-icon2" />
        </button>
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
        className="my-toast-container"
      />
    </div>
  );
};

export default Footer;
