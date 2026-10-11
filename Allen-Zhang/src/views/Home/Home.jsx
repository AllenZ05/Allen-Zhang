import HeroHome from "./HeroHome";
import styles from "./HeroHome.module.css";

const Home = () => {
  return (
    <main id="main-content" tabIndex={-1} className={styles.homeMain}>
      <HeroHome />
    </main>
  );
};

export default Home;
