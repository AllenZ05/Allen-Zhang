import styles from "./Footer.module.css";
import { AiFillLinkedin, AiFillInstagram, AiOutlineGithub } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
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
    <div className={styles.footer}>
      <div className={styles.socials}>
        {/* Email */}
        <button
          onClick={() => copyToClipboard("Email Address", "allen.zhang.y05@gmail.com")}
          className={styles.socialButton}
        >
          <MdEmail className={styles.footerIcon2} />
        </button>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/allenzhang-05-/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialButton}
        >
          <AiFillLinkedin className={styles.footerIcon} />
        </a>
        {/* Instagram */}
        <a
          href="https://www.instagram.com/allenz05/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialButton}
        >
          <AiFillInstagram className={styles.footerIcon} />
        </a>
        {/* GitHub */}
        <a href="https://github.com/AllenZ05" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
          <AiOutlineGithub className={styles.footerIcon} />
        </a>
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
        className={styles.myToastContainer}
      />
    </div>
  );
};

export default Footer;
