import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FrontPage from "./components/FrontPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </>
  );
}

export default App;
