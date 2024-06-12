import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const AppLayout = () => {
  const path = useLocation().pathname;
   
  const isHome = path === "/";

  return (
    <div className={`flex flex-col min-h-screen ${isHome ? "container" : ""}`}>
      <Navbar />
      <Sidebar />
      <main className="flex-1 md:pl-[310px]">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
