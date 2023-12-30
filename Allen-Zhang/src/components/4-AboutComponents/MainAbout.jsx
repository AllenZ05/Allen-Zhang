import "./MainAbout.css";

const MainAbout = () => {
  return (
    <div className="about-me">
      <div className="sections">
        <div className="introduction">
          <p className="update">IMPROVEMENTS + MORE INFO TO THIS PAGE COMING (when I have time)</p> {/*TODO*/}
          <h3>Introduction</h3>
          <p>
            My name is Allen. I am currently a first year student attending the University of Waterloo, as a Candidate
            for BASc in Computer Engineering.
          </p>
          <p>An ambitious individual, with a mission to change the world the best I can. </p>
          <p>I currently live in Toronto, Canada</p>
          <br></br>
          <p className="co-op">CURRENTLY SEEKING SUMMER CO-OPS/INTERNSHIPS FOR MAY-AUG 2024</p> {/*TODO*/}
          <p>Interested in software roles, anywhere in Canada or US</p>
          <p>Free feel to contact me using my socials in the footer (email preferred), always willing to connect and talk!</p>
        </div>
        <div className="edu_skills">
          <div className="education">
            <h3>Education</h3>
            <div className="uni">
              <h4>University of Waterloo</h4>
              <h6>Waterloo, ON</h6>
              <h5>Computer Engineering</h5>
              <div className="first-year">
                <h6>First Year</h6>
                <p>Term 1 (Sep 2023 - Dec 2023)</p>
                <p>
                  <ul>
                    <li>Linear Algebra</li>
                    <li>Calculus 1</li>
                    <li>Classical Mechanics</li>
                    <li>Programming</li>
                    <li>Project Studio</li>
                    <li>Engineering Profession and Practice</li>
                    <li>Communication in the Engineering Profession</li>
                  </ul>
                </p>
                <br />
                <p>Term 2 (Jan 2024 - Apr 2024)</p>
                <p>
                  <ul>
                    <li>Calculus 2</li>
                    <li>Electricity and Magnetism</li>
                    <li>Discrete Mathematics and Logic 1</li>
                    <li>Digital Circuits and Systems</li>
                    <li>Linear Circuits</li>
                    <li>Engineering Economics and Impact on Society</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
          <div className="skills">
            <h3>Skills</h3>
            <div className="skills-intro">
              <p>
                I have always had a ton of interests, and did not know what I wanted to do in the future for the longest
                time.
              </p>
              <p>
                However, in May 2023, I decided to pursue Computer Engineering at the University of Waterloo, one of
                North America&apos;s most innovative and top technology schools.
              </p>
            </div>
            <div className="coding-journey">
              <h4>Coding Skills</h4>
              <p>
                <b>Languages:</b> Python, C++, Swift, C, JS, TS, SQL, HTML, CSS
              </p>
              <p>
                <b>Frameworks/Libraries:</b> React.js, Next.js, Vite.js, Vue.js, PyTorch, PyGame, Tailwind
              </p>
              <p>
                <b>Other:</b> Node, npm, AWS, Firebase, Axios, Postman
              </p>
              <p>
                <b>Dev Tools:</b> Git, Github, VSCode{" "}
              </p>
              <p>
                <b>Misc:</b> STM32, STM32CubeIDE, MPU6050{" "}
              </p>
              <br />
              <p>
                <b>Projects completed:</b> Movie Website, Python and C++ Games, Fall Detection Device
              </p>
              <p>
                <b>Projects under development:</b> Productivity App, Object Detector
              </p>
              <p>
                <b>Experience:</b> UW Formula Electric Firmware Developer &rarr; ???
              </p>
              {/* <p><b>Courses:</b> CS12, ECE150, Odin Project, FreeCodeCamp | ECE250</p> */}
            </div>
            <div className="soft-skills">
              <h4>Soft Skills</h4>
              <p>Leadership, Teamwork, Communication, Creativity, Problem-solving</p>
            </div>
            {/* <div className="coding-resources">
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
          </div> */}
          </div>
        </div>
        <div className="misc">
          <h3>Misc</h3>
          <div className="interests">
            <h5>Interests</h5>
            <p>
              Software, Hardware, Technology, Space, Design, Business, Management, Sports, History, Medical Science,
              Exploring
            </p>
            <h5>Favorites</h5>
            <p>Color: Blue</p>
            <p>Sports Teams: Tampa Bay Lightning, Manchester City</p>
            <p>Food: Idk, there&apos;s a lot</p>
            <p>Travel destination: Idk, so many. Tons of places in the US, China, and Europe</p>
            <p>Movie: Lord of the Rings</p>
            <p>Artist: Probably NF right now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAbout;
