import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/utils";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const {} = useAuth();
  return (
    <nav
      className={`${
        isHome ? "md:pt-24 pt-10" : "w-full bg-Primary text-white py-2"
      }`}
    >
      <div
        className={cn(
          "flex justify-between h-[45px]",
          isHome ? "container" : "md:px-20 px-5"
        )}
      >
        <Link to={"/"} className="flex gap-x-5 justify-center items-center">
          <img src={isHome ? "icon.svg" : "iconApp.svg"} alt="logo" />
          <h1 className="text-Primary md:text-subheading text-xl font-bold">
            Todo Daily
          </h1>
        </Link>
        <div
          className={cn("flex gap-x-5", isHome ? "text-Primary" : "text-white")}
        >
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <SignOutButton redirectUrl="/" />
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
