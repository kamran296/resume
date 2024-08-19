import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Form from "./Form";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resume from "./pages/Resume";
import ResumeList from "./pages/ResumeList";
import Pdf from "./pages/Pdf";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/form" element={<Form />}></Route>
          <Route exact path="/resume/" element={<Resume />}></Route>
          <Route exact path="/resume/:id" element={<Resume />}></Route>

          <Route exact path="/resume-list" element={<ResumeList />}></Route>
          <Route exact path="/pdf" element={<Pdf />}></Route>
        </Routes>
      </Router>
      {/* <Form /> */}
    </>
  );
}

export default App;
