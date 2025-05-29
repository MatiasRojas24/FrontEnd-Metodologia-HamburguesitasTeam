import { useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { LandingPage } from "./components/Screens/LandingPage/LandingPage";
import { ProductPage } from "./components/Screens/ProductPage/ProductPage";
import { NavBar } from "./components/UI/NavBar/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Login } from "./components/UI/Login/Login";
import { CuentasAdmin } from "./components/Screens/CuentasAdmin/CuentasAdmin";
import { UserInfo } from "./components/UI/UserInfo/UserInfo";
import { CuentasUsuarios } from "./components/Screens/CuentasUsuarios/CuentasUsuarios";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoged, setIsLoged] = useState(false)

  return (
    <>
      <NavBar setIsLogin={setIsLogin} setIsLoged={setIsLoged} isLoged={isLoged} />
      {/* <LandingPage /> */}
      {/* <CuentasAdmin /> */}
      {/* <CuentasUsuarios /> */}
      <CuentasUsuarios />
      <Footer />
      {isLogin && <Login setIsLogin={setIsLogin} />}
      {isLoged && <UserInfo setIsLoged={setIsLoged} />}
    </>
  );
}

export default App;
