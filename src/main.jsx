import { createRoot } from "react-dom/client";
import "./app/styles/global.scss";
import "./app/styles/normalize.scss";
import { RouterProvider } from "react-router-dom";
import { Router } from "./app/routes/Router";
import BalanceProvider from "./modules/OrderModule/context/BalanceProvider/BalanceProvider";

createRoot(document.getElementById("root")).render(
  <BalanceProvider>
    <RouterProvider router={Router} />
  </BalanceProvider>
);
