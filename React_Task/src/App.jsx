import "./App.scss";
import { Route, Routes, useNavigate, redirect } from "react-router-dom";
import { useEffect } from "react";
import UserForm from "./components/UserForm/UserForm";
import Booking from "./pages/Booking/Booking";
import Layout from "./containers/Layout"
import Messages from "./pages/Messages/Messages";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  useEffect(()=>{
    document.documentElement.style.setProperty('--background-color', theme === "white" ? "#FFFFFF" : "#242731")
    document.documentElement.style.setProperty('--font-color', theme === "white" ? "#000" : "#FFF")
    document.documentElement.style.setProperty('--page-background-color', theme === "white" ? "#F5F5F5" : "#1F2128")
    if (!isLoggedIn)
      navigate('/login')
  },[theme, isLoggedIn])
  return (
    <div className="App d-flex flex-row h-100 w-100">
        <Routes>
          <Route exact path="/booking" element={<Layout> <Booking /> </Layout>} />
          <Route exact path="/messages" element={<Layout> <Messages /> </Layout> } />
          <Route exact path="/" element={<Layout> <Dashboard /> </Layout> } />
          <Route exact path="/signup" element={<UserForm type={"signup"} />} />
          <Route exact path="/login" element={<UserForm type={"login"} />} /> 
        </Routes>
      </div>
  
  );
}

export default App;
