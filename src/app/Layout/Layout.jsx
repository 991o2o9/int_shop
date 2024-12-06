import { Suspense } from "react";
import { Footer } from "../../modules/Footer/Footer";
import { Header } from "../../modules/Header/Header";
import { Outlet } from "react-router-dom";
import { Loader } from "../../ui/Loader/Loader";

export const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};
