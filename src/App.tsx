import { useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { LandingPage } from "./components/Screens/LandingPage/LandingPage";
import { ProductPage } from "./components/Screens/ProductPage/ProductPage";
import { NavBar } from "./components/UI/NavBar/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Login } from "./components/UI/Login/Login";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <NavBar setIsLogin={setIsLogin} />
      {/* <LandingPage/> */}
      <ProductPage />
      <Footer />
      {isLogin && <Login setIsLogin={setIsLogin} />}
    </>
  );
}

export default App;
