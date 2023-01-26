import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import CreateQuestion from "./pages/CreateQuestion";
import Login from "./components/Login";
import Halaman404 from "./pages/Halaman404";
import ListQuestion from "./pages/ListQuestion";
import AddCategory from "./pages/AddCategory";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-question" element={<CreateQuestion />} />
          <Route path="/list" element={<ListQuestion />} />
          <Route path="/category" element={<AddCategory />} />
          <Route path="/*" element={<Halaman404 />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
