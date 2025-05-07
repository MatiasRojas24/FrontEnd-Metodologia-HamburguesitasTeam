import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { LandingPage } from "./components/Screens/LandingPage/LandingPage";
import { NavBar } from "./components/UI/NavBar/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <>
      <NavBar />
      <LandingPage />
      <Footer />
    </>
  );
}

export default App;
