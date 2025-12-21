import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Experiences from "./pages/Experiences/Experiences";
import Projects from "./pages/Projects/Projects";
import "./styles/App.css";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/about"
          element={
            <DefaultLayout>
              <About />
            </DefaultLayout>
          }
        />
        <Route
          path="/experiences"
          element={
            <DefaultLayout>
              <Experiences />
            </DefaultLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <DefaultLayout>
              <Projects />
            </DefaultLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
