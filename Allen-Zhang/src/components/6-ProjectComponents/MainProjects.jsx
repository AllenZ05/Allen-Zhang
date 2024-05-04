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
          className="project0 project"
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
            <h3>Mobile Game</h3>
            <p>Developing a mobile game for iOS and Android.</p>
            <p>Tech Stack: TBD</p>
            <p>In development, set to release in August 2024</p>
          </div>
        </motion.div>
        <br />
        <br />
        <h3>Complete</h3>
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
            <h3>Time-CoPilot</h3>
            <p>
              The Ultimate Productivity App. A seamless, intuitive experience that harmonizes focus and organization
              across all your devices. Offers many features to enhance time management, schedule planning, task/project
              tracking, note-taking, personal goal setting, and more, all within a clean, user-friendly interface. Help
              and Support is offered 24/7 at <a href="mailto:contact@time-copilot.com">contact@time-copilot.com</a>. AWS
              is used for secure authentication and reliable data storage, ensuring seamless user data synchronization.
            </p>
            <p>Tech Stack: AWS, SQL, Next.js, TypeScript, Tailwind CSS</p>
            <p>
              <a href="https://www.time-copilot.com/" target="_blank" rel="noopener noreferrer">
                Website
              </a>
            </p>
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
            <h3>Minesweeper</h3>
            <p>
              Developed a Minesweeper like game, inspired by the classic Minesweeper game. Except it has a Waterloo
              twist (as the University of Waterloo is known for having tons of Canadian Geese). It asks the user to
              enter the number of rows, columns, and geese on the board. The user then has to try to win the game by
              clearing all tiles without a goose.
            </p>
            <p>Tech stack: C++</p>
            <p>
              <a
                href="https://github.com/AllenZ05/Minesweeper/assets/124856383/08858cc9-1799-4653-a58b-e5750406ee09"
                target="_blank"
                rel="noopener noreferrer"
              >
                Video Demo
              </a>
              <br /> <br />
              <a href="https://github.com/AllenZ05/Minesweeper" target="_blank" rel="noopener noreferrer">
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
            <h3>Snake</h3>
            <p>
              Developed a Snake game, inspired by Google&apos;s snake game. Implemented snake movement, collision
              detection, score tracking, sound effects, and game over screen, for an engaging experience. Also designed
              graphics, refined performance, and created a user-friendly interface with dynamic animations.
              <br />
            </p>
            <p>Tech stack: Python, Pygame</p>
            <p>
              <a
                href="https://github.com/AllenZ05/Python-Games/assets/124856383/2bca3b01-fde5-4ffe-9b3e-ca0c30c525be"
                target="_blank"
                rel="noopener noreferrer"
              >
                Video Demo
              </a>
              <br /> <br />
              <a href="https://github.com/AllenZ05/Python-Games" target="_blank" rel="noopener noreferrer">
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
            <h3>Movie Website</h3>
            <p>
              Created a dynamic and user-friendly movie website to find any movie you want. It utilizes Vue.js for
              front-end development and Axios for RESTful API integration with the TMDb API. Has up-to-date content for
              all movies and tv shows, including an overview, trailer, genre, ratings, release dates, cast, budget,
              revenue and more. Implemented an intuitive search bar for effortless movie discovery and selection.
              Employed Postman for API testing and debugging, ensuring seamless end-to-end HTTP communication. Finally,
              the backend infrastructure is powered by Firebase, providing secure user authentication and real-time
              database interactions for storing user preferences.
            </p>
            <p>Tech stack: Vue.js, JavaScript, HTML/CSS, Firebase, Postman, Axios, TMDb API</p>
            <p>
              <a href="https://cs12-summative.web.app/" target="_blank" rel="noopener noreferrer">
                Website
              </a>
              <br /> <br />
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
