import './App.css'
import Navbar from "./components/Navbar/Navbar";
import {Outlet} from "react-router-dom";
import Home from "../../pages/PaginaInicial";


function App() {


  return (
    <>
    <UtilitsContextProvider>
      <Navbar/>
      <Outlet/>
      <Home/>
    </UtilitsContextProvider>
    </>
  )
}

export default App
 