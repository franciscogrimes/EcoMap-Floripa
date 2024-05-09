import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { UtilitsContextProvider } from "./components/context/UtilitsContext";
import Footer from "../src/components/Footer/footer"

function App() {
  return (
    <>
      <UtilitsContextProvider>
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
        <Footer/>
      </UtilitsContextProvider>
    </>
  );
}

export default App;
