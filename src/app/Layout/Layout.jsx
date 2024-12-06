import { Suspense } from "react";
import { Footer } from "../../modules/Footer/Footer";
import { Navbar } from "../../modules/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Loader } from "../../ui/Loader/Loader";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};
