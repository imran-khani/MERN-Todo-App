import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  const path = useLocation().pathname;

  const isHome = path === "/";

  return (
    <div className={`flex flex-col min-h-screen ${isHome ? "container" : ""}`}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
