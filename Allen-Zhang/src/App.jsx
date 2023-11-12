import "./App.css";
import Home from "./routes/Home";
import About from "./routes/About";
import Experiences from "./routes/Experiences";
import Projects from "./routes/Projects";
import More from "./routes/More";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </>
  );
}

export default App;
