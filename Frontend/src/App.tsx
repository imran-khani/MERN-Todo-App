// App.jsx
import "./styles/App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layout/RootLayout.tsx";
import Homepage from "./pages/Homepage.tsx";
import AppLayout from "./Layout/AppLayout.tsx";
import { SignedOut, RedirectToSignIn, useAuth } from "@clerk/clerk-react";

const App = () => {
  const { isSignedIn } = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
      ],
    },
    {
      path: "/app",
      element: isSignedIn ? <AppLayout /> : <RedirectToSignIn />,
    },
    {
      path: "/sign-in/*",
      element: (
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      ),
    },
    {
      path: "/sign-up/*",
      element: (
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
