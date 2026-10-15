import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import HeroBackdrop from "../../components/HeroBackdrop";
import hero from "../Home/HeroHome.module.css";
import styles from "./NotFound.module.css";

// Uses the home hero's layout, backdrop, and buttons so a wrong turn still feels like the same site.
const NotFound = () => {
  return (
    <main id="main-content" tabIndex={-1} className={hero.homeMain}>
      <section className={hero.heroHome}>
        <HeroBackdrop />
        <div className={hero.content}>
          <h1 className={`${hero.name} ${styles.code}`} data-enter style={{ "--enter-delay": "0.2s" }}>
            404
          </h1>
          <h2 className={styles.title} data-enter style={{ "--enter-delay": "0.3s" }}>
            Page not found
          </h2>
          <p className={styles.description} data-enter style={{ "--enter-delay": "0.4s" }}>
            The page you&apos;re looking for does not exist.
          </p>
          <div className={hero.actions} data-enter style={{ "--enter-delay": "0.5s" }}>
            <Link href="/" className={hero.primaryCta}>
              Back to Home
              <FiArrowRight className={hero.ctaIcon} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
