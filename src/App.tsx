import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import FrontPage from "./components/FrontPage";
import PerceptronInputs from "./components/PerceptronInputs";
import { AnimatePresence } from "framer-motion";
import PerceptronLearningVisualization from "./components/PerceptronLearningVisualization";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<FrontPage />} />
          <Route path="/inputs" element={<PerceptronInputs />} />
          <Route
            path="learning"
            element={<PerceptronLearningVisualization />}
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
