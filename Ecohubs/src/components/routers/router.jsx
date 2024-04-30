import * as React from "react";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import Login from "../../pages/Login";
import Cadastro from "../../pages/Cadastro";
import CriaPontos from "../../pages/CriarPontos";
import Home from "../../pages/PaginaInicial";

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
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/create-points",
        element: <CriaPontos />,
      },
    ],
  },
]);

export default router;
