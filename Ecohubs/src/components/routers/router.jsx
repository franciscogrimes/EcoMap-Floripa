import * as React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../../pages/Login";
import Cadastro from "../../pages/Cadastro";
import CriaPontos from "../../pages/CriarPontos";
import Home from "../../pages/PaginaInicial";
import PontosColeta from "../../pages/ListaPontos";
import App from "../../App";

let isAutenticado = JSON.parse(localStorage.getItem("isAutenticado")) || false;
const PrivateRoute = ({ children }) => {
  return isAutenticado ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Cadastro />,
  },
  {
    path: "/",
    errorElement: <div>Not Found</div>,
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-points",
        element: <CriaPontos />,
      },
      {
        path: "/list-points",
        element: <PontosColeta />,
      },
    ],
  },
]);

export default router;
