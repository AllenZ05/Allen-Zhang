import { motion } from "framer-motion";
import { useEffect } from "react";
import "./MainExperiences.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainExperiences = () => {
  const copyToClipboard = async (type, text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${type} to clipboard!`);
    } catch (err) {
      console.error(`Could not copy ${type}: `, err);
      toast.error(`Failed to copy ${type}`);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="my-experiences">
      <div className="experiences-container">
        {/* Temp Temp Temp */}
        <motion.div
          className="experience0 experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
          variants={{
            hidden: { opacity: 0, x: -100, rotate: -10 },
            visible: { opacity: 1, x: 0, rotate: 0 },
          }}
        >
          <div className="experience-info">
            <h3 className="job-title">???</h3>
            <br />
            <h6>Anywhere in Canada or US</h6>
            <h6>May 2023 - Aug 2023</h6>
          </div>
          <div className="experience-description">
            <br />
            <p>Seeking Software Co-ops/Internships for Summer 2024!</p>
            <br />
            <p>
              Contact me at{" "}
              <button
                onClick={() => copyToClipboard("Email Address", "allen.zhang.y05@gmail.com")}
                className="email"
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "1rem",
                  color: "CornflowerBlue",
                }}
              >
                allen.zhang.y05@gmail.com
              </button>
            </p>
          </div>
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
          className="my-toast-container"
        />
        {/* Temp Temp Temp */}
        <motion.div
          className="experience1 experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
          variants={{
            hidden: { opacity: 0, x: -100, rotate: -10 },
            visible: { opacity: 1, x: 0, rotate: 0 },
          }}
        >
          <div className="experience-info">
            <h3 className="job-title">Firmware Developer</h3>
            <h5>University of Waterloo Formula Electric</h5>
            <h6>Waterloo, ON</h6>
            <h6>Sep 2023 - Present</h6>
          </div>
          <div className="experience-description">
            <p>
              Developed advanced firmware and comprehensive documentation for the vehicle, optimizing performance &
              safety
            </p>
            <p>
              Created and executed HIL tests with to rigorously test, validate, and fine-tune vehicle functionalities
              and subsystems using software models and hardware emulators
            </p>
            <p>
              Enhanced the braking system, resulting in a 7% performance improvement, leading to faster and smoother
              braking. Currently working on a new and more efficient battery management system
            </p>
            <p>
              Identified and rectified major flaws in the onboarding instructions, improving the process for new team
              members
            </p>
            <br />
            <p>Tech stack: C, Python</p>
            <p>
              <a href="https://www.uwfsae.ca/" target="_blank" rel="noopener noreferrer">
                Website
              </a>
            </p>
          </div>
        </motion.div>
        <motion.div
          className="experience2 experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
          variants={{
            hidden: { opacity: 0, x: -100, rotate: -10 },
            visible: { opacity: 1, x: 0, rotate: 0 },
          }}
        >
          <div className="experience-info">
            <h3 className="job-title">Lifeguard and Swim Instructor</h3>
            <h5>City of Toronto</h5>
            <h6>Toronto, ON</h6>
            <h6>Mar 2022 - Sep 2023</h6>
          </div>
          <div className="experience-description">
            <h5>Lifeguard</h5>
            <p>
              Collaborated with lifeguards to ensure a safe swimming environment, demonstrating effective teamwork and
              communication skills to coordinate surveillance, rescue efforts, and crowd management
            </p>
            <p>
              Displayed exceptional CPR and first aid skills in high-stress emergency situations, providing immediate
              and effective care, resulting in a quick and efficient response team
            </p>
            <h5>Swim Instructor</h5>
            <p>Instructed children from 5 to 14 years old on various swimming skills and techniques</p>
            <p>
              Provided constructive feedback to swimmers and collaborated with parents to track student progress,
              ensuring a positive learning experience
            </p>
            <br />
            <p>Skills: Leadership, Teamwork, Communication, First Aid, Lifesaving, Teaching, Public Relations</p>
          </div>
        </motion.div>
        <motion.div
          className="experience3 experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
          variants={{
            hidden: { opacity: 0, x: -100, rotate: -10 },
            visible: { opacity: 1, x: 0, rotate: 0 },
          }}
        >
          <div className="experience-info">
            <h3 className="job-title">Data Entry And Logistics Operator</h3>
            <h5>Somerville Merchandising</h5>
            <h6>Toronto, ON</h6>
            <h6>Sep 2021 - Feb 2022</h6>
          </div>
          <div className="experience-description">
            <p>
              Used Microsoft 365 tools to calculate, input, and keep track of daily transactions, ensuring up-to-date
              and accurate data
            </p>
            <p>
              Utilized Oracle Transportation Management and Google Maps to optimize and plan delivery routes for truck
              teams, all around the Golden Horseshoe region
            </p>
            <p>Collaborated with the inventory management teams to oversee and control inventory levels</p>
            <br />
            <p>Skills: Microsoft Excel, Microsoft Word, Data Entry, Logistics Management, Data Analysis</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainExperiences;
