import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AppRouter } from "./routes/AppRouter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setNavigator } from "./routes/navigation";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);
  return (
    <>
      <AppRouter />
    </>
  );
}


export default App;
