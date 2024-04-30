import React from "react";
import ReactDOM from "react-dom/client";

import { UtilitsContextProvider } from "./components/context/UtilitsContext.jsx";
import router from "./components/routers/router.jsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UtilitsContextProvider>
    <RouterProvider router={router} />
  </UtilitsContextProvider>
);
