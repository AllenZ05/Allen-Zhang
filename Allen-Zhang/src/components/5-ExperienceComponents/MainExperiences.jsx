import "./MainExperiences.css";

const MainExperiences = () => {
  return (
    <div className="my-experiences">
      <div className="experiences-container">
        <div className="experience1 experience">
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
              braking
            </p>
            <p>
              Identified and rectified major flaws in the onboarding instructions, improving the process for new team
              members
            </p>
            <br />
            <br />
            <p>Tech stack: C, Python</p>
            <p>
              <a href="https://www.uwfsae.ca/" target="_blank" rel="noopener noreferrer">
                Website
              </a>
            </p>
          </div>
        </div>
        <div className="experience2 experience">
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
            <br />
            <p>Skills: Leadership, Teamwork, Communication, First Aid, Lifesaving, Teaching, Public Relations</p>
          </div>
        </div>
        <div className="experience3 experience">
          <div className="experience-info">
            <h3 className="job-title">Data Entry And Logistics Operator</h3>
            <h5>Somerville Merchandising</h5>
            <h6>Waterloo, ON</h6>
            <h6>Sep 2021 - Feb 2022</h6>
          </div>
          <div className="experience-description">
            <p>Used Excel to enter and keep track of daily transactions, ensuring up-to-date and accurate data</p>
            <p>Used Oracle Transportation Management to optimize and plan delivery routes for truck teams</p>
            <p>Collaborated with the inventory management teams to oversee and control inventory levels</p>
            <br />
            <br />
            <p>Skills: Microsoft Excel, Microsoft Word, Data Entry, Logistics Management, Data Analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainExperiences;
