import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { GestionDeProductos } from "./components/screens/GestionDeProductos/GestionDeProductos";
import { GestionDetalleProducto } from "./components/screens/GestionDetalleProducto/GestionDetalleProducto";
import { NavBar } from "./components/UI/NavBar/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <>
      <NavBar />
      <GestionDetalleProducto />
    </>
  );
}

export default App;
