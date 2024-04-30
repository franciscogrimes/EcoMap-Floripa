import React from "react";
import ReactDOM from "react-dom/client";

import { LoginContextProvider } from "./components/context/LoginContext.jsx";
import router from "./components/routers/router.jsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginContextProvider>
    <RouterProvider router={router} />
  </LoginContextProvider>
);
