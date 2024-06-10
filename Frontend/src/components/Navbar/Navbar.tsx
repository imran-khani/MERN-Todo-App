import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <nav
      className={`${
        isHome ? "md:pt-24 pt-10" : "w-full bg-Primary text-white"
      }`}
    >
      <div className="flex justify-between container h-[45px]">
        <Link to={"/"} className="flex gap-x-5 justify-center items-center">
          <img src="icon.svg" alt="logo" />
          <h1 className="text-Primary md:text-subheading text-xl font-bold">
            Todo Daily
          </h1>
        </Link>
        <div className="flex gap-x-5 text-Primary">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
