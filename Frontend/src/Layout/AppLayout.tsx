import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const AppLayout = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();

//   const {isSignedIn} = useAuth();
   
//     if(!isSignedIn) navigate("/");


 // cleark auth

   
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

export default AppLayout;
