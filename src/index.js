import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import FreeCourses from "./pages/FreeCourses";
import PaidCourses from "./pages/PaidCourses";
import Teachers from "./pages/Teachers";
import CourseVideo from "./pages/CourseVideo";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";

const root = ReactDOM.createRoot(document.getElementById("root"));
const valid = localStorage.getItem("email");
console.log(valid)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/free-courses" element={<FreeCourses />} />
        <Route path="/paid-courses" element={<PaidCourses />} />{" "}
        <Route path="/teachers" element={<Teachers />} />
        {valid === null ? (
          <Route
            path="/course/:course/:playlistid/:courseid"
            element={<CourseVideo />}
          />
        ) : (
          <Route
            path="/course/:course/:playlistid/:courseid/:uservideoid"
            element={<CourseVideo />}
          />
        )}
          <Route  path="/course/:course/:playlistid/:courseid/:uservideoid/quiz" element={<Quiz/> } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
