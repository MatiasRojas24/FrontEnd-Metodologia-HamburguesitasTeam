import { useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { NavBar } from "./components/UI/NavBar/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Login } from "./components/UI/Login/Login";
import { UserInfo } from "./components/UI/UserInfo/UserInfo";
import { LandingPage } from "./components/screens/LandingPage/LandingPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoged, setIsLoged] = useState(false)

  return (
    <>
      <NavBar setIsLogin={setIsLogin} setIsLoged={setIsLoged} isLoged={isLoged} />
      <LandingPage />
      <Footer />
      {isLogin && <Login setIsLogin={setIsLogin} />}
      {isLoged && <UserInfo setIsLoged={setIsLoged} />}
    </>
  );
}

export default App;
