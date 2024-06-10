import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="pt-24">
      <div className="flex justify-between container h-[45px]">
        <div className="flex gap-x-5 justify-center items-center">
          <img src="icon.svg" alt="logo" />
          <h1 className="text-Primary text-subheading font-bold">Todo Daily</h1>
        </div>
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
