import { useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { LandingPage } from "./components/Screens/LandingPage/LandingPage";
import { ProductPage } from "./components/Screens/ProductPage/ProductPage";
import { NavBar } from "./components/UI/NavBar/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Login } from "./components/UI/Login/Login";
import { CuentaUser } from "./components/Screens/CuentaUser/CuentaUser";
import { CuentasAdmin } from "./components/Screens/CuentasAdmin/CuentasAdmin";
import { BrowserPage } from "./components/Screens/BrowserPage/BrowserPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <NavBar setIsLogin={setIsLogin} />
      {/* <LandingPage/> */}
      {/* <ProductPage /> */}
      {/* <CuentaUser /> */}
      {/* <CuentasAdmin /> */}
      <BrowserPage />
      
      <Footer />
      {isLogin && <Login setIsLogin={setIsLogin} />}
    </>
  );
}


export default App;
