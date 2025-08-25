import styles from "./Footer.module.css";
import { AiFillLinkedin, AiFillInstagram, AiOutlineGithub } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
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

  const socialLinks = [
    {
      icon: <MdEmail className={styles.footerIcon2} />,
      action: () => copyToClipboard("Email Address", "allen.zhang.y05@gmail.com"),
      label: "Copy email to clipboard",
      type: "button",
      platform: "email",
    },
    {
      icon: <AiFillLinkedin className={styles.footerIcon} />,
      href: "https://www.linkedin.com/in/allenzhang-05-/",
      label: "Visit LinkedIn profile",
      type: "link",
      platform: "linkedin",
    },
    {
      icon: <AiFillInstagram className={styles.footerIcon} />,
      href: "https://www.instagram.com/allenz05/",
      label: "Visit Instagram profile",
      type: "link",
      platform: "instagram",
    },
    {
      icon: <AiOutlineGithub className={styles.footerIcon} />,
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
      />
    </footer>
  );
};

export default Footer;
