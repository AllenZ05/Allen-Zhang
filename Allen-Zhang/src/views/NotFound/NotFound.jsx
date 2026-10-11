import Link from "next/link";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <main id="main-content" tabIndex={-1} className={styles.notFoundMain}>
      <div className={styles.content}>
        <h1 className={styles.errorCode} data-enter style={{ "--enter-delay": "0.2s", "--enter-scale": 0.8 }}>
          404
        </h1>
        <h2 className={styles.title} data-enter style={{ "--enter-delay": "0.4s" }}>
          Page Not Found
        </h2>
        <p className={styles.description} data-enter style={{ "--enter-delay": "0.5s" }}>
          The page you&apos;re looking for does not exist.
        </p>
        <div data-enter style={{ "--enter-delay": "0.6s" }}>
          <Link href="/" className={styles.homeButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
