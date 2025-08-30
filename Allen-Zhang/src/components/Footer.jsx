import styles from "./Footer.module.css";
import { FaGoogle, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [toastWidth, setToastWidth] = useState(null);

  // Detect screen size and update toast width
  useEffect(() => {
    const updateToastWidth = () => {
      if (window.innerWidth >= 500) {
        setToastWidth("450px");
      } else if (window.innerWidth >= 481) {
        setToastWidth("350px");
      } else {
        setToastWidth(null);
      }
    };

    updateToastWidth();
    window.addEventListener("resize", updateToastWidth);
    return () => window.removeEventListener("resize", updateToastWidth);
  }, []);

  const copyToClipboard = async (type, text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${type} to clipboard!`, {
        toastId: "copy-success",
      });
    } catch (err) {
      console.error(`Could not copy ${type}: `, err);
      toast.error(`Failed to copy ${type}`, {
        toastId: "copy-error",
      });
    }
  };

  const socialLinks = [
    {
      icon: <FaGoogle className={styles.footerIcon} />,
      action: () => copyToClipboard("Email Address", "allen.zhang.y05@gmail.com"),
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
        style={toastWidth ? { width: toastWidth } : {}}
      />
    </footer>
  );
};

export default Footer;
