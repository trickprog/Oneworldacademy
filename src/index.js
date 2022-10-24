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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/free-courses" element={<FreeCourses />} />
        <Route path="/paid-courses" element={<PaidCourses />} />{" "}
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/course/:playlistid/:courseid" element={<CourseVideo />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
