import * as React from "react"
import {createBrowserRouter} from "react-router-dom"
import Login from "../../pages/Login"
import Cadastro from "../../pages/Cadastro"
import CriaPontos from "../../pages/CriarPontos"
import Home from "../../pages/PaginaInicial"


    const router = createBrowserRouter([
        {
          path: "/sign-in",
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
          path: "/home",
          element: <Home />,
        },

      ]);

export default router