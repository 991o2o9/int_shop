import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { HomePage } from "../../pages/HomePage/HomePage";
import { OrderPage } from "../../pages/OrderPage/OrderPage";
import { ProductPage } from "../../pages/ProductPage/ProductPage";
import { path } from "../../utils/constants/constants";
import { Admin } from "../../pages/Admin/Admin";
import { UserOrder } from "../../pages/Admin/UserOrder";
import { About } from "../../pages/About/About";

export const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: path.home,
        element: <HomePage />,
      },
      {
        path: path.order,
        element: <OrderPage />,
      },
      {
        path: path.productPage,
        element: <ProductPage />,
      },
      {
        path: path.admin,
        element: <Admin />,
      },
      {
        path: path.userOrder,
        element: <UserOrder />,
      },
      {
        path: path.about,
        element: <About />,
      },
    ],
  },
]);
