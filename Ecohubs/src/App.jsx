import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { UtilitsContextProvider } from "./components/context/UtilitsContext";

function App() {
  return (
    <>
      <UtilitsContextProvider>
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
      </UtilitsContextProvider>
    </>
  );
}

export default App;
