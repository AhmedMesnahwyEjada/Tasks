import "./App.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { useEffect, useState } from "react";
import UserForm from "./components/UserForm/UserForm";
import Booking from "./pages/Booking/Booking";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";
import Messages from "./pages/Messages/Messages";
import Dashboard from "./pages/Dashboard/Dashboard";
function App() {
  const [theme, setTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (!theme) {
      document.body.style.backgroundColor = "#FFF";
      document.body.style.color = "#000";
    } else {
      document.body.style.backgroundColor = "#1F2128";
      document.body.style.color = "#FFF";
    }
  });
  return (
    <div className="App d-flex flex-row h-100 w-100">
      <SideBar />
      <div
        className="d-flex flex-column w-100 h-100"
        style={{ marginLeft: "18.5%" }}
      >
        <NavBar />
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/booking" element={<Booking />} />
          <Route exact path="/messages" element={<Messages />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signup" element={<UserForm type={"signup"} />} />
          <Route exact path="/login" element={<UserForm type={"login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
