import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryOption from "./components/CategoryOption";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CategoryOption />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
