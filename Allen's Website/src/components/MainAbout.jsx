import "./MainAbout.css";

const MainAbout = () => {
  return (
    <div className="about-me">
      <div className="sections">
        <div className="introduction">
          <h3>Introduction</h3>
          <p>
            My name is Allen. I am currently a first year student attending the University of Waterloo, as a Candidate
            for BASc in Computer Engineering.
          </p>
          <p>Location: Toronto, Canada</p>
          <p>Birthday: November 22 2005</p>
        </div>
        <div className="coding">
          <h3>Coding</h3>
          <div className="coding-intro">
            <p>
              I have always had a ton of interests, and I would be lying if I said I always knew what I wanted to do in
              the future. However, in May 2023, I decided to pursue Computer Engineering at the University of Waterloo,
              one of North America&apos;s most innovative and top technology schools.
            </p>
            <p>I started coding in Grade 11, as it seemed interesting. And now I basically code everyday.</p>
          </div>
          <div className="coding-journey">
            <h4>Coding Journey</h4>
            <p>Languages: Python &rarr; Java &rarr; HTML &rarr; CSS &rarr; JS &rarr; C &rarr; C++ &rarr; TS | C#</p>
            <p>Frameworks/Libraries: Vite.js &rarr; Vue.js &rarr; React.js &rarr; PyGame &rarr; PyTorch |</p>
            <p>Other: Node &rarr; npm &rarr; Axios &rarr; Postman &rarr; Firebase &rarr; CVAT |</p>
            <p>Dev Tools: Git &rarr; Github &rarr; VSCode |</p>
            <p>Misc: STM32 &rarr; STM32CubeIDE |</p>
            <p>Courses: CS12 &rarr; CodeCademy &rarr; ECE150 &rarr; Odin Project &rarr; FreeCodeCamp |</p>
            <p>Projects: Movie Website &rarr; Python Games &rarr; Fall Detection Device | Object Detection</p>
            <p>Experience: UW Formula Electric Firmware Developer |</p>
          </div>
          <div className="coding-resources">
            <h4>Coding Resources</h4>
            <p>MDN Web Docs: https://developer.mozilla.org/en-US/</p>
            <p>JavaScript Reference: https://javascript.info/</p>
            <p>W3Schools: https://www.w3schools.com/</p>
            <p>CSS Flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox/</p>
            <p>CSS Grid: https://css-tricks.com/snippets/css/complete-guide-grid/</p>
            <p>Emmet Cheat Sheet: https://docs.emmet.io/cheat-sheet/</p>
            <p>C++ Learn: https://www.learncpp.com/</p>
            <p>The Odin Project: https://www.theodinproject.com/dashboard</p>
            <p>FreeCodeCamp: https://www.freecodecamp.org/learn</p>
          </div>
        </div>
        <div className="misc">
          <h3>Misc</h3>
          <div className="interests">
            <h4>Interests</h4>
            <p>Software, Hardware, Technology, Space, Design, Business, Management, Sports, History, Medical Science</p>
          </div>
          <div className="hobbies">
            <h4>Hobbies</h4>
            <p>Traveling, playing sports, playing games</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAbout;
