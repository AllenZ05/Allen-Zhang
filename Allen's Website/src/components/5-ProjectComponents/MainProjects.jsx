import "./MainProjects.css";

const MainProjects = () => {
  return (
    <div className="my-projects">
      <div className="projects-container">
        <div className="project1 project">
          <div className="project-content">
            <h3>Personal Website</h3>
            <p>
              Designed and developed a personal website to learn more about me! Showcases my experiences, projects,
              skills. Will also be a place where I store things I write about. You&apos;re on it right now!
            </p>
            <p>Tech stack: Vite.js, React.js, JavaScript, HTML/CSS</p>
            <p>
              <a href="https://github.com/AllenZ05/Personal-Website" target="_blank" rel="noopener noreferrer">Github Repo</a>
            </p>
          </div>
        </div>
        <div className="project2 project">
          <div className="project-content">
            <h3>Wildlife and Plant Detector (in progress)</h3>
            <p>
              Curated a dataset of 1000+ images and conducted meticulous annotations with CVAT, establishing a strong
              foundation for training a PyTorch-based image detection model. Currently implementing a Kalman filter
              algorithm to enhance the precision of detection of wildlife and plants. Also developing a web app and a
              mobile app using React.js and React Native, detailing information device functionality, instructions for
              usage, and image storage
            </p>
            <p>Tools currently used: Python, CVAT, PyTorch, Vite.js, React.js, TypeScript, HTML/CSS, React Native</p>
            <p>In progress</p>
          </div>
        </div>
        <div className="project3 project">
          <div className="project-content">
            <h3>Fall Detection Device</h3>
            <p>
              Engineered a fall detection device with a STM32 microcontroller, tailored to the needs and safety of
              elderly individuals. An accelerometer-based fall detection algorithm was developed, with an 89% detection
              rate, and 6% false positive rate through extensive testing and multiple iterations. A GSM module was also
              integrated to facilitate wireless communication, enabling automatic text messaging and calls to reach
              emergency contacts and services. Schematic and circuit diagrams were crafted for the entire device,
              optimizing signal flow, ease of assembly, and efficiency
            </p>
            <p>Tech stack: C, C++, STM32, STM32CubeIDE, Accelerometer, GSM Module</p>
            <p>Currently on STM32CubeIDE, will move to Github later</p>
          </div>
        </div>
        <div className="project4 project">
          <div className="project-content">
            <h3>Mineseeker</h3>
            <p>
              Developed a Mineseeker like game, inspired by the classic Minesweeper game. Except it has a Waterloo twist
              (as the University of Waterloo is known for having tons of Canadian Geese). It asks the user to enter the
              number of rows, columns, and geese on the board. The user then has to try to win the game by clearing all
              tiles without a goose.
            </p>
            <p>Tech stack: C++</p>
            <p>
              <a href="https://github.com/AllenZ05/Mineseeker" target="_blank" rel="noopener noreferrer">
                Github Repo
              </a>
            </p>
          </div>
        </div>
        <div className="project5 project">
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
        </div>
        <div className="project6 project">
          <div className="project-content">
            <h3>Movie Website</h3>
            <p>
              Created a responsive and user-friendly movie website to find any movie you want. Integrated data from the
              TMDb API for up-to-date content including an overview, trailer, genre, ratings, release dates, directors,
              writers, and more. Implemented an intuitive search bar for effortless movie discovery and selection.
              Utilized Firebase for user authentication, login management, and storage of liked movies and movie
              watch-list.
            </p>
            <p>Tech stack: Vue.js, JavaScript, HTML/CSS, Firebase, Postman, Axios, TMDb API</p>
            <p>
              <a href="https://github.com/AllenZ05/Movie-Project" target="_blank" rel="noopener noreferrer">
                Github Repo
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProjects;
