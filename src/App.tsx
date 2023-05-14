import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FrontPage from "./components/FrontPage";
import PerceptronInputs from "./components/PerceptronInputs";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/inputs" element={<PerceptronInputs />} />
      </Routes>
    </>
  );
}

export default App;
