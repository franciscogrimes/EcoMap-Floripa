import * as React from "react"
import {createBrowserRouter} from "react-router-dom"
import Login from "../../pages/Login"
import Cadastro from "../../pages/Cadastro"
import CriaPontos from "../../pages/CriarPontos"
import Home from "../../pages/PaginaInicial"
import ListaPontos from "../../pages/ListaPontos"


    const router = createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/sign-up",
          element: <Cadastro />,
        },
        {
          path: "/create-points",
          element: <CriaPontos />,
        },
        {
          path: "/list-points",
          element: <ListaPontos />,
        },
        {
          path: "/home",
          element: <Home />,
        },

      ]);

export default router