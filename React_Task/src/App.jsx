import "./App.scss";
import { Route, Routes, useNavigate, redirect } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { useEffect, useState } from "react";
import UserForm from "./components/UserForm/UserForm";
import Booking from "./pages/Booking/Booking";
import Layout from "./containers/Layout"
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
  const navigate = useNavigate();
  useEffect(()=>{
    if (!isLoggedIn)
      navigate('/login')
  },[isLoggedIn])
  return (
    <div className="App d-flex flex-row h-100 w-100">
        <Routes>
          <Route exact path="/dashboard" element={<Layout > <Dashboard /> </Layout>} />
          <Route exact path="/booking" element={<Layout> <Booking /> </Layout>} />
          <Route exact path="/messages" element={<Layout> <Messages /> </Layout> } />
          <Route exact path="/" element={<Layout> <HomePage /> </Layout> } />
          <Route exact path="/signup" element={<UserForm setIsLoggedIn={setIsLoggedIn} type={"signup"} />} />
          <Route exact path="/login" element={<UserForm setIsLoggedIn={setIsLoggedIn} type={"login"} />} />
        </Routes>
      </div>
  
  );
}

export default App;
