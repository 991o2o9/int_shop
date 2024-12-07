import { Footer } from "../../modules/Footer/Footer";
import { Navbar } from "../../modules/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
