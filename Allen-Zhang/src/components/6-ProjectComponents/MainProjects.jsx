import { motion } from "framer-motion";
import { useEffect } from "react";
import "./MainProjects.css";

const MainProjects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="my-projects">
      <div className="projects-container">
        <br /> <br />
        <h3>In Development</h3>
        <motion.div
          className="project1 project"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="project-content">
            <h3>Productivity App (in development)</h3>
            <p>
              Developing a productivity app on web and mobile to boost user productivity. Will offer a seamless,
              intuitive experience that harmonizes focus and organization across all your devices. The app will offer
              many features to enhance time management, task/project tracking, note-taking, and personal goal setting,
              all within a clean, user-friendly interface. AWS is used for secure authentication and reliable data
              storage, ensuring seamless user data synchronization.
            </p>
            <p>Tech Stack: AWS, SQL, Next.js, Swift, TypeScript, Tailwind CSS, HTML</p>
            <p>In development</p>
          </div>
        </motion.div>
        <motion.div
          className="project2 project"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="project-content">
            <h3>Wildlife and Plant Detector (in development)</h3>
            <p>
              Curated a dataset of 1000+ images and conducted meticulous annotations with CVAT, establishing a strong
              foundation for training a PyTorch-based image detection model. Currently implementing a Kalman filter
              algorithm enhance the precision of detection of wildlife and plants.
            </p>
            <p>Tech Stack: Python, CVAT, PyTorch</p>
            <p>In development</p>
          </div>
        </motion.div>
        <br /> <br />
        <h3>Complete</h3>
        <motion.div
          className="project3 project"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="project-content">
            <h3>Personal Website</h3>
            <p>
              Designed and developed a fully responsive personal website to learn more about me! Showcases my
              experiences, projects, and skills. Will also be a place to store things I write about. You&apos;re on it
              right now! :D
            </p>
            <p>Tech stack: Vite.js, React.js, JavaScript, HTML/CSS</p>
            <p>
              <a href="https://github.com/AllenZ05/Personal-Website" target="_blank" rel="noopener noreferrer">
                Github Repo
              </a>
            </p>
          </div>
        </motion.div>
        <motion.div
          className="project4 project"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="project-content">
            <h3>Fall Detection Device</h3>
            <p>
              Engineered a fall detection device with a STM32 microcontroller, tailored to the needs and safety of
              elderly individuals. An accelerometer-based fall detection algorithm was developed using a MPU6050, with
              an 91% detection rate, and 6% false positive rate through extensive testing and multiple iterations. A GSM
              module was also integrated to facilitate wireless communication, enabling automatic alerts to reach
              emergency contacts and services.
            </p>
            <p>Tech stack: C, C++, STM32, STM32CubeIDE, Accelerometer, GSM Module</p>
            <p>
              <a href="https://github.com/AllenZ05/Fall-Detection-Device" target="_blank" rel="noopener noreferrer">
                Github Repo
              </a>
            </p>
          </div>
        </motion.div>
        <motion.div
          className="project5 project"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="project-content">
            <h3>Minesweeper</h3>
            <p>
              Developed a Minesweeper like game, inspired by the classic Minesweeper game. Except it has a Waterloo
              twist (as the University of Waterloo is known for having tons of Canadian Geese). It asks the user to
              enter the number of rows, columns, and geese on the board. The user then has to try to win the game by
              clearing all tiles without a goose.
            </p>
            <p>Tech stack: C++</p>
            <p>
              <a href="https://github.com/AllenZ05/Minesweeper" target="_blank" rel="noopener noreferrer">
                Github Repo
              </a>
            </p>
          </div>
        </motion.div>
        <motion.div
          className="project6 project"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="project-content">
            <h3>Python Games</h3>
            <p>
              1. Developed a Snake game, inspired by Google&apos;s snake game. Implemented snake movement, collision
              detection, score tracking, and sound effects, for an engaging experience. Also designed graphics, refined
              performance, and created a user-friendly interface with dynamic animations.
              <br /> <br />
              2. In progress
            </p>
            <p>Tech stack: Python, Pygame</p>
            <p>
              <a href="https://github.com/AllenZ05/Python-Games" target="_blank" rel="noopener noreferrer">
                Github Repo
              </a>
            </p>
          </div>
        </motion.div>
        <motion.div
          className="project7 project"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="project-content">
            <h3>Movie Website</h3>
            <p>
              Created a dynamic and user-friendly movie website to find any movie you want. It utilizes Vue.js for
              front-end development and Axios for RESTful API integration with the TMDb API. Advanced features were
              implemented, such as an intuitive search bar and efficient movie data retrieval encompassing overviews,
              trailers, genres, ratings, release dates, crew details, and more. Employed Postman for API testing and
              debugging, ensuring seamless end-to-end HTTP communication. Finally, the backend infrastructure is powered
              by Firebase, providing secure user authentication and real-time database interactions for storing user
              preferences.
            </p>
            <p>Tech stack: Vue.js, JavaScript, HTML/CSS, Firebase, Postman, Axios, TMDb API</p>
            <p>
              <a href="https://github.com/AllenZ05/Movie-Project" target="_blank" rel="noopener noreferrer">
                Github Repo
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainProjects;
