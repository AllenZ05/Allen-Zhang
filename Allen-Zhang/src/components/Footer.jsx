import styles from "./Footer.module.css";
import { FaLinkedinIn, FaInstagram, FaGithub, FaCheck, FaXmark } from "react-icons/fa6";
import PropTypes from "prop-types";
import { HiOutlineMail } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { useTheme } from "../context/useTheme";
import "react-toastify/dist/ReactToastify.css";

const CustomToast = ({ type, message }) => (
  <div className={styles.customToast}>
    <div className={`${styles.toastIcon} ${styles[type]}`}>{type === "success" ? <FaCheck /> : <FaXmark />}</div>
    <div className={styles.toastContent}>
      <span className={styles.toastTitle}>{type === "success" ? "Copied!" : "Error"}</span>
      <span className={styles.toastMessage}>{message}</span>
    </div>
  </div>
);

CustomToast.propTypes = {
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  message: PropTypes.string.isRequired,
};

const Footer = () => {
  const { theme } = useTheme();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(<CustomToast type="success" message="Email copied to clipboard" />, {
        toastId: "copy-success",
        className: styles.toastWrapper,
        bodyClassName: styles.toastBody,
        progressClassName: styles.toastProgress,
      });
    } catch (err) {
      console.error("Could not copy email: ", err);
      toast(<CustomToast type="error" message="Failed to copy email" />, {
        toastId: "copy-error",
        className: styles.toastWrapperError,
        bodyClassName: styles.toastBody,
        progressClassName: styles.toastProgressError,
      });
    }
  };

  const socialLinks = [
    {
      icon: <HiOutlineMail className={styles.footerIcon} />,
      action: () => copyToClipboard("allen.zhang.y05@gmail.com"),
      label: "Copy email to clipboard",
      type: "button",
      platform: "email",
    },
    {
      icon: <FaLinkedinIn className={styles.footerIcon} />,
      href: "https://www.linkedin.com/in/allenzhang-05-/",
      label: "Visit LinkedIn profile",
      type: "link",
      platform: "linkedin",
    },
    {
      icon: <FaInstagram className={styles.footerIcon} />,
      href: "https://www.instagram.com/allenz05/",
      label: "Visit Instagram profile",
      type: "link",
      platform: "instagram",
    },
    {
      icon: <FaGithub className={styles.footerIcon} />,
      href: "https://github.com/AllenZ05",
      label: "Visit GitHub profile",
      type: "link",
      platform: "github",
    },
  ];

  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.socials}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {socialLinks.map((social, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          >
            {social.type === "button" ? (
              <button
                onClick={social.action}
                className={`${styles.socialButton} ${styles[social.platform]}`}
                aria-label={social.label}
              >
                {social.icon}
              </button>
            ) : (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialButton} ${styles[social.platform]}`}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>

      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme={theme}
        closeButton={false}
        icon={false}
      />
    </footer>
  );
};

export default Footer;
