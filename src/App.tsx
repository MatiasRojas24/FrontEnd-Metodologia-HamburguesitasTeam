import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { LandingPage } from "./components/Screens/LandingPage/LandingPage";
import { ProductPage } from "./components/Screens/ProductPage/ProductPage";
import { NavBar } from "./components/UI/NavBar/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <>
      <NavBar />
      {/* <LandingPage/> */}
      <ProductPage />
      <Footer />
    </>
  );
}

export default App;
